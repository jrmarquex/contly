"use client";
import { useEffect, useState } from "react";
import { mockAuth, mockPrisma, User } from "@/lib/mock-prisma";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";

export default function AdminUsuarios() {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
      const users = await mockPrisma.user.findMany({});
      setAllUsers(users);
      setFilteredUsers(users);
      setIsLoading(false);
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    let filtered = [...allUsers];

    // Filtrar por termo de busca (nome)
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por data
    if (startDate || endDate) {
      filtered = filtered.filter(u => {
        const createdAt = new Date(u.createdAt);
        if (startDate && createdAt < new Date(startDate)) return false;
        if (endDate && createdAt > new Date(endDate)) return false;
        return true;
      });
    }

    setFilteredUsers(filtered);
  }, [searchTerm, startDate, endDate, allUsers]);

  const handleLogout = () => {
    mockAuth.logout();
    router.push("/login");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
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
          <h1 className="text-4xl font-bold text-white mb-2">Usuários</h1>
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

      {/* Filters */}
      <div className="card-professional p-6">
        <h2 className="text-xl font-bold text-white mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-white mb-2">
              Buscar por Nome ou Email
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-professional w-full px-4 py-2"
              placeholder="Digite o nome ou email..."
            />
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
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-professional p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Todos os Usuários ({filteredUsers.length})
          </h2>
        </div>
        
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
              {filteredUsers.map((u) => (
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
                  <td className="py-3 px-4 text-[var(--muted-foreground)]">
                    {new Date(u.createdAt).toLocaleDateString('pt-BR')}
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

