import { stripe } from "./stripe";
import { prisma } from "./prisma";

// Creeaza un cont Stripe Express pentru un prestator nou.
// Express = Stripe se ocupa de UI-ul de onboarding (KYC, cont bancar).
export async function createConnectAccountForProvider(providerId: string, email: string) {
  const account = await stripe.accounts.create({
    type: "express",
    country: "RO",
    email,
    capabilities: {
      transfers: { requested: true },
      card_payments: { requested: true },
    },
    business_type: "individual",
  });

  await prisma.providerProfile.update({
    where: { id: providerId },
    data: { stripeAccountId: account.id },
  });

  return account;
}

// Genereaza link-ul unde prestatorul isi completeaza datele (buletin, cont bancar).
export async function createOnboardingLink(stripeAccountId: string, origin: string) {
  const link = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: `${origin}/prestator/cont?onboarding=refresh`,
    return_url: `${origin}/prestator/cont?onboarding=complete`,
    type: "account_onboarding",
  });
  return link.url;
}
