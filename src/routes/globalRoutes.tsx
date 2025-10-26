import {
  HomePage,
  LoginPage,
  MyPage,
  ReviewNoteDetailPage,
  ReviewNotesPage,
  SignupPage,
  SolvePage,
  LoginCallbackPage,
  SimpleWhiteboardPage,
} from './lazy';
import { routePath } from './routePath';

export const publicRoutes = [
  {
    path: routePath.LOGIN,
    Component: LoginPage,
  },
  {
    path: routePath.SIGNUP,
    Component: SignupPage,
  },
  {
    path: routePath.HOME,
    Component: HomePage,
  },
  {
    path: routePath.LOGIN_CALLBACK,
    Component: LoginCallbackPage,
  },
];

export const protectedRoutes = [
  {
    path: routePath.MY,
    Component: MyPage,
  },
  {
    path: routePath.SOLVE,
    Component: SolvePage,
  },
  {
    path: routePath.REVIEW_NOTES,
    Component: ReviewNotesPage,
  },
  {
    path: routePath.REVIEW_NOTE_DETAIL,
    Component: ReviewNoteDetailPage,
  },
  {
    path: routePath.SIMPLE_WHITEBOARD,
    Component: SimpleWhiteboardPage,
  },
];
