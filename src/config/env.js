import dotenv from 'dotenv';
dotenv.config();
const env = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    APP_PASSWORD: process.env.APP_PASSWORD,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES,
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES
}
export default env;