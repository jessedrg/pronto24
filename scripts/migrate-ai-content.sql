-- Migration: Add AI-generated unique content system
-- This extends the existing page_content table and adds tracking for the AI generation cron

-- Add AI content columns to page_content if they don't exist
ALTER TABLE page_content 
  ADD COLUMN IF NOT EXISTS ai_intro TEXT,
  ADD COLUMN IF NOT EXISTS ai_local_context TEXT,
  ADD COLUMN IF NOT EXISTS ai_service_details TEXT,
  ADD COLUMN IF NOT EXISTS ai_pricing_info TEXT,
  ADD COLUMN IF NOT EXISTS ai_prevention_tips TEXT,
  ADD COLUMN IF NOT EXISTS ai_faqs JSONB,
  ADD COLUMN IF NOT EXISTS ai_testimonial_seeds JSONB,
  ADD COLUMN IF NOT EXISTS ai_neighborhood_info TEXT,
  ADD COLUMN IF NOT EXISTS ai_seasonal_tips TEXT,
  ADD COLUMN IF NOT EXISTS ai_emergency_guide TEXT,
  ADD COLUMN IF NOT EXISTS ai_generated_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS ai_model TEXT,
  ADD COLUMN IF NOT EXISTS ai_word_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_status VARCHAR(20) DEFAULT 'pending';

-- Create index for fast lookup of pages needing generation
CREATE INDEX IF NOT EXISTS idx_page_content_ai_status ON page_content(ai_status);
CREATE INDEX IF NOT EXISTS idx_page_content_city_prof ON page_content(city_slug, profession_id);

-- Create the cron job tracking table
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

-- Create index for finding active runs
CREATE INDEX IF NOT EXISTS idx_ai_gen_runs_status ON ai_generation_runs(status);
