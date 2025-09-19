-- Insert BLUELAND as a vendor
INSERT INTO vendors (name, email, description, status) VALUES
('BLUELAND', 'contact@blueland.com', 'Eco-friendly cleaning products company focused on reducing single-use plastic waste', 'approved')
ON CONFLICT (email) DO NOTHING;

-- Get the vendor ID for BLUELAND
DO $$
DECLARE
    blueland_vendor_id UUID;
    home_garden_id UUID;
    kitchen_dining_id UUID;
    dish_category_id UUID;
    bath_laundry_id UUID;
    cleaning_supplies_id UUID;
    tablet_trio_id UUID;
BEGIN
    -- Get BLUELAND vendor ID
    SELECT id INTO blueland_vendor_id FROM vendors WHERE name = 'BLUELAND';
    
    -- Create category hierarchy: Home & Garden -> Kitchen & Dining -> Dish
    INSERT INTO categories (name, description, parent_id) VALUES
    ('Home & Garden', 'Home and garden products', NULL)
    ON CONFLICT (name) DO NOTHING;
    
    SELECT id INTO home_garden_id FROM categories WHERE name = 'Home & Garden';
    
    INSERT INTO categories (name, description, parent_id) VALUES
    ('Kitchen & Dining', 'Kitchen and dining products', home_garden_id)
    ON CONFLICT (name) DO NOTHING;
    
    SELECT id INTO kitchen_dining_id FROM categories WHERE name = 'Kitchen & Dining';
    
    INSERT INTO categories (name, description, parent_id) VALUES
    ('Dish', 'Dishwashing products', kitchen_dining_id)
    ON CONFLICT (name) DO NOTHING;
    
    SELECT id INTO dish_category_id FROM categories WHERE name = 'Dish';
    
    -- Create Bath & Laundry category
    INSERT INTO categories (name, description, parent_id) VALUES
    ('Bath & Laundry', 'Bath and laundry products', home_garden_id)
    ON CONFLICT (name) DO NOTHING;
    
    SELECT id INTO bath_laundry_id FROM categories WHERE name = 'Bath & Laundry';
    
    -- Create Cleaning Supplies category
    INSERT INTO categories (name, description, parent_id) VALUES
    ('Cleaning Supplies', 'General cleaning products', home_garden_id)
    ON CONFLICT (name) DO NOTHING;
    
    SELECT id INTO cleaning_supplies_id FROM categories WHERE name = 'Cleaning Supplies';
    
    -- Insert The Tablet Trio product
    INSERT INTO products (name, description, price, vendor_id, category_id, sku, status) VALUES
    ('The Tablet Trio', 'Eco-friendly dishwashing tablets that dissolve completely in water', 73.00, blueland_vendor_id, dish_category_id, 'BL-TABLET-TRIO', 'active')
    ON CONFLICT (sku) DO NOTHING;
    
    SELECT id INTO tablet_trio_id FROM products WHERE sku = 'BL-TABLET-TRIO';
    
    -- Add product images for The Tablet Trio
    INSERT INTO product_images (product_id, image_url, sort_order) VALUES
    (tablet_trio_id, '/placeholder.svg?height=400&width=400', 0),
    (tablet_trio_id, '/placeholder.svg?height=400&width=400', 1)
    ON CONFLICT (product_id, sort_order) DO NOTHING;
    
END $$;
