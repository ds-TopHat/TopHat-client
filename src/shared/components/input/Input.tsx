import { useState, type InputHTMLAttributes } from 'react';
import { IcEye, IcEyeOff } from '@components/icons';

import * as styles from './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  rightButton?: React.ReactNode;
}

const Input = ({ error, value, rightButton, type, ...props }: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let variant: keyof typeof styles.inputVariants = 'default';
  if (error) {
    variant = 'error';
  } else if (focused) {
    variant = 'active';
  } else if (value) {
    variant = 'filled';
  }

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  // password toggle 버튼
  const passwordToggleButton =
    type === 'password' ? (
      <button
        type="button"
        className={styles.eyeButton}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <IcEye width={20} /> : <IcEyeOff width={20} />}
      </button>
    ) : null;

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputInner}>
        <input
          {...props}
          type={inputType}
          className={[
            styles.baseInput,
            styles.inputVariants[variant],
            props.className,
          ]
            .filter(Boolean)
            .join(' ')}
          value={value}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? 'input-error' : undefined}
        />
        <div className={styles.rightButtonWrapper}>
          {rightButton}
          {passwordToggleButton}
        </div>
      </div>
      <div
        id="input-error"
        className={styles.errorMessage}
        style={{ visibility: error ? 'visible' : 'hidden' }}
      >
        {error || 'placeholder'}
      </div>
    </div>
  );
};

export default Input;
