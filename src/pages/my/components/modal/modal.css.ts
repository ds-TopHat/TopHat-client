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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: themeVars.color.white000,
  borderRadius: '16px',
  padding: '1.6rem',
  width: '80%',
  maxWidth: '400px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
});

export const title = style({
  margin: '0.8rem 0',
  color: themeVars.color.gray600,
  ...themeVars.font.headlineMedium,
});

export const buttonGroup = style({
  display: 'flex',
  width: '100%',
  marginTop: '1.2rem',
  gap: '1.2rem',
});

const baseButton = {
  display: 'flex',
  height: '4.8rem',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1',
  borderRadius: '15px',
  boxShadow: '0 0 10px 0 rgba(192, 198, 202, 0.10)',
  ...themeVars.font.headlineMedium,
};

export const cancelButton = style({
  ...baseButton,
  border: `1px solid ${themeVars.color.gray100}`,
  background: themeVars.color.gray100,
  color: themeVars.color.gray600,
});

export const deleteButton = style({
  ...baseButton,
  background: themeVars.color.point,
  color: themeVars.color.white000,
});
