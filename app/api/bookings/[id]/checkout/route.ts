import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { createPendingPayment } from "@/lib/commission";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Plățile nu sunt configurate încă. Adaugă STRIPE_SECRET_KEY în .env." },
      { status: 500 }
    );
  }

  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: params.id },
    include: { job: { include: { category: true } } },
  });

  const existing = await prisma.payment.findUnique({ where: { bookingId: booking.id } });
  if (existing) {
    return NextResponse.json({ error: "Există deja o plată pentru această lucrare." }, { status: 409 });
  }

  await createPendingPayment(booking.id, booking.agreedPrice);

  const origin = _req.headers.get("origin") || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "ron",
          product_data: { name: `Ajut.ro — ${booking.job.category.name}` },
          unit_amount: Math.round(booking.agreedPrice * 100),
        },
        quantity: 1,
      },
    ],
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
