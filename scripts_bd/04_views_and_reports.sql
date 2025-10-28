-- ================================================
-- CONTLY - VIEWS E RELATÓRIOS
-- Script para criar views e queries de relatórios
-- ================================================

-- ================================================
-- 1. VIEW DE PRODUTOS COM DETALHES
-- ================================================
CREATE OR REPLACE VIEW vw_products_details AS
SELECT 
    p.id,
    p.title,
    p.slug,
    p.description,
    p.price,
    p.compare_at_price,
    p.quantity,
    p.status,
    p.payment_link,
    p.created_at,
    p.updated_at,
    c.id as category_id,
    c.name as category_name,
    c.slug as category_slug,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as review_count
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN reviews r ON p.id = r.product_id
WHERE p.status != 'INACTIVE'
GROUP BY p.id, c.id, c.name, c.slug;

-- ================================================
-- 2. VIEW DE PRODUTOS POR CATEGORIA (MAIS RECENTES)
-- ================================================
CREATE OR REPLACE VIEW vw_products_by_category AS
SELECT 
    p.*,
    c.name as category_name,
    c.slug as category_slug,
    ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY p.created_at DESC) as category_rank
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.status = 'AVAILABLE'
ORDER BY c.name, p.created_at DESC;

-- ================================================
-- 3. VIEW DE PEDIDOS COM DETALHES
-- ================================================
CREATE OR REPLACE VIEW vw_orders_details AS
SELECT 
    o.id,
    o.user_id,
    u.name as user_name,
    u.email as user_email,
    o.total_amount,
    o.payment_method,
    o.payment_status,
    o.status,
    o.customer_name,
    o.customer_email,
    o.customer_phone,
    o.notes,
    o.created_at,
    o.updated_at,
    COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, u.name, u.email;

-- ================================================
-- 4. VIEW DE VENDAS RECENTES
-- ================================================
CREATE OR REPLACE VIEW vw_recent_sales AS
SELECT 
    o.id as order_id,
    o.created_at as sale_date,
    o.total_amount,
    o.payment_method,
    o.status,
    COUNT(oi.id) as product_count,
    STRING_AGG(oi.product_title, ', ') as products
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.payment_status = 'PAID'
GROUP BY o.id, o.created_at, o.total_amount, o.payment_method, o.status
ORDER BY o.created_at DESC
LIMIT 50;

-- ================================================
-- 5. VIEW DE RELATÓRIO DE VENDAS (POR CATEGORIA)
-- ================================================
CREATE OR REPLACE VIEW vw_sales_report_by_category AS
SELECT 
    c.name as category_name,
    COUNT(DISTINCT o.id) as total_orders,
    COUNT(oi.id) as total_items,
    SUM(oi.subtotal) as total_revenue,
    AVG(oi.price) as average_price,
    DATE_TRUNC('month', o.created_at) as month
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
WHERE o.payment_status = 'PAID'
GROUP BY c.name, DATE_TRUNC('month', o.created_at)
ORDER BY month DESC, total_revenue DESC;

-- ================================================
-- 6. VIEW DE ESTATÍSTICAS DE USUÁRIOS
-- ================================================
CREATE OR REPLACE VIEW vw_user_statistics AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.role,
    u.created_at as user_since,
    u.last_login,
    COUNT(DISTINCT o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.payment_status = 'PAID'
WHERE u.is_active = TRUE
GROUP BY u.id, u.name, u.email, u.role, u.created_at, u.last_login;

-- ================================================
-- 7. VIEW DE PRODUTOS MAIS VENDIDOS
-- ================================================
CREATE OR REPLACE VIEW vw_best_selling_products AS
SELECT 
    p.id,
    p.title,
    p.slug,
    p.price,
    c.name as category_name,
    SUM(oi.quantity) as total_sold,
    SUM(oi.subtotal) as total_revenue,
    COUNT(DISTINCT oi.order_id) as order_count
FROM products p
    JOIN categories c ON p.category_id = c.id
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.payment_status = 'PAID'
GROUP BY p.id, p.title, p.slug, p.price, c.name
ORDER BY total_sold DESC, total_revenue DESC;

-- ================================================
-- 8. VIEW DE ESTOQUE BAIXO (ALERTAS)
-- ================================================
CREATE OR REPLACE VIEW vw_low_stock_alert AS
SELECT 
    id,
    title,
    slug,
    quantity,
    status,
    category_name,
    created_at,
    updated_at
FROM products
WHERE quantity <= 5 AND status = 'AVAILABLE'
ORDER BY quantity ASC, updated_at DESC;

-- ================================================
-- 9. VIEW DE RELATÓRIO FINANCEIRO
-- ================================================
CREATE OR REPLACE VIEW vw_financial_report AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as total_orders,
    SUM(CASE WHEN payment_status = 'PAID' THEN 1 ELSE 0 END) as paid_orders,
    SUM(CASE WHEN payment_status = 'PENDING' THEN 1 ELSE 0 END) as pending_orders,
    SUM(CASE WHEN payment_status = 'PAID' THEN total_amount ELSE 0 END) as total_revenue,
    AVG(CASE WHEN payment_status = 'PAID' THEN total_amount END) as average_order_value
FROM orders
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- ================================================
-- 10. VIEW DE PRODUTOS RECENTES POR CATEGORIA
-- (USADA NA TELA INICIAL - ÚLTIMOS 8 PRODUTOS POR CATEGORIA)
-- ================================================
CREATE OR REPLACE VIEW vw_recent_products_by_category AS
SELECT 
    c.id as category_id,
    c.name as category_name,
    c.slug as category_slug,
    p.id as product_id,
    p.title,
    p.slug,
    p.description,
    p.price,
    p.compare_at_price,
    p.quantity,
    p.status,
    p.created_at
FROM categories c
JOIN LATERAL (
    SELECT *
    FROM products
    WHERE category_id = c.id 
    AND status = 'AVAILABLE'
    ORDER BY created_at DESC
    LIMIT 8
) p ON true
ORDER BY c.name, p.created_at DESC;

