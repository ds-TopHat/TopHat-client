import { themeVars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const floatingSolveBtn = style({
  // 1. 버튼을 담을 '컨테이너'
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'fixed',
  bottom: '2rem',
  zIndex: themeVars.zIndex.one,

  // 2. 컨테이너를 페이지 '메인 컨텐츠'와 똑같이
  width: '100%',
  maxWidth: '1180px',

  // 3. 컨테이너를 화면 중앙에 배치
  left: '50%',
  transform: 'translateX(-50%)',

  // 4. 컨테이너의 오른쪽 안쪽에 2rem 여백을 줌
  paddingRight: '2rem',

  // padding이 너비에 영향을 주지 않도록 설정
  boxSizing: 'border-box',
});
