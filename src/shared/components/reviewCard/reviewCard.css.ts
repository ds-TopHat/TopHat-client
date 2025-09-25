import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const cardContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  width: '100%',
  height: '14.4rem',

  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
});

export const cardSelected = style({
  borderColor: themeVars.color.point,
});

export const overlay = style({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
});

export const overlaySelected = style({
  background: 'rgba(230, 242, 255, 0.50)',
});

export const imageBackground = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const textContainer = style({
  position: 'absolute',
  left: '0.8rem',
  bottom: '0.8rem',
  padding: '0.2rem 0.6rem',
  textAlign: 'center',
  borderRadius: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: themeVars.color.gray600,
  ...themeVars.font.headlineLarge,
});

export const checkIcon = style({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  zIndex: themeVars.zIndex.two,
});
