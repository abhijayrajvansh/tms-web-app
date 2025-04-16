import env from '@/constants';
import { Client, Account, OAuthProvider } from 'appwrite';

const client = new Client()
  .setEndpoint(env.ENDPOINT)
  .setProject(env.PROJECT_ID)

const account = new Account(client);

// Go to OAuth provider login page
const response = account.createOAuth2Session(
  OAuthProvider.Google, // provider
  'http://localhost:3000/dashboard', // redirect here on success
  'http://localhost:3000/login', // redirect here on failure
);

console.log({response})