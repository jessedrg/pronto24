-- Migration v2: Add unique constraint and indexes for AI content generation cron

-- Add unique constraint for upsert support (profession_id + city_slug + problem_id + modifier)
-- First handle NULLs by setting defaults
UPDATE page_content SET problem_id = '' WHERE problem_id IS NULL;
UPDATE page_content SET modifier = '' WHERE modifier IS NULL;

-- Create the unique index (handles the combo lookups)
CREATE UNIQUE INDEX IF NOT EXISTS idx_page_content_unique_combo 
  ON page_content(profession_id, city_slug, COALESCE(problem_id, ''), COALESCE(modifier, ''));

-- Index for quickly finding pending pages 
CREATE INDEX IF NOT EXISTS idx_page_content_pending 
  ON page_content(ai_status) WHERE ai_status = 'pending' OR ai_status IS NULL;
