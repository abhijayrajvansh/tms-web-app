import React from 'react';
import Header from '@/components/Header';

import auth from '@/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/app/context/AuthContext';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  let user = null;

  try {
    const sessionCookie = (await cookies()).get('session');
    if (!sessionCookie) throw new Error('No session');

    user = await auth.getUser() 
  } 
  catch (error) {
    redirect('/login');
  }

  return (
    <AuthProvider user={user}>
      <Header />
      {children}
    </AuthProvider>
  );
}