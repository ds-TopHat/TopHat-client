import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const formWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  width: '100%',
  maxWidth: '48rem',
  padding: '0 3.6rem',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '8rem',
  height: '100dvh',
  background: 'linear-gradient(0deg, #E7F0FF 0%, #FFF 100%)',
});

export const topBox = style({
  marginBottom: '5rem',
});

export const buttonWrapper = style({
  display: 'flex',
  position: 'fixed',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '48rem',

  padding: '0 3.6rem 2.4rem',
  gap: '1.2rem',
  alignItems: 'center',
  bottom: '0',
});

export const loginText = style({
  display: 'flex',
  color: themeVars.color.gray500,
  ...themeVars.font.labelLarge,
});

export const loginButton = style({
  paddingLeft: '1.2rem',
  color: themeVars.color.point,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

export const codeButton = style({
  display: 'flex',
  padding: '0.6rem 1rem',
  justifyContent: 'center',
  alignItems: 'center',
  color: themeVars.color.white000,
  borderRadius: '10px',
  background: themeVars.color.gray500,
  ...themeVars.font.labelLarge,
});
