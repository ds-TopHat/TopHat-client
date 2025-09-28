import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const backdrop = style({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: themeVars.zIndex.five,
});

export const modal = style({
  backgroundColor: themeVars.color.white000,
  borderRadius: '16px',
  padding: '2.4rem',
  width: '80%',
  maxWidth: '400px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
});

export const title = style({
  marginBottom: '2rem',
  textAlign: 'center',
  color: themeVars.color.gray700,
  ...themeVars.font.headlineLarge,
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const button = style({
  padding: '1.4rem',
  borderRadius: '8px',
  border: `1px solid ${themeVars.color.gray200}`,
  background: themeVars.color.point,
  color: themeVars.color.white000,
  cursor: 'pointer',
  ...themeVars.font.headlineMedium,
});
