import { 
  mockUsers, 
  mockCategories, 
  mockProducts, 
  mockOrders, 
  mockOrderItems, 
  mockReviews,
  type User,
  type Category,
  type Product,
  type Order,
  type OrderItem,
  type Review
} from './mock-data';

// Simulação de sessão atual (em produção seria do NextAuth)
let currentUser: User | null = null;

export const mockPrisma = {
  // User operations
  user: {
    findMany: async (args?: { where?: any }) => {
      return [...mockUsers];
    },
    
    findUnique: async (args: { where: { id?: string; email?: string } }) => {
      const user = mockUsers.find(u => 
        (args.where.id && u.id === args.where.id) ||
        (args.where.email && u.email === args.where.email)
      );
      return user || null;
    },
    
    findFirst: async (args: { where: { handle?: string; id?: { not: string } } }) => {
      const user = mockUsers.find(u => 
        args.where.handle && u.handle === args.where.handle &&
        args.where.id?.not && u.id !== args.where.id.not
      );
      return user || null;
    },
    
    update: async (args: { where: { id: string }; data: Partial<User> }) => {
      const userIndex = mockUsers.findIndex(u => u.id === args.where.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...args.data };
        return mockUsers[userIndex];
      }
      return null;
    },
  },

  // Category operations
  category: {
    findMany: async (args?: { take?: number; orderBy?: { name: string } }) => {
      let categories = [...mockCategories];
      
      if (args?.orderBy?.name === 'asc') {
        categories.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      if (args?.take) {
        categories = categories.slice(0, args.take);
      }
      
      return categories;
    },
    
    findUnique: async (args: { where: { slug: string } }) => {
      const category = mockCategories.find(c => c.slug === args.where.slug);
      if (category) {
        return {
          ...category,
          products: mockProducts.filter(p => p.categoryId === category.id)
        };
      }
      return null;
    },
  },

  // Product operations
  product: {
    findMany: async (args?: { 
      take?: number; 
      orderBy?: { createdAt: string };
      where?: { categoryId?: string; status?: string; id?: { not: string } }
    }) => {
      let products = [...mockProducts];
      
      if (args?.where?.categoryId) {
        products = products.filter(p => p.categoryId === args.where!.categoryId);
      }
      
      if (args?.where?.status) {
        products = products.filter(p => p.status === args.where!.status);
      }
      
      if (args?.where?.id?.not) {
        products = products.filter(p => p.id !== args.where!.id!.not);
      }
      
      if (args?.orderBy?.createdAt === 'desc') {
        products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }
      
      if (args?.take) {
        products = products.slice(0, args.take);
      }
      
      return products;
    },
    
    findUnique: async (args: { where: { slug: string } }) => {
      const product = mockProducts.find(p => p.slug === args.where.slug);
      if (product) {
        const category = mockCategories.find(c => c.id === product.categoryId);
        const reviews = mockReviews.filter(r => r.productId === product.id);
        return {
          ...product,
          category,
          reviews: reviews.map(r => ({
            ...r,
            user: mockUsers.find(u => u.id === r.userId)
          }))
        };
      }
      return null;
    },
  },

  // Order operations
  order: {
    findMany: async (args: { 
      where: { userId: string };
      include?: { items: { include: { product: boolean } } };
      orderBy: { createdAt: string }
    }) => {
      const userOrders = mockOrders.filter(o => o.userId === args.where.userId);
      
      if (args.orderBy.createdAt === 'desc') {
        userOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }
      
      if (args.include?.items) {
        return userOrders.map(order => ({
          ...order,
          items: mockOrderItems
            .filter(item => item.orderId === order.id)
            .map(item => ({
              ...item,
              product: mockProducts.find(p => p.id === item.productId)
            }))
        }));
      }
      
      return userOrders;
    },
    
    create: async (args: { 
      data: { 
        userId: string; 
        status: string; 
        total: number;
        items: { create: { productId: string; quantity: number; price: number }[] }
      }
    }) => {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        userId: args.data.userId,
        status: args.data.status as 'PENDING' | 'PAID' | 'CANCELLED',
        total: args.data.total,
        createdAt: new Date(),
      };
      
      mockOrders.push(newOrder);
      
      // Criar order items
      args.data.items.create.forEach(itemData => {
        const newOrderItem: OrderItem = {
          id: `item-${Date.now()}-${Math.random()}`,
          orderId: newOrder.id,
          productId: itemData.productId,
          quantity: itemData.quantity,
          price: itemData.price,
        };
        mockOrderItems.push(newOrderItem);
      });
      
      return newOrder;
    },
  },

  // Review operations
  review: {
    findMany: async (args?: { 
      include?: { user: { select: { name: boolean; displayName: boolean } }; product: { select: { title: boolean } } };
      orderBy?: { createdAt: string };
      take?: number;
    }) => {
      let reviews = [...mockReviews];
      
      if (args?.orderBy?.createdAt === 'desc') {
        reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }
      
      if (args?.take) {
        reviews = reviews.slice(0, args.take);
      }
      
      if (args?.include) {
        return reviews.map(review => ({
          ...review,
          user: mockUsers.find(u => u.id === review.userId),
          product: mockProducts.find(p => p.id === review.productId)
        }));
      }
      
      return reviews;
    },
  },
};

// Função para simular autenticação
export const mockAuth = {
  getCurrentUser: (): User | null => {
    // Simular usuário logado - em uma aplicação real, isso viria do localStorage/session
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    if (userId) {
      return mockUsers.find(u => u.id === userId) || null;
    }
    return null;
  },
  
  login: (email: string, password: string): boolean => {
    // Simular login - em uma aplicação real, isso seria uma chamada para a API
    const user = mockUsers.find(u => u.email === email);
    const validPasswords = ['admin123', 'joao123', 'admin1234', 'cliente1234'];
    if (user && validPasswords.includes(password)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userRole', user.role);
      }
      currentUser = user;
      return true;
    }
    return false;
  },
  
  loginWithGoogle: (): boolean => {
    // Simular login com Google
    const user = mockUsers[0]; // Usuário padrão
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userRole', user.role);
    }
    currentUser = user;
    return true;
  },
  
  loginWithDiscord: (): boolean => {
    // Simular login com Discord
    const user = mockUsers[0]; // Usuário padrão
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userRole', user.role);
    }
    currentUser = user;
    return true;
  },
  
  logout: () => {
    // Simular logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
    }
    currentUser = null;
    console.log("User logged out");
  },
};
