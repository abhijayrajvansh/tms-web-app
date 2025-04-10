// app/actions/submitPost.ts
'use server';

import axiosInstance from '@/lib/axiosInstance';

export async function submitOrderAction(formData: FormData) {
  const status = formData.get('status');
  const customer = formData.get('customer');
  const customer_email = formData.get('customer_email');
  const total = Number(formData.get('total'));
  const type = formData.get('type');

  const res = await axiosInstance(
    {
      api: '/orders/create',
      method: 'post',
    },
    {
      status,
      customer,
      customer_email,
      total,
      type,
    },
  );

  return res.data;
}
