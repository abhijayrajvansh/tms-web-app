'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Card } from './ui/card';
import { useAuth } from '@/app/context/AuthContext';

interface Notification {
  $id: string;
  message: string;
  $createdAt: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

const NotificationPanel = () => {

  const {user} = useAuth();

  const { data: notifications, isLoading } = useQuery<{ documents: Notification[] }>({
    queryKey: ['notifications', user?.$id],
    queryFn: async () => {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.$id }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      return response.json();
    },
    enabled: !!user?.$id,
  });

  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <Card className="w-[380px] p-4">
      <h3 className="font-semibold text-lg mb-4">Notifications</h3>
      <ScrollArea className="h-[300px] rounded-md">
        {notifications?.documents.map((notification) => (
          <div key={notification.$id} className="mb-4 p-3 border rounded-lg hover:bg-slate-50">
            <p className="text-sm text-gray-800">{notification.message}</p>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(notification.$createdAt), { addSuffix: true })}
            </span>
          </div>
        ))}
        {(!notifications?.documents || notifications.documents.length === 0) && (
          <p className="text-center text-gray-500">No notifications</p>
        )}
      </ScrollArea>
    </Card>
  );
};

export default NotificationPanel;
