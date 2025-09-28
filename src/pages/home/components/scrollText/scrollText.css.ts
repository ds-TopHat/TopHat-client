import { style } from '@vanilla-extract/css';
import { themeVars } from '@styles/theme.css';

export const lineWrapper = style({
  position: 'relative',
});

export const gradientOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',

  paddingTop: '16rem',
  margin: '0 auto',
  paddingLeft: '3.2rem',

  zIndex: themeVars.zIndex.three,
});

export const line = style({
  fontFamily: 'Pretendard Variable',
  fontSize: '3.2rem',
  fontWeight: 600,
  lineHeight: 'normal',
  color: themeVars.color.white000,
});

export const gradient = style({
  background: themeVars.color.main_gradient,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
});
