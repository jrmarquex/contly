import { mockPrisma, mockAuth } from "@/lib/mock-prisma";
import { formatBRL } from "@/lib/currency";
import { redirect } from "next/navigation";

export default async function PedidosPage() {
  const currentUser = mockAuth.getCurrentUser();
  
  if (!currentUser) {
    redirect("/api/auth/signin");
  }

  const orders = await mockPrisma.order.findMany({
    where: { userId: currentUser.id },
    include: {
      items: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted text-lg">Nenhum pedido encontrado</p>
          <p className="text-muted text-sm mt-2">Seus pedidos aparecerão aqui após a compra</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">Pedido #{order.id.slice(-8)}</h3>
                  <p className="text-sm text-muted">
                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[var(--primary)]">
                    {formatBRL(order.total)}
                  </p>
                  <span className={`text-sm px-2 py-1 rounded ${
                    order.status === "PENDING" ? "bg-yellow-500/20 text-yellow-400" :
                    order.status === "PAID" ? "bg-green-500/20 text-green-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {order.status === "PENDING" ? "Pendente" :
                     order.status === "PAID" ? "Pago" : "Cancelado"}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product?.title}</span>
                    <span className="text-muted">
                      {item.quantity}x {formatBRL(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
