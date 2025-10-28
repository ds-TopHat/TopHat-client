import {
  IcHomeTextLogo,
  IcMypage,
  IcTextLogo,
  IcLeftArrow,
} from '@components/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';
import { themeVars } from '@styles/theme.css';

import * as styles from './header.css';

interface HeaderProps {
  isHome?: boolean;
}

const Header = ({ isHome = false }: HeaderProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goHome = () => navigate(routePath.HOME);
  const goBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(routePath.HOME, { replace: true });
    }
  };
  const goMyPage = () => navigate(routePath.MY);

  const isMyPage = pathname === routePath.MY;
  const isHomePage = pathname === routePath.HOME;

  const showBackButton =
    !isHomePage && !isMyPage && pathname !== routePath.SOLVE;

  const iconColor = isHome ? '#C9DFFF' : themeVars.color.point;

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.leftGroup}>
        {showBackButton && (
          <button
            type="button"
            aria-label="이전 페이지로 이동"
            onClick={goBack}
          >
            <IcLeftArrow width={10} color={iconColor} />
          </button>
        )}

        <button type="button" aria-label="홈페이지로 이동" onClick={goHome}>
          {isHomePage ? (
            <IcHomeTextLogo width={96} height={36} />
          ) : (
            <IcTextLogo
              width={96}
              height={36}
              color={themeVars.color.white000}
            />
          )}
        </button>
      </div>

      <div className={styles.rightGroup}>
        {!isMyPage && (
          <button
            type="button"
            aria-label="마이페이지로 이동"
            onClick={goMyPage}
          >
            <IcMypage width={24} color={iconColor} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
