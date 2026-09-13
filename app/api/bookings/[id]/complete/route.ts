import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { releasePaymentToProvider } from "@/lib/commission";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: params.id },
    include: { payment: true },
  });

  if (!booking.payment || booking.payment.status !== "HELD") {
    return NextResponse.json(
      { error: "Plata nu a fost încă confirmată de Stripe. Clientul trebuie să plătească întâi." },
      { status: 409 }
    );
  }

  const payment = await releasePaymentToProvider(booking.id);

  await prisma.$transaction([
    prisma.booking.update({ where: { id: booking.id }, data: { status: "COMPLETED" } }),
    prisma.job.update({ where: { id: booking.jobId }, data: { status: "COMPLETED" } }),
    prisma.providerProfile.update({
      where: { id: booking.providerId },
      data: {
        completedJobsCount: { increment: 1 },
        earnings: { increment: payment.providerPayoutAmount },
      },
    }),
  ]);

  // TODO productie: aici se declanseaza un Stripe Transfer catre contul Connect
  // al prestatorului, folosind payment.providerPayoutAmount.

  return NextResponse.json(payment);
}
