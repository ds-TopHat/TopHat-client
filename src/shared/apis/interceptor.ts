import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { tokenService } from '../auth/services/tokenService';
import { authService } from '../auth/services/authService';

import { instance } from '@/shared/apis/instance';
import { API_URL } from '@/shared/constants/apiURL';

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (error?: AxiosError) => void;
};

let isRefreshing = false;
let failedRequests: FailedRequest[] = [];

// 요청 전 accessToken 헤더 추가
export const onRequest = (config: InternalAxiosRequestConfig) => {
  const accessToken = tokenService.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

// 401 응답 시 refreshToken으로 재발급 + 원래 요청 재시도
export const onErrorResponse = async (error: AxiosError) => {
  const originRequest = error.config;
  if (!originRequest) {
    return Promise.reject(error);
  }

  // 서버가 꺼졌거나 네트워크 문제
  if (!error.response) {
    window.location.href = '/error';
    return Promise.reject(error);
  }

  if (error.response?.status === 401 && originRequest.url !== API_URL.REISSUE) {
    // refresh 중이면 큐에 대기
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequests.push({ resolve, reject });
      }).then(() => instance(originRequest));
    }

    isRefreshing = true;

    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        authService.logout();
        return Promise.reject(error);
      }

      // refresh API 호출
      const response = await instance.post(API_URL.REISSUE, { refreshToken });
      const { data } = response;
      const { token: newAccessToken, refreshToken: newRefreshToken } = data;

      tokenService.saveAccessToken(newAccessToken);
      tokenService.saveRefreshToken(newRefreshToken);

      // 대기중 요청 재실행
      failedRequests.forEach((prom) => prom.resolve());
      failedRequests = [];

      // 원래 요청 재시도
      return instance(originRequest);
    } catch (reissueError) {
      failedRequests.forEach((prom) => prom.reject(reissueError as AxiosError));
      failedRequests = [];
      authService.logout();
      return Promise.reject(reissueError);
    } finally {
      isRefreshing = false;
    }
  }

  // 3. 그 외 HTTP 에러 코드 (400, 403, 500 등) 처리
  return Promise.reject(error);
};
