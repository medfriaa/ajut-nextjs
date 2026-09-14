import ScrollGuide from "./ScrollGuide";
import "./globals.css";
import Link from "next/link";
import ParallaxBackground from "./ParallaxBackground";
import CustomCursor from "./CustomCursor";
import AjutMark from "./AjutMark";

export const metadata = {
  title: "Ajut.ro — Ai nevoie de un meseriaș?",
  description: "AJUT te ajută să găsești rapid un profesionist de încredere pentru casa ta, direct în Arad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="font-sans">
        <CustomCursor />
        <AjutMark />
        <ParallaxBackground />
        <div className="max-w-[480px] mx-auto min-h-screen pb-20 relative">
          <header
            className="flex items-center justify-between px-5 pt-4 pb-3 sticky top-0 z-40"
            style={{ background: "#0E1712", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Link href="/" className="font-serif text-xl font-semibold text-white tracking-tight">
              Ajut<span style={{ color: "#E0973A" }}>.ro</span>
            </Link>
          </header>
          <main className="px-5">{children}</main>
          <nav
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex py-2 z-40"
            style={{ background: "#0E1712", borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Link href="/" className="flex-1 text-center text-xs text-white/55 py-1.5 font-medium">Acasă</Link>
            <Link href="/cont/joburi" className="flex-1 text-center text-xs text-white/55 py-1.5 font-medium">Cererile mele</Link>
            <Link href="/prestator/cont" className="flex-1 text-center text-xs text-white/55 py-1.5 font-medium">Prestator</Link>
            <Link href="/admin" className="flex-1 text-center text-xs text-white/55 py-1.5 font-medium">Admin</Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
