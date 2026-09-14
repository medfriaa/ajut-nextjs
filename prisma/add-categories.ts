import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Instalator", slug: "instalator", icon: "🚿" },
  { name: "Electrician", slug: "electrician", icon: "💡" },
  { name: "Curățenie", slug: "curatenie", icon: "🧹" },
  { name: "Zugrav", slug: "zugrav", icon: "🎨" },
  { name: "Montaj mobilier", slug: "montaj", icon: "🪑" },
  { name: "Reparații", slug: "reparatii", icon: "🔧" },
  { name: "Aer condiționat", slug: "aer-conditionat", icon: "❄️" },
  { name: "Grădinărit", slug: "gradinarit", icon: "🌿" },
  { name: "Mutări", slug: "mutari", icon: "📦" },
  { name: "Alte servicii", slug: "altele", icon: "🛠️" },
];

async function main() {
  for (const c of CATEGORIES) {
    await prisma.serviceCategory.upsert({
      where: { slug: c.slug },
      update: { name: c.name, icon: c.icon, isActive: true },
      create: c,
    });
  }
  console.log("Categorii actualizate.");
}
main().finally(() => prisma.$disconnect());
