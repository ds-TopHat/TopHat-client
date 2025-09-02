import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const wrapper = style({
  position: 'fixed',
  display: 'flex',
  bottom: 0,
  width: '100%',
  alignItems: 'center',
  backgroundColor: 'transparent',
});

const scrollContainer = style({
  overflowX: 'auto',
  padding: '1rem 0 2rem',
});

const inner = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0 2rem',
  width: 'fit-content',
  gap: '1.6rem',
});

const toggleList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

const toggleButtonWrapper = style({
  position: 'relative',
  padding: '0.4rem',
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: '100px',
  backgroundImage: themeVars.color.main_gradient,
  boxShadow: '0px 0px 10px 0px rgba(33, 81, 236, 0.30)',
});

const toggleButton = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '0.6rem 2rem',
  height: '4.8rem',

  borderRadius: '100px',
  backgroundColor: themeVars.color.white000,
  border: '4px solid transparent',
  borderImage: `${themeVars.color.main_gradient} 0`,
  boxShadow: '0px 0px 10px 0px rgba(33, 81, 236, 0.30)',
  whiteSpace: 'nowrap',
  ...themeVars.font.bodyMedium,
});

const gradientText = style({
  backgroundImage: themeVars.color.main_gradient,
  WebkitBackgroundClip: 'text',
  color: 'transparent',
});

export {
  wrapper,
  scrollContainer,
  inner,
  toggleList,
  toggleButtonWrapper,
  toggleButton,
  gradientText,
};
