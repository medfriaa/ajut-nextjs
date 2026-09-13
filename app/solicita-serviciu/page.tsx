import { prisma } from "@/lib/prisma";
import RequestForm from "./RequestForm";

export default async function RequestPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [categories, cities, areas] = await Promise.all([
    prisma.serviceCategory.findMany({ where: { isActive: true } }),
    prisma.city.findMany({ where: { isActive: true } }),
    prisma.area.findMany(),
  ]);

  return (
    <RequestForm
      categories={categories}
      cities={cities}
      areas={areas}
      defaultCategoryId={searchParams.category}
    />
  );
}
