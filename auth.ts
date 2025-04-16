// @ts-nocheck
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createAdminClient, createSessionClient } from '@/appwrite/appwrite.config';
import type { Models } from 'node-appwrite';

export type UserModel = Models.User;

const auth = {
  user: null,
  sessionCookie: null,

  getUser: async (): Promise<UserModel | null> => {
    auth.sessionCookie = (await cookies()).get('session');
    if (!auth.sessionCookie?.value) {
      return null;
    }

    try {
      const { account } = await createAdminClient();

      // Try to get user with JWT first
      try {
        await account.getJWT();
        auth.user = await account.get();
        return auth.user;
      } catch {
        // If JWT fails, try regular session
        try {
          const { account: sessionAccount } = await createSessionClient(auth.sessionCookie.value);
          auth.user = await sessionAccount.get();
          return auth.user;
        } catch {
          auth.user = null;
          auth.sessionCookie = null;
          return null;
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      auth.user = null;
      auth.sessionCookie = null;
      return null;
    }
  },

  createSession: async (formData: FormData) => {
    'use server';

    const data = Object.fromEntries(formData);
    const { email, password } = data;
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set('session', session.secret, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(session.expire),
      path: '/',
    });

    redirect('/');
  },

  deleteSession: async () => {
    'use server';
    auth.sessionCookie = (await cookies()).get('session');
    try {
      const { account } = await createSessionClient(auth.sessionCookie.value);
      await account.deleteSession('current');
    } catch (error) {}

    (await cookies()).delete('session');
    auth.user = null;
    auth.sessionCookie = null;
    redirect('/login');
  },
};

export default auth;
