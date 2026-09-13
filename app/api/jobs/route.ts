import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { matchProvidersToJob } from "@/lib/matching";

export async function GET() {
  const jobs = await prisma.job.findMany({
    include: { category: true, city: true, area: true, booking: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { categoryId, cityId, areaId, description, budgetAmount, preferredWhen, customerName, customerPhone, customerEmail } = body;

  if (!categoryId || !cityId || !description || !customerName || !customerPhone) {
    return NextResponse.json({ error: "Lipsesc campuri obligatorii." }, { status: 400 });
  }

  const category = await prisma.serviceCategory.findUnique({ where: { id: categoryId } });

  const job = await prisma.job.create({
    data: {
      categoryId,
      cityId,
      areaId: areaId || null,
      title: category?.name ?? "Lucrare",
      description,
      budgetAmount: budgetAmount ? Number(budgetAmount) : null,
      preferredWhen,
      customerName,
      customerPhone,
      customerEmail,
      status: "OPEN",
    },
  });

  await matchProvidersToJob(job.id);

  return NextResponse.json(job, { status: 201 });
}
