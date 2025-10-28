-- ================================================
-- CONTLY - QUERIES ÚTEIS
-- Script com queries úteis para operações do sistema
-- ================================================

-- ================================================
-- 1. QUERIES PARA LOGIN E AUTENTICAÇÃO
-- ================================================

-- Buscar usuário por email
-- SELECT * FROM users WHERE email = 'admin@gmail.com' AND is_active = TRUE;

-- Atualizar último login do usuário
-- UPDATE users SET last_login = NOW() WHERE id = 'user_id';

-- Buscar usuário com informações de login
SELECT id, name, email, role, display_name, is_active, created_at, last_login 
FROM users 
WHERE email = :email AND is_active = TRUE;

-- ================================================
-- 2. QUERIES PARA PRODUTOS
-- ================================================

-- Listar produtos por categoria (mais recentes primeiro)
SELECT * FROM vw_products_details
WHERE category_slug = :category_slug
ORDER BY created_at DESC;

-- Buscar produto específico
SELECT * FROM vw_products_details WHERE slug = :product_slug;

-- Listar produtos disponíveis (home page)
SELECT * FROM vw_products_details 
WHERE status = 'AVAILABLE' 
ORDER BY created_at DESC 
LIMIT :limit;

-- Atualizar quantidade de um produto
-- UPDATE products SET quantity = :new_quantity WHERE id = :product_id;

-- Inativar um produto
-- UPDATE products SET status = 'INACTIVE' WHERE id = :product_id;

-- Reativar um produto
-- UPDATE products SET status = 'AVAILABLE', quantity = :quantity WHERE id = :product_id;

-- ================================================
-- 3. QUERIES PARA MONITORAMENTO DE USUÁRIOS
-- ================================================

-- Listar todos os usuários com estatísticas
SELECT * FROM vw_user_statistics ORDER BY created_at DESC;

-- Buscar usuário específico com detalhes
SELECT * FROM vw_user_statistics WHERE id = :user_id;

-- Listar apenas usuários ativos
SELECT * FROM users WHERE is_active = TRUE ORDER BY created_at DESC;

-- Listar usuários por role
SELECT * FROM users WHERE role = :role AND is_active = TRUE ORDER BY created_at DESC;

-- Estatísticas gerais de usuários
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN role = 'ADMIN' THEN 1 END) as total_admins,
    COUNT(CASE WHEN role = 'USER' THEN 1 END) as total_clients,
    COUNT(CASE WHEN last_login > NOW() - INTERVAL '30 days' THEN 1 END) as active_last_30_days
FROM users
WHERE is_active = TRUE;

-- ================================================
-- 4. QUERIES PARA VENDAS
-- ================================================

-- Buscar vendas recentes
SELECT * FROM vw_recent_sales LIMIT 20;

-- Buscar pedidos de um usuário
SELECT * FROM orders 
WHERE user_id = :user_id 
ORDER BY created_at DESC;

-- Buscar pedido específico com itens
SELECT 
    o.*,
    json_agg(json_build_object(
        'product_title', oi.product_title,
        'quantity', oi.quantity,
        'price', oi.price,
        'subtotal', oi.subtotal
    )) as items
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.id = :order_id
GROUP BY o.id;

-- Relatório de vendas por período
SELECT * FROM vw_financial_report
WHERE date >= :start_date AND date <= :end_date
ORDER BY date DESC;

-- ================================================
-- 5. QUERIES PARA RELATÓRIOS
-- ================================================

-- Relatório de vendas por categoria
SELECT * FROM vw_sales_report_by_category 
WHERE month >= DATE_TRUNC('month', NOW() - INTERVAL '6 months')
ORDER BY month DESC;

-- Produtos mais vendidos
SELECT * FROM vw_best_selling_products LIMIT 20;

-- Alerta de estoque baixo
SELECT * FROM vw_low_stock_alert;

-- Total de vendas no mês
SELECT 
    SUM(total_amount) as monthly_revenue,
    COUNT(*) as monthly_orders
FROM orders
WHERE payment_status = 'PAID'
AND created_at >= DATE_TRUNC('month', NOW())
AND created_at < DATE_TRUNC('month', NOW()) + INTERVAL '1 month';

-- ================================================
-- 6. QUERIES PARA HOME PAGE
-- ================================================

-- Produtos recentes por categoria (para exibir na home)
SELECT * FROM vw_recent_products_by_category;

-- Produtos mais vendidos da semana
SELECT 
    p.title,
    p.slug,
    p.price,
    SUM(oi.quantity) as total_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.payment_status = 'PAID'
AND o.created_at >= NOW() - INTERVAL '7 days'
GROUP BY p.id, p.title, p.slug, p.price
ORDER BY total_sold DESC
LIMIT 8;

-- ================================================
-- 7. QUERIES ADMINISTRATIVAS
-- ================================================

-- Dashboard - Estatísticas gerais
SELECT 
    (SELECT COUNT(*) FROM users WHERE is_active = TRUE) as total_users,
    (SELECT COUNT(*) FROM orders WHERE created_at >= NOW() - INTERVAL '30 days') as recent_orders,
    (SELECT COUNT(*) FROM orders WHERE payment_status = 'PENDING') as pending_orders,
    (SELECT SUM(total_amount) FROM orders WHERE payment_status = 'PAID' AND created_at >= NOW() - INTERVAL '30 days') as monthly_revenue,
    (SELECT COUNT(*) FROM products WHERE status = 'OUT_OF_STOCK') as out_of_stock_products,
    (SELECT COUNT(*) FROM products WHERE status = 'AVAILABLE') as available_products;

-- Listar todos os pedidos com paginação
SELECT * FROM vw_orders_details
ORDER BY created_at DESC
LIMIT :limit OFFSET :offset;

-- Buscar produtos que precisam de reabastecimento
SELECT 
    title,
    quantity,
    category_name
FROM products
WHERE quantity < 3 AND status = 'AVAILABLE'
ORDER BY quantity ASC;

-- ================================================
-- 8. QUERIES DE BUSCA
-- ================================================

-- Buscar produtos por texto (título ou descrição)
SELECT * FROM vw_products_details
WHERE title ILIKE '%' || :search_term || '%'
   OR description ILIKE '%' || :search_term || '%'
ORDER BY created_at DESC;

-- Buscar produtos por faixa de preço
SELECT * FROM vw_products_details
WHERE price BETWEEN :min_price AND :max_price
ORDER BY price DESC;

-- Buscar produtos por categoria e status
SELECT * FROM vw_products_details
WHERE category_slug = :category_slug
AND status = :status
ORDER BY created_at DESC;

