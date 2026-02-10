-- Remove empty seeded rows that were created by the old seeding approach
-- Only deletes rows with ai_status = 'pending' (never generated)
DELETE FROM page_content WHERE ai_status = 'pending' OR ai_status IS NULL;

-- Also clean up any stuck 'generating' rows
UPDATE page_content SET ai_status = 'error', ai_error_message = 'Stuck in generating state' 
WHERE ai_status = 'generating';
