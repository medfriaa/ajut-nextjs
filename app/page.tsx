import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CinematicHero from "./CinematicHero";
import ProblemStory from "./ProblemStory";
import HumanMoment from "./HumanMoment";
import FinalCTA from "./FinalCTA";

export default async function HomePage() {
  const categories = await prisma.serviceCategory.findMany({ where: { isActive: true } });

  return (
    <div>
      <CinematicHero />
      <ProblemStory />
      <HumanMoment />

      <div className="pt-10 text-sm text-muted font-medium mb-3">Servicii populare</div>
      <div className="grid grid-cols-3 gap-2.5 mb-8">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/solicita-serviciu?category=${c.id}`}
            className="bg-white border border-border rounded-xl p-3 text-center flex flex-col items-center gap-1.5"
          >
            <div className="text-xl">{c.icon}</div>
            <div className="text-[11.5px] font-medium leading-tight">{c.name}</div>
          </Link>
        ))}
      </div>

      <FinalCTA />
    </div>
  );
}
