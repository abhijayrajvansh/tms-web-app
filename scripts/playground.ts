import { getNotifications } from "@/services/notification.service";

(() => {
  const userId = '67fcfd82000b76828ef9'; // Replace with actual user ID
  getNotifications(userId)
    .then((notifications) => {
      console.log('Notifications:', notifications);
    })
    .catch((error) => {
      console.error('Error fetching notifications:', error);
    });
})()