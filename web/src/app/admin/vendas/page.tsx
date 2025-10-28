"use client";
import { useEffect, useState } from "react";
import { mockAuth, mockPrisma, User } from "@/lib/mock-prisma";
import { useRouter } from "next/navigation";
import { formatBRL } from "@/lib/currency";
import { AdminNav } from "@/components/AdminNav";

interface Order {
  id: string;
  userId: string;
  user: { name: string };
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  total: number;
  createdAt: Date;
  items: Array<{ product: { title: string }; quantity: number }>;
  category?: string;
  paymentMethod?: 'CREDIT_CARD' | 'PIX' | 'BOLETO';
}

export default function AdminVendas() {
  const [user, setUser] = useState<User | null>(null);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
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
    
    // Mock orders com dados de teste
    const mockOrders: Order[] = [
      {
        id: 'order-1',
        userId: '1',
        user: { name: 'João Silva' },
        status: 'PAID',
        total: 247.90,
        createdAt: new Date('2024-01-15'),
        items: [{ product: { title: 'Perfil Meta Ads' }, quantity: 1 }],
        category: 'Meta Ads',
        paymentMethod: 'CREDIT_CARD'
      },
      {
        id: 'order-2',
        userId: '4',
        user: { name: 'Cliente Teste' },
        status: 'PENDING',
        total: 129.99,
        createdAt: new Date('2024-01-20'),
        items: [{ product: { title: 'Proxy Premium' }, quantity: 2 }],
        category: 'Proxys',
        paymentMethod: 'PIX'
      },
      {
        id: 'order-3',
        userId: '1',
        user: { name: 'João Silva' },
        status: 'PAID',
        total: 89.90,
        createdAt: new Date('2024-01-22'),
        items: [{ product: { title: 'TikTok Ads Conta' }, quantity: 1 }],
        category: 'TikTok Ads',
        paymentMethod: 'PIX'
      },
    ];

    setAllOrders(mockOrders);
    setFilteredOrders(mockOrders);
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    let filtered = [...allOrders];

    // Filtrar por categoria
    if (categoryFilter) {
      filtered = filtered.filter(o => o.category === categoryFilter);
    }

    // Filtrar por forma de pagamento
    if (paymentMethod) {
      filtered = filtered.filter(o => o.paymentMethod === paymentMethod);
    }

    // Filtrar por data
    if (startDate || endDate) {
      filtered = filtered.filter(o => {
        const createdAt = new Date(o.createdAt);
        if (startDate && createdAt < new Date(startDate)) return false;
        if (endDate && createdAt > new Date(endDate)) return false;
        return true;
      });
    }

    setFilteredOrders(filtered);
  }, [categoryFilter, startDate, endDate, paymentMethod, allOrders]);

  const handleLogout = () => {
    mockAuth.logout();
    router.push("/login");
  };

  const clearFilters = () => {
    setCategoryFilter("");
    setStartDate("");
    setEndDate("");
    setPaymentMethod("");
  };

  const totalVendas = filteredOrders.filter(o => o.status === 'PAID').reduce((sum, o) => sum + o.total, 0);

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
          <h1 className="text-4xl font-bold text-white mb-2">Vendas</h1>
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-professional p-6">
          <h3 className="text-[var(--muted-foreground)] text-sm mb-2">Total de Vendas</h3>
          <p className="text-3xl font-bold text-[var(--primary)]">{filteredOrders.length}</p>
        </div>
        <div className="card-professional p-6">
          <h3 className="text-[var(--muted-foreground)] text-sm mb-2">Vendas Pagas</h3>
          <p className="text-3xl font-bold text-[var(--primary)]">
            {filteredOrders.filter(o => o.status === 'PAID').length}
          </p>
        </div>
        <div className="card-professional p-6">
          <h3 className="text-[var(--muted-foreground)] text-sm mb-2">Valor Total</h3>
          <p className="text-3xl font-bold text-[var(--primary)]">{formatBRL(totalVendas)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-professional p-6">
        <h2 className="text-xl font-bold text-white mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-white mb-2">
              Categoria
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-professional w-full px-4 py-2"
            >
              <option value="">Todas</option>
              <option value="Meta Ads">Meta Ads</option>
              <option value="TikTok Ads">TikTok Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Proxys">Proxys</option>
              <option value="Variados">Variados</option>
            </select>
          </div>

          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-semibold text-white mb-2">
              Forma de Pagamento
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="input-professional w-full px-4 py-2"
            >
              <option value="">Todas</option>
              <option value="CREDIT_CARD">Cartão de Crédito</option>
              <option value="PIX">PIX</option>
              <option value="BOLETO">Boleto</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-semibold text-white mb-2">
              Data Inicial
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-professional w-full px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-semibold text-white mb-2">
              Data Final
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-professional w-full px-4 py-2"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="btn-secondary w-full py-2"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card-professional p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Todas as Vendas</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 text-white font-semibold">Pedido</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Cliente</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Categoria</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Valor</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Pagamento</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-white font-semibold">Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-[var(--border)] hover:bg-[var(--glow)]/10 transition-colors">
                  <td className="py-3 px-4 text-white">#{order.id}</td>
                  <td className="py-3 px-4 text-white">{order.user.name}</td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">{order.category || 'N/A'}</td>
                  <td className="py-3 px-4 text-[var(--primary)] font-semibold">{formatBRL(order.total)}</td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">
                    {order.paymentMethod === 'CREDIT_CARD' ? 'Cartão' :
                     order.paymentMethod === 'PIX' ? 'PIX' :
                     order.paymentMethod === 'BOLETO' ? 'Boleto' : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'PAID' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {order.status === 'PAID' ? 'Pago' :
                       order.status === 'PENDING' ? 'Pendente' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

