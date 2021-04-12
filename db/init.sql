DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name text,
    email text,
    encrypted_password text,
    pfpurl text DEFAULT 'https://img.icons8.com/carbon-copy/2x/image.png',
    img_path text,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

SET TIMEZONE = 'GMT';

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    likes_count INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    post_id INT REFERENCES posts(id),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);