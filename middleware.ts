import { NextRequest, NextResponse } from "next/server";

// Protectie simpla pe baza de cookie pentru /admin.
// Pentru productie serioasa, inlocuieste cu NextAuth + roluri reale in DB,
// dar acest nivel e suficient cat timp esti singurul admin la lansare.
export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin") && req.nextUrl.pathname !== "/admin/login";
  const isAdminApiRoute = req.nextUrl.pathname.startsWith("/api/admin");

  if (isAdminRoute || isAdminApiRoute) {
    const session = req.cookies.get("ajut_admin_session");
    if (!session || session.value !== "authenticated") {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
