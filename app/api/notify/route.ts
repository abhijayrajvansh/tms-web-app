import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/appwrite/appwrite.config';
import { ID } from 'node-appwrite';
import env from '@/constants';

const { databases } = await createAdminClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { title, description, is_read, user_id } = body;
  const action = body.action || null;
  
  if (
    title === undefined || 
    description === undefined || 
    is_read === undefined || 
    user_id === undefined
  ) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const res = await databases.createDocument(
      env.DATABASE_ID,
      env.COLLECTION_NOTIFICATIONS,
      ID.unique(),
      {
        title,
        description,
        is_read,
        user_id,
        action, 
      }
    );

    return NextResponse.json({ success: true, notificationID: res.$id });
  } 
  catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
