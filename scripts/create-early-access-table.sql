-- Create early_access_waitlist table
CREATE TABLE IF NOT EXISTS early_access_waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50),
  interested_in TEXT[],
  access_granted BOOLEAN DEFAULT FALSE,
  access_granted_at TIMESTAMP WITH TIME ZONE,
  access_token VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_email ON early_access_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_access_granted ON early_access_waitlist(access_granted);
CREATE INDEX IF NOT EXISTS idx_created_at ON early_access_waitlist(created_at);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_early_access_timestamp ON early_access_waitlist;
CREATE TRIGGER update_early_access_timestamp
BEFORE UPDATE ON early_access_waitlist
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add contributor shopper account (no token needed)
INSERT INTO early_access_waitlist (
  email,
  first_name,
  last_name,
  role,
  interested_in,
  access_granted,
  access_granted_at,
  notes
) VALUES
  (
    'contributor-shopper@momm.group',
    'MOMM',
    'Contributor Shopper',
    'contributor-shopper',
    ARRAY['build', 'products']::TEXT[],
    TRUE,
    NOW(),
    'Internal contributor shopper - bypasses token'
  )
ON CONFLICT (email) DO NOTHING;

-- Add contributor vendor account (no token needed)
INSERT INTO early_access_waitlist (
  email,
  first_name,
  last_name,
  role,
  interested_in,
  access_granted,
  access_granted_at,
  notes
) VALUES
  (
    'contributor-vendor@momm.group',
    'MOMM',
    'Contributor Vendor',
    'contributor-vendor',
    ARRAY['build', 'products']::TEXT[],
    TRUE,
    NOW(),
    'Internal contributor vendor - bypasses token'
  )
ON CONFLICT (email) DO NOTHING;
