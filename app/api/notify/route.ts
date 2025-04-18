import { NextRequest, NextResponse } from 'next/server';
import { createSessionClient } from '@/appwrite/appwrite.config';
import { Query } from 'node-appwrite';
import env from '@/constants';
import { cookies } from 'next/headers';

export async function GET() {
  const sessionCookie = (await cookies()).get('session');

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get();
    const userId = user.$id;

    const { databases } = await createSessionClient(sessionCookie.value);
    const notifications = await databases.listDocuments(
      env.DATABASE_ID,
      env.COLLECTION_NOTIFICATIONS,
      []
      // [Query.equal('userId', userId), Query.orderDesc('$createdAt')],
    );

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
