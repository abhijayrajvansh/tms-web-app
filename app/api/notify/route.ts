import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/appwrite/appwrite.config';
import { ID } from 'node-appwrite';
import env from '@/constants';

const { databases } = await createAdminClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { userId, title, body: message } = body;

  try {
    const res = await databases.createDocument(
      env.DATABASE_ID,
      env.COLLECTION_NOTIFICATIONS,
      ID.unique(),
      {
        userId,
        title,
        body: message,
        is_read: false,
      },
      [`user:${userId}`],
    );

    return NextResponse.json({ success: true, docId: res.$id });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
