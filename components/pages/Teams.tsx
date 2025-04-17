'use client';

import React from 'react';
import { SiteHeader } from '../site-header';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import env from '@/constants';
import { Button } from '../ui/button';
import { IconDotsVertical, IconLoader2, IconPlus } from '@tabler/icons-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { columns } from './teams-columns';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

interface UsersResponse {
  users: User[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}

const Teams = () => {
  const { data, isLoading, error } = useQuery<UsersResponse>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get(`${env.SERVER_URL}/api/users`);
      return response.data;
    },
  });

  return (
    <>
      <SiteHeader title="Teams" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-5">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <IconLoader2 className="animate-spin" /> Loading users...
              </div>
            ) : error ? (
              <div>Error loading users</div>
            ) : (
              <div className="rounded-lg border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex flex-1 items-center gap-2">
                    <Button variant="outline" size="sm">
                      <IconPlus className="size-4" />
                      <span className="hidden lg:inline ml-2">Add User</span>
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">No.</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.users.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <span className="pl-4">{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-xs text-muted-foreground">{user.id}</span>
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {user.roles.map((role) => (
                              <Badge key={role} variant="secondary">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                              >
                                <IconDotsVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
