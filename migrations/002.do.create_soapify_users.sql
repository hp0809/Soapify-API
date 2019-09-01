CREATE TABLE soapify_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nickname TEXT,
  email TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);
