import React from 'react';
import auth from '@/auth';
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/app/context/AuthContext';

export const dynamic = 'force-dynamic';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await auth.getUser();
  if (!user) redirect('/login')

  return (
    <AuthProvider user={user}>
      {children}
    </AuthProvider>
  );
}