import Link from "next/link";

export default function FinalCTA() {
  return (
    <div
      className="-mx-5 flex flex-col items-center justify-center text-center px-8 relative overflow-hidden"
      style={{ height: "90vh", background: "linear-gradient(180deg, #0E1712, #12261E)" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: "340px",
          height: "340px",
          background: "radial-gradient(circle, rgba(224,151,58,0.15), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div className="relative">
        <p className="text-white/50 text-[12px] font-semibold tracking-[0.3em] mb-5">AJUT.RO</p>
        <h2 className="font-serif text-white text-[36px] font-medium leading-tight mb-2">
          Ai ceva de rezolvat?
        </h2>
        <h2 className="font-serif text-[52px] font-semibold mb-8" style={{ color: "#E0973A" }}>
          AJUT.
        </h2>
        <div className="flex flex-col gap-3 w-full max-w-[280px] mx-auto">
          <Link
            href="/solicita-serviciu"
            className="text-white text-center font-semibold rounded-[10px] py-4 text-[15px]"
            style={{ background: "linear-gradient(135deg, #2F6B4F, #204A37)" }}
          >
            Solicită un serviciu →
          </Link>
          <Link
            href="/prestator/inregistrare"
            className="text-white/70 text-center font-medium py-2 text-[13px] border border-white/15 rounded-[10px]"
          >
            Devino prestator →
          </Link>
        </div>
      </div>
    </div>
  );
}
