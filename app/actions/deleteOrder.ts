'use server';

import axiosInstance from '@/lib/axiosInstance';

export async function deleteOrderAction(orderId: string) {
  const res = await axiosInstance({
    api: `/orders/delete?id=${orderId}`,
    method: 'delete',
  });

  return res.data;
}
