// Dados mockados para simular o banco de dados
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  displayName: string | null;
  handle: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  status: 'AVAILABLE' | 'OUT_OF_STOCK';
  categoryId: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  total: number;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  content: string;
  createdAt: Date;
}

// Dados mockados
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    displayName: 'João Silva',
    handle: 'joao-silva',
    role: 'USER',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Admin',
    email: 'admin@adefinir.com',
    displayName: 'Admin',
    handle: 'admin',
    role: 'ADMIN',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Administrador',
    email: 'admin@gmail.com',
    displayName: 'Administrador',
    handle: 'administrador',
    role: 'ADMIN',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Cliente Teste',
    email: 'cliente@gmail.com',
    displayName: 'Cliente Teste',
    handle: 'cliente-teste',
    role: 'USER',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Meta Ads',
    slug: 'meta-ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'TikTok Ads',
    slug: 'tiktok-ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Google Ads',
    slug: 'google-ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Proxys',
    slug: 'proxys',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Variados',
    slug: 'variados',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockProducts: Product[] = [
  // Meta Ads Products
  {
    id: '1',
    title: 'PERFIL BR ANTIGO AQUECIDO + BM VERIFICADA + PAGINA...',
    slug: 'perfil-br-antigo-aquecido-bm-verificada',
    description: 'Perfil brasileiro antigo aquecido com Business Manager verificada e página criada.',
    price: 247.90,
    compareAtPrice: 260.05,
    status: 'AVAILABLE',
    categoryId: '1',
    category: 'Meta Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'BM NOVA BRASILEIRA R$250 LIMITE DIÁRIO',
    slug: 'bm-nova-brasileira-250-limite-diario',
    description: 'Business Manager nova brasileira com limite diário de R$250.',
    price: 79.90,
    compareAtPrice: 97.44,
    status: 'AVAILABLE',
    categoryId: '1',
    category: 'Meta Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    title: 'BM VERIFICADA EMPRESA BR (API WHATSAPP)',
    slug: 'bm-verificada-empresa-br-api-whatsapp',
    description: 'Business Manager verificada empresa brasileira com API WhatsApp.',
    price: 347.90,
    compareAtPrice: 382.37,
    status: 'AVAILABLE',
    categoryId: '1',
    category: 'Meta Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    title: 'PERFIL 1-3 CONTAS DE ANUNCIO LIMITE R$1.334...',
    slug: 'perfil-1-3-contas-anuncio-limite-1334',
    description: 'Perfil com 1-3 contas de anúncio e limite de R$1.334.',
    price: 114.00,
    compareAtPrice: 120.66,
    status: 'OUT_OF_STOCK',
    categoryId: '1',
    category: 'Meta Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    title: '1 PERFIL + 2 BMS + 1 PG CRIADA',
    slug: '1-perfil-2-bms-1-pg-criada',
    description: '1 Perfil + 2 Business Managers + 1 Página criada.',
    price: 99.00,
    compareAtPrice: 120.78,
    status: 'AVAILABLE',
    categoryId: '1',
    category: 'Meta Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    title: 'BM REESTABELECIDA BR R$287 LIMITE DIÁRIO',
    slug: 'bm-reestabelecida-br-287-limite-diario',
    description: 'Business Manager reestabelecida brasileira com limite diário de R$287.',
    price: 129.00,
    compareAtPrice: 137.23,
    status: 'AVAILABLE',
    categoryId: '1',
    category: 'Meta Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '7',
    title: 'PERFIL + 9 CONTAS DE ANUNCIO LIMITE R$287 POR...',
    slug: 'perfil-9-contas-anuncio-limite-287',
    description: 'Perfil + 9 contas de anúncio com limite de R$287 por conta.',
    price: 89.00,
    compareAtPrice: 112.66,
    status: 'OUT_OF_STOCK',
    categoryId: '1',
    category: 'Meta Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '8',
    title: 'BM 1300 REESTABELECIDA',
    slug: 'bm-1300-reestabelecida',
    description: 'Business Manager 1300 reestabelecida.',
    price: 197.00,
    compareAtPrice: 223.88,
    status: 'OUT_OF_STOCK',
    categoryId: '1',
    category: 'Meta Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },

  // TikTok Ads Products
  {
    id: '9',
    title: 'CONTA TIKTOK SHOP ATIVADO - 2K-10K DE SEGUIDORES',
    slug: 'conta-tiktok-shop-ativado-2k-10k-seguidores',
    description: 'Conta TikTok Shop ativada com 2K-10K de seguidores.',
    price: 399.00,
    compareAtPrice: 463.05,
    status: 'AVAILABLE',
    categoryId: '2',
    category: 'TikTok Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '10',
    title: 'CONTA ESTADOS UNIDOS TIKTOK ADS COM 1 BC...',
    slug: 'conta-estados-unidos-tiktok-ads-1-bc',
    description: 'Conta Estados Unidos TikTok Ads com 1 Business Center.',
    price: 317.00,
    compareAtPrice: 450.42,
    status: 'OUT_OF_STOCK',
    categoryId: '2',
    category: 'TikTok Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '11',
    title: 'CONTA MATRIZ TIKTOK ADS',
    slug: 'conta-matriz-tiktok-ads',
    description: 'Conta matriz TikTok Ads.',
    price: 147.00,
    compareAtPrice: 170.27,
    status: 'OUT_OF_STOCK',
    categoryId: '2',
    category: 'TikTok Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },

  // Google Ads Products
  {
    id: '12',
    title: 'CONTA GOOGLE ADS VERIFICADA CNPJ (Pagament...',
    slug: 'conta-google-ads-verificada-cnpj-pagamento',
    description: 'Conta Google Ads verificada CNPJ com pagamento configurado.',
    price: 199.90,
    compareAtPrice: 227.18,
    status: 'AVAILABLE',
    categoryId: '3',
    category: 'Google Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '13',
    title: 'CONTA GOOGLE ADS VERIFICADA CNPJ (Pagament...',
    slug: 'conta-google-ads-verificada-cnpj-pagamento-2',
    description: 'Conta Google Ads verificada CNPJ com pagamento configurado.',
    price: 109.90,
    compareAtPrice: 137.38,
    status: 'AVAILABLE',
    categoryId: '3',
    category: 'Google Ads',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },

  // Proxys Products
  {
    id: '14',
    title: 'COMBO 5X PROXY ESTÁTICA RESIDENCIAL',
    slug: 'combo-5x-proxy-estatica-residencial',
    description: 'Combo 5x Proxy Estática Residencial.',
    price: 80.00,
    compareAtPrice: 103.00,
    status: 'AVAILABLE',
    categoryId: '4',
    category: 'Proxys',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '15',
    title: 'COMBO 5X PROXY SERVER',
    slug: 'combo-5x-proxy-server',
    description: 'Combo 5x Proxy Server.',
    price: 42.00,
    compareAtPrice: 53.18,
    status: 'AVAILABLE',
    categoryId: '4',
    category: 'Proxys',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '16',
    title: 'PROXY SERVER',
    slug: 'proxy-server',
    description: 'Proxy Server individual.',
    price: 10.00,
    compareAtPrice: 12.20,
    status: 'AVAILABLE',
    categoryId: '4',
    category: 'Proxys',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '17',
    title: 'PROXY ESTÁTICA RESIDENCIAL',
    slug: 'proxy-estatica-residencial',
    description: 'Proxy Estática Residencial individual.',
    price: 20.00,
    compareAtPrice: 22.78,
    status: 'AVAILABLE',
    categoryId: '4',
    category: 'Proxys',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },

  // Variados Products
  {
    id: '18',
    title: 'CHIP SEMI AQUECIDO WHATSAPP',
    slug: 'chip-semi-aquecido-whatsapp',
    description: 'Chip semi aquecido WhatsApp.',
    price: 49.90,
    compareAtPrice: 58.02,
    status: 'OUT_OF_STOCK',
    categoryId: '5',
    category: 'Variados',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '19',
    title: 'PERFIL REAL 2023 TIKTOK COM 100 SEGUIDORES BRASILEIROS',
    slug: 'perfil-real-2023-tiktok-100-seguidores-brasileiros',
    description: 'Perfil real 2023 TikTok com 100 seguidores brasileiros.',
    price: 39.90,
    compareAtPrice: 42.00,
    status: 'AVAILABLE',
    categoryId: '5',
    category: 'Variados',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '20',
    title: 'CHIP AQUECIDO WHATSAPP',
    slug: 'chip-aquecido-whatsapp',
    description: 'Chip aquecido WhatsApp.',
    price: 177.00,
    compareAtPrice: 207.74,
    status: 'OUT_OF_STOCK',
    categoryId: '5',
    category: 'Variados',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '21',
    title: 'CONTA INSTAGRAM ANTIGA 2013',
    slug: 'conta-instagram-antiga-2013',
    description: 'Conta Instagram antiga de 2013.',
    price: 39.00,
    compareAtPrice: 48.16,
    status: 'AVAILABLE',
    categoryId: '5',
    category: 'Variados',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '22',
    title: 'PERFIL REAL INSTAGRAM COM 3000 SEGUIDORES...',
    slug: 'perfil-real-instagram-3000-seguidores',
    description: 'Perfil real Instagram com 3000 seguidores.',
    price: 99.00,
    compareAtPrice: 128.75,
    status: 'OUT_OF_STOCK',
    categoryId: '5',
    category: 'Variados',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '23',
    title: 'PERFIL REAL TIKTOK COM 3000 SEGUIDORES...',
    slug: 'perfil-real-tiktok-3000-seguidores',
    description: 'Perfil real TikTok com 3000 seguidores.',
    price: 89.00,
    compareAtPrice: 118.87,
    status: 'OUT_OF_STOCK',
    categoryId: '5',
    category: 'Variados',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    status: 'PENDING',
    total: 29.90,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: '1',
    status: 'PAID',
    total: 39.90,
    createdAt: new Date('2024-01-10'),
  },
];

export const mockOrderItems: OrderItem[] = [
  {
    id: '1',
    orderId: '1',
    productId: '1',
    quantity: 1,
    price: 29.90,
  },
  {
    id: '2',
    orderId: '2',
    productId: '2',
    quantity: 1,
    price: 39.90,
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    productId: '1',
    rating: 5,
    content: 'Excelente produto! Me ajudou muito nas campanhas do Meta Ads.',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    userId: '1',
    productId: '2',
    rating: 4,
    content: 'Muito bom, estratégias realmente funcionam no TikTok.',
    createdAt: new Date('2024-01-18'),
  },
];