import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// MVP: login pe baza de email, fara parola inca (prestatorul e oricum verificat
// manual de admin, deci riscul e mic la lansare). Adauga parola/OTP pe SMS
// inainte de a avea trafic real.
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const provider = await prisma.providerProfile.findUnique({ where: { email } });

  if (!provider) {
    return NextResponse.json({ error: "Nu am găsit un cont de prestator cu acest email." }, { status: 404 });
  }

  const res = NextResponse.json({ ok: true, providerId: provider.id });
  res.cookies.set("ajut_provider_id", provider.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
