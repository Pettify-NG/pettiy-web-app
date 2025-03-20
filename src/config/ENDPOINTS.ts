const ENDPOINTS = {
  SIGN_IN: `auth/login`,
  SIGN_UP: `auth/register`,
  CONFIRM_EMAIL_OTP: `auth/confirm-email`,
  VERIFY_OTP: `auth/verify`,
  FORGOT_PASSWORD: `auth/forgot`,
  RESET_PASSWORD: `auth/reset`,
  RESEND_OTP: `auth/resend-otp`,

  UPLOAD_FILE: `upload`,

  CREATE_LISTING: `listings/create`,

  // Users
  USER: `users/`,

  // Orders
  ORDERS: `orders/`
};

export default ENDPOINTS;
