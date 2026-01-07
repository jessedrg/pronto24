-- Create config table for storing app settings
CREATE TABLE IF NOT EXISTS app_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default values
INSERT INTO app_config (key, value) VALUES 
  ('whatsapp_phone', '34711267223'),
  ('call_phone', '34711267223'),
  ('whatsapp_enabled', 'true'),
  ('call_enabled', 'true')
ON CONFLICT (key) DO NOTHING;
