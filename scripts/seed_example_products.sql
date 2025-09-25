-- Seed script for example products and related data
-- This script will populate the database with sample data for testing

-- First, insert categories
INSERT INTO categories (id, name, slug, description, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Electronics', 'electronics', 'Electronic devices and gadgets', NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Clothing', 'clothing', 'Fashion and apparel', NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Food & Beverage', 'food', 'Food and drink products', NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', 'Home & Garden', 'home', 'Home improvement and garden supplies', NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', 'Sports', 'sports', 'Sports and fitness equipment', NOW()),
  ('550e8400-e29b-41d4-a716-446655440006', 'Books', 'books', 'Books and educational materials', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert example vendors
INSERT INTO vendors (id, business_name, business_description, business_email, business_phone, business_address, logo_url, is_verified, commission_rate, created_at, updated_at) VALUES
  ('vendor1', 'TechGear Pro', 'Premium electronics and tech accessories', 'contact@techgearpro.com', '+1-555-0101', '123 Tech Street, Silicon Valley, CA 94000', '/placeholder.svg?height=100&width=100', true, 0.15, NOW(), NOW()),
  ('vendor2', 'EcoWear', 'Sustainable and organic clothing brand', 'hello@ecowear.com', '+1-555-0102', '456 Green Ave, Portland, OR 97000', '/placeholder.svg?height=100&width=100', true, 0.12, NOW(), NOW()),
  ('vendor3', 'FitTech Solutions', 'Advanced fitness tracking technology', 'info@fittechsolutions.com', '+1-555-0103', '789 Fitness Blvd, Austin, TX 78000', '/placeholder.svg?height=100&width=100', false, 0.18, NOW(), NOW()),
  ('vendor4', 'Mountain Roasters', 'Artisan coffee roasting company', 'orders@mountainroasters.com', '+1-555-0104', '321 Coffee Lane, Seattle, WA 98000', '/placeholder.svg?height=100&width=100', true, 0.10, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert example products
INSERT INTO products (id, name, description, price, compare_at_price, featured_image_url, vendor_id, category_id, is_active, inventory_quantity, sku, weight, dimensions, created_at, updated_at) VALUES
  ('1', 'Premium Wireless Headphones', 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Features advanced Bluetooth 5.0 connectivity and premium sound quality.', 199.99, 249.99, '/placeholder.svg?height=400&width=400', 'vendor1', '550e8400-e29b-41d4-a716-446655440001', true, 50, 'TWH-001', 0.8, '20cm x 18cm x 8cm', NOW(), NOW()),
  ('2', 'Organic Cotton T-Shirt', 'Comfortable and sustainable organic cotton t-shirt in various colors. Made from 100% certified organic cotton with fair trade practices.', 29.99, NULL, '/placeholder.svg?height=400&width=400', 'vendor2', '550e8400-e29b-41d4-a716-446655440002', true, 100, 'OCT-001', 0.2, 'Size varies', NOW(), NOW()),
  ('3', 'Smart Fitness Watch', 'Advanced fitness tracking with heart rate monitor and GPS. Track your workouts, monitor health metrics, and stay connected.', 299.99, 399.99, '/placeholder.svg?height=400&width=400', 'vendor3', '550e8400-e29b-41d4-a716-446655440001', true, 25, 'SFW-001', 0.1, '4.5cm x 4cm x 1.2cm', NOW(), NOW()),
  ('4', 'Artisan Coffee Beans', 'Single-origin coffee beans roasted to perfection. Sourced directly from sustainable farms with full traceability.', 24.99, NULL, '/placeholder.svg?height=400&width=400', 'vendor4', '550e8400-e29b-41d4-a716-446655440003', true, 75, 'ACB-001', 0.5, '12cm x 8cm x 5cm', NOW(), NOW()),
  ('5', 'Eco-Friendly Yoga Mat', 'Non-toxic, biodegradable yoga mat made from natural rubber. Perfect grip and cushioning for all yoga practices.', 89.99, 119.99, '/placeholder.svg?height=400&width=400', 'vendor2', '550e8400-e29b-41d4-a716-446655440005', true, 40, 'EYM-001', 2.5, '183cm x 61cm x 6mm', NOW(), NOW()),
  ('6', 'Smart Home Security Camera', 'WiFi-enabled security camera with night vision and motion detection. Monitor your home from anywhere with the mobile app.', 149.99, 199.99, '/placeholder.svg?height=400&width=400', 'vendor1', '550e8400-e29b-41d4-a716-446655440001', true, 30, 'SHSC-001', 0.6, '10cm x 10cm x 15cm', NOW(), NOW()),
  ('7', 'Organic Green Tea Set', 'Premium organic green tea collection with traditional brewing accessories. Includes 6 different tea varieties.', 49.99, NULL, '/placeholder.svg?height=400&width=400', 'vendor4', '550e8400-e29b-41d4-a716-446655440003', true, 60, 'OGTS-001', 1.2, '25cm x 20cm x 10cm', NOW(), NOW()),
  ('8', 'Sustainable Bamboo Phone Case', 'Eco-friendly phone case made from sustainable bamboo. Provides excellent protection while being environmentally conscious.', 34.99, 44.99, '/placeholder.svg?height=400&width=400', 'vendor2', '550e8400-e29b-41d4-a716-446655440001', true, 80, 'SBPC-001', 0.1, '15cm x 8cm x 1cm', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert product images
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, created_at) VALUES
  (gen_random_uuid(), '1', '/placeholder.svg?height=600&width=600', 'Premium Wireless Headphones - Front View', 1, NOW()),
  (gen_random_uuid(), '1', '/placeholder.svg?height=600&width=600', 'Premium Wireless Headphones - Side View', 2, NOW()),
  (gen_random_uuid(), '2', '/placeholder.svg?height=600&width=600', 'Organic Cotton T-Shirt - Blue', 1, NOW()),
  (gen_random_uuid(), '2', '/placeholder.svg?height=600&width=600', 'Organic Cotton T-Shirt - White', 2, NOW()),
  (gen_random_uuid(), '3', '/placeholder.svg?height=600&width=600', 'Smart Fitness Watch - Black', 1, NOW()),
  (gen_random_uuid(), '3', '/placeholder.svg?height=600&width=600', 'Smart Fitness Watch - Silver', 2, NOW()),
  (gen_random_uuid(), '4', '/placeholder.svg?height=600&width=600', 'Artisan Coffee Beans - Package', 1, NOW()),
  (gen_random_uuid(), '4', '/placeholder.svg?height=600&width=600', 'Artisan Coffee Beans - Close Up', 2, NOW()),
  (gen_random_uuid(), '5', '/placeholder.svg?height=600&width=600', 'Eco-Friendly Yoga Mat - Rolled', 1, NOW()),
  (gen_random_uuid(), '5', '/placeholder.svg?height=600&width=600', 'Eco-Friendly Yoga Mat - Unrolled', 2, NOW()),
  (gen_random_uuid(), '6', '/placeholder.svg?height=600&width=600', 'Smart Home Security Camera - Front', 1, NOW()),
  (gen_random_uuid(), '6', '/placeholder.svg?height=600&width=600', 'Smart Home Security Camera - App View', 2, NOW()),
  (gen_random_uuid(), '7', '/placeholder.svg?height=600&width=600', 'Organic Green Tea Set - Complete Set', 1, NOW()),
  (gen_random_uuid(), '7', '/placeholder.svg?height=600&width=600', 'Organic Green Tea Set - Brewing', 2, NOW()),
  (gen_random_uuid(), '8', '/placeholder.svg?height=600&width=600', 'Sustainable Bamboo Phone Case - Back', 1, NOW()),
  (gen_random_uuid(), '8', '/placeholder.svg?height=600&width=600', 'Sustainable Bamboo Phone Case - Side', 2, NOW())
ON CONFLICT (id) DO NOTHING;

-- Add some sample certifications if they don't exist
INSERT INTO certifications (id, name, description, category, icon_url, website_url, created_at, updated_at) VALUES
  (gen_random_uuid(), 'B Corp Certified', 'Certified B Corporations meet the highest standards of verified social and environmental performance', 'Business Ethics', '/placeholder.svg?height=50&width=50', 'https://bcorporation.net', NOW(), NOW()),
  (gen_random_uuid(), 'Fair Trade Certified', 'Products that meet rigorous social, environmental and economic standards', 'Fair Labor', '/placeholder.svg?height=50&width=50', 'https://fairtradecertified.org', NOW(), NOW()),
  (gen_random_uuid(), 'USDA Organic', 'Certified organic products that meet USDA organic standards', 'Organic', '/placeholder.svg?height=50&width=50', 'https://usda.gov/organic', NOW(), NOW()),
  (gen_random_uuid(), 'Carbon Neutral', 'Products with verified carbon neutral or negative impact', 'Climate', '/placeholder.svg?height=50&width=50', 'https://carbonneutral.com', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Add entity certifications for some products and vendors
WITH cert_ids AS (
  SELECT id, name FROM certifications WHERE name IN ('B Corp Certified', 'Fair Trade Certified', 'USDA Organic', 'Carbon Neutral')
)
INSERT INTO entity_certifications (id, entity_type, entity_id, certification_id, certification_data, verified, verified_at, created_at, updated_at) VALUES
  -- Vendor certifications
  (gen_random_uuid(), 'vendor', 'vendor2', (SELECT id FROM cert_ids WHERE name = 'B Corp Certified'), '{"score": 95, "certification_date": "2023-01-15", "expiry_date": "2026-01-15"}', true, NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'vendor', 'vendor4', (SELECT id FROM cert_ids WHERE name = 'Fair Trade Certified'), '{"score": 88, "certification_date": "2022-06-01", "expiry_date": "2025-06-01"}', true, NOW(), NOW(), NOW()),
  -- Product certifications
  (gen_random_uuid(), 'product', '2', (SELECT id FROM cert_ids WHERE name = 'USDA Organic'), '{"score": 100, "certification_date": "2023-03-10", "expiry_date": "2024-03-10"}', true, NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'product', '4', (SELECT id FROM cert_ids WHERE name = 'Fair Trade Certified'), '{"score": 92, "certification_date": "2023-02-20", "expiry_date": "2024-02-20"}', true, NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'product', '5', (SELECT id FROM cert_ids WHERE name = 'Carbon Neutral'), '{"score": 85, "certification_date": "2023-04-05", "expiry_date": "2024-04-05"}', true, NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'product', '7', (SELECT id FROM cert_ids WHERE name = 'USDA Organic'), '{"score": 98, "certification_date": "2023-01-30", "expiry_date": "2024-01-30"}', true, NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add some sample reviews
INSERT INTO reviews (id, product_id, customer_id, rating, title, comment, is_verified_purchase, created_at, updated_at) VALUES
  (gen_random_uuid(), '1', gen_random_uuid(), 5, 'Amazing sound quality!', 'These headphones exceeded my expectations. The noise cancellation is fantastic and battery life is as advertised.', true, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
  (gen_random_uuid(), '1', gen_random_uuid(), 4, 'Great headphones', 'Very comfortable for long listening sessions. Only minor complaint is they can get a bit warm after hours of use.', true, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
  (gen_random_uuid(), '2', gen_random_uuid(), 5, 'Super soft and sustainable', 'Love that this shirt is organic cotton. Fits perfectly and feels great on the skin.', true, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),
  (gen_random_uuid(), '3', gen_random_uuid(), 4, 'Good fitness tracker', 'Tracks everything I need. GPS is accurate and heart rate monitoring seems reliable.', true, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
  (gen_random_uuid(), '4', gen_random_uuid(), 5, 'Best coffee I''ve had!', 'The flavor profile is incredible. You can really taste the quality and care that went into roasting these beans.', true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

-- Update the sequence values to avoid conflicts with our manual IDs
-- This ensures future auto-generated IDs won't conflict with our seeded data
SELECT setval(pg_get_serial_sequence('categories', 'id'), (SELECT MAX(id::int) FROM categories WHERE id ~ '^[0-9]+$') + 1, false);
