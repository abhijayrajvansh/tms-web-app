import 'dotenv/config';

const env = {
  // backend
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV as string,
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL as string,
  CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL as string,

  // app abstraction
  USERID_EMAIL: 'tms@uptut.com'
}

export default env;