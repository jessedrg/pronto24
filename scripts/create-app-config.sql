CREATE TABLE IF NOT EXISTS app_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default phone config
INSERT INTO app_config (key, value)
VALUES ('phone_config', '{"activePhoneId":"phone1"}')
ON CONFLICT (key) DO NOTHING;

INSERT INTO app_config (key, value)
VALUES ('active_phone', 'phone1')
ON CONFLICT (key) DO NOTHING;
