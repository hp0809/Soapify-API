module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://hp0809:hp0809@localhost/soapifydb',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
}