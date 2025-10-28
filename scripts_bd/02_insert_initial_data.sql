-- ================================================
-- CONTLY - DADOS INICIAIS
-- Script para popular o banco com dados iniciais
-- ================================================

-- ================================================
-- 1. INSERIR CATEGORIAS
-- ================================================
INSERT INTO categories (id, name, slug, description) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Meta Ads', 'meta-ads', 'Produtos relacionados ao Facebook Meta Ads'),
('550e8400-e29b-41d4-a716-446655440002', 'TikTok Ads', 'tiktok-ads', 'Produtos relacionados ao TikTok Ads'),
('550e8400-e29b-41d4-a716-446655440003', 'Google Ads', 'google-ads', 'Produtos relacionados ao Google Ads'),
('550e8400-e29b-41d4-a716-446655440004', 'Proxys', 'proxy', 'Produtos de Proxy'),
('550e8400-e29b-41d4-a716-446655440005', 'Variados', 'variados', 'Produtos diversos')
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- 2. INSERIR USUÁRIO ADMIN (senha: admin1234)
-- ================================================
INSERT INTO users (id, name, email, password, role, display_name, is_active) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Administrador', 'admin@gmail.com', '$2b$10$YourHashedPasswordHere', 'ADMIN', 'admin', TRUE)
ON CONFLICT (email) DO NOTHING;

-- ================================================
-- 3. INSERIR USUÁRIO CLIENTE (senha: cliente1234)
-- ================================================
INSERT INTO users (id, name, email, password, role, display_name, is_active) VALUES
('660e8400-e29b-41d4-a716-446655440002', 'Cliente Teste', 'cliente@gmail.com', '$2b$10$YourHashedPasswordHere', 'USER', 'cliente', TRUE)
ON CONFLICT (email) DO NOTHING;

-- ================================================
-- 4. INSERIR PRODUTOS DE EXEMPLO
-- ================================================

-- Meta Ads
INSERT INTO products (id, title, slug, description, price, compare_atPrice, category_id, category_name, quantity, status) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'PERFIL BR ANTIGO AQUECIDO + BM VERIFICADA + PAGINA...', 'perfil-br-antigo-aquecido-bm-verificada', 'Conta matriz Meta Ads com perfil antigo aquecido', 247.90, 260.05, '550e8400-e29b-41d4-a716-446655440001', 'Meta Ads', 5, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440002', 'BM NOVA BRASILEIRA R$250 LIMITE DIÁRIO', 'bm-nova-brasileira-limite-diario', 'Conta Meta Ads nova brasileira com limite diário', 79.90, 97.44, '550e8400-e29b-41d4-a716-446655440001', 'Meta Ads', 3, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440003', 'BM VERIFICADA EMPRESA BR (API WHATSAPP)', 'bm-verificada-empresa-br', 'Conta verificada com API WhatsApp', 347.90, 382.37, '550e8400-e29b-41d4-a716-446655440001', 'Meta Ads', 1, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440004', 'PERFIL 1-3 CONTAS DE ANUNCIO LIMITE R$1.334...', 'perfil-1-3-contas-anuncio', 'Perfil com 1-3 contas de anúncio', 114.00, 120.66, '550e8400-e29b-41d4-a716-446655440001', 'Meta Ads', 0, 'OUT_OF_STOCK')
ON CONFLICT (slug) DO NOTHING;

-- TikTok Ads
INSERT INTO products (id, title, slug, description, price, compare_at_price, category_id, category_name, quantity, status) VALUES
('770e8400-e29b-41d4-a716-446655440005', 'CONTA TIKTOK SHOP ATIVADO - 2K-10K DE SEGUIDORES', 'conta-tiktok-shop-ativado', 'Conta TikTok Shop com seguidores reais', 399.00, 463.05, '550e8400-e29b-41d4-a716-446655440002', 'TikTok Ads', 2, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440006', 'CONTA ESTADOS UNIDOS TIKTOK ADS COM 1 BC...', 'conta-estados-unidos-tiktok-ads', 'Conta TikTok Ads dos Estados Unidos', 317.00, 450.42, '550e8400-e29b-41d4-a716-446655440002', 'TikTok Ads', 1, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440007', 'CONTA MATRIZ TIKTOK ADS', 'conta-matriz-tiktok-ads', 'Conta matriz TikTok Ads', 147.00, 170.27, '550e8400-e29b-41d4-a716-446655440002', 'TikTok Ads', 0, 'OUT_OF_STOCK')
ON CONFLICT (slug) DO NOTHING;

