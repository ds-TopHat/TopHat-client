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

export const kakaoLoginButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '5.6rem',
  padding: '0 1.4rem',
  gap: '0.8rem',
  backgroundColor: '#FEE500',
  fontFamily: 'Apple SD Gothic Neo',
  borderRadius: '15px',
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: '15px',
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
});

export const signupText = style({
  display: 'flex',
  alignItems: 'center',
  color: themeVars.color.gray500,
  ...themeVars.font.labelLarge,
});

export const signupButton = style({
  paddingLeft: '1.2rem',
  color: themeVars.color.point,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

export const loginError = style({
  textAlign: 'left',
  alignSelf: 'flex-start',
  color: '#F73E3E',
  ...themeVars.font.labelLarge,
});
