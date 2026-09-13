import { prisma } from "@/lib/prisma";
import ProviderForm from "./ProviderForm";

export default async function ProviderRegisterPage() {
  const [categories, cities] = await Promise.all([
    prisma.serviceCategory.findMany({ where: { isActive: true } }),
    prisma.city.findMany({ where: { isActive: true } }),
  ]);
  return <ProviderForm categories={categories} cities={cities} />;
}
