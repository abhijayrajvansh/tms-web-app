import React from 'react';

import auth from '@/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/app/context/AuthContext';

export const dynamic = 'force-dynamic';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  let user = null;

  try {
    user = await auth.getUser() 
    if(!user) throw new Error('no user session')
  } 
  catch (error) {
    console.error('error:', error)
    redirect('/login');
  }

  return (
    <AuthProvider user={user}>
      {children}
    </AuthProvider>
  );
}