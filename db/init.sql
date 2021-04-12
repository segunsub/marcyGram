DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS follows CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

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
    post_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    post_id INT REFERENCES posts(id),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE follows(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    follow_user_id INT ,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);