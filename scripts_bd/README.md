# Scripts de Banco de Dados - Contly

Este diretório contém todos os scripts SQL necessários para configurar o banco de dados Supabase do sistema Contly.

## 📋 Índice dos Scripts

### 1. `01_create_tables.sql`
Script principal para criar todas as tabelas do sistema:
- **categories** - Categorias de produtos
- **users** - Usuários do sistema
- **products** - Produtos cadastrados
- **orders** - Pedidos realizados
- **order_items** - Itens dos pedidos
- **reviews** - Avaliações de produtos

### 2. `02_insert_initial_data.sql`
Script para popular o banco com dados iniciais:
- Categorias padrão (Meta Ads, TikTok Ads, Google Ads, Proxys, Variados)
- Usuário administrador padrão
- Usuário cliente de teste
- Produtos de exemplo

### 3. `03_triggers_and_functions.sql`
Script com triggers e funções automáticas:
- **update_product_stock()** - Atualiza estoque automaticamente quando um produto é vendido
- **check_product_availability()** - Verifica disponibilidade antes de criar pedido
- **sync_product_status()** - Sincroniza status do produto baseado na quantidade
- **calculate_order_total()** - Calcula total do pedido automaticamente

### 4. `04_views_and_reports.sql`
Script com views e relatórios:
- **vw_products_details** - Detalhes completos de produtos
- **vw_products_by_category** - Produtos agrupados por categoria
- **vw_orders_details** - Detalhes completos de pedidos
- **vw_recent_sales** - Vendas recentes
- **vw_sales_report_by_category** - Relatório de vendas por categoria
- **vw_user_statistics** - Estatísticas de usuários
- **vw_best_selling_products** - Produtos mais vendidos
- **vw_low_stock_alert** - Alerta de estoque baixo
- **vw_financial_report** - Relatório financeiro
- **vw_recent_products_by_category** - Produtos recentes por categoria (HOME)

### 5. `05_queries_useful.sql`
Script com queries úteis documentadas para uso no código:
- Queries de autenticação
- Queries de produtos
- Queries de monitoramento de usuários
- Queries de vendas
- Queries de relatórios
- Queries da home page
- Queries administrativas
- Queries de busca

## 🚀 Como Usar

### Execução no Supabase

1. **Acesse o Supabase Dashboard**
   - Faça login no seu projeto

2. **Execute os scripts na ordem:**
   ```sql
   -- 1. Criar tabelas
   -- Execute o conteúdo de: 01_create_tables.sql
   
   -- 2. Inserir dados iniciais
   -- Execute o conteúdo de: 02_insert_initial_data.sql
   
   -- 3. Criar triggers e funções
   -- Execute o conteúdo de: 03_triggers_and_functions.sql
   
   -- 4. Criar views e relatórios
   -- Execute o conteúdo de: 04_views_and_reports.sql
   ```

3. **Salve as queries úteis:**
   - O arquivo `05_queries_useful.sql` contém exemplos de queries que podem ser usadas no código

## 🔑 Funcionalidades Implementadas

### ✅ Login e Autenticação
- Tabela de usuários com roles (ADMIN/USER)
- Controle de sessão e último login
- Usuários ativos/inativos

### ✅ Cadastro de Produtos
- CRUD completo de produtos
- Vinculação com categorias
- Controle de estoque e status

### ✅ Monitoramento de Usuários
- Estatísticas por usuário
- Histórico de pedidos
- Último acesso
- Relatório de usuários ativos

### ✅ Vendas Recentes
- View de vendas recentes
- Detalhes completos dos pedidos
- Filtros por período

### ✅ Relatórios de Vendas
- Relatório por categoria
- Relatório financeiro
- Análise de produtos mais vendidos
- Relatório de estoque

### ✅ Inativação de Produtos
- Campo status com opções: AVAILABLE, OUT_OF_STOCK, INACTIVE
- Trigger para marcar como esgotado quando quantidade = 0

### ✅ Lógica de Estoque Automática
- **Produto com 1 unidade vendido → Automático marcado como esgotado**
- Trigger `update_product_stock()` atualiza estoque na venda
- Status sincronizado automaticamente com quantidade

### ✅ Produtos por Categoria na Home
- View `vw_recent_products_by_category` retorna últimos 8 produtos de cada categoria
- Ordenação por data de criação (mais recentes primeiro)
- Agrupamento automático por categoria

## 📊 Estructura das Tabelas

### Users
```sql
- id (UUID)
- name, email, password
- role (USER/ADMIN)
- display_name, avatar_url
- phone, cpf
- is_active, created_at, last_login
```

### Products
```sql
- id (UUID)
- title, slug, description
- price, compare_at_price
- category_id, category_name
- quantity, status
- payment_link, admin_notes
- created_at, updated_at
```

### Orders
```sql
- id (UUID)
- user_id
- total_amount
- payment_method, payment_status
- status
- customer info
- created_at, updated_at
```

### Order_Items
```sql
- id (UUID)
- order_id, product_id
- product_title, quantity, price, subtotal
- created_at
```

## 🔐 Credenciais Padrão

### Administrador
- Email: `admin@gmail.com`
- Senha: `admin1234`
- Role: `ADMIN`

### Cliente Teste
- Email: `cliente@gmail.com`
- Senha: `cliente1234`
- Role: `USER`

**⚠️ IMPORTANTE:** Atualize as senhas com hash bcrypt antes de usar em produção!

## 📝 Notas Importantes

1. **Triggers Automáticos:**
   - Quando um pedido é criado, o estoque é atualizado automaticamente
   - Se quantidade chegar a 0, status muda para OUT_OF_STOCK
   - O total do pedido é calculado automaticamente

2. **Views:**
   - As views são atualizadas automaticamente com as consultas
   - Use views para relatórios e dashboards

3. **Segurança:**
   - Use RLS (Row Level Security) no Supabase
   - Configure políticas adequadas para cada tabela

4. **Performance:**
   - Índices foram criados nas colunas mais consultadas
   - Views otimizadas para relatórios

## 🛠️ Próximos Passos

1. Configurar Row Level Security (RLS)
2. Criar políticas de segurança
3. Atualizar senhas com hash bcrypt
4. Configurar autenticação no Supabase
5. Integrar com o frontend Next.js

