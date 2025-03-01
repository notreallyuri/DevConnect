-- Your SQL goes here
ALTER TABLE comments
ADD COLUMN author_id VARCHAR NOT NULL REFERENCES users(id)