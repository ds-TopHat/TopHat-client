import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  paddingTop: '10.8rem',

  height: '100%',
  background: 'linear-gradient(355deg, #FFF 48.23%, #BFD9FE 97.05%), #FFF',
  backgroundRepeat: 'no-repeat',
});

export const title = style({
  display: 'flex',
  flexDirection: 'row',
  padding: '3.2rem 0 0 3.6rem',
});

export const name = style({
  color: themeVars.color.point,
  fontSize: '2.9rem',
  fontWeight: 400,
  lineHeight: 'normal',
  fontStyle: 'normal',
});

export const hello = style({
  background: themeVars.color.main_gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '2.4rem',
  fontWeight: 400,
  lineHeight: 'normal',
  fontStyle: 'normal',
  alignSelf: 'flex-end',
});

export const noteDiv = style({
  padding: '2.6rem',
  borderRadius: '12px',
  margin: 'auto 0',
});

export const noteTitle = style({
  color: themeVars.color.gray600,
  ...themeVars.font.displayLarge,
});

export const noteDescription = style({
  whiteSpace: 'pre-line',
  color: themeVars.color.gray500,
  ...themeVars.font.bodySmall,
});

export const noteCard = style({
  position: 'relative',
  width: '100%',
  maxWidth: '500px',
  borderRadius: '12px',
  overflow: 'hidden',
});

export const noteImg = style({
  width: '100%',
  height: 'auto',
  display: 'block',
});

export const noteContainer = style({
  position: 'absolute',
  top: '50%',
  left: '0',
  width: '100%',
  transform: 'translateY(-50%)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 3.2rem',
  boxSizing: 'border-box',
});

export const noteButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.8rem',
  height: '4.8rem',
  background: themeVars.color.main_gradient,
  boxShadow: '0 0 10px 0 rgba(33, 81, 236, 0.30)',
  borderRadius: '15px',
  cursor: 'pointer',
  border: 'none',
  alignSelf: 'flex-end',
});

export const noteContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const chipSection = style({
  padding: '0.8rem 3.2rem 0.8rem 3.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '3.2rem',
});

export const randomChipContainer = style({
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '0.4rem',
  alignItems: 'center',
  color: themeVars.color.gray500,
  fontSize: '1.8rem',
  fontWeight: 500,
});

export const firstLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const secondLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const divider = style({
  height: '1px',
  backgroundColor: themeVars.color.gray200,
  width: '100%',
});

export const randomText = style({
  color: themeVars.color.gray600,
  fontSize: '1.6rem',
});

export const chipList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem',
});

export const chipListWrapper = style({
  position: 'relative',
});

export const chipGradientOverlay = style({
  position: 'absolute',
  bottom: -1,
  left: 0,
  width: '100%',
  height: '5.6rem',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFF 100%)',
  pointerEvents: 'none',
});

export const expandButton = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingBottom: '2rem',
  cursor: 'pointer',
});

export const rotated = style({
  transform: 'rotate(180deg)',
  transition: 'transform 0.5s',
});

export const unrotated = style({
  transform: 'rotate(0deg)',
  transition: 'transform 0.5s',
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  padding: '3.6rem 3.6rem 10rem',
  maxWidth: '55rem',
});

export const button = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.8rem 2rem',
  height: '5.6rem',
  width: '100%',
  color: themeVars.color.gray800,
  backgroundColor: themeVars.color.white000,
  borderRadius: '15px',
  border: `1px solid ${themeVars.color.gray100}`,

  ...themeVars.font.headlineLarge,
});
