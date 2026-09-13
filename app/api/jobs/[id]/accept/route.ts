import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { providerId } = await req.json();
  const job = await prisma.job.findUniqueOrThrow({ where: { id: params.id } });

  if (job.status !== "OPEN" && job.status !== "MATCHED") {
    return NextResponse.json({ error: "Acest job nu mai este disponibil." }, { status: 409 });
  }

  const booking = await prisma.$transaction(async (tx) => {
    await tx.job.update({ where: { id: job.id }, data: { status: "ACCEPTED" } });
    await tx.jobOffer.updateMany({
      where: { jobId: job.id, providerId },
      data: { status: "ACCEPTED" },
    });
    await tx.jobOffer.updateMany({
      where: { jobId: job.id, providerId: { not: providerId } },
      data: { status: "EXPIRED" },
    });
    return tx.booking.create({
      data: {
        jobId: job.id,
        providerId,
        agreedPrice: job.budgetAmount ?? 0,
        status: "CONFIRMED",
      },
    });
  });

  return NextResponse.json(booking, { status: 201 });
}
