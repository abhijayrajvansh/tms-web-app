'use client';

import React, { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const Playground = () => {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('userId', '67fcfd82000b76828ef9')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        setError(error.message);
        return;
      }

      if (data) {
        setMessages(data);
        console.log('Fetched messages:', data);
      }
    } catch (e) {
      console.error('Unexpected error:', e);
      setError('An unexpected error occurred');
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel('messages-channel')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          console.log('Real-time change:', payload);
          // Refresh messages when there's any change
          fetchMessages();
        },
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Playground</h1>
      <p className="text-lg mb-4">This is a playground for testing features.</p>

      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      {messages.length === 0 && !error && <p className="text-gray-500">No messages found</p>}

      {messages.map((message) => (
        <div key={message.id} className="p-4 border rounded-lg mb-2 w-full max-w-md">
          <p className="font-medium">{message.title || 'No title'}</p>
          <p className="text-gray-600">{message.content || 'No content'}</p>
        </div>
      ))}
    </div>
  );
};

export default Playground;


// postgresql://postgres.szvortyfczrzxatwpvdp:LstMXhmXybYXU5Wj@aws-0-ap-south-1.pooler.supabase.com:6543/postgres