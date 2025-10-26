import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  paddingTop: '7.95rem',
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  background: themeVars.color.white000,
});

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  height: '4.8rem',
  padding: '8px 16px',

  boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
  background: themeVars.color.white000,
  zIndex: themeVars.zIndex.three,
  overflowX: 'auto',
});

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.8rem',
  borderRadius: '8px',
  border: '1px solid #ddd',
  background: themeVars.color.white000,
  cursor: 'pointer',
  transition: 'all 0.2s',
});

export const controlGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  fontSize: '1.4rem',
  color: '#333',
  whiteSpace: 'nowrap',
});

export const colorInput = style({
  width: '3.6rem',
  height: '2.8rem',
  padding: '0.2rem',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  borderRadius: '4px',
});

export const canvasWrapper = style({
  flex: 1,
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  zIndex: themeVars.zIndex.two,
});

export const imageDisplayWrapper = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '34rem',
  height: '100%',
  padding: '0.8rem',
  boxSizing: 'border-box',
  pointerEvents: 'none',
  borderRight: '2px solid #ddd',
  backgroundColor: '#f9f9f9',
  zIndex: themeVars.zIndex.one,
});

export const uploadedImage = style({
  maxWidth: '100%',
  maxHeight: '100%',
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
});

export const mainContent = style({
  flex: 1,
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
});

export const spacer = style({
  flex: 1,
});
