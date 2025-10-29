import Link from "next/link";
import Image from "next/image";
import { formatBRL } from "@/lib/currency";
import { getCategoryIcon } from "@/lib/category-icons";

type Props = {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  isOutOfStock?: boolean;
  category?: string;
};

export function ProductCard({ id, title, slug, price, compareAtPrice, isOutOfStock, category }: Props) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPct = hasDiscount ? Math.round(((compareAtPrice! - price) / compareAtPrice!) * 100) : 0;
  
  // Determinar a categoria do produto para mostrar o ícone correto
  const categoryIcon = category ? getCategoryIcon(category) : '/images/logo.webp';
  return (
    <div className={`card-professional p-6 relative overflow-hidden group ${isOutOfStock ? 'opacity-60' : ''}`}>
      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20 rounded-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg">ESGOTADO</span>
          </div>
        </div>
      )}

      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Product Icon */}
      <div className="relative z-10 mb-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300 border border-[var(--border)]">
          <Image 
            src={categoryIcon}
            alt={`${category || 'Produto'} icon`}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Brand Info */}
      <div className="relative z-10 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[var(--primary)] text-sm font-medium">Contly</p>
            <p className="text-white font-semibold text-lg">Conta Matriz</p>
            <p className="text-[var(--muted-foreground)] text-sm">Meta ADS▾</p>
          </div>
        </div>
      </div>

      {/* Product Title */}
      <div className="relative z-10 mb-4">
        <Link href={`/produto/${slug}`} className={isOutOfStock ? "pointer-events-none" : ""}>
          <h3 className="text-white font-semibold text-sm leading-tight group-hover:text-[var(--primary)] transition-colors duration-300">
            {title}
          </h3>
        </Link>
      </div>

      {/* Pricing */}
      <div className="relative z-10 mb-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[var(--primary)] font-bold text-xl">
            {formatBRL(price)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-green-400 text-sm font-semibold">-{discountPct}%</span>
              <span className="line-through text-[var(--muted-foreground)] text-sm">
                {formatBRL(compareAtPrice!)}
              </span>
            </>
          )}
        </div>
        <p className="text-[var(--muted-foreground)] text-xs">À vista no Pix</p>
      </div>

      {/* Action Button */}
      <div className="relative z-10">
        <form action={`/api/orders/buy-now`} method="post">
          <input type="hidden" name="productId" value={id} />
          <button 
            disabled={isOutOfStock}
            className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              isOutOfStock 
                ? 'bg-red-500/20 border border-red-500 text-red-400 cursor-not-allowed' 
                : 'btn-primary hover:scale-105'
            }`}
          >
            {isOutOfStock ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Esgotado
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7M9 3V4H15V3H9M7 6V19H17V6H7Z"/>
                </svg>
                Comprar agora
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


