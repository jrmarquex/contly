"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="card-professional p-4 mb-8">
      <nav className="flex space-x-6">
        <Link 
          href="/admin/dashboard"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            isActive('/admin/dashboard') 
              ? 'bg-[var(--primary)] text-black' 
              : 'text-white hover:text-[var(--primary)]'
          }`}
        >
          Dashboard
        </Link>
        <Link 
          href="/admin/usuarios"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            isActive('/admin/usuarios') 
              ? 'bg-[var(--primary)] text-black' 
              : 'text-white hover:text-[var(--primary)]'
          }`}
        >
          Usuários
        </Link>
        <Link 
          href="/admin/vendas"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            isActive('/admin/vendas') 
              ? 'bg-[var(--primary)] text-black' 
              : 'text-white hover:text-[var(--primary)]'
          }`}
        >
          Vendas
        </Link>
        <Link 
          href="/admin/produtos"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            isActive('/admin/produtos') 
              ? 'bg-[var(--primary)] text-black' 
              : 'text-white hover:text-[var(--primary)]'
          }`}
        >
          Cadastrar Produtos
        </Link>
      </nav>
    </div>
  );
}

