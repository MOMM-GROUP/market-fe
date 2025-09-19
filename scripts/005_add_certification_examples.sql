-- Add some example certifications for BLUELAND
DO $$
DECLARE
    blueland_vendor_id UUID;
    bcorp_cert_id UUID;
    cradle_cert_id UUID;
BEGIN
    -- Get BLUELAND vendor ID
    SELECT id INTO blueland_vendor_id FROM vendors WHERE name = 'BLUELAND';
    
    -- Get certification IDs
    SELECT id INTO bcorp_cert_id FROM certifications WHERE name = 'B Corp Certified';
    SELECT id INTO cradle_cert_id FROM certifications WHERE name = 'Cradle to Cradle Certified';
    
    -- Add B Corp certification for BLUELAND vendor
    INSERT INTO entity_certifications (certification_id, entity_id, entity_type, details, verified_at) VALUES
    (bcorp_cert_id, blueland_vendor_id, 'vendor', '{"score": 95.3, "assessment_year": 2024, "impact_areas": ["Environment", "Workers", "Community"]}', '2024-01-15')
    ON CONFLICT DO NOTHING;
    
    -- Add Cradle to Cradle certification for The Tablet Trio product
    INSERT INTO entity_certifications (certification_id, entity_id, entity_type, details, verified_at) VALUES
    (cradle_cert_id, (SELECT id FROM products WHERE sku = 'BL-TABLET-TRIO'), 'product', '{"level": "Bronze", "material_health": "Good", "renewable_energy": "Silver"}', '2023-08-20')
    ON CONFLICT DO NOTHING;
    
END $$;
