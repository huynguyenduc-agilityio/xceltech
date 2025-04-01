const COMMON = {
  DUPLICATE: (fieldName: string) => `${fieldName} already exists!`,
};

const VALIDATE = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required!`,
  FIELD_VALID: (fieldName: string) => `Please enter a valid ${fieldName}.`,
  LIMIT_PASSWORD: 'Password must be at least 8 characters long',
  INVALID_PASSWORD:
    'Password must include uppercase, lowercase, number, and special character',
  INVALID_CONFIRM_PASSWORD: 'Password and Confirm Password don’t match',
};
const AUTHENTICATION = {
  LOGIN_FAILED: 'Email or password is incorrect.',
  REGISTER_SUCCESS:
    'Account created successfully! Please check your email to activate your account.',
  ACTIVATE_SUCCESS: 'Account activated!',
  ACTIVATE_FAILED: 'Activation failed',
};

const MESSAGES = {
  COMMON,
  VALIDATE,
  AUTHENTICATION,
};

export default MESSAGES;
