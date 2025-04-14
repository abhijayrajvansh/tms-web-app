import 'dotenv/config';
import { hasPermission } from '../appwrite/appwrite.permission';

// Example usage
hasPermission('67f63c940032509d6085', '67f6380c001193c06b8a', 'read')
  .then((hasAccess) => {
    if (hasAccess) {
      console.log('User has read permission.');
    } else {
      console.log('User does not have permission.');
    }
  })
  .catch((error) => {
    console.error('An error occurred while checking permissions:', error);
  });
