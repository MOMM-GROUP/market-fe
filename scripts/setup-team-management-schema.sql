-- Create team_members table to track vendor employees
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'employee', -- 'owner', 'manager', 'employee'
  permissions JSONB DEFAULT '{"view_orders": true, "manage_products": false, "manage_team": false}',
  invited_by UUID REFERENCES profiles(id),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(vendor_id, user_id)
);

-- Create team_invitations table for pending invitations
CREATE TABLE IF NOT EXISTS team_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'employee',
  permissions JSONB DEFAULT '{"view_orders": true, "manage_products": false, "manage_team": false}',
  invited_by UUID NOT NULL REFERENCES profiles(id),
  invitation_token UUID DEFAULT gen_random_uuid(),
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'declined', 'expired'
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(vendor_id, email)
);

-- Add RLS policies for team_members
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view their own team" ON team_members
  FOR SELECT USING (
    vendor_id IN (
      SELECT vendor_id FROM team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vendor owners can manage team members" ON team_members
  FOR ALL USING (
    vendor_id IN (
      SELECT v.id FROM vendors v 
      WHERE v.user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM team_members tm 
        WHERE tm.vendor_id = v.id 
        AND tm.user_id = auth.uid() 
        AND tm.permissions->>'manage_team' = 'true'
      )
    )
  );

-- Add RLS policies for team_invitations
ALTER TABLE team_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team managers can view invitations" ON team_invitations
  FOR SELECT USING (
    vendor_id IN (
      SELECT v.id FROM vendors v 
      WHERE v.user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM team_members tm 
        WHERE tm.vendor_id = v.id 
        AND tm.user_id = auth.uid() 
        AND tm.permissions->>'manage_team' = 'true'
      )
    )
  );

CREATE POLICY "Team managers can manage invitations" ON team_invitations
  FOR ALL USING (
    vendor_id IN (
      SELECT v.id FROM vendors v 
      WHERE v.user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM team_members tm 
        WHERE tm.vendor_id = v.id 
        AND tm.user_id = auth.uid() 
        AND tm.permissions->>'manage_team' = 'true'
      )
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_vendor_id ON team_members(vendor_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_vendor_id ON team_invitations(vendor_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON team_invitations(email);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON team_invitations(invitation_token);

-- Add trigger to automatically add vendor owner as team member
CREATE OR REPLACE FUNCTION add_vendor_owner_to_team()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO team_members (vendor_id, user_id, role, permissions)
  VALUES (
    NEW.id, 
    NEW.user_id, 
    'owner', 
    '{"view_orders": true, "manage_products": true, "manage_team": true}'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_add_vendor_owner_to_team
  AFTER INSERT ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION add_vendor_owner_to_team();
