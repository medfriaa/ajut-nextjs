import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Ajut.ro — Ai o treabă. Găsim omul.",
  description: "Găsește rapid persoane de încredere pentru lucrările de care ai nevoie, direct în Arad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="font-sans">
        <div className="max-w-[480px] mx-auto min-h-screen pb-20 relative">
          <header className="flex items-center justify-between px-5 pt-5 pb-2">
            <Link href="/" className="font-serif text-xl font-semibold text-forestDark">
              Ajut<span className="text-amber">.ro</span>
            </Link>
          </header>
          <main className="px-5">{children}</main>
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-border flex py-2">
            <Link href="/" className="flex-1 text-center text-xs text-muted py-1">Acasă</Link>
            <Link href="/cont/joburi" className="flex-1 text-center text-xs text-muted py-1">Cererile mele</Link>
            <Link href="/prestator/cont" className="flex-1 text-center text-xs text-muted py-1">Prestator</Link>
            <Link href="/admin" className="flex-1 text-center text-xs text-muted py-1">Admin</Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
