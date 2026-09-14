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

      <div
        className="-mx-5 px-8 py-16"
        style={{ background: "radial-gradient(ellipse at 50% 20%, #1A3327, #0E1712 75%)" }}
      >
        <div className="text-white/40 text-[11px] font-semibold tracking-[0.3em] mb-6 text-center">
          SERVICII POPULARE
        </div>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/solicita-serviciu?category=${c.id}`}
              className="rounded-2xl p-3.5 text-center flex flex-col items-center gap-2"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                animation: "cardFloat 4s ease-in-out infinite",
                animationDelay: (i * 0.25) + "s",
              }}
            >
              <div className="text-xl">{c.icon}</div>
              <div className="text-[11px] font-medium leading-tight text-white/80">{c.name}</div>
            </Link>
          ))}
        </div>
        <style>{`
          @keyframes cardFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
        `}</style>
      </div>

      <FinalCTA />
    </div>
  );
}
