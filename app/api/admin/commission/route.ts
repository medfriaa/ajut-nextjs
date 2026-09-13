import { NextRequest, NextResponse } from "next/server";
import { getActiveCommissionPercent, setCommissionPercent } from "@/lib/commission";

// TODO productie: protejeaza aceasta ruta cu autentificare + rol ADMIN
export async function GET() {
  const percent = await getActiveCommissionPercent();
  return NextResponse.json({ commissionPercent: percent });
}

export async function POST(req: NextRequest) {
  const { commissionPercent } = await req.json();
  try {
    const settings = await setCommissionPercent(Number(commissionPercent));
    return NextResponse.json(settings);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
