-- Seed data for TEST company (vendor_id: 7287217a-361f-4624-8c2a-0fee89406ecf)
-- User: Angela Purcell (919fdcda-65ab-4136-b363-a16b81a6c44c)

-- First, let's create some categories if they don't exist
INSERT INTO categories (name, description, slug) VALUES
  ('Electronics', 'Electronic devices and accessories', 'electronics'),
  ('Clothing', 'Fashion and apparel', 'clothing'),
  ('Home & Garden', 'Home improvement and garden supplies', 'home-garden'),
  ('Sports & Outdoors', 'Sports equipment and outdoor gear', 'sports-outdoors'),
  ('Books', 'Books and educational materials', 'books')
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for reference
WITH category_ids AS (
  SELECT 
    id as electronics_id,
    (SELECT id FROM categories WHERE slug = 'clothing') as clothing_id,
    (SELECT id FROM categories WHERE slug = 'home-garden') as home_garden_id,
    (SELECT id FROM categories WHERE slug = 'sports-outdoors') as sports_id,
    (SELECT id FROM categories WHERE slug = 'books') as books_id
  FROM categories WHERE slug = 'electronics'
)

-- Insert test products for the TEST company
INSERT INTO products (
  vendor_id,
  category_id,
  name,
  description,
  price,
  inventory_quantity,
  sku,
  featured_image_url,
  is_active,
  weight,
  dimensions
) VALUES
  -- Electronics
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT electronics_id FROM category_ids),
    'Wireless Bluetooth Headphones',
    'Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    149.99,
    25,
    'TEST-WBH-001',
    '/placeholder.svg?height=400&width=400',
    true,
    0.5,
    '{"length": 8, "width": 7, "height": 3}'
  ),
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT electronics_id FROM category_ids),
    'Smart Phone Stand',
    'Adjustable aluminum phone stand compatible with all smartphones and tablets. Sleek design for desk or bedside use.',
    29.99,
    50,
    'TEST-SPS-002',
    '/placeholder.svg?height=400&width=400',
    true,
    0.3,
    '{"length": 6, "width": 4, "height": 2}'
  ),
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT electronics_id FROM category_ids),
    'USB-C Fast Charging Cable',
    'Durable braided USB-C cable with fast charging support. 6ft length perfect for home, office, or travel use.',
    19.99,
    100,
    'TEST-UCC-003',
    '/placeholder.svg?height=400&width=400',
    true,
    0.1,
    '{"length": 72, "width": 1, "height": 1}'
  ),
  
  -- Clothing
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT clothing_id FROM category_ids),
    'Premium Cotton T-Shirt',
    'Soft, comfortable 100% organic cotton t-shirt. Available in multiple colors and sizes. Perfect for everyday wear.',
    24.99,
    75,
    'TEST-PCT-004',
    '/placeholder.svg?height=400&width=400',
    true,
    0.2,
    '{"length": 28, "width": 20, "height": 1}'
  ),
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT clothing_id FROM category_ids),
    'Denim Jacket',
    'Classic blue denim jacket with modern fit. Made from sustainable denim with vintage wash finish.',
    79.99,
    30,
    'TEST-DJ-005',
    '/placeholder.svg?height=400&width=400',
    true,
    1.2,
    '{"length": 26, "width": 22, "height": 2}'
  ),
  
  -- Home & Garden
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT home_garden_id FROM category_ids),
    'Ceramic Plant Pot Set',
    'Beautiful set of 3 ceramic plant pots with drainage holes. Perfect for indoor plants and herbs. Includes saucers.',
    39.99,
    40,
    'TEST-CPP-006',
    '/placeholder.svg?height=400&width=400',
    true,
    2.5,
    '{"length": 8, "width": 8, "height": 6}'
  ),
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT home_garden_id FROM category_ids),
    'LED Desk Lamp',
    'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
    59.99,
    20,
    'TEST-LDL-007',
    '/placeholder.svg?height=400&width=400',
    true,
    1.8,
    '{"length": 12, "width": 8, "height": 18}'
  ),
  
  -- Sports & Outdoors
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT sports_id FROM category_ids),
    'Yoga Mat Premium',
    'Non-slip premium yoga mat with extra cushioning. Eco-friendly materials, perfect for yoga, pilates, and fitness.',
    49.99,
    35,
    'TEST-YMP-008',
    '/placeholder.svg?height=400&width=400',
    true,
    2.0,
    '{"length": 72, "width": 24, "height": 0.5}'
  ),
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT sports_id FROM category_ids),
    'Water Bottle Insulated',
    'Stainless steel insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. 32oz capacity.',
    34.99,
    60,
    'TEST-WBI-009',
    '/placeholder.svg?height=400&width=400',
    true,
    0.8,
    '{"length": 10, "width": 3, "height": 3}'
  ),
  
  -- Books
  (
    '7287217a-361f-4624-8c2a-0fee89406ecf',
    (SELECT books_id FROM category_ids),
    'Business Strategy Guide',
    'Comprehensive guide to modern business strategy and entrepreneurship. Written by industry experts with real-world examples.',
    29.99,
    45,
    'TEST-BSG-010',
    '/placeholder.svg?height=400&width=400',
    true,
    0.6,
    '{"length": 9, "width": 6, "height": 1}'
  );

