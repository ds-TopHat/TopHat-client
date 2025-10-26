import { useEffect, useState } from 'react';

import * as styles from './toast.css';

interface Props {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Toast = ({ message, duration = 2000, onClose }: Props) => {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [exiting, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`${styles.toast} ${exiting ? styles.exit : styles.enter}`}>
      {message}
    </div>
  );
};

export default Toast;
