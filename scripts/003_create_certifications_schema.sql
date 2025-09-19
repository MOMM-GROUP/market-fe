-- Create the master list of all possible certifications
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuing_body TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create an ENUM type for entity types
DO $$ BEGIN
    CREATE TYPE entity_type AS ENUM ('vendor', 'product', 'process', 'ingredient');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the flexible linking table
CREATE TABLE IF NOT EXISTS entity_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_id UUID NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
  entity_id UUID NOT NULL,
  entity_type entity_type NOT NULL,
  details JSONB, -- For storing variable fields like scores, ratings, etc.
  verified_at DATE,
  expires_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_entity_certifications_lookup ON entity_certifications (entity_id, entity_type);
CREATE INDEX IF NOT EXISTS idx_entity_certifications_cert ON entity_certifications (certification_id);
CREATE INDEX IF NOT EXISTS idx_entity_certifications_details ON entity_certifications USING GIN (details);

-- Add some common certifications
INSERT INTO certifications (name, issuing_body, description) VALUES
('B Corp Certified', 'B Lab', 'Certified B Corporations meet the highest standards of verified social and environmental performance, public transparency, and legal accountability.'),
('Fair Trade Certified', 'Fairtrade International', 'Products that meet rigorous social, environmental and economic standards.'),
('USDA Organic', 'United States Department of Agriculture', 'Products produced using approved methods that integrate cultural, biological, and mechanical practices.'),
('Global Organic Textile Standard (GOTS)', 'Global Organic Textile Standard', 'Leading textile processing standard for organic fibers with environmental and social criteria.'),
('Cradle to Cradle Certified', 'Cradle to Cradle Products Innovation Institute', 'Products designed for the circular economy with safe, renewable materials.')
ON CONFLICT (name) DO NOTHING;
