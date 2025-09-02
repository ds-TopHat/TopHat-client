import { lazy } from 'react';

export const HomePage = lazy(() => import('@pages/home/Home'));
export const SolvePage = lazy(() => import('@pages/solve/Solve'));
export const MyPage = lazy(() => import('@pages/my/My'));
export const LoginPage = lazy(() => import('@pages/login/Login'));
export const SignupPage = lazy(() => import('@pages/signup/Signup'));
export const ReviewNotesPage = lazy(
  () => import('@pages/reviewNotes/ReviewNotes'),
);
export const ReviewNoteDetailPage = lazy(
  () => import('@pages/reviewNoteDetail/ReviewNoteDetail'),
);
