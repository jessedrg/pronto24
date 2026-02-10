-- Simple key-value table for runtime flags (e.g. stop signals)
CREATE TABLE IF NOT EXISTS kv_flags (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT 'true',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
