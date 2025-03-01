-- Your SQL goes here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    users (
        id VARCHAR NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );

CREATE TABLE
    posts (
        id VARCHAR NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
        content TEXT NOT NULL,
        embeds JSONB NOT NULL,
        user_id VARCHAR NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW (),
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        FOREIGN KEY (user_id) REFERENCES users (id)
    );

CREATE TABLE
    comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        posts_id VARCHAR,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW (),
        FOREIGN KEY (posts_id) REFERENCES posts (id)
    );


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();