import { IcBlueCheck, IcGrayCheck } from '@components/icons';

import * as styles from './reviewCard.css';

interface ReviewCardProps {
  imageSrc: string;
  text: string;
  selected?: boolean;
  onClick?: () => void; // 카드 체크 토글
  onCardClick?: () => void;
}

const ReviewCard = ({
  imageSrc,
  text,
  selected = false,
  onClick,
  onCardClick,
}: ReviewCardProps) => {
  return (
    <div
      className={`${styles.cardContainer} ${selected ? styles.cardSelected : ''}`}
      // 카드 클릭 시 상세 이동
      onClick={onCardClick}
    >
      <img src={imageSrc} alt={text} className={styles.imageBackground} />

      <div
        className={`${styles.overlay} ${selected ? styles.overlaySelected : ''}`}
      />

      {/* 체크 아이콘 클릭 시 선택 토글 */}
      <div
        className={styles.checkIcon}
        onClick={(e) => {
          // 부모 클릭 이벤트 막기
          e.stopPropagation();
          onClick?.();
        }}
      >
        {selected ? (
          <IcBlueCheck width={24} height={24} />
        ) : (
          <IcGrayCheck width={24} height={24} />
        )}
      </div>

      <div className={styles.textContainer}>{text}</div>
    </div>
  );
};

export default ReviewCard;
