import { style, keyframes } from '@vanilla-extract/css';

const bounce = keyframes({
  '0%, 80%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-16px)' },
});

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  background: 'linear-gradient(0deg, #E7F0FF 0%, #FFF 100%)',
});

export const logo = style({
  animation: `${bounce} 1.6s infinite ease-in-out`,
});
