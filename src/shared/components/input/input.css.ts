import { themeVars } from '@styles/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const inputWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const inputInner = style({
  position: 'relative',
  width: '100%',
});

export const baseInput = style({
  width: '100%',
  height: '5rem',
  padding: '0.8rem 2rem',
  borderRadius: '15px',
  outline: 'none',
  background: themeVars.color.white000,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  ...themeVars.font.labelLarge,
});

export const rightButtonWrapper = style({
  position: 'absolute',
  right: '0.8rem',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const inputVariants = styleVariants({
  default: {
    border: `1px solid ${themeVars.color.gray200}`, // a) 기본
    color: themeVars.color.gray400,
    selectors: {
      '&::placeholder': {
        color: themeVars.color.gray400,
      },
    },
  },
  active: {
    border: `1px solid ${themeVars.color.point}`, // b) 입력중
    color: themeVars.color.gray600,
    boxShadow: `0 4px 10px 0 rgba(72, 139, 255, 0.10)`,

    selectors: {
      '&::placeholder': {
        color: themeVars.color.gray400,
      },
    },
  },
  filled: {
    border: `1px solid ${themeVars.color.gray200}`, // c) 입력 완료
    color: themeVars.color.gray600,
    selectors: {
      '&::placeholder': {
        color: themeVars.color.gray400,
      },
    },
  },
  error: {
    border: '1px solid #F73E3E', // d) 오류
    color: '#F73E3E',
    selectors: {
      '&::placeholder': {
        color: '#F73E3E',
      },
    },
  },
});

export const errorMessage = style({
  margin: '0.4rem 0 0 0.4rem',
  minHeight: '2.4rem',
  color: '#F73E3E',
  ...themeVars.font.labelSmall,
});
