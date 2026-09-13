import { prisma } from "./prisma";

const MAX_MATCHED_PROVIDERS = 5;

// Ruleaza cand un job e creat. Gaseste cei mai potriviti prestatori
// dupa categorie + oras + zona, apoi cade inapoi pe tot orasul daca
// nu exista potriviri exacte pe zona. Sorteaza dupa rating si rata de raspuns.
export async function matchProvidersToJob(jobId: string) {
  const job = await prisma.job.findUniqueOrThrow({ where: { id: jobId } });

  let candidates = await prisma.providerProfile.findMany({
    where: {
      verificationStatus: "VERIFIED",
      cityId: job.cityId,
      categories: { some: { categoryId: job.categoryId } },
      ...(job.areaId ? { serviceAreas: { some: { areaId: job.areaId } } } : {}),
    },
    orderBy: [{ avgRating: "desc" }, { responseRate: "desc" }],
    take: MAX_MATCHED_PROVIDERS,
  });

  if (candidates.length === 0) {
    candidates = await prisma.providerProfile.findMany({
      where: {
        verificationStatus: "VERIFIED",
        cityId: job.cityId,
        categories: { some: { categoryId: job.categoryId } },
      },
      orderBy: [{ avgRating: "desc" }],
      take: MAX_MATCHED_PROVIDERS,
    });
  }

  await prisma.$transaction([
    ...candidates.map((provider) =>
      prisma.jobOffer.create({ data: { jobId: job.id, providerId: provider.id } })
    ),
    prisma.job.update({ where: { id: job.id }, data: { status: candidates.length ? "MATCHED" : "OPEN" } }),
  ]);

  // TODO productie: trimite notificare reala (email/SMS/push) catre fiecare provider din `candidates`.
  return candidates;
}
