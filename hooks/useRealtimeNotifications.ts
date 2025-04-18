//@ts-nocheck
import { Client } from 'appwrite';
import { useEffect } from 'react';
import env from '@/constants';

const useRealtimeNotifications = ({
  userId,
  onNotification
}: {
  userId: string;
  onNotification: (payload: any) => void;
}) => {
  useEffect(() => {
    const client = new Client()
      .setEndpoint(env.ENDPOINT)
      .setProject(env.PROJECT_ID);

    const unsub = client.subscribe(
      [`databases.${env.DATABASE_ID}.collections.${env.COLLECTION_NOTIFICATIONS}.documents`],
      (response) => {
        console.log("response: ", response)
        if (
          response.payload.userId === userId &&
          response.events.includes('databases.*.collections.*.documents.*.create')
        ) {
          onNotification(response.payload);
        }
      }
    );

    return () => {
      unsub();
    };
  }, [userId, onNotification]);
};

export default useRealtimeNotifications;
