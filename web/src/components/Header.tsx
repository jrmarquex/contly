"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserMenu } from "@/components/UserMenu";

export function Header() {
  const pathname = usePathname();
  
  return (
    <header className="w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative">
              <Image 
                src="/images/logo.png" 
                alt="Contly Logo" 
                width={80}
                height={80}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                priority={true}
              />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl text-white placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors duration-300 ${
              pathname === "/" ? "text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/avaliacoes" 
            className={`text-sm font-medium transition-colors duration-300 ${
              pathname?.startsWith("/avaliacoes") ? "text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-white"
            }`}
          >
            Avaliações
          </Link>
          <Link 
            href="/suporte" 
            className={`text-sm font-medium transition-colors duration-300 ${
              pathname?.startsWith("/suporte") ? "text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-white"
            }`}
          >
            Suporte
          </Link>
        </nav>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}


