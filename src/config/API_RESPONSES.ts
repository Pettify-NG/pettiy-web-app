type ResponsesType = {
  [key: string]: {
    [key: string | number]: string;
  };
};

export const API_RESPONSES: ResponsesType = {
  SIGN_IN: {
    200: 'Login Successful',
    203: 'Account setup not completed. Please verify email.',
    401: 'Invalid email or password',
    404: 'Cannot process request at the moment',
    "success": 'Login Successful',
  },

  SIGN_UP: {
    201: 'Registration Successful. OTP has been sent to your email.',
    302: 'User with this email already exists.',
    404: 'Cannot process request at the moment',
  },

  VERIFY_OTP: {
    404: 'User not active',
  },
};
