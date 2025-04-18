'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { Card } from './ui/card';
import { getNotifications, type Notification } from '@/services/notification.service';
import { useAuth } from '@/app/context/AuthContext';
import { BellIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useRealtimeNotifications from '@/hooks/useRealtimeNotifications';
import { toast } from 'sonner';

const NotificationPanel = () => {
  const { user } = useAuth();
  const userId = user?.$id;
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchNotifications() {
    if (!userId) return [];
    try {
      const res = await getNotifications(userId);
      console.log('Fetched notifications:', res);
      return res.documents as Notification[];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast('Error', {
        description: 'Failed to fetch notifications',
      });
      return [];
    }
  }

  // Handle new notifications from realtime
  const handleNewNotification = (payload: Notification) => {
    console.log('New notification received:', payload);

    // Play notification sound
    try {
      const audio = new Audio('/notification-sound.mp3');
      audio.play().catch((e) => console.log('Unable to play notification sound', e));
    } catch (e) {
      console.log('Audio playback error:', e);
    }

    setNotifs((prev) => {
      // Check if notification already exists to avoid duplicates
      const exists = prev.some((n) => n.id === payload.id);
      if (exists) return prev;

      toast(payload.title, {
        description: payload.description,
      });

      return [payload, ...prev];
    });
  };

  // Use the custom hook for realtime notifications and get connection status
  const { connected } = useRealtimeNotifications({
    userId: userId || '',
    onNotification: handleNewNotification,
  });

  // Show toast when connection status changes
  useEffect(() => {
    if (connected) {
      toast('Connected', {
        description: 'Realtime notifications are now active',
      });
    }
  }, [connected, toast]);

  // Initial fetch of notifications
  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchNotifications()
        .then(setNotifs)
        .finally(() => setLoading(false));
    }
  }, [userId]);

  // Refresh notifications every 30 seconds as a fallback if realtime fails
  useEffect(() => {
    if (!userId) return;

    const intervalId = setInterval(() => {
      console.log('Performing backup notification fetch');
      fetchNotifications().then((notifications) => {
        setNotifs((current) => {
          // Merge and deduplicate notifications
          const combinedNotifications = [...notifications];

          current.forEach((existingNotif) => {
            if (!combinedNotifications.some((n) => n.id === existingNotif.id)) {
              combinedNotifications.push(existingNotif);
            }
          });

          // Sort by creation time (newest first)
          return combinedNotifications.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
        });
      });
    }, 30000);

    return () => clearInterval(intervalId);
  }, [userId]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 hover:bg-slate-100 rounded-full relative">
          <BellIcon size={23} />
          {notifs.some((n) => !n.is_read) && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0 rounded-xl" align="end">
        <Card className="border-0 shadow-none">
          <div className="flex justify-between items-center border-b">
            <h3 className="font-semibold text-xl py-1 pl-4 pb-2">Notifications</h3>
            {connected ? (
              <span className="text-xs text-green-500 pr-4">● Live</span>
            ) : (
              <span className="text-xs text-red-500 pr-4">● Offline</span>
            )}
          </div>
          <ScrollArea className="h-[400px]">
            {userId ? (
              <div className="p-4">
                {loading && <p>loading...</p>}
                {notifs.length > 0
                  ? notifs.map((notification) => (
                      <div
                        key={notification.id}
                        className={`mb-4 p-3 border rounded-lg hover:bg-slate-50 ${
                          !notification.is_read ? 'bg-slate-50' : ''
                        }`}
                      >
                        <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    ))
                  : !loading && <p className="text-center text-gray-500">No notifications</p>}
              </div>
            ) : (
              <div className="p-4">
                <p className="text-center text-gray-500">Please log in to see notifications</p>
              </div>
            )}
          </ScrollArea>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPanel;
