"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockAuth } from "@/lib/mock-prisma";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = mockAuth.login(email, password);
      
      if (success) {
        // Verificar role do usuário e redirecionar
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'ADMIN') {
          router.push("/admin/dashboard");
        } else {
          router.push("/perfil");
        }
        router.refresh();
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Simular login com Google
    mockAuth.loginWithGoogle();
    router.push("/");
    router.refresh();
  };

  const handleDiscordLogin = () => {
    // Simular login com Discord
    mockAuth.loginWithDiscord();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image 
                src="/images/logo.png" 
                alt="A definir Logo" 
                width={120}
                height={120}
                className="object-contain"
                priority={true}
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Bem-vindo de volta
          </h2>
          <p className="text-[var(--muted-foreground)]">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Login Form */}
        <div className="card-professional p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-professional w-full px-4 py-3"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-professional w-full px-4 py-3"
                placeholder="Sua senha"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-[var(--border)] rounded bg-[var(--card-bg)]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--muted-foreground)]">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <Link href="/esqueci-senha" className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-300">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--background)] text-[var(--muted-foreground)]">
                  Ou continue com
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-3 px-4 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] text-sm font-medium text-white hover:border-[var(--primary)] transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>

              <button
                onClick={handleDiscordLogin}
                className="w-full inline-flex justify-center py-3 px-4 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] text-sm font-medium text-white hover:border-[var(--primary)] transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="#5865F2" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Discord
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-[var(--muted-foreground)]">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-300 font-semibold">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="card-professional p-6 bg-[var(--primary)]/5 border-[var(--primary)]/20">
          <h3 className="text-[var(--primary)] font-semibold mb-3">Credenciais de Demonstração</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-[var(--muted-foreground)]">Admin Principal:</span>
              <span className="text-white ml-2">admin@gmail.com / admin1234</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">Admin:</span>
              <span className="text-white ml-2">admin@adefinir.com / admin123</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">Cliente:</span>
              <span className="text-white ml-2">cliente@gmail.com / cliente1234</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">Usuário:</span>
              <span className="text-white ml-2">joao@example.com / joao123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}