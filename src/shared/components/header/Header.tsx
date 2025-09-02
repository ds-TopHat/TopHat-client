import { IcHomeTextLogo, IcMypage, IcTextLogo } from '@components/icons';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';
import { themeVars } from '@styles/theme.css';

import * as styles from './header.css';

interface HeaderProps {
  isHome?: boolean;
}

const Header = ({ isHome = false }: HeaderProps) => {
  const navigate = useNavigate();

  const goHome = () => navigate(routePath.HOME);
  const goMyPage = () => navigate(routePath.MY);

  return (
    <div className={styles.headerWrapper}>
      <button type="button" aria-label="홈페이지로 이동" onClick={goHome}>
        {isHome ? (
          <IcHomeTextLogo width={96} height={36} />
        ) : (
          <IcTextLogo width={96} height={36} color={themeVars.color.white000} />
        )}
      </button>
      <button type="button" aria-label="마이페이지로 이동" onClick={goMyPage}>
        <IcMypage
          width={24}
          color={isHome ? '#C9DFFF' : themeVars.color.point}
        />
      </button>
    </div>
  );
};

export default Header;
