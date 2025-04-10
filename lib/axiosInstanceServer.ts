// lib/axiosInstanceServer.ts
import { cookies } from 'next/headers';
import axios from 'axios';

const axiosInstanceServer = async () => {
  const session = (await cookies()).get('session')?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `session=${session}`,
    },
    withCredentials: true,
  });

  return instance;
};

export default axiosInstanceServer;
