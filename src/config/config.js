import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    // JWT_SECRET: process.env.JWT_SECRET,
    // url: process.env.DATABASE_URL,
    
    username:'postgres',
    password:'admin',
    database:'postgres',
    host: 'localhost',
   
    port: 5432,
    dialect: process.env.DB_DIALECT,
    // sendgridAPIKey: process.env.SENGRID_API_KEY,
    // senderEmail: process.env.SENDER_EMAIL
  },
  test: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.TEST_URL,
    dialect: 'postgres',
    port: process.env.PORT,
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.PROD_URL,
    dialect: 'postgres',
    port: process.env.PORT,
   
  }
};


export default config;