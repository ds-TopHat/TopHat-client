import { IcToggleCamera } from '@components/icons';
import * as styles from '@pages/solve/components/toggle/toggle.css';

interface ToggleProps {
  items: string[];
  onTextSelect: (text: string) => void;
  onCameraClick: () => void;
  disabled?: boolean;
}

const Toggle = ({
  items,
  onTextSelect,
  onCameraClick,
  disabled = false,
}: ToggleProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        <div className={styles.inner}>
          <div
            onClick={!disabled ? onCameraClick : undefined}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
          >
            <IcToggleCamera width={56} />
          </div>

          <div className={styles.toggleList}>
            {items.map((label, idx) => (
              <div key={idx} className={styles.toggleButtonWrapper}>
                <div
                  className={styles.toggleButton}
                  onClick={!disabled ? () => onTextSelect(label) : undefined}
                >
                  <span className={styles.gradientText}>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
