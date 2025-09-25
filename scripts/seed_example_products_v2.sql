-- Seed example products for MOMM marketplace
-- This script handles existing data gracefully using ON CONFLICT

-- Insert categories (handle duplicates)
INSERT INTO categories (name, slug, description, created_at, updated_at) VALUES
('Electronics', 'electronics', 'Sustainable and ethically sourced electronic devices', NOW(), NOW()),
('Home & Garden', 'home-garden', 'Eco-friendly home and garden products', NOW(), NOW()),
('Fashion', 'fashion', 'Sustainable and ethically made clothing and accessories', NOW(), NOW()),
('Food & Beverages', 'food-beverages', 'Organic and fair trade food products', NOW(), NOW()),
('Health & Beauty', 'health-beauty', 'Natural and cruelty-free health and beauty products', NOW(), NOW()),
('Books & Media', 'books-media', 'Educational and inspiring books and media', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert vendors (handle duplicates)
INSERT INTO vendors (name, email, description, website, phone, address, city, state, postal_code, country, is_verified, created_at, updated_at) VALUES
('EcoTech Solutions', 'contact@ecotech.com', 'Leading provider of sustainable electronics and renewable energy solutions', 'https://ecotech.com', '+1-555-0101', '123 Green Street', 'San Francisco', 'CA', '94102', 'USA', true, NOW(), NOW()),
('Sustainable Living Co', 'hello@sustainableliving.com', 'Curated collection of eco-friendly home and lifestyle products', 'https://sustainableliving.com', '+1-555-0102', '456 Earth Avenue', 'Portland', 'OR', '97201', 'USA', true, NOW(), NOW()),
('Fair Fashion Collective', 'info@fairfashion.com', 'Ethically made clothing from verified fair trade suppliers', 'https://fairfashion.com', '+1-555-0103', '789 Ethical Lane', 'Austin', 'TX', '78701', 'USA', true, NOW(), NOW()),
('Organic Harvest', 'orders@organicharvest.com', 'Certified organic foods directly from sustainable farms', 'https://organicharvest.com', '+1-555-0104', '321 Farm Road', 'Boulder', 'CO', '80301', 'USA', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Get vendor IDs for products (using subqueries to handle any order)
-- Insert products (handle duplicates by SKU)
INSERT INTO products (vendor_id, category_id, name, description, price, compare_at_price, sku, inventory_quantity, weight, dimensions, is_active, created_at, updated_at) VALUES
(
  (SELECT id FROM vendors WHERE email = 'contact@ecotech.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'electronics' LIMIT 1),
  'Solar Power Bank 20000mAh',
  'High-capacity solar power bank made from recycled materials. Features fast charging, waterproof design, and built-in LED flashlight. Perfect for outdoor adventures while reducing your carbon footprint.',
  89.99,
  119.99,
  'SPB-20K-001',
  50,
  1.2,
  '6.5 x 3.5 x 1.2 inches',
  true,
  NOW(),
  NOW()
),
(
  (SELECT id FROM vendors WHERE email = 'sustainableliving.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'home-garden' LIMIT 1),
  'Bamboo Kitchen Utensil Set',
  'Complete 6-piece kitchen utensil set made from sustainably harvested bamboo. Includes spatula, spoon, slotted spoon, ladle, pasta fork, and storage holder. Naturally antimicrobial and dishwasher safe.',
  34.99,
  49.99,
  'BKU-SET-001',
  75,
  0.8,
  '12 x 4 x 2 inches',
  true,
  NOW(),
  NOW()
),
(
  (SELECT id FROM vendors WHERE email = 'info@fairfashion.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'fashion' LIMIT 1),
  'Organic Cotton T-Shirt',
  'Soft, comfortable t-shirt made from 100% GOTS-certified organic cotton. Ethically manufactured in fair trade facilities. Available in multiple colors and sizes. Perfect for everyday wear with a conscience.',
  28.00,
  35.00,
  'OCT-BASIC-001',
  120,
  0.3,
  'Various sizes',
  true,
  NOW(),
  NOW()
),
(
  (SELECT id FROM vendors WHERE email = 'orders@organicharvest.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'food-beverages' LIMIT 1),
  'Fair Trade Coffee Beans - Dark Roast',
  'Premium single-origin coffee beans from certified fair trade farms in Guatemala. Dark roast with notes of chocolate and caramel. Supports sustainable farming practices and fair wages for farmers.',
  18.99,
  24.99,
  'FTC-DARK-001',
  200,
  1.0,
  '12 oz bag',
  true,
  NOW(),
  NOW()
),
(
  (SELECT id FROM vendors WHERE email = 'sustainableliving.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'health-beauty' LIMIT 1),
  'Natural Skincare Gift Set',
  'Luxurious 4-piece skincare set featuring cleanser, toner, serum, and moisturizer. Made with organic ingredients, cruelty-free, and packaged in recyclable containers. Perfect for sensitive skin.',
  67.99,
  89.99,
  'NSG-SET-001',
  30,
  1.5,
  '8 x 6 x 3 inches',
  true,
  NOW(),
  NOW()
),
(
  (SELECT id FROM vendors WHERE email = 'contact@ecotech.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'electronics' LIMIT 1),
  'Wireless Charging Pad - Recycled Materials',
  'Fast wireless charging pad made from 100% recycled ocean plastic. Compatible with all Qi-enabled devices. Features LED indicator and non-slip base. Includes eco-friendly packaging.',
  45.00,
  59.99,
  'WCP-REC-001',
  85,
  0.5,
  '4 x 4 x 0.5 inches',
  true,
  NOW(),
  NOW()
),
(
  (SELECT id FROM vendors WHERE email = 'info@fairfashion.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'fashion' LIMIT 1),
  'Recycled Wool Beanie',
  'Warm and stylish beanie made from 100% recycled wool. Soft, comfortable fit suitable for all head sizes. Available in earth-tone colors. Perfect for cold weather while supporting circular fashion.',
  22.00,
  28.00,
  'RWB-EARTH-001',
  60,
  0.2,
  'One size fits all',
  true,
  NOW(),
  NOW()
),
(
  (SELECT id FROM vendors WHERE email = 'orders@organicharvest.com' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'food-beverages' LIMIT 1),
  'Organic Honey - Wildflower',
  'Pure, raw wildflower honey from certified organic beehives. Unfiltered and unpasteurized to preserve natural enzymes and nutrients. Supports bee conservation and sustainable beekeeping practices.',
  16.99,
  21.99,
  'OH-WILD-001',
  150,
  1.5,
  '16 oz jar',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (sku) DO NOTHING;

-- Insert product images (handle duplicates)
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order, created_at) VALUES
-- Solar Power Bank images
((SELECT id FROM products WHERE sku = 'SPB-20K-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Solar Power Bank 20000mAh - Main View', true, 1, NOW()),
((SELECT id FROM products WHERE sku = 'SPB-20K-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Solar Power Bank charging device outdoors', false, 2, NOW()),

-- Bamboo Kitchen Utensils images
((SELECT id FROM products WHERE sku = 'BKU-SET-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Bamboo Kitchen Utensil Set - Complete Set', true, 1, NOW()),
((SELECT id FROM products WHERE sku = 'BKU-SET-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Bamboo utensils being used for cooking', false, 2, NOW()),

-- Organic Cotton T-Shirt images
((SELECT id FROM products WHERE sku = 'OCT-BASIC-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Organic Cotton T-Shirt - Model Wearing', true, 1, NOW()),
((SELECT id FROM products WHERE sku = 'OCT-BASIC-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Organic cotton fabric texture close-up', false, 2, NOW()),

-- Fair Trade Coffee images
((SELECT id FROM products WHERE sku = 'FTC-DARK-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Fair Trade Coffee Beans - Dark Roast Package', true, 1, NOW()),
((SELECT id FROM products WHERE sku = 'FTC-DARK-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Coffee beans spilling from package', false, 2, NOW()),

-- Natural Skincare Set images
((SELECT id FROM products WHERE sku = 'NSG-SET-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Natural Skincare Gift Set - All Products', true, 1, NOW()),
((SELECT id FROM products WHERE sku = 'NSG-SET-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Skincare products with natural ingredients', false, 2, NOW()),

-- Wireless Charging Pad images
((SELECT id FROM products WHERE sku = 'WCP-REC-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Wireless Charging Pad - Recycled Materials', true, 1, NOW()),
((SELECT id FROM products WHERE sku = 'WCP-REC-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Phone charging on wireless pad', false, 2, NOW()),

-- Recycled Wool Beanie images
((SELECT id FROM products WHERE sku = 'RWB-EARTH-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Recycled Wool Beanie - Earth Tones', true, 1, NOW()),
((SELECT id FROM products WHERE sku = 'RWB-EARTH-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Person wearing recycled wool beanie', false, 2, NOW()),

-- Organic Honey images
((SELECT id FROM products WHERE sku = 'OH-WILD-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Organic Honey - Wildflower Jar', true, 1, NOW()),
((SELECT id FROM products WHERE sku = 'OH-WILD-001' LIMIT 1), '/placeholder.svg?height=400&width=400', 'Honey dripping from wooden spoon', false, 2, NOW())
ON CONFLICT (product_id, image_url) DO NOTHING;

-- Insert sample certifications (handle duplicates)
INSERT INTO certifications (name, description, issuing_organization, verification_url, created_at, updated_at) VALUES
('B Corporation Certified', 'Certified B Corporations meet the highest standards of verified social and environmental performance, public transparency, and legal accountability.', 'B Lab', 'https://bcorporation.net/directory', NOW(), NOW()),
('Fair Trade Certified', 'Fair Trade Certified products support sustainable development by offering better trading conditions and securing the rights of marginalized producers and workers.', 'Fair Trade USA', 'https://www.fairtradecertified.org/', NOW(), NOW()),
('USDA Organic', 'USDA Organic products are produced using approved methods that integrate cultural, biological, and mechanical practices that foster cycling of resources and promote ecological balance.', 'United States Department of Agriculture', 'https://www.usda.gov/topics/organic', NOW(), NOW()),
('Carbon Neutral Certified', 'Carbon Neutral Certified products have measured, reduced, and offset their carbon footprint to achieve net-zero carbon emissions.', 'Carbon Trust', 'https://www.carbontrust.com/', NOW(), NOW())
ON CONFLICT (name, issuing_organization) DO NOTHING;

-- Link vendors to certifications (handle duplicates)
INSERT INTO vendor_certifications (vendor_id, certification_id, certificate_number, issued_date, expiry_date, verification_status, created_at, updated_at) VALUES
-- EcoTech Solutions certifications
((SELECT id FROM vendors WHERE email = 'contact@ecotech.com' LIMIT 1), (SELECT id FROM certifications WHERE name = 'B Corporation Certified' LIMIT 1), 'B-CORP-2024-001', '2024-01-15', '2027-01-15', 'verified', NOW(), NOW()),
((SELECT id FROM vendors WHERE email = 'contact@ecotech.com' LIMIT 1), (SELECT id FROM certifications WHERE name = 'Carbon Neutral Certified' LIMIT 1), 'CN-2024-ECO-001', '2024-02-01', '2025-02-01', 'verified', NOW(), NOW()),

-- Sustainable Living Co certifications
((SELECT id FROM vendors WHERE email = 'hello@sustainableliving.com' LIMIT 1), (SELECT id FROM certifications WHERE name = 'B Corporation Certified' LIMIT 1), 'B-CORP-2023-045', '2023-06-10', '2026-06-10', 'verified', NOW(), NOW()),

-- Fair Fashion Collective certifications
((SELECT id FROM vendors WHERE email = 'info@fairfashion.com' LIMIT 1), (SELECT id FROM certifications WHERE name = 'Fair Trade Certified' LIMIT 1), 'FT-2024-FASHION-012', '2024-03-20', '2025-03-20', 'verified', NOW(), NOW()),
((SELECT id FROM vendors WHERE email = 'info@fairfashion.com' LIMIT 1), (SELECT id FROM certifications WHERE name = 'B Corporation Certified' LIMIT 1), 'B-CORP-2024-078', '2024-04-05', '2027-04-05', 'verified', NOW(), NOW()),

-- Organic Harvest certifications
((SELECT id FROM vendors WHERE email = 'orders@organicharvest.com' LIMIT 1), (SELECT id FROM certifications WHERE name = 'USDA Organic' LIMIT 1), 'USDA-ORG-2024-567', '2024-01-01', '2025-01-01', 'verified', NOW(), NOW()),
((SELECT id FROM vendors WHERE email = 'orders@organicharvest.com' LIMIT 1), (SELECT id FROM certifications WHERE name = 'Fair Trade Certified' LIMIT 1), 'FT-2024-HARVEST-089', '2024-02-15', '2025-02-15', 'verified', NOW(), NOW())
ON CONFLICT (vendor_id, certification_id) DO NOTHING;

-- Insert sample reviews (handle duplicates by checking product_id and user_email combination)
INSERT INTO reviews (product_id, user_email, user_name, rating, title, comment, is_verified_purchase, created_at, updated_at) VALUES
-- Solar Power Bank reviews
((SELECT id FROM products WHERE sku = 'SPB-20K-001' LIMIT 1), 'sarah.j@email.com', 'Sarah J.', 5, 'Amazing solar power bank!', 'This power bank has been a game-changer for my camping trips. The solar charging actually works well, and it holds a charge for days. Love that it''s made from recycled materials too!', true, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
((SELECT id FROM products WHERE sku = 'SPB-20K-001' LIMIT 1), 'mike.r@email.com', 'Mike R.', 4, 'Great for outdoor adventures', 'Solid build quality and the solar panels work better than expected. Only wish it charged a bit faster via USB-C, but overall very happy with the purchase.', true, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),

-- Bamboo Kitchen Utensils reviews
((SELECT id FROM products WHERE sku = 'BKU-SET-001' LIMIT 1), 'emma.l@email.com', 'Emma L.', 5, 'Beautiful and functional', 'These bamboo utensils are gorgeous and work perfectly. They feel great in hand and I love knowing they''re sustainable. The holder is a nice touch too.', true, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),
((SELECT id FROM products WHERE sku = 'BKU-SET-001' LIMIT 1), 'david.k@email.com', 'David K.', 5, 'Excellent quality', 'Very impressed with the craftsmanship. These are much better quality than I expected and they''ve held up great after months of daily use.', true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- Organic Cotton T-Shirt reviews
((SELECT id FROM products WHERE sku = 'OCT-BASIC-001' LIMIT 1), 'lisa.m@email.com', 'Lisa M.', 4, 'Soft and comfortable', 'Really soft cotton and fits well. I appreciate knowing it was made ethically. The color has held up well after several washes.', true, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),

-- Fair Trade Coffee reviews
((SELECT id FROM products WHERE sku = 'FTC-DARK-001' LIMIT 1), 'coffee.lover@email.com', 'Coffee Enthusiast', 5, 'Best coffee I''ve had!', 'The flavor profile is incredible - rich, smooth, with those chocolate notes as described. Knowing it supports fair trade makes it even better. Will definitely reorder!', true, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
((SELECT id FROM products WHERE sku = 'FTC-DARK-001' LIMIT 1), 'morning.brew@email.com', 'Morning Brew', 4, 'Great dark roast', 'Strong, flavorful coffee that''s perfect for my morning routine. The fair trade aspect is important to me, and this delivers on both ethics and taste.', true, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days')
ON CONFLICT (product_id, user_email) DO NOTHING;

-- Success message
SELECT 'Sample products, vendors, categories, certifications, and reviews have been successfully seeded!' as message;
