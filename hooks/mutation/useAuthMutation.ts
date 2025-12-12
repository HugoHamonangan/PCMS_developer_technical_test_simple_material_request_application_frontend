import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../services/authApi';
import { toast } from 'sonner';
import { loginInterface } from '@/interfaces/login.interface';
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/authStore';

export function useLoginMutations() {
  const login = useMutation({
    mutationFn: (payload: loginInterface) => authApi.login(payload),

    onSuccess: (data) => {
      if (data?.item) {
        document.cookie = `accessToken=${data.item.access_token}; path=/; max-age=3600`;
        delete data.item.access_token;
        useAuthStore.getState().setUser(data.item);
      }
      toast.success('Successfully logged in');
    },

    onError: () => {
      toast.error('Login failed, check email or password and try again');
    },
  });

  return { login };
}

export function useLogoutMutation() {
  const logout = useMutation({
    mutationFn: async () => {
      document.cookie = `accessToken=; path=/; max-age=0`;
      localStorage.setItem('userStorage', '');
    },

    onSuccess: () => {
      toast.success('Successfully logged out');
      window.location.href = '/login';
    },
  });

  return { logout };
}
