export const routePath = {
  HOME: '/',
  SOLVE: '/solve',
  MY: '/my',
  LOGIN: '/login',
  SIGNUP: '/signup',
  REVIEW_NOTES: '/review-notes',
  REVIEW_NOTE_DETAIL: '/review-notes/:id',
  LOGIN_CALLBACK: '/kakao/callback',
  SIMPLE_WHITEBOARD: '/simple-whiteboard',
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
