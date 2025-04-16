import { createAdminClient } from '@/appwrite/appwrite.config';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set('session', session.secret, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(session.expire),
      path: '/',
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
