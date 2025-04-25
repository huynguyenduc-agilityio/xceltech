const COMMON = {
  DUPLICATE: (fieldName: string) => `${fieldName} already exists!`,
  ADD_SUCCESS: (fieldName: string) => `${fieldName} added successfully!`,
  ADD_FAILED: (fieldName: string) => `Failed to add ${fieldName}.`,
  UPDATE_SUCCESS: (fieldName: string) => `${fieldName} updated successfully!`,
  UPDATE_FAILED: (fieldName: string) => `Failed to update ${fieldName}.`,
  DELETE_SUCCESS: (fieldName: string) => `${fieldName} deleted successfully!`,
  DELETE_FAILED: (fieldName: string) => `Failed to delete ${fieldName}.`,
  UPLOAD_SUCCESS: (fieldName: string) => `${fieldName} uploaded successfully.`,
  UPLOAD_FAILED: (fieldName: string) => `Failed to uploaded ${fieldName}.`,
  EMPTY_DATA: 'No data found',
  LEAVE_REQUEST_SUCCESS: 'Leave request successfully!',
  LEAVE_REQUEST_FAILED: 'Leave request failed!',
  RECALL_REQUEST_SUCCESS: 'Recall request successfully!',
  RECALL_REQUEST_FAILED: 'Recall request failed!',
  EXPORT_SUCCESS: 'File exported successfully!',
  EXPORT_FAILED: 'Failed to export file.',
  DOWNLOAD_SUCCESS: 'File download successfully!',
  DOWNLOAD_FAILED: 'Failed to download file.',
};

const VALIDATE = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required!`,
  FIELD_VALID: (fieldName: string) => `Please enter a valid ${fieldName}.`,
  LIMIT_PASSWORD: 'Password must be at least 8 characters long',
  INVALID_PASSWORD:
    'Password must include uppercase, lowercase, number, and special character',
  INVALID_CONFIRM_PASSWORD: 'Password and Confirm Password don’t match',
  INVALID_ACCOUNT_NO: 'Account No is not up to 10 digits',
};

const AUTHENTICATION = {
  LOGIN_FAILED: 'Email or password is incorrect.',
  REGISTER_SUCCESS:
    'Account created successfully! Please check your email to activate your account.',
  ACTIVATE_SUCCESS: 'Account activated!',
  ACTIVATE_FAILED: 'Activation failed',
};

const LEAVE_REQUEST = {
  INVALID_START_DATE: 'Start date must be from tomorrow onwards',
  INVALID_END_DATE: 'End date must be the same as or after the start date',
  INVALID_RESUMPTION_DATE: 'Resumption date must be the day after the end date',
  INVALID_DURATION: 'Duration must be greater than 1 day',
  INVALID_FILE_TYPE:
    'File must be one of the following types: .pdf, .jpg, .jpeg, .png, .docx',
};

const LEAVE_RECALL = {
  UPDATE_STATUS_SUCCESS: (status: string) =>
    `Leave recall ${status} successfully!`,
  UPDATE_STATUS_FAILED: (status: string) => `Leave recall ${status} failed!`,
};

const MESSAGES = {
  COMMON,
  VALIDATE,
  AUTHENTICATION,
  LEAVE_REQUEST,
  LEAVE_RECALL,
};

export default MESSAGES;
