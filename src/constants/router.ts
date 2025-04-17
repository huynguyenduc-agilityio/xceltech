export const AUTHENTICATION_PAGE = {
  USER_SIGN_IN: '/user/signin',
  ADMIN_SIGN_IN: '/admin/signin',
  SIGN_UP: '/user/signup',
  ACTIVATE: '/activate',
};

export const USER_PAGE = {
  ROOT: '/user',
  DASHBOARD: '/user/dashboard',
  LEAVE: '/user/dashboard/leave',
  PROFILE_EDIT: '/user/dashboard/update-profile',
  LEAVE_RECALL: '/user/dashboard/leave-recall',
  NOT_FOUND: '*',
};

export const ADMIN_PAGE = {
  ROOT: '/admin',
  DASHBOARD: '/admin/dashboard',
  LEAVE_MANAGEMENT: '/admin/leave-management',
  LEAVE_HISTORY: '/admin/leave-management/leave-history',
  LEAVE_RECALL: '/admin/leave-management/leave-recall',
  NOT_FOUND: '*',
};
