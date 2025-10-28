"use client";
import { useEffect, useState } from "react";
import { mockAuth, mockPrisma, User, Order, Product } from "@/lib/mock-prisma";
import { useRouter } from "next/navigation";
import { formatBRL } from "@/lib/currency";
import Link from "next/link";
import { AdminNav } from "@/components/AdminNav";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = mockAuth.getCurrentUser();
      
      if (!currentUser) {
        router.push("/login");
        return;
      }

      if (currentUser.role !== 'ADMIN') {
        router.push("/perfil");
        return;
      }

      setUser(currentUser);

      // Buscar todos os usuários
      const users = await mockPrisma.user.findMany({});
      setAllUsers(users);

      // Buscar todas as compras recentes
      const allOrders = [
        {
          id: 'order-1',
          userId: '1',
          user: { name: 'João Silva' },
          status: 'PAID' as const,
          total: 247.90,
          createdAt: new Date('2024-01-15'),
          items: [{ product: { title: 'Produto Teste' }, quantity: 1 }]
        },
        {
          id: 'order-2',
          userId: '4',
          user: { name: 'Cliente Teste' },
          status: 'PENDING' as const,
          total: 129.99,
          createdAt: new Date('2024-01-20'),
          items: [{ product: { title: 'Outro Produto' }, quantity: 2 }]
        },
      ];
      setRecentOrders(allOrders);

      setIsLoading(false);
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    mockAuth.logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        Carregando...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard Admin</h1>
          <p className="text-[var(--muted-foreground)]">Bem-vindo, {user.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="btn-secondary px-6 py-3 rounded-lg"
        >
          Sair
        </button>
      </div>

      {/* Admin Navigation */}
      <AdminNav />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-professional p-6">
          <h3 className="text-[var(--muted-foreground)] text-sm mb-2">Total de Usuários</h3>
          <p className="text-3xl font-bold text-[var(--primary)]">{allUsers.length}</p>
        </div>
        <div className="card-professional p-6">
          <h3 className="text-[var(--muted-foreground)] text-sm mb-2">Compras Recentes</h3>
          <p className="text-3xl font-bold text-[var(--primary)]">{recentOrders.length}</p>
        </div>
        <div className="card-professional p-6">
          <h3 className="text-[var(--muted-foreground)] text-sm mb-2">Usuários Ativos</h3>
          <p className="text-3xl font-bold text-[var(--primary)]">{allUsers.length}</p>
        </div>
        <div className="card-professional p-6">
          <h3 className="text-[var(--muted-foreground)] text-sm mb-2">Total em Vendas</h3>
          <p className="text-3xl font-bold text-[var(--primary)]">{formatBRL(recentOrders.reduce((sum, o) => sum + o.total, 0))}</p>
        </div>
      </div>

      {/* Usuários */}
      <section className="card-professional p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Usuários Cadastrados</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 text-white font-semibold">Nome</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Tipo</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Data Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u.id} className="border-b border-[var(--border)] hover:bg-[var(--glow)]/10 transition-colors">
                  <td className="py-3 px-4 text-white">{u.name}</td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.role === 'ADMIN' ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Compras Recentes */}
      <section className="card-professional p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Compras Recentes</h2>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="border border-[var(--border)] rounded-lg p-4 hover:bg-[var(--glow)]/10 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-semibold">Pedido #{order.id}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm">Cliente: {order.user.name}</p>
                  <p className="text-[var(--muted-foreground)] text-sm">Data: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[var(--primary)] font-bold text-lg">{formatBRL(order.total)}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'PAID' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="border-t border-[var(--border)] pt-3">
                <p className="text-white text-sm">
                  {order.items[0].quantity}x {order.items[0].product.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cadastro de Produtos */}
      <section className="card-professional p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Cadastrar Novo Produto</h2>
        <p className="text-[var(--muted-foreground)] mb-6">
          Esta seção será implementada futuramente para permitir o cadastro completo de produtos.
        </p>
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg p-6">
          <h3 className="text-[var(--primary)] font-semibold mb-4">Funcionalidades Futuras:</h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-center">
              <span className="text-[var(--primary)] mr-2">•</span> Título e Descrição do produto
            </li>
            <li className="flex items-center">
              <span className="text-[var(--primary)] mr-2">•</span> Valor e Quantidade em estoque
            </li>
            <li className="flex items-center">
              <span className="text-[var(--primary)] mr-2">•</span> Tipo de produto (Google, Meta, TikTok, Proxy, Variados)
            </li>
            <li className="flex items-center">
              <span className="text-[var(--primary)] mr-2">•</span> Aplicar desconto sobre o valor
            </li>
            <li className="flex items-center">
              <span className="text-[var(--primary)] mr-2">•</span> Seleção automática de imagem baseada no tipo
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

