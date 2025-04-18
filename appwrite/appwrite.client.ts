import env from '@/constants';
import { Client, Databases } from 'appwrite';

export const apwrClient = new Client()
  .setEndpoint(env.ENDPOINT)
  .setProject(env.PROJECT_ID)

export const databases = new Databases(apwrClient);

console.log({env})