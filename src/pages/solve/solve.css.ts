import { themeVars } from '@styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

const wrapper = style({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  paddingTop: '10.8rem',
  paddingBottom: '10rem',
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
  maxWidth: '33rem',
  padding: '1rem',
  borderRadius: '1.2rem',
  backgroundColor: themeVars.color.white000,
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
});

const chatBubbleRight = style({
  alignSelf: 'flex-end',
  maxWidth: '33rem',
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

const chatButtons = style({
  display: 'flex',
  gap: '0.8rem',
  marginTop: '0.8rem',
});

const chatButton = style({
  flex: 1,
  padding: '0.8rem',
  borderRadius: '10px',
  border: `1px solid ${themeVars.color.gray200}`,
  background: themeVars.color.gray100,
  cursor: 'pointer',
  ...themeVars.font.labelSmall,
});

export {
  wrapper,
  chatContainer,
  chatBubbleLeft,
  chatBubbleRight,
  chatImage,
  chatText,
  chatServerText,
  chatButtons,
  chatButton,
};

const bounce = keyframes({
  '0%, 80%, 100%': { transform: 'translateY(0px)' },
  '40%': { transform: 'translateY(-2px)' },
});

export const dots = style({
  display: 'flex',
  gap: '0.7rem',
  padding: '0.2rem',
});

export const dot = style({
  width: '0.8rem',
  height: '0.8rem',
  borderRadius: '50%',
  backgroundColor: themeVars.color.point,
  animation: `${bounce} 1.2s infinite ease-in-out both`,
  selectors: {
    '&:nth-child(1)': { animationDelay: '0s' },
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.4s' },
  },
});
