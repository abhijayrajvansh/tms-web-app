// lib/axiosInstanceClient.ts
import axios from 'axios';

const axiosInstanceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true, // 🔥 required to send cookies from browser automatically
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstanceClient;
