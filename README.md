# 🛍️ Contly - E-commerce de Ativos Digitais

![Contly Logo](./web/public/images/logo.png)

## 📖 Sobre o Projeto

**Contly** é uma plataforma de e-commerce especializada em ativos digitais como contas Meta Ads, TikTok Ads, Google Ads, Proxies e produtos variados. Desenvolvido com Next.js 15, TypeScript e Supabase.

## ✨ Funcionalidades

### 🏠 Frontend
- ✅ Interface moderna com tema dark profissional (Dourado/Amarelo/Preto)
- ✅ Home page com produtos organizados por categoria
- ✅ Sistema de autenticação (Admin e Usuário)
- ✅ Dashboard administrativo completo
- ✅ Gerenciamento de usuários
- ✅ Gestão de produtos com controle de estoque automático
- ✅ Relatórios de vendas
- ✅ Perfil do usuário simplificado
- ✅ Sistema de avaliações

### 🗄️ Banco de Dados (Supabase)
- ✅ Estrutura completa de tabelas
- ✅ Triggers automáticos para controle de estoque
- ✅ Views e relatórios pré-configurados
- ✅ Lógica de esgotamento automático

## 🚀 Tecnologias

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Autenticação:** NextAuth.js
- **Deploy:** GitHub Pages / Vercel

## 📁 Estrutura do Projeto

```
contly/
├── web/                      # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # Pages (App Router)
│   │   ├── components/      # Componentes React
│   │   └── lib/             # Utilitários e serviços
│   ├── public/              # Assets estáticos
│   └── prisma/              # Schema do banco
├── scripts_bd/              # Scripts SQL para Supabase
│   ├── 01_create_tables.sql
│   ├── 02_insert_initial_data.sql
│   ├── 03_triggers_and_functions.sql
│   ├── 04_views_and_reports.sql
│   ├── 05_queries_useful.sql
│   └── README.md
└── README.md

```

## 🛠️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/jrmarquex/contly.git
cd contly
```

### 2. Instale as dependências

```bash
cd web
npm install
```

### 3. Configure o banco de dados (Supabase)

1. Acesse o [Supabase](https://supabase.com) e crie um novo projeto
2. Execute os scripts SQL na ordem:
   - `scripts_bd/01_create_tables.sql`
   - `scripts_bd/02_insert_initial_data.sql`
   - `scripts_bd/03_triggers_and_functions.sql`
   - `scripts_bd/04_views_and_reports.sql`

3. Configure as variáveis de ambiente em `web/.env`:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="http://localhost:3000"
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_KEY="sua-key-aqui"
```

### 4. Configure o Prisma

```bash
cd web
npx prisma generate
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 🔑 Credenciais Padrão

### Administrador
- **Email:** `admin@gmail.com`
- **Senha:** `admin1234`
- **Role:** `ADMIN`

### Cliente Teste
- **Email:** `cliente@gmail.com`
- **Senha:** `cliente1234`
- **Role:** `USER`

⚠️ **IMPORTANTE:** Atualize as senhas com hash bcrypt em produção!

## 📋 Funcionalidades por Perfil

### 👨‍💼 Administrador
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de usuários
- ✅ Cadastro de produtos
- ✅ Monitoramento de vendas
- ✅ Relatórios e análises
- ✅ Controle de estoque

### 👤 Usuário Cliente
- ✅ Visualizar produtos
- ✅ Ver histórico de compras
- ✅ Editar perfil
- ✅ Avaliar produtos

## 🎨 Design

O projeto utiliza um tema dark profissional com alta contraste:
- **Cores principais:** #FFD700 (Dourado), #B8860B (Amarelo Escuro), #000000 (Preto)
- **Efeitos:** Gradientes, blur, hover animations
- **Componentes:** Cards profissionais, botões com efeito glow

## 📊 Banco de Dados

### Tabelas Principais
- `users` - Usuários do sistema
- `categories` - Categorias de produtos
- `products` - Produtos cadastrados
- `orders` - Pedidos realizados
- `order_items` - Itens dos pedidos
- `reviews` - Avaliações de produtos

### Funcionalidades Automáticas
- ✅ **Controle de estoque:** Quando um produto com 1 unidade é vendido, é automaticamente marcado como esgotado
- ✅ **Cálculo de total:** O total do pedido é calculado automaticamente
- ✅ **Atualização de status:** Status do produto sincronizado com quantidade em estoque

## 🌐 Deploy

### GitHub Pages
Para deploy em produção, recomendamos usar Vercel que tem suporte nativo para Next.js:

1. Importe o projeto no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Alternativa: Netlify
```bash
npm run build
# Deploy build/ para Netlify
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Prisma
npx prisma generate
npx prisma db push
npx prisma studio
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**jrmarquex**

- GitHub: [@jrmarquex](https://github.com/jrmarquex)
- Repositório: [contly](https://github.com/jrmarquex/contly)

## 🙏 Agradecimentos

- Next.js Team
- Supabase Team
- Tailwind CSS
- Comunidade open source

---

⭐ Se este projeto foi útil para você, não esqueça de deixar uma estrela!

