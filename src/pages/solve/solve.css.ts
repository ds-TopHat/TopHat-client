import { themeVars } from '@styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

const wrapper = style({
  width: '100%',
  minHeight: '100dvh',
  height: '100%',
  paddingTop: '7.95rem',
  // paddingTop: '10.8rem',

  paddingBottom: '8.95rem',
  backgroundColor: themeVars.color.gray100,
});

const chatContainer = style({
  flex: 1,
  overflowY: 'auto',
  padding: '1.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  whiteSpace: 'pre-line',
});

const chatBubbleLeft = style({
  alignSelf: 'flex-start',
  maxWidth: '32rem',
  padding: '1rem',
  borderRadius: '1.2rem',
  backgroundColor: themeVars.color.white000,
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
});

const chatBubbleRight = style({
  alignSelf: 'flex-end',
  maxWidth: '32rem',
  padding: '1rem',
  borderRadius: '12px',
  background: themeVars.color.point,
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
});

const chatImage = style({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  display: 'block',
});

const chatText = style({
  color: themeVars.color.white000,
  wordBreak: 'break-word',
  ...themeVars.font.bodySmall,
});

const chatServerText = style({
  color: themeVars.color.gray700,
  wordBreak: 'break-word',
  ...themeVars.font.bodySmall,
});

const chatMyText = style({
  color: themeVars.color.point,
  wordBreak: 'break-word',
  ...themeVars.font.bodySmall,
});

export {
  wrapper,
  chatContainer,
  chatBubbleLeft,
  chatBubbleRight,
  chatImage,
  chatText,
  chatServerText,
  chatMyText,
};

const bounce = keyframes({
  '0%, 100%': { transform: 'translateY(1px)' },
  '50%': { transform: 'translateY(-2px)' },
});

export const dots = style({
  display: 'flex',
  gap: '0.7rem',
  padding: '0.2rem',
});

export const dot = style({
  width: '0.7rem',
  height: '0.7rem',
  borderRadius: '50%',
  backgroundColor: themeVars.color.point,
  animation: `${bounce} 1.2s infinite ease-in-out both`,
  selectors: {
    [`${chatBubbleRight} &`]: {
      backgroundColor: themeVars.color.white000,
    },
    '&:nth-child(1)': { animationDelay: '0s' },
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.4s' },
  },
});
