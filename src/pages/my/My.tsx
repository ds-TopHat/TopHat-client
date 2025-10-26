import Chip from '@components/chip/Chip';
import { IcDownArrow, IcRightArrow, IcChipNum } from '@components/icons';
import { useState, useMemo } from 'react';
import { getKoreanParticle } from '@utils/korParticle';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';
import { themeVars } from '@styles/theme.css';
import Toast from '@components/toast/Toast';

import * as styles from './my.css';
import { useDeleteMe, useGetMe } from './apis/queries';
import Modal from './components/modal/Modal';

import { CHIP_LIST } from '@/shared/constants/chipData';
import { authService } from '@/shared/auth/services/authService';

const My = () => {
  const navigate = useNavigate();

  const goReviewNotes = () => navigate(routePath.REVIEW_NOTES);
  const goSolve = () => navigate(routePath.SOLVE);

  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { data, isPending } = useGetMe();
  const { mutateAsync: deleteMe } = useDeleteMe();

  const toggleExpand = () => setExpanded((prev) => !prev);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleDelete = async () => {
    await deleteMe();
  };

  const goWhiteboard = () => {
    if (window.innerWidth >= 768) {
      navigate(routePath.SIMPLE_WHITEBOARD);
    } else {
      setShowToast(true);
    }
  };

  const mappedChips = useMemo(() => {
    return (
      data?.unitsList?.map((unit) => {
        const matched = CHIP_LIST.find((chip) => chip.id === unit.id);
        return {
          ...unit,
          icon: matched?.icon ?? <IcChipNum />,
          background:
            matched?.background ?? 'linear-gradient(90deg, #ccc 0%, #eee 100%)',
          label: matched?.label ?? unit.type,
        };
      }) ?? []
    );
  }, [data?.unitsList]);

  if (isPending) {
    return <div />;
  }

  const hasUnits = !!data?.unitsList && data.unitsList.length > 0;

  // chips 데이터 관련 준비
  const [topChip1, topChip2, ...restChips] = mappedChips;
  const showMoreChips = mappedChips.length > 2;
  const isSingleChip = mappedChips.length === 1;

  const particle1 = getKoreanParticle(topChip1?.label ?? '', '와과');
  const particle2 = getKoreanParticle(topChip2?.label ?? '', '을를');
  const particleSingle = getKoreanParticle(topChip1?.label ?? '', '을를');

  const message = isSingleChip
    ? `${particleSingle} 물어봤어요!`
    : `${topChip1?.label ?? ''}${particle1} ${topChip2?.label ?? ''}${particle2} 많이 물어봤어요!`;

  return (
    <div className={styles.container}>
      {/* 공통 타이틀 */}
      <div className={styles.title}>
        <h1 className={styles.name}>{data?.name}</h1>
        <h1 className={styles.hello}>님, 안녕하세요!</h1>
      </div>

      {/* 오답노트 카드 */}
      <div className={styles.noteDiv}>
        <div className={styles.noteCard}>
          <img
            src="/img/img_note.png"
            className={styles.noteImg}
            alt="오답노트"
            loading="lazy"
            decoding="async"
          />
          <div className={styles.noteContainer}>
            <div className={styles.noteContent}>
              <h2 className={styles.noteTitle}>오답노트</h2>
              <p className={styles.noteDescription}>
                {hasUnits
                  ? '질문했던 문제를 \n한 번 더 풀어볼까요?'
                  : '아직 질문한 문제가 없어요!\n질문하러 가기'}
              </p>
            </div>
            <button
              className={styles.noteButton}
              onClick={hasUnits ? goReviewNotes : goSolve}
            >
              <IcRightArrow
                width={10}
                height={20}
                color={themeVars.color.white000}
              />
            </button>
          </div>
        </div>
      </div>

      {/* chips 영역 - units 있을 때만 */}
      {hasUnits && (
        <div className={styles.chipSection}>
          <div className={styles.randomChipContainer}>
            {isSingleChip ? (
              <div className={styles.firstLine}>
                <Chip
                  icon={topChip1.icon}
                  label={topChip1.label}
                  background={topChip1.background}
                />
                <span>{message}</span>
              </div>
            ) : (
              <>
                <div className={styles.firstLine}>
                  <Chip
                    icon={topChip1.icon}
                    label={topChip1.label}
                    background={topChip1.background}
                  />
                  <span>{particle1}&nbsp;</span>
                </div>
                <div className={styles.secondLine}>
                  <Chip
                    icon={topChip2?.icon ?? <IcChipNum />}
                    label={topChip2?.label ?? '데이터 없음'}
                    background={
                      topChip2?.background ??
                      'linear-gradient(90deg, #ccc 0%, #eee 100%)'
                    }
                  />
                  <span>{particle2} 많이 물어봤어요!</span>
                </div>
              </>
            )}
          </div>

          {showMoreChips && (
            <>
              <div className={styles.divider} />
              <div className={styles.chipListWrapper}>
                <div
                  className={styles.chipList}
                  style={{
                    maxHeight: expanded ? 'none' : '8rem',
                    overflow: 'hidden',
                  }}
                >
                  {restChips.map((chip) => (
                    <Chip
                      key={chip.id}
                      icon={chip.icon}
                      label={chip.label}
                      background={chip.background}
                    />
                  ))}
                </div>
                {!expanded && <div className={styles.chipGradientOverlay} />}
              </div>
              <button className={styles.expandButton} onClick={toggleExpand}>
                <IcDownArrow
                  width={16}
                  height={28}
                  className={expanded ? styles.rotated : styles.unrotated}
                />
              </button>
            </>
          )}
        </div>
      )}

      {/* 공통 버튼 영역 */}
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.button} onClick={goWhiteboard}>
          연습장
          <IcRightArrow width={6} height={12} color={themeVars.color.gray800} />
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => authService.logout()}
        >
          로그아웃
          <IcRightArrow width={6} height={12} color={themeVars.color.gray800} />
        </button>
        <button type="button" className={styles.button} onClick={openModal}>
          탈퇴하기
          <IcRightArrow width={6} height={12} color={themeVars.color.gray800} />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />

      {showToast && (
        <Toast
          message={`현재 화면 크기에서는 이용할 수 없습니다.\n태블릿 이상의 기기에서 이용해 주세요.`}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default My;
