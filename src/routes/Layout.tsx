import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Header from '@components/header/Header';
import { routePath } from '@routes/routePath';

const Layout = () => {
  const location = useLocation();

  const noHeaderPaths = [routePath.LOGIN, routePath.SIGNUP];
  const showHeader = !noHeaderPaths.some((path) =>
    location.pathname.startsWith(path),
  );
  const isHome = location.pathname === routePath.HOME;

  return (
    <>
      {showHeader && <Header isHome={isHome} />}
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

export default Layout;
