import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createConnectAccountForProvider, createOnboardingLink } from "@/lib/stripeConnect";

export async function POST(req: NextRequest) {
  const { providerId } = await req.json();
  const provider = await prisma.providerProfile.findUniqueOrThrow({ where: { id: providerId } });

  let stripeAccountId = provider.stripeAccountId;

  if (!stripeAccountId) {
    const account = await createConnectAccountForProvider(provider.id, provider.email);
    stripeAccountId = account.id;
  }

  const origin = req.headers.get("origin") || "https://ajutro.ro";
  const url = await createOnboardingLink(stripeAccountId, origin);

  return NextResponse.json({ url });
}
