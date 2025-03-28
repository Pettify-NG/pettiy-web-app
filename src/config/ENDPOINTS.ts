const ENDPOINTS = {
  // Auth
  SIGN_IN: `auth/login`,
  SIGN_UP: `auth/register`,
  CONFIRM_EMAIL_OTP: `auth/confirm-email`,
  VERIFY_OTP: `auth/verify`,
  FORGOT_PASSWORD: `auth/forgot`,
  RESET_PASSWORD: `auth/reset`,
  RESEND_OTP: `auth/resend-otp`,

  // Upload Images
  UPLOAD_FILE: `upload`,

  // Users
  USER: `users/`,

  // Accessory
  ACCESSORY: `accessories/`,
  CREATE_ACCESSORY: `accessories/create`,

  // Orders
  ORDERS: `orders/`,

  // Pet
  PET: `pets/`,
  CREATE_PET: `pets/create`,
};

export default ENDPOINTS;

  
