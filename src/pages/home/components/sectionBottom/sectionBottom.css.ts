import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const sectionBottomWrapper = style({
  position: 'relative',
  width: '100%',
  height: '108.8rem',
  background: 'linear-gradient(168deg, #D7ECFF 0%, #AFDAFF 86.66%)',
  overflow: 'hidden',
});

const iconContainer = style({
  display: 'flex',
  position: 'absolute',
  justifyContent: 'space-between',

  inset: 0,
  pointerEvents: 'none',
});

const iconFull = style({
  width: '50%',
  height: 'auto',
});

const blueBackground = style({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '0.9rem',

  backgroundColor: 'rgba(33, 80, 236, 0.1)',
  borderRadius: '12px',
  zIndex: themeVars.zIndex.one,
});

const mainButton = style({
  padding: '1.2rem 2.4rem',
  borderRadius: '10px',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  background: themeVars.color.main_gradient,
  color: themeVars.color.white000,
  zIndex: themeVars.zIndex.two,
  ...themeVars.font.displayLarge,
});

export {
  sectionBottomWrapper,
  iconContainer,
  iconFull,
  blueBackground,
  mainButton,
};
