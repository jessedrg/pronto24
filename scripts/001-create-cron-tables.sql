-- Create tables needed for cron jobs: generate-content and submit-indexing

-- 1. Table for AI-generated content per postal code + profession
CREATE TABLE IF NOT EXISTS cp_generated_content (
  id SERIAL PRIMARY KEY,
  postal_code VARCHAR(10) NOT NULL,
  profession VARCHAR(100) NOT NULL,
  content JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(postal_code, profession)
);

CREATE INDEX IF NOT EXISTS idx_cp_content_postal ON cp_generated_content(postal_code);
CREATE INDEX IF NOT EXISTS idx_cp_content_profession ON cp_generated_content(profession);
CREATE INDEX IF NOT EXISTS idx_cp_content_status ON cp_generated_content(status);

-- 2. Table for Google Indexing API queue
CREATE TABLE IF NOT EXISTS indexing_queue (
  id SERIAL PRIMARY KEY,
  postal_code VARCHAR(10) NOT NULL,
  profession VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  retry_count INT DEFAULT 0,
  submitted_at TIMESTAMPTZ,
  response_status INT,
  response_body TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(postal_code, profession)
);

CREATE INDEX IF NOT EXISTS idx_indexing_status ON indexing_queue(status);
CREATE INDEX IF NOT EXISTS idx_indexing_created ON indexing_queue(created_at);

-- 3. Table for logging each cron batch execution
CREATE TABLE IF NOT EXISTS content_generation_log (
  id SERIAL PRIMARY KEY,
  batch_size INT,
  cps_generated INT,
  pages_generated INT,
  errors INT DEFAULT 0,
  duration_ms INT,
  status VARCHAR(20) DEFAULT 'completed',
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
