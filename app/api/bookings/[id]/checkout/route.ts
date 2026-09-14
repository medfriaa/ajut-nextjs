import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getActiveCommissionPercent } from "@/lib/commission";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Plățile nu sunt configurate încă. Adaugă STRIPE_SECRET_KEY în .env." },
      { status: 500 }
    );
  }

  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: params.id },
    include: { job: { include: { category: true } }, provider: true },
  });

  if (!booking.provider.stripeAccountId || !booking.provider.stripeOnboarded) {
    return NextResponse.json(
      { error: "Prestatorul nu și-a finalizat încă înregistrarea pentru plăți." },
      { status: 409 }
    );
  }

  const existing = await prisma.payment.findUnique({ where: { bookingId: booking.id } });
  if (existing) {
    return NextResponse.json({ error: "Există deja o plată pentru această lucrare." }, { status: 409 });
  }

  const commissionPercent = await getActiveCommissionPercent();
  const amountTotal = booking.agreedPrice;
  const platformCommissionAmount = Math.round(amountTotal * (commissionPercent / 100) * 100) / 100;
  const providerPayoutAmount = Math.round((amountTotal - platformCommissionAmount) * 100) / 100;

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amountTotal,
      platformCommissionAmount,
      providerPayoutAmount,
      commissionPercentApplied: commissionPercent,
      status: "PENDING",
    },
  });

  const origin = _req.headers.get("origin") || "https://ajutro.ro";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "ron",
          product_data: { name: `Ajut.ro — ${booking.job.category.name}` },
          unit_amount: Math.round(amountTotal * 100),
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: Math.round(platformCommissionAmount * 100),
      transfer_data: {
        destination: booking.provider.stripeAccountId,
      },
    },
    metadata: { bookingId: booking.id },
    success_url: `${origin}/cont/joburi?paid=1`,
    cancel_url: `${origin}/cont/joburi?paid=0`,
  });

  await prisma.payment.update({
    where: { bookingId: booking.id },
    data: { stripeCheckoutSessionId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
