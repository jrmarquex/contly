"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockAuth, mockPrisma } from "@/lib/mock-prisma";
import { formatBRL } from "@/lib/currency";
import type { User, Order } from "@/lib/mock-data";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }

    // Se for admin, redirecionar para dashboard
    if (currentUser.role === 'ADMIN') {
      router.push("/admin/dashboard");
      return;
    }

    setUser(currentUser);
    loadUserOrders(currentUser.id);
  }, [router]);

  const loadUserOrders = async (userId: string) => {
    try {
      const userOrders = await mockPrisma.order.findMany({
        where: { userId },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" }
      });
      setOrders(userOrders as any);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    mockAuth.logout();
    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--muted-foreground)]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="card-professional p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-2xl">
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.displayName || user.name || "Usuário"}
              </h1>
              <p className="text-[var(--muted-foreground)] text-lg">
                {user.email}
              </p>
              <div className="flex items-center mt-2">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  Usuário
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary px-6 py-3 text-sm font-semibold"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-professional p-6 text-center">
          <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{orders.length}</h3>
          <p className="text-[var(--muted-foreground)]">Pedidos Realizados</p>
        </div>

        <div className="card-professional p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {orders.filter(o => o.status === 'PAID').length}
          </h3>
          <p className="text-[var(--muted-foreground)]">Pedidos Pagos</p>
        </div>

        <div className="card-professional p-6 text-center">
          <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {formatBRL(orders.reduce((total, order) => total + order.total, 0))}
          </h3>
          <p className="text-[var(--muted-foreground)]">Total Gasto</p>
        </div>
      </div>

      {/* Orders */}
      <div className="card-professional p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Histórico de Compras</h2>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[var(--muted-foreground)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--muted-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum pedido encontrado</h3>
            <p className="text-[var(--muted-foreground)] mb-6">
              Você ainda não fez nenhum pedido. Que tal começar agora?
            </p>
            <Link 
              href="/" 
              className="btn-primary px-6 py-3 text-sm font-semibold"
            >
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="border border-[var(--border)] rounded-lg p-4 hover:border-[var(--primary)] transition-colors duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">Pedido #{order.id}</h3>
                    <p className="text-[var(--muted-foreground)] text-sm">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[var(--primary)] font-bold text-lg">
                      {formatBRL(order.total)}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'PAID' 
                        ? 'bg-green-500/20 text-green-400' 
                        : order.status === 'PENDING'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {order.status === 'PAID' ? 'Pago' : 
                       order.status === 'PENDING' ? 'Pendente' : 'Cancelado'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[var(--muted-foreground)] text-sm">
                    {order.items?.length || 0} item(s)
                  </p>
                  <Link 
                    href={`/pedidos/${order.id}`}
                    className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-300 text-sm font-semibold"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}