import 'dotenv/config';

const env = {
  // backend
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV as string,
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL as string,
  // CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL as string,
  
  // appwrite config & client
  ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT as string,
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY as string,
  DATABASE_ID: process.env.NEXT_PUBLIC_DATABASE_ID as string,
  
    // appwrite collections
    COLLECTION_ORDERS: process.env.NEXT_PUBLIC_COLLECTION_ORDERS as string,
    COLLECTION_NOTIFICATIONS: process.env.NEXT_PUBLIC_COLLECTION_NOTIFICATIONS as string,  

  // appwrite app abstraction for userID email 
  USERID_EMAIL: 'tms@uptut.com',
}

export default env;