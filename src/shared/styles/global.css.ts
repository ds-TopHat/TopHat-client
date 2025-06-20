import { globalStyle } from '@vanilla-extract/css';

import { themeVars } from './theme.css';

// :root 변수 정의
globalStyle(':root', {
  vars: {
    '--min-width': '375px',
    '--max-width': '768px',
  },
});

globalStyle(':root', {
  vars: {
    '--swiper-theme-color': themeVars.color.white000,
    '--swiper-pagination-bullet-inactive-color': themeVars.color.white000,
  },
});

// HTML, Body 스타일
globalStyle('html, body', {
  minWidth: 'var(--min-width)',
  display: 'flex',
  fontFamily: `'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '62.5%',
  scrollbarWidth: 'none',
  margin: '0 auto',
  scrollBehavior: 'smooth',
  backgroundColor: themeVars.color.gray200,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

// A 태그 스타일
globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});

// Select 태그 스타일
globalStyle('select', {
  background: themeVars.color.white000,
});

// #root 스타일
globalStyle('#root', {
  position: 'relative',
  width: '100%',
  minHeight: '100dvh',
  backgroundColor: '#fff',
});

// Webkit 스크롤바 숨기기
globalStyle('::-webkit-scrollbar', {
  display: 'none',
});

globalStyle('.swiper-pagination-bullet', {
  width: '4px',
  height: '4px',
  backgroundColor: themeVars.color.white000,
});

globalStyle('.swiper-pagination-bullet:active', {
  width: '4px',
  height: '4px',
  backgroundColor: themeVars.color.white000,
});
