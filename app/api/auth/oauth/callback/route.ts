import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const userId = searchParams.get('userId');

    if (!secret || !userId) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Set the session cookie
    (await cookies()).set('session', secret, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
    });

    return Response.redirect(new URL('/dashboard', request.url));
  } 
  catch (error) {
    console.error('OAuth callback error:', error);
    return Response.redirect(new URL('/login', request.url));
  }
}
