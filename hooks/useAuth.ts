import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import env from '@/constants';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await axios.post(env.SERVER_URL + '/api/auth/login', credentials);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // router.push('/dashboard'); // buggy bc of nextjs route handling
      window.location.href = '/dashboard';
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(env.SERVER_URL + '/api/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
};

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(env.SERVER_URL + '/api/auth/google');
      window.location.href = response.data.url;
      return response.data;
    },
    onError: (error) => {
      console.error('Google auth error:', error);
    },
  });
};
