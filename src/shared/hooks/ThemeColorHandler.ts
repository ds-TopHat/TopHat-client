import { useLocation } from 'react-router-dom';

const ThemeColorHandler = () => {
  const location = useLocation();

  const androidMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  const iosMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="apple-mobile-web-app-status-bar-style"]',
  );

  if (androidMeta && iosMeta) {
    let androidColor = '#ffffff';
    let iosStyle: 'default' | 'black' | 'black-translucent' = 'default';

    const path = location.pathname;

    switch (true) {
      case path === '/':
        androidColor = '#2150EC';
        iosStyle = 'black-translucent';
        break;
      case path === '/my':
        androidColor = '#BFD9FE';
        iosStyle = 'black-translucent';
        break;
      case path === '/login':
      case path === '/signup':
        androidColor = '#ffffff';
        iosStyle = 'default';
        break;
      case path === '/solve':
      case path === '/review-notes':
      case path.startsWith('/review-notes/'):
        androidColor = '#F2F4F8';
        iosStyle = 'black-translucent';
        break;
      default:
        androidColor = '#ffffff';
        iosStyle = 'default';
        break;
    }

    androidMeta.content = androidColor;
    iosMeta.content = iosStyle;
  }

  return null;
};

export default ThemeColorHandler;
