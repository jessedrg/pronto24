-- Fix: Drop and recreate tables with proper UNIQUE constraints
-- The previous migration may have failed partially, creating tables without constraints

-- Drop existing tables (they have no data yet)
DROP TABLE IF EXISTS content_generation_log;
DROP TABLE IF EXISTS indexing_queue;
DROP TABLE IF EXISTS cp_generated_content;

-- 1. Table for AI-generated content per postal code + profession
CREATE TABLE cp_generated_content (
  id SERIAL PRIMARY KEY,
  postal_code VARCHAR(10) NOT NULL,
  profession VARCHAR(100) NOT NULL,
  content JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(postal_code, profession)
);

CREATE INDEX idx_cp_content_postal ON cp_generated_content(postal_code);
CREATE INDEX idx_cp_content_profession ON cp_generated_content(profession);
CREATE INDEX idx_cp_content_status ON cp_generated_content(status);

-- 2. Table for Google Indexing API queue
CREATE TABLE indexing_queue (
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

CREATE INDEX idx_indexing_status ON indexing_queue(status);
CREATE INDEX idx_indexing_created ON indexing_queue(created_at);

-- 3. Table for logging each cron batch execution
CREATE TABLE content_generation_log (
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
