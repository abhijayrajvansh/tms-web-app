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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import { Label } from '../ui/label';

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
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading, error } = useQuery<UsersResponse>({
    queryKey: ['users', page, pageSize],
    queryFn: async () => {
      const response = await axios.get(
        `${env.SERVER_URL}/api/users?offset=${page * pageSize}&limit=${pageSize}`,
      );
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
                    <Button variant="outline" size="sm" className='hover:bg-primary/90 bg-primary hover:text-white text-white rounded cursor-pointer'>
                      <IconPlus className="size-4" />
                      <span className="hidden lg:inline ml-2 font-semibold">Add User</span>
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">No.</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Assigned Roles</TableHead>
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
                <div className="flex items-center justify-between px-4 py-4 border-t">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {data?.total} user(s) total
                  </div>
                  <div className="flex w-full items-center justify-end gap-6 lg:w-auto">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="rows-per-page" className="text-sm font-medium">
                        Rows per page
                      </Label>
                      <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => {
                          setPageSize(parseInt(value));
                          setPage(0);
                        }}
                      >
                        <SelectTrigger className="h-8 w-20">
                          <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent>
                          {[10, 20, 30, 50, 100].map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                      Page {page + 1} of {Math.ceil((data?.total || 0) / pageSize)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPage(0)}
                        disabled={page === 0}
                      >
                        <span className="sr-only">Go to first page</span>
                        <IconChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                      >
                        <span className="sr-only">Go to previous page</span>
                        <IconChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPage(page + 1)}
                        disabled={!data?.hasMore}
                      >
                        <span className="sr-only">Go to next page</span>
                        <IconChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPage(Math.ceil((data?.total || 0) / pageSize) - 1)}
                        disabled={!data?.hasMore}
                      >
                        <span className="sr-only">Go to last page</span>
                        <IconChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
