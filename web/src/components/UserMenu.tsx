"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mockAuth } from "@/lib/mock-prisma";
import { useRouter } from "next/navigation";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  displayName?: string | null;
};

export function UserMenu() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    mockAuth.logout();
    setUser(null);
    setIsOpen(false);
    router.refresh();
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Link 
          href="/login" 
          className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
        >
          Entrar
        </Link>
        <Link 
          href="/login" 
          className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
        >
          Cadastrar
        </Link>
      </div>
    );
  }

  const display = user.displayName || user.name || user.email;
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg hover:border-[var(--primary)] transition-colors duration-300"
      >
        <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-white text-sm font-medium">@{display}</span>
        <svg className={`w-4 h-4 text-[var(--muted-foreground)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <p className="text-[var(--primary)] font-semibold text-sm">@{display}</p>
            <p className="text-[var(--muted-foreground)] text-xs">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/perfil"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-white hover:bg-[var(--glow)] transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-3 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Meu Perfil
            </Link>
            
            <Link
              href="/perfil"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-white hover:bg-[var(--glow)] transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-3 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Meus Pedidos
            </Link>
            
            <Link
              href="/suporte"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-white hover:bg-[var(--glow)] transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-3 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Suporte
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