-- Add some product images for variety
INSERT INTO product_images (product_id, image_url, alt_text, display_order) 
SELECT 
  p.id,
  '/placeholder.svg?height=400&width=400&query=' || LOWER(REPLACE(p.name, ' ', '+')) || '+detail',
  p.name || ' - Detail View',
  2
FROM products p 
WHERE p.vendor_id = '7287217a-361f-4624-8c2a-0fee89406ecf'
AND p.sku LIKE 'TEST-%';

-- Create some sample orders for testing
INSERT INTO orders (
  customer_id,
  order_number,
  status,
  payment_status,
  subtotal,
  tax_amount,
  shipping_amount,
  total_amount,
  shipping_address,
  billing_address,
  created_at
) VALUES
  (
    '919fdcda-65ab-4136-b363-a16b81a6c44c', -- Using the same user as customer for testing
    'ORD-TEST-001',
    'completed',
    'paid',
    149.99,
    12.00,
    9.99,
    171.98,
    '{"firstName": "Test", "lastName": "Customer", "address": "123 Test St", "city": "Test City", "state": "CA", "zipCode": "12345", "country": "US"}',
    '{"firstName": "Test", "lastName": "Customer", "address": "123 Test St", "city": "Test City", "state": "CA", "zipCode": "12345", "country": "US"}',
    NOW() - INTERVAL '5 days'
  ),
  (
    '919fdcda-65ab-4136-b363-a16b81a6c44c',
    'ORD-TEST-002',
    'processing',
    'paid',
    89.98,
    7.20,
    0.00,
    97.18,
    '{"firstName": "Test", "lastName": "Customer", "address": "123 Test St", "city": "Test City", "state": "CA", "zipCode": "12345", "country": "US"}',
    '{"firstName": "Test", "lastName": "Customer", "address": "123 Test St", "city": "Test City", "state": "CA", "zipCode": "12345", "country": "US"}',
    NOW() - INTERVAL '2 days'
  );

-- Create order items for the test orders
INSERT INTO order_items (
  order_id,
  product_id,
  vendor_id,
  quantity,
  unit_price,
  total_price
) 
SELECT 
  o.id,
  p.id,
  '7287217a-361f-4624-8c2a-0fee89406ecf',
  1,
  p.price,
  p.price
FROM orders o
CROSS JOIN products p
WHERE o.order_number = 'ORD-TEST-001' 
AND p.sku = 'TEST-WBH-001'

UNION ALL

SELECT 
  o.id,
  p.id,
  '7287217a-361f-4624-8c2a-0fee89406ecf',
  2,
  p.price,
  p.price * 2
FROM orders o
CROSS JOIN products p
WHERE o.order_number = 'ORD-TEST-002' 
AND p.sku = 'TEST-PCT-004'

UNION ALL

SELECT 
  o.id,
  p.id,
  '7287217a-361f-4624-8c2a-0fee89406ecf',
  1,
  p.price,
  p.price
FROM orders o
CROSS JOIN products p
WHERE o.order_number = 'ORD-TEST-002' 
AND p.sku = 'TEST-SPS-002';

-- Add the vendor owner to team_members (this should happen automatically via trigger, but let's ensure it)
INSERT INTO team_members (
  vendor_id,
  user_id,
  role,
  permissions,
  joined_at
) VALUES (
  '7287217a-361f-4624-8c2a-0fee89406ecf',
  '919fdcda-65ab-4136-b363-a16b81a6c44c',
  'owner',
  '{"view_orders": true, "manage_products": true, "manage_team": true}',
  NOW()
) ON CONFLICT (vendor_id, user_id) DO NOTHING;

-- Update vendor business information
UPDATE vendors 
SET 
  business_description = 'TEST is a premium retailer offering high-quality products across electronics, clothing, home goods, sports equipment, and books. We focus on sustainable and innovative products that enhance our customers'' daily lives.',
  business_address = '123 Business Ave, Suite 100',
  business_phone = '+1 (555) 123-4567',
  business_email = 'contact@testbusiness.com',
  business_city = 'San Francisco',
  business_state = 'CA',
  business_zip_code = '94105',
  business_country = 'US',
  business_url = 'https://testbusiness.com',
  updated_at = NOW()
WHERE id = '7287217a-361f-4624-8c2a-0fee89406ecf';
