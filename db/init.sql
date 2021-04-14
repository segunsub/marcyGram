DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS follows CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    encrypted_password TEXT,
    pfpurl TEXT DEFAULT 'https://img.icons8.com/carbon-copy/2x/image.png',
    file_src TEXT,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

SET TIMEZONE = 'GMT'; 

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    likes_count INT,
    post_content TEXT,
    post_src TEXT,
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