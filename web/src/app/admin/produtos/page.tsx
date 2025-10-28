"use client";
import { useEffect, useState } from "react";
import { mockAuth, mockPrisma, User } from "@/lib/mock-prisma";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { getCategoryIcon } from "@/lib/category-icons";

export default function AdminProdutos() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

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
    setIsLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Simular cadastro de produto
      const productIcon = getCategoryIcon(category);
      console.log("Produto cadastrado:", {
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category,
        discount: parseFloat(discount),
        paymentLink,
        icon: productIcon,
      });

      // Simular sucesso
      setTimeout(() => {
        setSuccess(true);
        setIsSubmitting(false);
        
        // Limpar formulário
        setTitle("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setDiscount("");
        setPaymentLink("");

        setTimeout(() => setSuccess(false), 3000);
      }, 1000);
    } catch (err) {
      setError("Erro ao cadastrar produto. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  const calculateFinalPrice = () => {
    if (!price || !discount) return 0;
    const basePrice = parseFloat(price) || 0;
    const discountAmount = parseFloat(discount) || 0;
    return basePrice - discountAmount;
  };


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
          <h1 className="text-4xl font-bold text-white mb-2">Cadastrar Produtos</h1>
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

      {/* Form */}
      <div className="card-professional p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
              Produto cadastrado com sucesso!
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
              Título do Produto
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-professional w-full px-4 py-3"
              placeholder="Ex: Perfil BR Antigo Aquecido"
            />
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
              Descrição
            </label>
            <textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-professional w-full px-4 py-3 h-32 resize-none"
              placeholder="Descreva o produto..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Valor */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-white mb-2">
                Valor (R$)
              </label>
              <input
                id="price"
                type="number"
                required
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-professional w-full px-4 py-3"
                placeholder="0.00"
              />
            </div>

            {/* Quantidade */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-white mb-2">
                Quantidade em Estoque
              </label>
              <input
                id="quantity"
                type="number"
                required
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input-professional w-full px-4 py-3"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo/Categoria */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-white mb-2">
                Tipo de Produto
              </label>
              <select
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-professional w-full px-4 py-3"
              >
                <option value="">Selecione o tipo...</option>
                <option value="meta-ads">Meta Ads</option>
                <option value="tiktok-ads">TikTok Ads</option>
                <option value="google-ads">Google Ads</option>
                <option value="proxy">Proxys</option>
                <option value="variados">Variados</option>
              </select>
              {category && (
                <div className="mt-2">
                  <p className="text-[var(--primary)] text-sm mb-2">
                    ✓ Imagem será selecionada automaticamente baseada no tipo
                  </p>
                  <div className="relative w-24 h-24 bg-[var(--card-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
                    <img 
                      src={getCategoryIcon(category)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Desconto */}
            <div>
              <label htmlFor="discount" className="block text-sm font-semibold text-white mb-2">
                Desconto (R$)
              </label>
              <input
                id="discount"
                type="number"
                min="0"
                step="0.01"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="input-professional w-full px-4 py-3"
                placeholder="0.00 (opcional)"
              />
            </div>
          </div>

          {/* Link de Pagamento */}
          <div>
            <label htmlFor="paymentLink" className="block text-sm font-semibold text-white mb-2">
              Link de Pagamento (Checkout)
            </label>
            <input
              id="paymentLink"
              type="url"
              required
              value={paymentLink}
              onChange={(e) => setPaymentLink(e.target.value)}
              className="input-professional w-full px-4 py-3"
              placeholder="https://checkout.exemplo.com/produto-123"
            />
            <p className="text-[var(--muted-foreground)] text-sm mt-2">
              Link do checkout que será usado para processar o pagamento deste produto
            </p>
          </div>

          {/* Preço Final */}
          {(price || discount) && (
            <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <span className="text-[var(--primary)] font-semibold">Valor Final:</span>
                <span className="text-white text-2xl font-bold">
                  R$ {calculateFinalPrice().toFixed(2)}
                </span>
              </div>
              {discount && (
                <p className="text-[var(--muted-foreground)] text-sm mt-2">
                  De R$ {parseFloat(price || "0").toFixed(2)} com desconto de R$ {parseFloat(discount || "0").toFixed(2)}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar Produto"}
          </button>
        </form>
      </div>
    </div>
  );
}

