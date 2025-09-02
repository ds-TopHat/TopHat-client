import { useState } from 'react';
import { IcWarning } from '@components/icons';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';

import * as styles from './modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const Modal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleDelete = async () => {
    await onConfirm();
    setIsCompleted(true);
    setTimeout(() => {
      onClose();
      navigate(routePath.HOME);
    }, 3000);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        role="dialog"
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {!isCompleted ? (
          <>
            <IcWarning width={72} height={72} />
            <h1 className={styles.title}>정말 탈퇴하시겠습니까?</h1>
            <div className={styles.buttonGroup}>
              <button className={styles.cancelButton} onClick={onClose}>
                취소
              </button>
              <button className={styles.deleteButton} onClick={handleDelete}>
                탈퇴
              </button>
            </div>
          </>
        ) : (
          <h1 className={styles.title}>탈퇴되었습니다.</h1>
        )}
      </div>
    </div>
  );
};

export default Modal;
