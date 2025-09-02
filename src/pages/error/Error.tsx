import { IcWarning } from '@components/icons';
import Button from '@components/button/Button';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';

import * as styles from './error.css';

const Error = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(routePath.HOME);
  };

  return (
    <main className={styles.container}>
      <IcWarning width={120} height={120} />
      <h1 className={styles.title}>서비스 이용에 불편을 드려 죄송합니다. </h1>
      <p className={styles.description}>
        요청하신 페이지를 처리하는 도중 예기치 못한 에러가 발생했어요. <br />
        다시 한번 시도하거나 홈으로 이동해 주세요.
      </p>
      <div className={styles.buttonWrapper} onClick={goHome}>
        <Button isActive>홈으로 이동</Button>
      </div>
    </main>
  );
};

export default Error;
