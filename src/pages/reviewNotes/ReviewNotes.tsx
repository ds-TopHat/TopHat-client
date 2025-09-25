import { useCallback, useState } from 'react';
import { IcExtract } from '@components/icons';
import { useNavigate } from 'react-router-dom';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import ReviewCard from '@components/reviewCard/ReviewCard';
import { routePath } from '@routes/routePath';

import * as styles from './reviewNotes.css';
import { useGetReviewNotes, usePostReviewPdf } from './apis/queries';

const ReviewNotes = () => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(routePath.REVIEW_NOTE_DETAIL.replace(':id', id.toString()));
  };

  const { data, isLoading } = useGetReviewNotes();

  const loadMore = useCallback(() => {
    // 이후 추가
  }, []);

  const loaderRef = useInfiniteScroll(loadMore);

  const { mutateAsync: createPdf } = usePostReviewPdf();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const toggleSelectCard = (id: number) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  if (isLoading) {
    return <></>;
  }

  const downloadPdf = async () => {
    if (!data || selectedCards.length === 0) {
      return;
    }

    // 선택된 카드만 problemImageUrl 배열로 만들기
    const problemImageUrls = data
      .filter((item) => selectedCards.includes(item.questionId))
      .map((item) => item.problemImageUrl);

    // PDF 생성
    const blob = await createPdf({ problemImageUrls });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MAPI_exam.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
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
      <h1 className={styles.title}>오답노트</h1>
      <button className={styles.pdfButton} onClick={downloadPdf}>
        <IcExtract width={20} height={20} /> 오답노트 PDF로 추출하기
      </button>
      <p className={styles.pdfComment}>
        질문했던 문제를 골라 출력해서 다시 풀어봐요!
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
  );
};

export default ReviewNotes;
