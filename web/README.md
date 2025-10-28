# Plataforma "A definir" - E-commerce de Ativos Digitais

E-commerce de ativos digitais com tema escuro e acentos de dinheiro, desenvolvido com Next.js 14, TypeScript, Tailwind CSS, Prisma e Supabase.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **Supabase Postgres**
- **NextAuth** (Google, Discord + Admin local)
- **Lucide React** (ícones)

## 🎨 Tema

- **Fundo**: #0B0B0B (preto)
- **Texto**: #F5F5F5 / #A3A3A3
- **Primário**: #22C55E (verde dinheiro)
- **Secundário**: #F59E0B (dourado)

## 📋 Funcionalidades

- ✅ Home com hero + vídeo (autoplay mudo)
- ✅ Categorias populares: Meta Ads, TikTok Ads, Google Ads, Proxys
- ✅ Cards com preço atual, anterior tachado, % desconto, "À vista no Pix"
- ✅ Badge "Esgotado" com overlay
- ✅ Suporte via WhatsApp
- ✅ Área logada: Meu Perfil, Meus Pedidos
- ✅ Páginas estáticas: Termos de Uso, Termos e Serviços, Garantia
- ✅ Ação "Comprar agora" cria Order PENDING e redireciona para /pedidos

## 🛠️ Instalação

1. **Clone e configure o ambiente:**
   ```bash
   cp .env.example .env
   # Preencha as credenciais no arquivo .env
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

4. **Popule o banco com dados iniciais:**
   ```bash
   npm run prisma:seed
   ```

5. **Execute o projeto:**
   ```bash
   npm run dev
   ```

## 🔧 Configuração

### Variáveis de Ambiente Necessárias

```env
# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-forte
COMPANY_NAME="A definir"
COMPANY_CNPJ="00.000.000/0000-00"
SUPPORT_WHATSAPP_NUMBER=5599999999999

# Admin local (desenvolvimento)
ADMIN_EMAIL=admin@adefinir.com
ADMIN_PASSWORD=trocar-esta-senha

# Supabase
DATABASE_URL="postgresql://postgres:PASSWORD@DB_HOST:5432/postgres?sslmode=require"
DIRECT_URL="postgresql://postgres:PASSWORD@DB_HOST:5432/postgres?sslmode=require"
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# OAuth
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
DISCORD_CLIENT_ID=seu-discord-client-id
DISCORD_CLIENT_SECRET=seu-discord-client-secret
```

### Configuração OAuth

**Google:**
- Acesse [Google Cloud Console](https://console.cloud.google.com/)
- Crie um projeto e habilite Google+ API
- Configure URIs de redirecionamento:
  - `http://localhost:3000/api/auth/callback/google`
  - `https://seudominio.com/api/auth/callback/google`

**Discord:**
- Acesse [Discord Developer Portal](https://discord.com/developers/applications)
- Crie uma aplicação
- Configure URIs de redirecionamento:
  - `http://localhost:3000/api/auth/callback/discord`
  - `https://seudominio.com/api/auth/callback/discord`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   ├── categorias/[slug]/ # Páginas de categoria
│   ├── produto/[slug]/    # Páginas de produto
│   ├── perfil/           # Área do usuário
│   ├── pedidos/          # Lista de pedidos
│   └── ...               # Outras páginas
├── components/           # Componentes React
├── lib/                  # Utilitários e configurações
└── middleware.ts         # Middleware de autenticação

prisma/
├── schema.prisma         # Schema do banco
└── seed.ts              # Dados iniciais
```

## 🗄️ Banco de Dados

O projeto usa Prisma com Supabase Postgres. O schema inclui:

- **User**: Usuários (NextAuth + campos customizados)
- **Account/Session**: Sessões NextAuth
- **Product**: Produtos com preços e status
- **Category**: Categorias de produtos
- **Order/OrderItem**: Pedidos e itens
- **Review**: Avaliações de produtos

## 🎯 Rotas Principais

- `/` - Home com hero e produtos
- `/categorias/[slug]` - Listagem por categoria
- `/produto/[slug]` - Página do produto
- `/perfil` - Perfil do usuário (protegida)
- `/pedidos` - Pedidos do usuário (protegida)
- `/suporte` - Link para WhatsApp
- `/avaliacoes` - Lista de avaliações
- `/termos-*` - Páginas estáticas

## 🔐 Autenticação

- **Google OAuth**: Login com Google
- **Discord OAuth**: Login com Discord
- **Admin Local**: Login de desenvolvimento (email/senha)
- **Middleware**: Proteção automática de rotas

## 💰 Fluxo de Compra

1. Usuário clica "Comprar agora"
2. Sistema cria Order com status PENDING
3. Redireciona para `/pedidos`
4. Pagamento real não implementado (apenas modelo)

## 📱 Responsividade

Layout totalmente responsivo com Tailwind CSS:
- Mobile-first design
- Breakpoints: sm, md, lg, xl
- Grid adaptativo para produtos e categorias

## 🚀 Deploy

Para produção, configure:

1. **Variáveis de ambiente** com valores reais
2. **URIs OAuth** para o domínio de produção
3. **Supabase** com SSL habilitado
4. **NEXTAUTH_SECRET** forte e único

## 📞 Suporte

Para suporte técnico, entre em contato via WhatsApp através da página `/suporte`.

---

Desenvolvido com ❤️ usando Next.js 14 e tecnologias modernas.