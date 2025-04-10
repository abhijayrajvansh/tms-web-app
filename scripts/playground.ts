import "dotenv/config"

import { createAdminClient } from '@/appwrite/appwrite.config';

(async () => {
  const { users } = await createAdminClient();
  const { users: allUsers } = await users.list()

  console.log(allUsers)
})();
