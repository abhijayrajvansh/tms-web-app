'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { submitOrderAction } from '@/app/actions/submitOrder';
import { deleteOrderAction } from '@/app/actions/deleteOrder';
import { Button } from './ui/button';

interface HomeProps {
  orders: Order[];
  permissions: Permissions;
}

interface Order {
  $id: string;
  customer: string;
  customer_email: string;
  status: string;
  type: string;
  total: number;
}

interface Permissions {
  canReadOrders: boolean;
  canCreateOrders: boolean;
  canUpdateOrders: boolean;
  canDeleteOrders: boolean;
}

const Home = ({ orders, permissions }: HomeProps) => {
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

  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrderAction(orderId);
      // Refresh the page to show updated orders
      window.location.reload();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div id="orders-container">
      <strong>Orders</strong>
      <p>Recent orders from your store.</p>

      {permissions.canCreateOrders && (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <input
              className="rounded-lg border"
              type="text"
              name="customer"
              placeholder="Customer Name"
              value={formData.customer}
              onChange={handleChange}
              required
            />
            <input
              className="rounded-lg border"
              type="email"
              name="customer_email"
              placeholder="Customer Email"
              value={formData.customer_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between mt-3">
            <input
              className="rounded-lg border"
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
            <Button type="submit">Create Order</Button>
          </div>
        </form>
      )}

      {permissions.canReadOrders && (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Status</th>
              <th>Type</th>
              <th>Total</th>
              {permissions.canDeleteOrders && <th>Actions</th>}
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
                {permissions.canDeleteOrders && (
                  <td>
                    <Button
                      onClick={() => handleDelete(order.$id)}
                      className="text-white bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
