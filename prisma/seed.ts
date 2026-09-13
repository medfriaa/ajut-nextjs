import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Curățenie", slug: "curatenie", icon: "🧹" },
  { name: "Mutări & transport", slug: "mutari", icon: "📦" },
  { name: "Reparații", slug: "reparatii", icon: "🔧" },
  { name: "Montaj mobilier", slug: "montaj", icon: "🪑" },
  { name: "Detailing auto", slug: "detailing", icon: "🚗" },
  { name: "Grădinărit", slug: "gradinarit", icon: "🌿" },
  { name: "Ajutor IT", slug: "it", icon: "🖥️" },
  { name: "Livrări", slug: "livrari", icon: "📦" },
  { name: "Pet care", slug: "petcare", icon: "🐕" },
];

const AREAS = ["Centru", "Vlaicu", "Micălaca", "Aradul Nou", "Grădiște"];

async function main() {
  const arad = await prisma.city.upsert({
    where: { slug: "arad" },
    update: {},
    create: { name: "Arad", slug: "arad", isActive: true },
  });

  for (const areaName of AREAS) {
    await prisma.area.create({ data: { name: areaName, cityId: arad.id } });
  }

  for (const c of CATEGORIES) {
    await prisma.serviceCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  await prisma.platformSettings.create({ data: { commissionPercent: 15 } });

  const reparatii = await prisma.serviceCategory.findUniqueOrThrow({ where: { slug: "reparatii" } });
  const curatenie = await prisma.serviceCategory.findUniqueOrThrow({ where: { slug: "curatenie" } });
  const montaj = await prisma.serviceCategory.findUniqueOrThrow({ where: { slug: "montaj" } });
  const centru = await prisma.area.findFirstOrThrow({ where: { name: "Centru", cityId: arad.id } });
  const vlaicu = await prisma.area.findFirstOrThrow({ where: { name: "Vlaicu", cityId: arad.id } });

  const provider = await prisma.providerProfile.create({
    data: {
      fullName: "Vasile Popescu",
      phone: "0722000000",
      email: "vasile@example.com",
      cityId: arad.id,
      bio: "10 ani experiență în reparații și montaj mobilier.",
      experienceYears: 10,
      verificationStatus: "VERIFIED",
      avgRating: 4.9,
      reviewCount: 127,
      responseRate: 0.98,
      completedJobsCount: 127,
      categories: {
        create: [{ categoryId: reparatii.id }, { categoryId: curatenie.id }, { categoryId: montaj.id }],
      },
      serviceAreas: {
        create: [{ areaId: centru.id }, { areaId: vlaicu.id }],
      },
    },
  });

  await prisma.providerProfile.create({
    data: {
      fullName: "Ana Georgescu",
      phone: "0733000000",
      email: "ana@example.com",
      cityId: arad.id,
      bio: "Servicii de curățenie și pet care.",
      experienceYears: 3,
      verificationStatus: "PENDING",
      categories: { create: [{ categoryId: curatenie.id }] },
      serviceAreas: { create: [{ areaId: centru.id }] },
    },
  });

  console.log("Seed complet. Provider demo:", provider.fullName);
}

main().finally(() => prisma.$disconnect());
