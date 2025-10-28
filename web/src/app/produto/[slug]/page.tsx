import { mockPrisma } from "@/lib/mock-prisma";
import { formatBRL } from "@/lib/currency";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await mockPrisma.product.findMany();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await mockPrisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) : 0;

  // Get related products from the same category
  const relatedProducts = await mockPrisma.product.findMany({
    where: { 
      categoryId: product.categoryId,
      id: { not: product.id },
      status: "AVAILABLE"
    },
    take: 4,
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
            <span className="text-muted">Imagem do produto</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="text-muted">{product.category?.name}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-[var(--primary)]">
                {formatBRL(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="line-through text-muted">
                    {formatBRL(product.compareAtPrice!)}
                  </span>
                  <span className="text-sm text-[var(--secondary)]">-{discountPct}%</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted">À vista no Pix</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Destaques:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Produto digital de alta qualidade</li>
              <li>• Entrega instantânea após confirmação</li>
              <li>• Suporte técnico especializado</li>
              <li>• Garantia de satisfação</li>
            </ul>
          </div>

          <form action="/api/orders/buy-now" method="post">
            <input type="hidden" name="productId" value={product.id} />
            <button 
              disabled={product.status === "OUT_OF_STOCK"}
              className="btn-primary w-full px-6 py-3 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.status === "OUT_OF_STOCK" ? "Esgotado" : "Comprar agora"}
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Descrição</h2>
        <p className="text-muted">{product.description}</p>
      </div>

      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Produtos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                slug={p.slug}
                price={p.price}
                compareAtPrice={p.compareAtPrice}
                isOutOfStock={p.status === "OUT_OF_STOCK"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
