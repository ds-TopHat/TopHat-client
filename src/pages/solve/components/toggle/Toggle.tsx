import { IcToggleCamera } from '@components/icons';
import * as styles from '@pages/solve/components/toggle/toggle.css';

const TOGGLE_ITEMS = [
  '단계별 풀이를 알려줘',
  '전체 풀이를 알려줘',
  '해결했어요!',
];

interface ToggleProps {
  onTextSelect: (text: string) => void;
  onCameraClick: () => void;
}

const Toggle = ({ onTextSelect, onCameraClick }: ToggleProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        <div className={styles.inner}>
          <div onClick={onCameraClick} style={{ cursor: 'pointer' }}>
            <IcToggleCamera width={56} />
          </div>

          <div className={styles.toggleList}>
            {TOGGLE_ITEMS.map((label, idx) => (
              <div key={idx} className={styles.toggleButtonWrapper}>
                <div
                  className={styles.toggleButton}
                  onClick={() => onTextSelect(label)}
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
