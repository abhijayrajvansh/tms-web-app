import { createAdminClient } from '@/appwrite/appwrite.config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    if (!userId || !secret) {
      console.error('Missing userId or secret in OAuth callback');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);

    (await cookies()).set('session', session.secret, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(session.expire),
      path: '/',
    });

    return NextResponse.redirect(new URL('/login', request.url));
  } 
  catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
