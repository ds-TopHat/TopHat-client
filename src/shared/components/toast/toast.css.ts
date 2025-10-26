import { style, keyframes } from '@vanilla-extract/css';
import { themeVars } from '@styles/theme.css';

const slideUp = keyframes({
  '0%': { transform: 'translate(-50%, 20px)', opacity: 0 },
  '100%': { transform: 'translate(-50%, 0)', opacity: 1 },
});

const slideDown = keyframes({
  '0%': { transform: 'translate(-50%, 0)', opacity: 1 },
  '100%': { transform: 'translate(-50%, 20px)', opacity: 0 },
});

export const toast = style({
  position: 'fixed',
  bottom: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '1rem 2rem',
  borderRadius: '10px',
  minWidth: '32rem',
  textAlign: 'center',

  backgroundColor: themeVars.color.gray800,
  color: themeVars.color.white000,
  ...themeVars.font.bodySmall,
  zIndex: themeVars.zIndex.five,
  whiteSpace: 'pre-line',
});

export const enter = style({
  animation: `${slideUp} 0.3s ease-out forwards`,
});

export const exit = style({
  animation: `${slideDown} 0.3s ease-in forwards`,
});
