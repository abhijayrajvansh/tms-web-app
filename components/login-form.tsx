'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';
import { useLogin } from '@/hooks/useAuth';

interface FormData {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const login = useLogin();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate(formData);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl mb-3">Login</CardTitle>
          <CardDescription className="text-black text-base">Enter your credentials</CardDescription>
          {login.error && (
            <p className="text-red-500 text-sm mt-2">
              {(login.error as Error).message || 'Login failed'}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">User ID</Label>
                <Input
                  className="py-5"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="123456789"
                  required
                  disabled={login.isPending}
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  className="py-5"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled={login.isPending}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full py-5 mb-1 bg-blue-600"
                  disabled={login.isPending}
                >
                  {login.isPending ? 'Logging in...' : 'Login'}
                </Button>

                <div className="flex items-center justify-center bred">
                  <div className="border-t w-[90%]"></div>
                </div>

                <Button variant="outline" className="w-full py-5 mt-1">
                  Sign in with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="hover:underline text-blue-600 underline-offset-4">
                Sign up here!
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
