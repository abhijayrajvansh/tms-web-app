import axiosInstance from '@/lib/axiosInstance';
import Home from '@/components/Home';
import auth from '@/auth';
import { hasPermission } from '@/appwrite/appwrite.permission';

export default async function Page() {
  let orders;

  try {
    const response = await axiosInstance({
      api: 'orders',
      method: 'get',
    });

    orders = response.data.orders;
  } catch (error) {
    console.error('Error', error);
  }

  const user = await auth.getUser();
  const collectionID = process.env.NEXT_PUBLIC_COLLECTION_ORDERS as string;

  const canReadOrders = await hasPermission(user.$id, collectionID, 'read')

  
  return (
    <main className="container mx-auto max-w-[800px]">
      {canReadOrders && <Home orders={orders} />}
    </main>
  );
}
