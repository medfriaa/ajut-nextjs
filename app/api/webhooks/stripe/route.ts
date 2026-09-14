import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET || !signature) {
    return NextResponse.json({ error: "Webhook nesetat corect." }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return NextResponse.json({ error: "Semnatura invalida: " + err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata ? session.metadata.bookingId : null;

    if (bookingId) {
      const payment = await prisma.payment.update({
        where: { bookingId: bookingId },
        data: { status: "RELEASED", stripePaymentIntentId: session.payment_intent },
      });

      const bookingBefore = await prisma.booking.findUniqueOrThrow({ where: { id: bookingId } });

      await prisma.booking.update({ where: { id: bookingId }, data: { status: "COMPLETED" } });
      await prisma.job.update({ where: { id: bookingBefore.jobId }, data: { status: "COMPLETED" } });

      await prisma.providerProfile.update({
        where: { id: bookingBefore.providerId },
        data: {
          completedJobsCount: { increment: 1 },
          earnings: { increment: payment.providerPayoutAmount },
        },
      });
    }
  }

  if (event.type === "account.updated") {
    const account = event.data.object;
    if (account.details_submitted && account.charges_enabled) {
      await prisma.providerProfile.updateMany({
        where: { stripeAccountId: account.id },
        data: { stripeOnboarded: true },
      });
    }
  }

  return NextResponse.json({ received: true });
}
