import React from 'react';
import auth from '@/auth';
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/app/context/AuthContext';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export const dynamic = 'force-dynamic';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await auth.getUser();
  if (!user) redirect('/login')

  return (
    <AuthProvider user={user}>
      <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
    </AuthProvider>
  );
}