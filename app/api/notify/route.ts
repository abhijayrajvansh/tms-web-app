import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/appwrite/appwrite.config';
import { Query } from 'node-appwrite';
import env from '@/constants';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const { databases } = await createAdminClient();

    const notifications = await databases.listDocuments(
      env.DATABASE_ID,
      env.COLLECTION_NOTIFICATIONS,
      [Query.equal('userId', userId), Query.orderDesc('$createdAt'), Query.limit(50)],
    );

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}
