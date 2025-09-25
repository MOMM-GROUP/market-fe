-- Add updated_at trigger for certifications table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_certifications_updated_at 
    BEFORE UPDATE ON certifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entity_certifications_updated_at 
    BEFORE UPDATE ON entity_certifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
