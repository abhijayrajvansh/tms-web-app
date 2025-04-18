import env from '@/constants';
import axios from 'axios';

export async function getNotifications(userId: string) {
  try {
    const response = await axios.post(env.SERVER_URL + '/api/notify', { userId });
    return response.data;
  } catch (error) {
    console.log((error as Error).message)
    throw new Error('Failed to fetch notifications');
  }
}
