-- ================================================
-- CONTLY - TRIGGERS E FUNÇÕES
-- Script para criar funções e triggers do sistema
-- ================================================

-- ================================================
-- 1. FUNÇÃO PARA ATUALIZAR ESTOQUE E STATUS DO PRODUTO
-- ================================================
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    -- Quando um item é adicionado a um pedido, atualizar o estoque do produto
    UPDATE products
    SET 
        quantity = quantity - NEW.quantity,
        status = CASE 
            WHEN (quantity - NEW.quantity) <= 0 THEN 'OUT_OF_STOCK'
            ELSE 'AVAILABLE'
        END,
        updated_at = NOW()
    WHERE id = NEW.product_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar estoque quando um item é adicionado
CREATE TRIGGER trigger_update_product_stock
    AFTER INSERT ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_product_stock();

-- ================================================
-- 2. FUNÇÃO PARA VERIFICAR ESTOQUE ANTES DE CRIAR PEDIDO
-- ================================================
CREATE OR REPLACE FUNCTION check_product_availability()
RETURNS TRIGGER AS $$
DECLARE
    v_current_quantity INTEGER;
    v_product_status VARCHAR(20);
BEGIN
    -- Verificar a quantidade atual do produto
    SELECT quantity, status INTO v_current_quantity, v_product_status
    FROM products
    WHERE id = NEW.product_id;
    
    -- Verificar se há estoque disponível
    IF v_current_quantity < NEW.quantity THEN
        RAISE EXCEPTION 'Estoque insuficiente. Disponível: %, Solicitado: %', v_current_quantity, NEW.quantity;
    END IF;
    
    IF v_product_status = 'OUT_OF_STOCK' OR v_product_status = 'INACTIVE' THEN
        RAISE EXCEPTION 'Produto não disponível. Status: %', v_product_status;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para verificar disponibilidade antes de adicionar item
CREATE TRIGGER trigger_check_product_availability
    BEFORE INSERT ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION check_product_availability();

-- ================================================
-- 3. FUNÇÃO PARA ATUALIZAR STATUS DO PRODUTO BASEADO NA QUANTIDADE
-- ================================================
CREATE OR REPLACE FUNCTION sync_product_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualizar status automaticamente baseado na quantidade
    IF NEW.quantity <= 0 THEN
        NEW.status = 'OUT_OF_STOCK';
    ELSIF NEW.status = 'OUT_OF_STOCK' AND NEW.quantity > 0 THEN
        NEW.status = 'AVAILABLE';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para sincronizar status do produto
CREATE TRIGGER trigger_sync_product_status
    BEFORE UPDATE OF quantity, status ON products
    FOR EACH ROW
    EXECUTE FUNCTION sync_product_status();

-- ================================================
-- 4. FUNÇÃO PARA CALCULAR TOTAL DO PEDIDO
-- ================================================
CREATE OR REPLACE FUNCTION calculate_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT COALESCE(SUM(subtotal), 0)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE id = NEW.order_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para calcular total do pedido
CREATE TRIGGER trigger_calculate_order_total
    AFTER INSERT OR UPDATE OR DELETE ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION calculate_order_total();

