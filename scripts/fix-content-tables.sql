-- Drop and recreate tables with correct schema matching the application code

-- Drop existing tables (they're empty anyway, just created)
DROP TABLE IF EXISTS content_generation_log;
DROP TABLE IF EXISTS indexing_queue;
DROP TABLE IF EXISTS cp_generated_content;

-- Table to store AI-generated content for CP pages
-- Uses a single JSONB column for flexible content storage
CREATE TABLE cp_generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  postal_code VARCHAR(5) NOT NULL,
  profession VARCHAR(50) NOT NULL,
  content JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(postal_code, profession)
);

-- Indexing queue for Google Indexing API
CREATE TABLE indexing_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  postal_code VARCHAR(5) NOT NULL,
  profession VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMP,
  retry_count INTEGER DEFAULT 0,
  response_status INTEGER,
  response_body TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(url)
);

-- Generation log for tracking batch runs
CREATE TABLE content_generation_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_size INTEGER DEFAULT 0,
  cps_generated INTEGER DEFAULT 0,
  pages_generated INTEGER DEFAULT 0,
  errors INTEGER DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'running',
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX idx_cp_content_lookup ON cp_generated_content(postal_code, profession);
CREATE INDEX idx_cp_content_status ON cp_generated_content(status);
CREATE INDEX idx_indexing_queue_status ON indexing_queue(status);
CREATE INDEX idx_indexing_queue_pending ON indexing_queue(status, created_at) WHERE status = 'pending';
CREATE INDEX idx_generation_log_date ON content_generation_log(created_at DESC);
