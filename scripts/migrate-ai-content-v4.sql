-- Make original content columns nullable so we can seed pending rows
-- The AI cron seeds rows with only profession_id, city_slug, page_url, ai_status
-- The old content columns (intro, dato, consejo, barrios) are from the old system
-- and should be nullable since AI content replaces them

ALTER TABLE page_content ALTER COLUMN intro DROP NOT NULL;
ALTER TABLE page_content ALTER COLUMN dato DROP NOT NULL;
ALTER TABLE page_content ALTER COLUMN consejo DROP NOT NULL;
ALTER TABLE page_content ALTER COLUMN barrios DROP NOT NULL;
