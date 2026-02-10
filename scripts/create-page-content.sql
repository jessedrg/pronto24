-- Create the page_content table for AI-generated content
CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  profession_id VARCHAR(50) NOT NULL,
  city_slug VARCHAR(200) NOT NULL,
  problem_id VARCHAR(100),
  modifier VARCHAR(100),
  page_url TEXT,
  
  -- Legacy content columns (nullable)
  intro TEXT,
  dato TEXT,
  consejo TEXT,
  barrios TEXT,
  
  -- AI-generated content columns
  ai_intro TEXT,
  ai_local_context TEXT,
  ai_service_details TEXT,
  ai_pricing_info TEXT,
  ai_prevention_tips TEXT,
  ai_faqs JSONB,
  ai_testimonial_seeds JSONB,
  ai_neighborhood_info TEXT,
  ai_seasonal_tips TEXT,
  ai_emergency_guide TEXT,
  ai_generated_at TIMESTAMP WITH TIME ZONE,
  ai_model TEXT,
  ai_word_count INTEGER DEFAULT 0,
  ai_status VARCHAR(20) DEFAULT 'pending',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint: one row per profession+city+problem combination
  UNIQUE(profession_id, city_slug, COALESCE(problem_id, ''))
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_page_content_ai_status ON page_content(ai_status);
CREATE INDEX IF NOT EXISTS idx_page_content_city_prof ON page_content(city_slug, profession_id);
CREATE INDEX IF NOT EXISTS idx_page_content_lookup ON page_content(profession_id, city_slug, problem_id);

-- Cron job tracking table
CREATE TABLE IF NOT EXISTS ai_generation_runs (
  id SERIAL PRIMARY KEY,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'running',
  total_pages INTEGER DEFAULT 0,
  pages_generated INTEGER DEFAULT 0,
  pages_skipped INTEGER DEFAULT 0,
  pages_errored INTEGER DEFAULT 0,
  current_city TEXT,
  current_profession TEXT,
  batch_size INTEGER DEFAULT 5,
  error_log JSONB DEFAULT '[]'::jsonb,
  model_used TEXT,
  avg_generation_time_ms INTEGER DEFAULT 0,
  total_tokens_used INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_ai_gen_runs_status ON ai_generation_runs(status);
