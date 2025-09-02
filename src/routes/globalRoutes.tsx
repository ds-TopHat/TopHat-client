import {
  HomePage,
  LoginPage,
  MyPage,
  ReviewNoteDetailPage,
  ReviewNotesPage,
  SignupPage,
  SolvePage,
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
];
