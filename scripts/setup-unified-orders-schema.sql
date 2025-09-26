-- Create platform_connections table to store vendor's connected e-commerce platforms
CREATE TABLE IF NOT EXISTS platform_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  platform_type TEXT NOT NULL CHECK (platform_type IN ('shopify', 'etsy', 'amazon', 'woocommerce')),
  platform_store_id TEXT NOT NULL, -- Store ID from the platform
  store_name TEXT NOT NULL,
  access_token TEXT, -- Encrypted access token for API calls
  refresh_token TEXT, -- For platforms that use refresh tokens
  webhook_secret TEXT, -- For webhook verification
  is_active BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN ('pending', 'syncing', 'success', 'error')),
  sync_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(vendor_id, platform_type, platform_store_id)
);

-- Create external_orders table to store orders from external platforms
CREATE TABLE IF NOT EXISTS external_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform_connection_id UUID REFERENCES platform_connections(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  external_order_id TEXT NOT NULL, -- Order ID from the external platform
  external_order_number TEXT NOT NULL, -- Display order number from platform
  platform_type TEXT NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  order_status TEXT NOT NULL,
  payment_status TEXT,
  fulfillment_status TEXT,
  total_amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  tax_amount NUMERIC(10,2) DEFAULT 0,
  shipping_amount NUMERIC(10,2) DEFAULT 0,
  discount_amount NUMERIC(10,2) DEFAULT 0,
  platform_fees NUMERIC(10,2) DEFAULT 0,
  order_date TIMESTAMP WITH TIME ZONE NOT NULL,
  shipped_date TIMESTAMP WITH TIME ZONE,
  delivered_date TIMESTAMP WITH TIME ZONE,
  tracking_number TEXT,
  tracking_url TEXT,
  platform_order_url TEXT, -- Direct link to order on platform
  raw_data JSONB, -- Store complete order data from platform API
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(platform_connection_id, external_order_id)
);

-- Create external_order_items table for line items from external orders
CREATE TABLE IF NOT EXISTS external_order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  external_order_id UUID REFERENCES external_orders(id) ON DELETE CASCADE,
  external_item_id TEXT NOT NULL, -- Item ID from platform
  product_name TEXT NOT NULL,
  product_sku TEXT,
  variant_title TEXT,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  product_image_url TEXT,
  product_url TEXT, -- Link to product on platform
  fulfillment_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sync_logs table to track synchronization activities
CREATE TABLE IF NOT EXISTS sync_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform_connection_id UUID REFERENCES platform_connections(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL CHECK (sync_type IN ('full', 'incremental', 'webhook')),
  status TEXT NOT NULL CHECK (status IN ('started', 'success', 'error')),
  orders_processed INTEGER DEFAULT 0,
  orders_created INTEGER DEFAULT 0,
  orders_updated INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_platform_connections_vendor_id ON platform_connections(vendor_id);
CREATE INDEX IF NOT EXISTS idx_platform_connections_platform_type ON platform_connections(platform_type);
CREATE INDEX IF NOT EXISTS idx_external_orders_vendor_id ON external_orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_external_orders_platform_connection_id ON external_orders(platform_connection_id);
CREATE INDEX IF NOT EXISTS idx_external_orders_order_date ON external_orders(order_date DESC);
CREATE INDEX IF NOT EXISTS idx_external_orders_status ON external_orders(order_status);
CREATE INDEX IF NOT EXISTS idx_external_order_items_external_order_id ON external_order_items(external_order_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_platform_connections_updated_at BEFORE UPDATE ON platform_connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_external_orders_updated_at BEFORE UPDATE ON external_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_external_order_items_updated_at BEFORE UPDATE ON external_order_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO platform_connections (vendor_id, platform_type, platform_store_id, store_name, is_active, last_sync_at, sync_status)
SELECT 
  v.id,
  'shopify',
  'sample-store-' || v.id,
  v.business_name || ' Shopify Store',
  true,
  NOW() - INTERVAL '5 minutes',
  'success'
FROM vendors v
WHERE v.is_verified = true
LIMIT 3
ON CONFLICT (vendor_id, platform_type, platform_store_id) DO NOTHING;

-- Insert sample external orders
INSERT INTO external_orders (
  platform_connection_id, 
  vendor_id, 
  external_order_id, 
  external_order_number,
  platform_type,
  customer_name,
  customer_email,
  order_status,
  payment_status,
  fulfillment_status,
  total_amount,
  order_date,
  platform_order_url
)
SELECT 
  pc.id,
  pc.vendor_id,
  'ext-order-' || generate_random_uuid(),
  '#' || (1000 + (random() * 9000)::int),
  pc.platform_type,
  'Customer ' || (random() * 100)::int,
  'customer' || (random() * 100)::int || '@example.com',
  CASE (random() * 4)::int
    WHEN 0 THEN 'pending'
    WHEN 1 THEN 'processing'
    WHEN 2 THEN 'shipped'
    ELSE 'delivered'
  END,
  CASE (random() * 2)::int
    WHEN 0 THEN 'pending'
    ELSE 'paid'
  END,
  CASE (random() * 3)::int
    WHEN 0 THEN 'unfulfilled'
    WHEN 1 THEN 'partial'
    ELSE 'fulfilled'
  END,
  (50 + random() * 200)::numeric(10,2),
  NOW() - (random() * 30 || ' days')::interval,
  'https://admin.shopify.com/orders/' || generate_random_uuid()
FROM platform_connections pc
WHERE pc.is_active = true;

-- Verification queries
SELECT 'Platform Connections' as table_name, COUNT(*) as count FROM platform_connections
UNION ALL
SELECT 'External Orders' as table_name, COUNT(*) as count FROM external_orders
UNION ALL
SELECT 'External Order Items' as table_name, COUNT(*) as count FROM external_order_items
UNION ALL
SELECT 'Sync Logs' as table_name, COUNT(*) as count FROM sync_logs;

-- Show sample data
SELECT 
  pc.platform_type,
  pc.store_name,
  pc.sync_status,
  COUNT(eo.id) as order_count,
  SUM(eo.total_amount) as total_revenue
FROM platform_connections pc
LEFT JOIN external_orders eo ON pc.id = eo.platform_connection_id
GROUP BY pc.id, pc.platform_type, pc.store_name, pc.sync_status
ORDER BY pc.created_at;
