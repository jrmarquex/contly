import { NextRequest, NextResponse } from "next/server";
import { mockAuth } from "@/lib/mock-prisma";

export function middleware(request: NextRequest) {
  const currentUser = mockAuth.getCurrentUser();
  
  if (!currentUser && (request.nextUrl.pathname.startsWith("/perfil") || request.nextUrl.pathname.startsWith("/pedidos"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/perfil/:path*", "/pedidos/:path*"],
};


