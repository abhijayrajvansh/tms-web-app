'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { submitOrderAction } from '@/app/actions/submitOrder';

interface HomeProps {
  orders: Order[];
}

interface Order {
  $id: string;
  customer: string;
  customer_email: string;
  status: string;
  type: string;
  total: number;
}

const Home = ({ orders }: HomeProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    status: '',
    customer: '',
    customer_email: '',
    total: '',
    type: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    await submitOrderAction(form);
  };

  return (
    <div id="orders-container">
      <strong>Orders</strong>
      <p>Recent orders from your store.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={formData.customer}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="customer_email"
          placeholder="Customer Email"
          value={formData.customer_email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="total"
          placeholder="Total"
          value={formData.total}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="PENDING">PENDING</option>
          <option value="FULFILLED">FULFILLED</option>
          <option value="DECLINED">DECLINED</option>
        </select>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Purchase">Purchase</option>
          <option value="Refund">Refund</option>
        </select>
        <button type="submit">Create Order</button>
      </form>

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
