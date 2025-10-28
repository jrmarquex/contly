/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático para GitHub Pages
  output: 'export',
  
  // Desabilitar verificação de tipos no build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Ignorar páginas de API no build estático
  excludeDefaultMomentLocales: true,
  
  // Otimizações de performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  
  // Compressão de imagens
  images: {
    unoptimized: true, // Necessário para export estático
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Compressão gzip
  compress: true,
  
};

module.exports = nextConfig;
