import { useState } from 'react';
import Input from '@components/input/Input';
import Button from '@components/button/Button';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';
import { emailRegex, passwordRegex } from '@utils/validators';
import { IcBigLogo } from '@components/icons';
import { themeVars } from '@styles/theme.css';

import {
  usePostRequestCode,
  usePostSignup,
  usePostVerifyCode,
} from './apis/queries';
import * as styles from './signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailCode, setEmailCode] = useState('');

  const isEmailValid = emailRegex.test(email);
  const isCodeValid = emailCode.length === 6;

  const { mutate: signupMutate } = usePostSignup();

  const navigate = useNavigate();

  const goLogin = () => {
    navigate(routePath.LOGIN);
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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) {
      setConfirmPasswordError('');
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

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('비밀번호 확인을 입력해주세요.');
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('동일한 비밀번호를 입력해 주세요.');
    }
  };

  const handleSignup = () => {
    handleEmailBlur();
    handlePasswordBlur();
    handleConfirmPasswordBlur();

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    signupMutate(
      { email, password },
      {
        onSuccess: () => navigate(routePath.LOGIN),
        onError: () => alert('회원가입에 실패했습니다. 다시 시도해주세요.'),
      },
    );
  };

  const isButtonActive = !!(
    email &&
    password &&
    confirmPassword &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    emailRegex.test(email) &&
    passwordRegex.test(password) &&
    password === confirmPassword
  );

  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [emailCodeError, setEmailCodeError] = useState('');

  const requestCodeMutation = usePostRequestCode();
  const verifyCodeMutation = usePostVerifyCode();
  const handleRequestCode = () => {
    if (!isEmailValid) {
      return;
    }
    requestCodeMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setCodeSent(true);
          setEmailCodeError('');
          alert('인증코드가 전송되었습니다.');
        },
        onError: () =>
          setEmailCodeError('인증코드 전송 실패. 다시 시도해주세요.'),
      },
    );
  };

  const handleVerifyCode = () => {
    if (!isCodeValid) {
      return;
    }
    verifyCodeMutation.mutate(
      { email, code: emailCode },
      {
        onSuccess: () => {
          setCodeVerified(true);
          setEmailCodeError('');
        },
        onError: () => setEmailCodeError('인증코드가 올바르지 않습니다.'),
      },
    );
  };

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
          rightButton={
            <button
              className={styles.codeButton}
              disabled={!isEmailValid || codeSent}
              onClick={handleRequestCode}
              style={{
                backgroundColor:
                  isEmailValid && !codeSent
                    ? themeVars.color.point
                    : themeVars.color.gray500,
              }}
            >
              인증코드
            </button>
          }
        />

        <Input
          type="text"
          placeholder="이메일로 전송된 인증코드 6자리"
          value={emailCode}
          onChange={(e) => setEmailCode(e.target.value)}
          error={emailCodeError}
          rightButton={
            <button
              className={styles.codeButton}
              disabled={!isCodeValid || codeVerified}
              onClick={handleVerifyCode}
              style={{
                backgroundColor:
                  isCodeValid && !codeVerified
                    ? themeVars.color.point
                    : themeVars.color.gray500,
              }}
            >
              인증하기
            </button>
          }
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordError}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          error={confirmPasswordError}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button isActive={isButtonActive} onClick={handleSignup}>
          회원가입
        </Button>
        <span className={styles.loginText}>
          이미 계정이 있으신가요?
          <button className={styles.loginButton} onClick={goLogin}>
            로그인
          </button>
        </span>
      </div>
    </div>
  );
};

export default Signup;
