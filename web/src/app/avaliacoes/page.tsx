import { mockPrisma } from "@/lib/mock-prisma";

export default async function AvaliacoesPage() {
  const reviews = await mockPrisma.review.findMany({
    include: {
      user: { select: { name: true, displayName: true } },
      product: { select: { title: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 20
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Avaliações</h1>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted text-lg">Nenhuma avaliação encontrada</p>
          <p className="text-muted text-sm mt-2">As avaliações dos clientes aparecerão aqui</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{review.product?.title}</h3>
                  <p className="text-sm text-muted">
                    {review.user?.displayName || review.user?.name || "Usuário"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-[var(--secondary)]" : "text-muted"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-muted">{review.content}</p>
              <p className="text-xs text-muted mt-2">
                {new Date(review.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
