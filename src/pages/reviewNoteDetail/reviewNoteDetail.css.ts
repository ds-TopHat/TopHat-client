import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  padding: '9.6rem 2.4rem 10rem',
  gap: '1.6rem',

  alignItems: 'center',

  backgroundColor: themeVars.color.gray100,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const topContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '66.8rem',
});

export const date = style({
  display: 'flex',
  color: themeVars.color.gray500,
  ...themeVars.font.bodySmall,
});

export const noteContent = style({
  paddingTop: '1.6rem',
  width: '100%',
  maxWidth: '66.8rem',
  margin: '0 auto',

  color: themeVars.color.gray600,
  whiteSpace: 'pre-wrap',
  ...themeVars.font.bodySmall,
});

export const img = style({
  width: '100%',
  maxWidth: '66.8rem',
  margin: '0 auto',
});
