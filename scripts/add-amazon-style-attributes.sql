-- Add Amazon-style product attributes
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS brand text,
ADD COLUMN IF NOT EXISTS color text,
ADD COLUMN IF NOT EXISTS material text,
ADD COLUMN IF NOT EXISTS style text,
ADD COLUMN IF NOT EXISTS size text;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_color ON products(color);
CREATE INDEX IF NOT EXISTS idx_products_material ON products(material);
CREATE INDEX IF NOT EXISTS idx_products_style ON products(style);
CREATE INDEX IF NOT EXISTS idx_products_size ON products(size);

-- Update some sample data to demonstrate the new attributes
UPDATE products 
SET brand = 'Sample Brand', 
    color = 'Blue', 
    material = 'Cotton',
    style = 'Casual',
    size = 'Medium'
WHERE id IN (
  SELECT id FROM products LIMIT 5
);
