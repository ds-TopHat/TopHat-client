import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { deleteMe, getMe } from './axios';
import type { MeResponseTypes } from '../types/api';

import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { tokenService } from '@/shared/auth/services/tokenService';

export const useGetMe = () => {
  return useQuery<MeResponseTypes, AxiosError>({
    queryKey: [QUERY_KEYS.ME],
    queryFn: getMe,
  });
};

export const useDeleteMe = () => {
  return useMutation<string, AxiosError>({
    mutationKey: [QUERY_KEYS.ME],
    mutationFn: deleteMe,
    onSuccess: () => {
      tokenService.removeAccessToken();
      tokenService.removeRefreshToken();
    },
  });
};
