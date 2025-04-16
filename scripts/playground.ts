import 'dotenv/config'
import { Client, Account, OAuthProvider } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string); // Your project ID

const account = new Account(client);

// Go to OAuth provider login page
const res = account.createOAuth2Session(
  OAuthProvider.Google, // provider
  'http://localhost:3000/dashboard', // redirect here on success
  'http://localhost:3000/login', // redirect here on failure
);

console.log({res})