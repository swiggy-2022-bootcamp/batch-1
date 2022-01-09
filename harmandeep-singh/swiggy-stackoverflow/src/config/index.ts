export const config = {
    BASE_URL: '/api',
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URI: process.env.DB_URI || 'mongodb+srv://singhhrmn7:12345@harman.uzebn.mongodb.net/stackoverflow?retryWrites=true&w=majority',
    JWT_SECRET: process.env.SECRET || 'secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
    STATUS: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
};