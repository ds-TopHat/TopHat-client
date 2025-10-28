import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const headerWrapper = style({
  display: 'flex',
  padding: '2rem 2.4rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'fixed',
  top: 0,
  width: '100%',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  zIndex: themeVars.zIndex.five,
});

export const leftGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
});

export const rightGroup = style({
  display: 'flex',
  alignItems: 'center',
});
