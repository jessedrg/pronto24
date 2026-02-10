-- Align ai_generation_runs table with the cron code expectations
ALTER TABLE ai_generation_runs ADD COLUMN IF NOT EXISTS pages_processed integer DEFAULT 0;
ALTER TABLE ai_generation_runs ADD COLUMN IF NOT EXISTS pages_success integer DEFAULT 0;
ALTER TABLE ai_generation_runs ADD COLUMN IF NOT EXISTS pages_error integer DEFAULT 0;
ALTER TABLE ai_generation_runs ADD COLUMN IF NOT EXISTS duration_ms integer DEFAULT 0;
ALTER TABLE ai_generation_runs ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT NOW();

-- Add ai_error_message to page_content for tracking errors per page
ALTER TABLE page_content ADD COLUMN IF NOT EXISTS ai_error_message text;

-- Ensure ai_status has an index for fast filtering
CREATE INDEX IF NOT EXISTS idx_page_content_ai_status ON page_content (ai_status);

-- Ensure the unique constraint exists for upsert logic
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'uq_page_content_profession_city_problem_modifier'
  ) THEN
    ALTER TABLE page_content ADD CONSTRAINT uq_page_content_profession_city_problem_modifier
      UNIQUE (profession_id, city_slug, problem_id, modifier);
  END IF;
EXCEPTION WHEN others THEN
  -- constraint may already exist with COALESCE expression, ignore
  NULL;
END $$;
