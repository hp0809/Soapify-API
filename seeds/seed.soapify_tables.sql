BEGIN;

TRUNCATE
    soapify_oils
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
COMMIT;
