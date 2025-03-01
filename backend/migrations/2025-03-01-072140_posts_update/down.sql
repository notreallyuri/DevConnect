-- This file should undo anything in `up.sql`
ALTER TABLE comments ALTER COLUMN posts_id DROP NOT NULL;