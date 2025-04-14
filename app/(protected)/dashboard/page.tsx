'use client'

import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useAuth';
import React from 'react';

const page = () => {

  const logout = useLogout()

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 justify-center">
        <div>dashbaord page</div>
        <Button onClick={() => logout.mutate()} variant={'destructive'}>logout</Button>
      </div>
    </div>
  );
};

export default page;
