import env from '@/constants';
import axios from 'axios';

export interface Notification {
  $id: string;
  title: string;
  description: string;
  action: string | null;
  is_read: boolean;
  userId: string;
  $createdAt: string;
}

interface NotificationResponse {
  documents: Notification[];
}

export const getNotifications = async (userId: string): Promise<NotificationResponse> => {
  const response = await axios.post(env.SERVER_URL + '/api/notify', {
    userId,
  });

  return response.data;
};
