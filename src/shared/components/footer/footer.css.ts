import { style } from '@vanilla-extract/css';
import { themeVars } from '@styles/theme.css';

export const footerWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '0.8rem',

  width: '100%',
  height: '14.4rem',
  padding: '3.6rem 2.4rem 6rem 2.4rem',

  backgroundColor: themeVars.color.gray600,
  color: themeVars.color.white000,
  ...themeVars.font.labelLarge,
});
