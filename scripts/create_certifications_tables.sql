-- Create certifications master table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT, -- e.g., 'environmental', 'social', 'quality', 'ethical'
    icon_url TEXT,
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create entity_certifications linking table with flexible JSONB data
CREATE TABLE IF NOT EXISTS entity_certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certification_id UUID NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL, -- 'vendor', 'product', 'ingredient'
    entity_id UUID NOT NULL,
    certification_data JSONB, -- Flexible data: scores, ratings, expiration_date, etc.
    verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID, -- Could reference profiles table
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique certification per entity
    UNIQUE(certification_id, entity_type, entity_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_entity_certifications_entity ON entity_certifications(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_entity_certifications_certification ON entity_certifications(certification_id);
CREATE INDEX IF NOT EXISTS idx_entity_certifications_verified ON entity_certifications(verified);

-- Insert sample certifications
INSERT INTO certifications (name, description, category, website_url) VALUES
('B Corp Certified', 'Certified B Corporations meet the highest standards of verified social and environmental performance, public transparency, and legal accountability.', 'social', 'https://bcorporation.net/'),
('Fair Trade Certified', 'Fair Trade Certified products support sustainable development by offering better trading conditions and securing the rights of marginalized producers and workers.', 'ethical', 'https://www.fairtradecertified.org/'),
('USDA Organic', 'USDA Organic products are produced using approved methods that integrate cultural, biological, and mechanical practices that foster cycling of resources, promote ecological balance, and conserve biodiversity.', 'environmental', 'https://www.usda.gov/topics/organic'),
('Rainforest Alliance Certified', 'Rainforest Alliance Certified products support the livelihoods of farmers and forest communities, protect wildlife and the environment.', 'environmental', 'https://www.rainforest-alliance.org/'),
('Cradle to Cradle Certified', 'Cradle to Cradle Certified products are designed and manufactured according to science-based criteria for human and environmental health.', 'environmental', 'https://www.c2ccertified.org/'),
('Leaping Bunny Certified', 'The Leaping Bunny Program provides the best assurance that no new animal testing is used in any phase of product development.', 'ethical', 'https://www.leapingbunny.org/'),
('Carbon Neutral Certified', 'Carbon Neutral Certified products have measured, reduced, and offset their carbon footprint to achieve net-zero emissions.', 'environmental', NULL),
('Women Owned Business', 'Certified women-owned business enterprise supporting gender equality in entrepreneurship.', 'social', NULL)
ON CONFLICT (name) DO NOTHING;

-- Add sample entity certifications for existing vendors/products
-- Note: These are examples - you would populate with real data
INSERT INTO entity_certifications (certification_id, entity_type, entity_id, certification_data, verified) 
SELECT 
    c.id,
    'vendor',
    v.id,
    jsonb_build_object(
        'score', (random() * 100)::int,
        'certification_date', NOW() - (random() * 365 * 2 || ' days')::interval,
        'expiration_date', NOW() + (random() * 365 * 3 || ' days')::interval
    ),
    true
FROM certifications c
CROSS JOIN vendors v
WHERE random() < 0.3 -- Randomly assign certifications to ~30% of vendors
ON CONFLICT (certification_id, entity_type, entity_id) DO NOTHING;
