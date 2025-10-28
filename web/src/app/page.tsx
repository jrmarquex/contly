import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { mockPrisma } from "@/lib/mock-prisma";

export default async function Home() {
  const [categories, products] = await Promise.all([
    mockPrisma.category.findMany({ take: 5, orderBy: { name: "asc" } }),
    mockPrisma.product.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
  ]);

  // Buscar produtos por categoria para as seções
  const metaAdsProducts = await mockPrisma.product.findMany({
    where: { categoryId: "1" },
    take: 8,
    orderBy: { createdAt: "desc" }
  });

  const tiktokAdsProducts = await mockPrisma.product.findMany({
    where: { categoryId: "2" },
    take: 8,
    orderBy: { createdAt: "desc" }
  });

  const googleAdsProducts = await mockPrisma.product.findMany({
    where: { categoryId: "3" },
    take: 8,
    orderBy: { createdAt: "desc" }
  });

  const proxyProducts = await mockPrisma.product.findMany({
    where: { categoryId: "4" },
    take: 8,
    orderBy: { createdAt: "desc" }
  });

  const variadosProducts = await mockPrisma.product.findMany({
    where: { categoryId: "5" },
    take: 8,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#B8860B]/10 rounded-3xl"></div>
        <div className="relative z-10 text-center py-20">
            <h1 className="text-6xl font-bold mb-6">
              <span className="text-white">Contingência Segura.</span>
              <br />
              <span className="text-[#FFD700] bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
                Resultados Garantidos.
              </span>
            </h1>
            <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto">
              Aqui, qualidade e confiança trabalham lado a lado
            </p>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-white">Categorias</span>
          <span className="text-[#FFD700] ml-2">Populares</span>
        </h2>
        <p className="text-[#A3A3A3] mb-8">Escolha a sua plataforma preferida</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {categories.map((c) => (
            <CategoryCard key={c.id} name={c.name} slug={c.slug} />
          ))}
        </div>
      </section>

      {/* Meta Ads Products */}
      {metaAdsProducts.length > 0 && (
        <ProductGrid title="Meta Ads" products={metaAdsProducts} />
      )}

      {/* TikTok Ads Products */}
      {tiktokAdsProducts.length > 0 && (
        <ProductGrid title="TikTok Ads" products={tiktokAdsProducts} />
      )}

      {/* Google Ads Products */}
      {googleAdsProducts.length > 0 && (
        <ProductGrid title="Google Ads" products={googleAdsProducts} />
      )}

      {/* Proxys Products */}
      {proxyProducts.length > 0 && (
        <ProductGrid title="Proxys" products={proxyProducts} />
      )}

      {/* Variados Products */}
      {variadosProducts.length > 0 && (
        <ProductGrid title="Variados" products={variadosProducts} />
      )}

      {/* Latest Products Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-white">Novidades</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
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
      </section>
    </div>
  );
}