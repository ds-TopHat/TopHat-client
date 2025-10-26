import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { routePath } from '@routes/routePath';
import { instance } from '@apis/instance';

import { tokenService } from '@/shared/auth/services/tokenService';
import { API_URL } from '@/shared/constants/apiURL';

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const returnedState = params.get('state');

    const savedState = sessionStorage.getItem('kakao_oauth_state');
    sessionStorage.removeItem('kakao_oauth_state');

    if (!returnedState || !savedState || returnedState !== savedState) {
      navigate(routePath.LOGIN);
      return;
    }

    if (!code) {
      navigate(routePath.LOGIN);
      return;
    }

    const handleLogin = async () => {
      try {
        // 카카오 토큰 요청 파라미터
        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_REST_API_KEY,
          redirect_uri:
            import.meta.env.MODE === 'development'
              ? import.meta.env.VITE_LOCAL_REDIRECT_URI
              : import.meta.env.VITE_PROD_REDIRECT_URI,
          code,
        });

        // secret 사용하는 경우만 추가
        if (import.meta.env.VITE_KAKAO_CLIENT_SECRET) {
          body.append(
            'client_secret',
            import.meta.env.VITE_KAKAO_CLIENT_SECRET,
          );
        }

        // 카카오에 토큰 요청
        const tokenRes = await axios.post(
          import.meta.env.VITE_KAKAO_TOKEN_URL,
          body,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        );

        const { access_token } = tokenRes.data;

        // 서버에 access_token 전달
        const authRes = await instance.post(API_URL.KAKAO_AUTHCODE, {
          accessToken: access_token,
        });

        const result = authRes.data.result;

        if (result.isNew) {
          // 새로운 회원이면 /signup API 호출
          const signupRes = await instance.post(API_URL.KAKAO_SIGNUP, {
            email: result.email,
            socialId: result.socialId,
            name: result.name,
            marketingAgree: true,
          });
          tokenService.saveAccessToken(signupRes.data.result.access_token);
          tokenService.saveRefreshToken(signupRes.data.result.refresh_token);
        } else {
          // 기존 회원이면 /login API 호출
          const loginRes = await instance.post(API_URL.KAKAO_LOGIN, {
            socialId: result.socialId,
            loginType: 'KAKAO',
          });
          tokenService.saveAccessToken(loginRes.data.result.access_token);
          tokenService.saveRefreshToken(loginRes.data.result.refresh_token);
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
        navigate(routePath.SOLVE);
      } catch {
        navigate(routePath.LOGIN);
      }
    };

    handleLogin();
  }, [navigate]);

  return <div />;
};

export default LoginCallback;
