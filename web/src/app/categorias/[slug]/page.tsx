import { mockPrisma } from "@/lib/mock-prisma";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await mockPrisma.category.findMany();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await mockPrisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{category.name}</h1>
        <p className="text-muted">{category.products.length} produtos encontrados</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category.products.map((p) => (
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
  );
}
