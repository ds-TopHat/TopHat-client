import { useCallback, useState } from 'react';
import { IcExtract } from '@components/icons';
import { useNavigate } from 'react-router-dom';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import ReviewCard from '@components/reviewCard/ReviewCard';
import { routePath } from '@routes/routePath';
import Toast from '@components/toast/Toast';

import * as styles from './reviewNotes.css';
import { useGetReviewNotes, usePostReviewPdf } from './apis/queries';

const ReviewNotes = () => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(routePath.REVIEW_NOTE_DETAIL.replace(':id', id.toString()));
  };

  const { data, isPending } = useGetReviewNotes();

  const loadMore = useCallback(() => {
    // 이후 추가
  }, []);

  const loaderRef = useInfiniteScroll(loadMore);

  const { mutateAsync: createPdf } = usePostReviewPdf();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [toasts, setToasts] = useState<string[]>([]);

  const showToast = (msg: string) => {
    setToasts((prev) => [...prev, msg]);
  };
  const toggleSelectCard = (id: number) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  if (isPending) {
    return <div />;
  }
  const downloadPdf = async () => {
    if (!data || selectedCards.length === 0) {
      showToast('PDF로 추출할 문제를 먼저 선택해주세요.');
      return;
    }

    const problemImageUrls = data
      .filter((item) => selectedCards.includes(item.questionId))
      .map((item) => item.problemImageUrl);

    let url: string | undefined;

    try {
      const blob = await createPdf({ problemImageUrls });
      url = URL.createObjectURL(blob);

      const ua = navigator.userAgent;
      const isIOS =
        /iPhone|iPad|iPod/i.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isAndroid = /Android/i.test(ua);
      const isMobile = isIOS || isAndroid;

      if (isMobile) {
        // 모바일: 미리 빈 탭 열고 URL 나중에 할당
        const newTab = window.open('', '_blank', 'noopener,noreferrer');
        if (newTab) {
          newTab.location.href = url;
          setTimeout(() => URL.revokeObjectURL(url!), 8000);
          url = undefined; // 중복 revoke 방지
        } else {
          // 팝업 차단 대응
          const a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      } else {
        // PC: 다운로드
        const a = document.createElement('a');
        a.href = url;
        a.download = 'TopHat_오답노트.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      setSelectedCards([]);
    } finally {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  };

  // 데이터 없을 때
  if (!data || data.length === 0) {
    return (
      <div className={styles.reviewContainer}>
        <h1 className={styles.title}>오답노트</h1>
        <p className={styles.pdfComment}>아직 질문한 문제가 없어요!</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.content}>
        {toasts.map((msg, i) => (
          <Toast
            key={i}
            message={msg}
            onClose={() =>
              setToasts((prev) => prev.filter((_, index) => index !== i))
            }
          />
        ))}
        <h1 className={styles.title}>오답노트</h1>
        <button className={styles.pdfButton} onClick={downloadPdf}>
          <IcExtract width={20} height={20} />
          오답노트 PDF로 추출하기
        </button>
        <p className={styles.pdfComment}>
          복습하고 싶은 문제를 선택해 풀어보세요!
        </p>

        <div className={styles.cardContainer}>
          {data.map((card) => (
            <ReviewCard
              key={card.questionId}
              imageSrc={card.problemImageUrl}
              text={card.unitType}
              selected={selectedCards.includes(card.questionId)}
              onClick={() => toggleSelectCard(card.questionId)}
              onCardClick={() => handleClick(card.questionId)}
            />
          ))}
        </div>

        <div ref={loaderRef} />
      </div>
    </div>
  );
};

export default ReviewNotes;
