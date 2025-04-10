import axiosInstance from '@/lib/axiosInstance';
import Home from '@/components/Home';
import auth from '@/auth';

export default async function Page() {
  let orders;
  
  try {
    const response = await axiosInstance({
      api: 'orders',
      method: 'get',
    });
  
    orders = response.data.orders;
  } 
  catch (error) {
    console.error('Error', error)
  }

  const user = await auth.getUser();
  console.log('user id:', user.$id)

  return (
    <main className="container mx-auto max-w-[800px]">
      <Home orders={orders}/>
    </main>
  );
}
