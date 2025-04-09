import axiosInstance from '@/lib/axiosInstance';

interface Order {
  $id: string;
  customer: string;
  customer_email: string;
  status: string;
  type: string;
  total: number;
}

export default async function Home() {
  let orders;
  
  try {
    const response = await axiosInstance({
      url: 'http://localhost:3000/api/orders',
      method: 'get',
    });
  
    orders = response.data.orders;
  } 
  catch (error) {
    console.error('Error', error)
  }

  return (
    <main className="container mx-auto max-w-[800px]">
      <div id="orders-container">
        <strong>Orders</strong>
        <p>Recent orders from your store.</p>

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Status</th>
              <th>Type</th>
              <th>Total</th>
            </tr>
          </thead>
          
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order.$id}>
                <td className="flex flex-col">
                  <strong>{order.customer}</strong>
                  <p>{order.customer_email}</p>
                </td>
                <td>{order.status}</td>
                <td>{order.type}</td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
