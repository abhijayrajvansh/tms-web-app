import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, userId, action = null } = body;

    if (!title || !description || !userId) {
      return NextResponse.json(
        { error: 'Title, description, and userId are required' },
        { status: 400 },
      );
    }

    if (action !== null && typeof action !== 'string') {
      return NextResponse.json(
        { error: 'Action must be either null or a string' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          title,
          description,
          action,
          userId,
          is_read: false,
        },
      ])
      .select('id');

    if (error) {
      console.error('Error creating message:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Message created successfully',
      messageId: data?.[0]?.id,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}
