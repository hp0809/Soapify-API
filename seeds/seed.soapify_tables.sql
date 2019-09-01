BEGIN;

TRUNCATE
    soapify_oils,
    soapify_users
    RESTART IDENTITY CASCADE;

INSERT INTO soapify_oils (oil_name, sap_value)
VALUES
    ('Palm Oil', 0.142),
    ('Coconut Oil', 0.183),
    ('Animal Lard', 0.141),
    ('Shea Butter', 0.128),
    ('Tallow', 0.140),
    ('Almond Oil', 0.139),
    ('Olive Oil', 0.135),
    ('Argan Oil', 0.188),
    ('Avocado Oil', 0.133),
    ('Castor Oil', 0.128);

INSERT INTO soapify_users (user_name, password, nickname, email)
VALUES
    ('user123', 'Password1', 'hello', 'user123@gmail.com'),
    ('user124', 'Password1', 'Slim Shady', 'user124@gmail.com'),
    ('user125', 'Password1', 'Hali', 'user125@gmail.com'),
    ('user126', 'Password1', 'Kazu', 'user126@gmail.com'),
    ('user127', 'Password1', 'Ro J', 'user127@gmail.com');

COMMIT;
