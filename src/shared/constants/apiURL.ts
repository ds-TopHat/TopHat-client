export const API_URL = {
  // wrong-note-controller
  REVIEW_NOTE_PDF: '/api/v0/wrong-notes/pdf',
  REVIEW_NOTES: '/api/v0/wrong-notes',
  REVIEW_NOTE_DETAIL: '/api/v0/wrong-notes/{questionId}',

  //user-controller
  SIGNUP: '/api/v0/users/signup',
  LOGIN: '/api/v0/users/login',
  USER_DELETE: '/api/v0/users/delete',
  REISSUE: '/api/v0/users/refreshtoken',

  // kakao
  KAKAO_LOGIN: '/api/auth/kakao/login',
  KAKAO_SIGNUP: '/api/auth/kakao/signup',
  KAKAO_AUTHCODE: '/api/auth/kakao/authcode',

  // email-verification-controller
  VERIFY_CODE: '/api/v0/email-auth/verify-code',
  REQUEST_CODE: '/api/v0/email-auth/request-code',

  //ai-controller
  AI_CHAT: '/api/v0/ai/chat',

  // s-3-controller
  S3_PRESIGNED: '/s3/presigned?count=',

  // my-page-controller
  ME: '/api/v0/users/me',
};
