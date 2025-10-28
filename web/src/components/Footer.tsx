import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20 py-12 bg-[var(--card-bg)]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                  <Image 
                    src="/images/logo.png" 
                    alt="Contly Logo" 
                    width={48}
                    height={48}
                    className="object-contain"
                    loading="lazy"
                  />
              </div>
              <span className="text-2xl font-bold text-white">Contly</span>
            </div>
            <p className="text-[var(--muted-foreground)] text-sm max-w-xs">
              A Agência de Contingência de Quem Você Conhece.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-[var(--primary)] font-semibold text-lg">Navegação</h3>
            <nav className="space-y-2">
              <Link href="/avaliacoes" className="block text-[var(--muted-foreground)] hover:text-white transition-colors duration-300">
                Avaliações
              </Link>
              <Link href="/categorias" className="block text-[var(--muted-foreground)] hover:text-white transition-colors duration-300">
                Categorias
              </Link>
              <Link href="/" className="block text-[var(--muted-foreground)] hover:text-white transition-colors duration-300">
                Catálogo
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-[var(--primary)] font-semibold text-lg">Empresa</h3>
            <nav className="space-y-2">
              <Link href="/termos-e-servicos" className="block text-[var(--muted-foreground)] hover:text-white transition-colors duration-300">
                Termos e Serviços
              </Link>
              <Link href="/termos-de-uso" className="block text-[var(--muted-foreground)] hover:text-white transition-colors duration-300">
                Termos de Uso
              </Link>
              <Link href="/garantia" className="block text-[var(--muted-foreground)] hover:text-white transition-colors duration-300">
                Garantia
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] pt-8">
          <p className="text-[var(--muted-foreground)] text-sm text-center">
            © {new Date().getFullYear()} Contly — Todos os Direitos Reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
