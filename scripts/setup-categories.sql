-- Category Hierarchy Setup for Multi-Vendor Platform
-- Run this script in Supabase SQL Editor

-- Clear existing categories (optional - remove this section if you want to keep existing data)
DELETE FROM categories WHERE id IS NOT NULL;

-- Insert main categories first
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Home & Garden', 'home-garden', 'Everything for your home and garden needs', NULL),
('Clothing & Accessories', 'clothing-accessories', 'Fashion and accessories for all', NULL),
('Health, Bath & Beauty', 'health-bath-beauty', 'Personal care and wellness products', NULL),
('Toys, Kids & Babies', 'toys-kids-babies', 'Products for children and babies', NULL);

-- Insert subcategories for Home & Garden
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Cleaning Supplies', 'cleaning-supplies', 'Household cleaning products', 
  (SELECT id FROM categories WHERE slug = 'home-garden')),
('Kitchen & Dining', 'kitchen-dining', 'Kitchen appliances and dining essentials', 
  (SELECT id FROM categories WHERE slug = 'home-garden')),
('Furniture & Art', 'furniture-art', 'Indoor and outdoor furniture and art', 
  (SELECT id FROM categories WHERE slug = 'home-garden')),
('Garden', 'garden', 'Gardening tools and outdoor equipment', 
  (SELECT id FROM categories WHERE slug = 'home-garden')),
('Bedding & Linens', 'bedding-linens', 'Bedroom and bathroom linens', 
  (SELECT id FROM categories WHERE slug = 'home-garden')),
('Home Decor', 'home-decor', 'Home decorative items', 
  (SELECT id FROM categories WHERE slug = 'home-garden')),
('Lighting & Lamps', 'lighting-lamps', 'Indoor and outdoor lighting', 
  (SELECT id FROM categories WHERE slug = 'home-garden')),
('Bath & Laundry', 'bath-laundry', 'Bathroom and laundry essentials', 
  (SELECT id FROM categories WHERE slug = 'home-garden'));

-- Insert subcategories for Clothing & Accessories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Clothing', 'clothing', 'Fashion clothing for all', 
  (SELECT id FROM categories WHERE slug = 'clothing-accessories')),
('Accessories', 'accessories', 'Fashion accessories', 
  (SELECT id FROM categories WHERE slug = 'clothing-accessories')),
('Bags & Purses', 'bags-purses', 'Handbags and accessories', 
  (SELECT id FROM categories WHERE slug = 'clothing-accessories'));

-- Insert subcategories for Health, Bath & Beauty (including COSMOS categories)
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Beauty', 'beauty', 'General beauty products', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Bath & Body', 'bath-body', 'Soaps, lotions, and bath products', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Health', 'health', 'Health and wellness products', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Lip Care', 'lip-care', 'Products for lip care certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Face Care', 'face-care', 'Products for face care certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Body Care', 'body-care', 'Products for body care certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Hand Care', 'hand-care', 'Products for hand care certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Eye Care', 'eye-care', 'Products for eye care certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Cleansers', 'cleansers', 'Cleanser products certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Serums', 'serums', 'Serum products certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Face Masks', 'face-masks', 'Face mask products certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Sun Care', 'sun-care', 'Sun care products certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Treatments', 'treatments', 'Treatment products certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Essences', 'essences', 'Essence products certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty')),
('Skincare', 'skincare', 'General skincare products certified by COSMOS standards', 
  (SELECT id FROM categories WHERE slug = 'health-bath-beauty'));

-- Insert subcategories for Toys, Kids & Babies
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Kids Clothing', 'kids-clothing', 'Clothing for children and babies', 
  (SELECT id FROM categories WHERE slug = 'toys-kids-babies')),
('Kids Shoes', 'kids-shoes', 'Footwear for children and babies', 
  (SELECT id FROM categories WHERE slug = 'toys-kids-babies')),
('Toys', 'toys', 'Educational and fun toys for kids', 
  (SELECT id FROM categories WHERE slug = 'toys-kids-babies'));

-- Verify the setup
SELECT 
  CASE 
    WHEN parent_id IS NULL THEN '📁 ' || name 
    ELSE '  └── ' || name 
  END as category_tree,
  slug,
  description
FROM categories 
ORDER BY 
  COALESCE(parent_id, id), 
  CASE WHEN parent_id IS NULL THEN 0 ELSE 1 END,
  name;

-- Show category counts
SELECT 
  'Main Categories' as type,
  COUNT(*) as count
FROM categories 
WHERE parent_id IS NULL
UNION ALL
SELECT 
  'Subcategories' as type,
  COUNT(*) as count
FROM categories 
WHERE parent_id IS NOT NULL;
