import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Ajut.ro — Ai nevoie de un meseriaș?",
  description: "AJUT te ajută să găsești rapid un profesionist de încredere pentru casa ta, direct în Arad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="font-sans">
        <div className="max-w-[480px] mx-auto min-h-screen pb-20 relative bg-bg">
          <header className="flex items-center justify-between px-5 pt-5 pb-2 sticky top-0 bg-bg/95 backdrop-blur-sm z-40">
            <Link href="/" className="font-serif text-xl font-semibold text-forestDark tracking-tight">
              Ajut<span className="text-amber">.ro</span>
            </Link>
          </header>
          <main className="px-5">{children}</main>
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-border flex py-2 shadow-[0_-2px_8px_rgba(18,38,30,0.04)]">
            <Link href="/" className="flex-1 text-center text-xs text-muted py-1.5 font-medium">Acasă</Link>
            <Link href="/cont/joburi" className="flex-1 text-center text-xs text-muted py-1.5 font-medium">Cererile mele</Link>
            <Link href="/prestator/cont" className="flex-1 text-center text-xs text-muted py-1.5 font-medium">Prestator</Link>
            <Link href="/admin" className="flex-1 text-center text-xs text-muted py-1.5 font-medium">Admin</Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
