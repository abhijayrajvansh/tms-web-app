import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconLoader2 } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import env from '@/constants';

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const availableRoles = ['worker', 'manager', 'admin'];

export function AddUserDialog({ isOpen, onOpenChange }: AddUserDialogProps) {
  const [formData, setFormData] = React.useState({
    userId: '',
    username: '',
    password: '',
    roles: [] as string[],
  });

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: async (userData: {
      userId: string;
      username: string;
      password: string;
      roles: string[];
    }) => {
      const response = await axios.post(`${env.SERVER_URL}/api/users/create`, {
        ...userData,
        userId: parseInt(userData.userId),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onOpenChange(false);
      setFormData({
        userId: '',
        username: '',
        password: '',
        roles: [],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(formData);
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(value)
        ? prev.roles.filter(role => role !== value)
        : [...prev.roles, value]
    }));
  };

  React.useEffect(() => {
    if (!isOpen) {
      setFormData({
        userId: '',
        username: '',
        password: '',
        roles: [],
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {createUserMutation.error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {createUserMutation.error instanceof Error 
                ? createUserMutation.error.message 
                : 'An error occurred while creating the user'}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              type="number"
              value={formData.userId}
              onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Roles</Label>
            <div className="flex gap-2">
              {availableRoles.map((role) => (
                <Button
                  key={role}
                  type="button"
                  variant={formData.roles.includes(role) ? 'default' : 'outline'}
                  onClick={() => handleRoleChange(role)}
                  className="capitalize"
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createUserMutation.isPending}>
              {createUserMutation.isPending ? <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Add User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
