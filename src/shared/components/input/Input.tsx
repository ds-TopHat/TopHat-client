import { useState, type InputHTMLAttributes } from 'react';

import * as styles from './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  rightButton?: React.ReactNode;
}

const Input = ({ error, value, rightButton, ...props }: InputProps) => {
  const [focused, setFocused] = useState(false);

  let variant: keyof typeof styles.inputVariants = 'default';

  if (error) {
    variant = 'error';
  } else if (focused) {
    variant = 'active';
  } else if (value) {
    variant = 'filled';
  } else {
    variant = 'default';
  }

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputInner}>
        <input
          {...props}
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
        {rightButton && (
          <div className={styles.rightButtonWrapper}>{rightButton}</div>
        )}
      </div>
      {error ? (
        <div id="input-error" className={styles.errorMessage}>
          {error}
        </div>
      ) : (
        <div className={styles.errorMessage} style={{ visibility: 'hidden' }} />
      )}
    </div>
  );
};
export default Input;
