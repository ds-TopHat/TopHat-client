import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '@components/header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

export default Layout;
