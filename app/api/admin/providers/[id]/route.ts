import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// TODO productie: protejeaza aceasta ruta cu autentificare + rol ADMIN
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { verificationStatus } = await req.json();
  if (!["VERIFIED", "REJECTED", "PENDING"].includes(verificationStatus)) {
    return NextResponse.json({ error: "Status invalid." }, { status: 400 });
  }
  const provider = await prisma.providerProfile.update({
    where: { id: params.id },
    data: { verificationStatus },
  });
  return NextResponse.json(provider);
}