-- Google Ads
INSERT INTO products (id, title, slug, description, price, compare_at_price, category_id, category_name, quantity, status) VALUES
('770e8400-e29b-41d4-a716-446655440008', 'CONTA GOOGLE ADS VERIFICADA CNPJ', 'conta-google-ads-verificada-cnpj', 'Conta Google Ads verificada com CNPJ', 199.90, 227.18, '550e8400-e29b-41d4-a716-446655440003', 'Google Ads', 4, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440009', 'CONTA GOOGLE ADS BÁSICA', 'conta-google-ads-basica', 'Conta Google Ads básica', 109.90, 137.38, '550e8400-e29b-41d4-a716-446655440003', 'Google Ads', 3, 'AVAILABLE')
ON CONFLICT (slug) DO NOTHING;

-- Proxys
INSERT INTO products (id, title, slug, description, price, compare_at_price, category_id, category_name, quantity, status) VALUES
('770e8400-e29b-41d4-a716-446655440010', 'COMBO 5X PROXY ESTÁTICA RESIDENCIAL', 'combo-5x-proxy-estatica', 'Combo com 5 proxies estáticas residenciais', 80.00, 103.00, '550e8400-e29b-41d4-a716-446655440004', 'Proxys', 10, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440011', 'COMBO 5X PROXY SERVER', 'combo-5x-proxy-server', 'Combo com 5 proxies de servidor', 42.00, 53.18, '550e8400-e29b-41d4-a716-446655440004', 'Proxys', 15, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440012', 'PROXY SERVER', 'proxy-server', 'Proxy de servidor individual', 10.00, 12.20, '550e8400-e29b-41d4-a716-446655440004', 'Proxys', 20, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440013', 'PROXY ESTÁTICA RESIDENCIAL', 'proxy-estatica-residencial', 'Proxy estática residencial individual', 20.00, 22.78, '550e8400-e29b-41d4-a716-446655440004', 'Proxys', 25, 'AVAILABLE')
ON CONFLICT (slug) DO NOTHING;

-- Variados
INSERT INTO products (id, title, slug, description, price, compare_at_price, category_id, category_name, quantity, status) VALUES
('770e8400-e29b-41d4-a716-446655440014', 'CHIP SEMI AQUECIDO WHATSAPP', 'chip-semi-aquecido-whatsapp', 'Chip semi aquecido para WhatsApp', 49.90, 58.02, '550e8400-e29b-41d4-a716-446655440005', 'Variados', 0, 'OUT_OF_STOCK'),
('770e8400-e29b-41d4-a716-446655440015', 'PERFIL REAL 2023 TIKTOK COM 100 SEGUIDORES BRASILEIROS', 'perfil-real-tiktok-100-seguidores', 'Perfil TikTok real com seguidores brasileiros', 39.90, 42.00, '550e8400-e29b-41d4-a716-446655440005', 'Variados', 1, 'AVAILABLE'),
('770e8400-e29b-41d4-a716-446655440016', 'CHIP AQUECIDO WHATSAPP', 'chip-aquecido-whatsapp', 'Chip aquecido para WhatsApp', 177.00, 207.74, '550e8400-e29b-41d4-a716-446655440005', 'Variados', 0, 'OUT_OF_STOCK'),
('770e8400-e29b-41d4-a716-446655440017', 'CONTA INSTAGRAM ANTIGA 2013', 'conta-instagram-antiga-2013', 'Conta Instagram antiga de 2013', 39.00, 48.16, '550e8400-e29b-41d4-a716-446655440005', 'Variados', 2, 'AVAILABLE')
ON CONFLICT (slug) DO NOTHING;

