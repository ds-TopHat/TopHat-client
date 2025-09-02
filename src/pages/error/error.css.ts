import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '14rem',
  height: '100dvh',
  background: 'linear-gradient(0deg, #E7F0FF 0%, #FFF 100%)',
});

export const title = style({
  margin: '4rem 0 2rem',
  color: themeVars.color.point,
  ...themeVars.font.displayMedium,
});

export const description = style({
  textAlign: 'center',
  color: themeVars.color.gray500,
  ...themeVars.font.labelSmall,
});

export const buttonWrapper = style({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  padding: '2.4rem 2rem',
});
