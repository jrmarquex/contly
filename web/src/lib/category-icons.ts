// Mapeamento de ícones por categoria
export const categoryIcons: { [key: string]: string } = {
  'meta-ads': '/images/meta_ads_matriz.webp',
  'tiktok-ads': '/images/tiktok_matriz.webp',
  'google-ads': '/images/google_matriz.webp',
  'proxy': '/images/matriz_proxy.webp',
  'proxys': '/images/matriz_proxy.webp',
  'variados': '/images/logo.webp',
};

/**
 * Retorna o ícone correto baseado na categoria do produto
 * @param category - Slug da categoria
 * @returns URL do ícone
 */
export function getCategoryIcon(category: string): string {
  return categoryIcons[category] || categoryIcons['variados'];
}

/**
 * Retorna todas as categorias com seus ícones
 * @returns Array de objetos com categoria e ícone
 */
export function getAllCategoryIcons() {
  return Object.entries(categoryIcons).map(([category, icon]) => ({
    category,
    icon,
  }));
}

