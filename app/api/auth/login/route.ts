import { createAdminClient } from '@/appwrite/appwrite.config';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    const response = NextResponse.redirect(new URL('/dashboard', request.url));

    response.cookies.set('session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(session.expire),
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
