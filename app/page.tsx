import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const categories = await prisma.serviceCategory.findMany({ where: { isActive: true } });

  return (
    <div>
      <section className="pt-6 pb-2">
        <h1 className="font-serif text-[30px] leading-[1.15] font-medium mb-3">
          Ai nevoie de un meseriaș?
        </h1>
        <p className="text-[15px] text-muted mb-6 max-w-[320px]">
          AJUT te ajută să găsești rapid un profesionist de încredere pentru casa ta, direct în Arad.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/solicita-serviciu" className="bg-forest text-white text-center font-semibold rounded-[10px] py-3.5">
            Solicită un serviciu
          </Link>
          <Link href="/prestator/inregistrare" className="border border-forest text-forestDark text-center font-semibold rounded-[10px] py-3.5">
            Devino prestator
          </Link>
          <Link href="/prestator/login" className="text-center text-[13px] text-muted py-1">
            Ești deja prestator? Intră în cont
          </Link>
        </div>
      </section>

      <div className="text-sm text-muted font-medium mt-7 mb-3">Servicii populare</div>
      <div className="grid grid-cols-3 gap-2.5">
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

      <div className="text-sm text-muted font-medium mt-7 mb-3">Cum funcționează?</div>
      <ol className="flex flex-col">
        {[
          "Spui ce ai nevoie",
          "Găsim prestatori disponibili",
          "Alegi oferta potrivită",
          "Lucrarea este realizată",
          "Plătești și lași o recenzie",
        ].map((step, i) => (
          <li key={i} className="flex gap-3.5 py-3.5 border-b border-border last:border-0">
            <div className="w-[26px] h-[26px] min-w-[26px] rounded-full bg-forestLight text-forestDark text-xs font-semibold flex items-center justify-center">
              {i + 1}
            </div>
            <div className="text-[14.5px] pt-0.5">{step}</div>
          </li>
        ))}
      </ol>

      <div className="text-sm text-muted font-medium mt-7 mb-3">De ce AJUT?</div>
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {[
          "Plată securizată",
          "Proces simplu",
          "Preț clar",
          "Recenzii după finalizare",
        ].map((item) => (
          <div key={item} className="bg-white border border-border rounded-xl p-3 text-[12.5px] font-medium flex items-center gap-2">
            <span className="text-forest">✓</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
}
