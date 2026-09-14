import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const providers = await prisma.providerProfile.findMany({
    include: { categories: { include: { category: true } }, city: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(providers);
}

export async function POST(req: NextRequest) {
  const { fullName, phone, email, cityId, bio, experienceYears, categoryIds, introVideoUrl } = await req.json();

  if (!fullName || !phone || !email || !cityId || !categoryIds || categoryIds.length === 0) {
    return NextResponse.json({ error: "Completeaza toate campurile obligatorii." }, { status: 400 });
  }

  const provider = await prisma.providerProfile.create({
    data: {
      fullName,
      phone,
      email,
      cityId,
      bio,
      experienceYears: experienceYears ? Number(experienceYears) : 0,
      introVideoUrl: introVideoUrl || null,
      verificationStatus: "PENDING",
      categories: { create: categoryIds.map((id: string) => ({ categoryId: id })) },
    },
  });

  const res = NextResponse.json(provider, { status: 201 });
  res.cookies.set("ajut_provider_id", provider.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
