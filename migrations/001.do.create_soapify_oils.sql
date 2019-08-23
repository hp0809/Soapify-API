CREATE TABLE IF NOT EXISTS soapify_oils (
    id SERIAL PRIMARY KEY,
    oil_name TEXT NOT NULL,
    sap_value DECIMAL(4,3) NOT NULL
)