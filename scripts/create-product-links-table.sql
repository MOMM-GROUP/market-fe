-- Create product_links table for external purchase links
CREATE TABLE IF NOT EXISTS product_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('Website', 'Shopify', 'Amazon', 'Etsy', 'TikTok', 'Instagram', 'Facebook', 'Twitter')),
    url TEXT NOT NULL,
    is_affiliate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_product_links_product_id ON product_links(product_id);
CREATE INDEX IF NOT EXISTS idx_product_links_platform ON product_links(platform);

-- Add RLS policies
ALTER TABLE product_links ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read product links
CREATE POLICY "Anyone can view product links" ON product_links
    FOR SELECT USING (true);

-- Policy: Vendors can manage their own product links
CREATE POLICY "Vendors can manage their product links" ON product_links
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_links.product_id 
            AND products.vendor_id = auth.uid()
        )
    );

-- Policy: Admins can manage all product links
CREATE POLICY "Admins can manage all product links" ON product_links
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );
