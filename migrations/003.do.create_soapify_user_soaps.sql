CREATE TABLE user_soaps (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    user_id INTEGER
        REFERENCES soapify_users(id) ON DELETE CASCADE NOT NULL
);
