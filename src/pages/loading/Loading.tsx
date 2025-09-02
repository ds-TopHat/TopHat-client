import { IcBigLogo } from '@components/icons';

import * as styles from './loading.css';

const Loading = () => {
  return (
    <main className={styles.container}>
      <IcBigLogo width={150} className={styles.logo} />
    </main>
  );
};

export default Loading;
