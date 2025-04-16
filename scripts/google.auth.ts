import { createAdminClient } from '@/appwrite/appwrite.config';
import { OAuthProvider } from 'appwrite';
import env from '@/constants';
import "dotenv/config";

async function main() {
  const { account } = await createAdminClient();
  const baseUrl = env.CLIENT_URL

  const googleCallbackUrl = new URL('/api/auth/oauth/callback', baseUrl).toString();
  const failedLoginRedirect = new URL('/login', baseUrl).toString();

  const res = await account.createOAuth2Token(
    OAuthProvider.Google,
    googleCallbackUrl,
    failedLoginRedirect,
  );

  console.log({ res });
}

main();
