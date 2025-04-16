import { createAdminClient } from '@/appwrite/appwrite.config';
import env from '@/constants';
import { OAuthProvider } from 'node-appwrite';

export async function POST() {
  try {
    const { account } = await createAdminClient();
    
    const url = await account.createOAuth2Token(
      OAuthProvider.Google, 
      `${env.SERVER_URL}/api/auth/oauth/callback`, 
      `${env.SERVER_URL}/login`
    );

    return Response.json({ url });
  } catch (error) {
    console.error('Google auth error:', error);
    return Response.json({ error: 'Failed to initialize Google auth' }, { status: 500 });
  }
}
