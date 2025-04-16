'use client';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useAuth';
import React from 'react';

const Dashboard = () => {
  const logout = useLogout();
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 justify-center">
        <div>dashbaord page</div>
        <Button onClick={() => logout.mutate()} variant={'destructive'} className='cursor-pointer hover:bg-red-500'>
          logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
