import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className='flex items-center justify-center flex-col gap-3'>
        <p className='font-medium text-3xl'>home</p>
        <Link href={'/login'} className='text-blue-600 hover:underline'>click here to login</Link>
      </div>
    </div>
  );
};

export default page;
