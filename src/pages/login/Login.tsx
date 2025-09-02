import { useState } from 'react';
import Input from '@components/input/Input';
import Button from '@components/button/Button';
import { IcBigLogo, IcKakao } from '@components/icons';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';
import { emailRegex, passwordRegex } from '@utils/validators';
import { usePostLogin } from '@pages/login/apis/queries';

import * as styles from './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const { mutate: loginMutate } = usePostLogin();

  const goSignup = () => {
    navigate(routePath.SIGNUP);
  };

  const handleLogin = () => {
    loginMutate(
      { email, password },
      {
        onSuccess: () => {
          navigate(routePath.HOME);
        },
        onError: () => {
          setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
        },
      },
    );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
    } else if (!emailRegex.test(email)) {
      setEmailError('정확한 이메일을 입력해주세요.');
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('숫자·특수문자 포함 8자 이상이어야 합니다.');
    }
  };

  const isButtonActive = !!(
    email &&
    password &&
    !emailError &&
    !passwordError &&
    emailRegex.test(email) &&
    passwordRegex.test(password)
  );

  const handleKakaoLogin = () => {};

  return (
    <div className={styles.container}>
      <IcBigLogo width={100} height={76} className={styles.topBox} />
      <div className={styles.formWrapper}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordError}
        />
      </div>
      <div className={styles.buttonWrapper}>
        {loginError && <div className={styles.loginError}>{loginError}</div>}
        <Button isActive={isButtonActive} onClick={handleLogin}>
          로그인
        </Button>
        <button className={styles.kakaoLoginButton} onClick={handleKakaoLogin}>
          <IcKakao width={18} height={18} />
          카카오 로그인
        </button>
        <span className={styles.signupText}>
          계정이 없으신가요?
          <button className={styles.signupButton} onClick={goSignup}>
            회원가입
          </button>
        </span>
      </div>
    </div>
  );
};

export default Login;
