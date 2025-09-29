import { useParams } from 'react-router-dom';
import Chip from '@components/chip/Chip';

import * as styles from './reviewNoteDetail.css';
import { useGetReviewDetail } from './apis/queries';

import { CHIP_LIST } from '@/shared/constants/chipData';

const ReviewNoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = parseInt(id!, 10);

  const { data: note, isPending } = useGetReviewDetail(numericId);

  if (isPending) {
    return <div />;
  }

  if (!note) {
    return (
      <main className={styles.mainContainer}>
        <p className={styles.noteContent}>존재하지 않는 노트입니다.</p>
      </main>
    );
  }

  const chipData = CHIP_LIST.find((chip) => chip.id === note.unitId);

  const answerArray = JSON.parse(note.aiAnswer);

  // 서버에서 내려오는 수식/HTML을 안전하게 렌더링
  const renderAiAnswer = () => {
    if (!Array.isArray(answerArray)) {
      return null;
    }

    return answerArray.map((item, idx) => {
      const key = Object.keys(item)[0];
      const content = item[key];
      if (!content) {
        return null;
      }

      if (key === 'answer') {
        return (
          <div
            key={idx}
            style={{ marginTop: '1rem' }}
            dangerouslySetInnerHTML={{
              __html: `<strong>답: </strong>${content}`,
            }}
          />
        );
      }

      // step 내용은 HTML/SVG 그대로 렌더링
      return <div key={idx} dangerouslySetInnerHTML={{ __html: content }} />;
    });
  };

  const formattedDate = (() => {
    const date = new Date(note.createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}.`;
  })();

  return (
    <main className={styles.mainContainer}>
      <div className={styles.topContent}>
        <Chip
          icon={chipData?.icon}
          label={note.unitType}
          background={
            chipData?.background || 'linear-gradient(90deg,#ccc,#eee)'
          }
        />
        <p className={styles.date}>{formattedDate}</p>
      </div>

      <img
        src={note.problemImageUrl}
        alt={`오답노트 ${note.questionId}`}
        className={styles.img}
      />

      <div className={styles.noteContent}>{renderAiAnswer()}</div>
    </main>
  );
};

export default ReviewNoteDetail;
