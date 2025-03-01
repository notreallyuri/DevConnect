-- This file should undo anything in `up.sql`
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

DROP FUNCTION IF EXISTS update_updated_at_column;