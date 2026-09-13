import { prisma } from "./prisma";

// Comisionul se citeste mereu din baza de date. Nu-l hard-coda niciodata
// intr-o constanta - asa admin-ul isi pierde controlul asupra lui.
export async function getActiveCommissionPercent(): Promise<number> {
  const settings = await prisma.platformSettings.findFirst({
    orderBy: { updatedAt: "desc" },
  });
  return settings ? settings.commissionPercent : 15;
}

export async function setCommissionPercent(percent: number) {
  if (percent < 0 || percent > 100) throw new Error("Comisionul trebuie sa fie intre 0 si 100.");
  return prisma.platformSettings.create({ data: { commissionPercent: percent } });
}

// Pasul 1: cand se creeaza sesiunea de plata Stripe (dupa ce prestatorul accepta jobul).
// Comisionul se calculeaza acum, in momentul in care banii intra efectiv in sistem.
export async function createPendingPayment(bookingId: string, amountTotal: number) {
  const commissionPercent = await getActiveCommissionPercent();
  const platformCommissionAmount = Math.round(amountTotal * (commissionPercent / 100) * 100) / 100;
  const providerPayoutAmount = Math.round((amountTotal - platformCommissionAmount) * 100) / 100;

  return prisma.payment.create({
    data: {
      bookingId,
      amountTotal,
      platformCommissionAmount,
      providerPayoutAmount,
      commissionPercentApplied: commissionPercent,
      status: "PENDING",
    },
  });
}

// Pasul 2: webhook-ul Stripe confirma ca banii au fost incasati de platforma (retinuti).
export async function markPaymentHeld(bookingId: string, stripePaymentIntentId: string) {
  return prisma.payment.update({
    where: { bookingId },
    data: { status: "HELD", stripePaymentIntentId },
  });
}

// Pasul 3: clientul confirma ca lucrarea a fost facuta -> platforma elibereaza banii
// catre prestator (in productie, aici se declanseaza un Stripe Transfer catre
// contul Connect al prestatorului).
export async function releasePaymentToProvider(bookingId: string) {
  return prisma.payment.update({
    where: { bookingId },
    data: { status: "RELEASED" },
  });
}
