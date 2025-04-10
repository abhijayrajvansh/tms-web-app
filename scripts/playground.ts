import 'dotenv/config';

import { createAdminClient } from '../appwrite/appwrite.config';
import { Models } from 'node-appwrite';

async function hasPermission(
  userId: string,
  collectionId: string,
  permissionType: 'create' | 'read' | 'update' | 'delete',
): Promise<boolean> {
  const client = await createAdminClient();
  const [collection, user] = await Promise.all([
    client.databases.getCollection(process.env.NEXT_PUBLIC_DATABASE_ID as string, collectionId),
    client.users.get(userId),
  ]);

  // Check if permission exists for:
  // 'user:userId' - specific user
  // 'role:all' - all users
  // 'role:member' - all logged-in users
  // Any user labels the user has
  const permissions = collection.$permissions.filter(
    (p: string) =>
      p.startsWith(`${permissionType}(`) &&
      (p.includes(`user:${userId}`) ||
        p.includes('role:all') ||
        p.includes('role:member') ||
        // Check if any of the user's labels match the permission
        (user.labels && user.labels.some((label) => p.includes(`label:${label}`)))),
  );

  return permissions.length > 0;
}

const userId = '67f66665003a8e4f75ca';
const collectionId = '67f6380c001193c06b8a';

(async () => {
  // Check write permission
  console.log(await hasPermission(userId, collectionId, 'create'))
  
  // Check read permission
  console.log(await hasPermission(userId, collectionId, 'read'))

  // Check update permission
  console.log(await hasPermission(userId, collectionId, 'update'))

  // Check delete permission
  console.log(await hasPermission(userId, collectionId, 'delete'))
})();
