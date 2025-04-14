import React from 'react';

import auth from '@/auth';
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/app/context/AuthContext';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await auth.getUser();
  if (user) redirect('/dashboard');

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
