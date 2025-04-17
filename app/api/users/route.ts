import { createAdminClient } from '@/appwrite/appwrite.config';
import { Query } from 'appwrite';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get('offset') || '0');
  const limit = parseInt(searchParams.get('limit') || '100');

  const { users } = await createAdminClient();
  const response = await users.list([Query.limit(limit), Query.offset(offset)]);

  const simplifiedUsers = response.users.map((user) => ({
    id: user.$id,
    name: user.name,
    email: user.email,
    roles: user.labels,
  }));

  return Response.json({
    total: response.total,
    users: simplifiedUsers,
    offset,
    limit,
    hasMore: offset + limit < response.total,
  });
}
