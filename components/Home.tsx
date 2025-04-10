'use client';

import { useAuth } from '@/app/context/AuthContext';
import React from 'react';

interface HomeProps {
  orders: Order[]
}

interface Order {
  $id: string;
  customer: string;
  customer_email: string;
  status: string;
  type: string;
  total: number;
}

const Home = ({ orders }: HomeProps ) => {
  const { user } = useAuth();

  return (
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
  );
};

export default Home;
