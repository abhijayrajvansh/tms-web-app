'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Card } from './ui/card';
import { getNotifications, type Notification } from '@/services/notification.service';
import { useAuth } from '@/app/context/AuthContext';
import { BellIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { apwrClient } from '@/appwrite/appwrite.client';

type NotificationResponse = {
  documents: Notification[];
};

const NotificationPanel = () => {
  const { user } = useAuth();
  const userId = user?.$id!;

  // let isLoading = false;
  
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const channel = 'databases.67f637ce00137a23dade.collections.68011c7f000f820677a2.documents';
    
    const unsubscribe = apwrClient.subscribe(channel, (response) => {
      console.log('if this logs, then the subscription is working');
      const eventType = response.events[0];
      console.log(response.events); //debug

      const changedNotifs = response.payload as Notification

      if (eventType.includes('create')) {
        setNotifications((prevNotifs) => [changedNotifs, ...prevNotifs]);
      }

      // similary for update (mark as read) 
    })

    return () => unsubscribe();
  }, [])

  const { data, isLoading } = useQuery<NotificationResponse>({
    queryKey: ['notifications', userId],
    queryFn: () => getNotifications(userId),
    enabled: !!userId,
    staleTime: 1000 * 60, // 1 minute
  });

  useEffect(() => {
    if (data) {
      setNotifications(data.documents);
    }
  }, [data]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 hover:bg-slate-100 rounded-full relative">
          <BellIcon size={23} />
          {notifications.some((n) => !n.is_read) && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0 rounded-xl" align="end">
        <Card className="border-0 shadow-none">
          <h3 className="font-semibold text-xl py-1 pl-4 pb-2 border-b">Notifications</h3>
          <ScrollArea className="h-[400px]">
            <div className="p-4">
              {isLoading && <p>loading...</p>}
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`mb-4 p-3 border rounded-lg hover:bg-slate-50 ${
                    !notification.is_read ? 'bg-slate-50' : ''
                  }`}
                >
                  <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                </div>
              ))}
              {!isLoading && notifications.length === 0 && (
                <p className="text-center text-gray-500">No notifications</p>
              )}
            </div>
          </ScrollArea>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPanel;
