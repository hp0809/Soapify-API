BEGIN;

TRUNCATE
    soapify_oils,
    soapify_users,
    user_soaps
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

INSERT INTO user_soaps (name, text, user_id)
VALUES
    ('soap 1', 'this is soap number 1', 1),
    ('soap 2', 'this is soap number 2', 1),
    ('soap 3', 'this is soap number 3', 2),
    ('soap 4', 'this is soap number 4', 2),
    ('soap 5', 'this is soap number 5', 2),
    ('soap 6', 'this is soap number 6', 3),
    ('soap 7', 'this is soap number 7', 4),
    ('soap 8', 'this is soap number 8', 4),
    ('soap 9', 'this is soap number 9', 5),
    ('soap 10', 'this is soap number 10', 5),
    ('soap 11', 'this is soap number 11', 5);

COMMIT;
