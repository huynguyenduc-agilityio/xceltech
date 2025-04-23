import {
  BagIcon,
  BookIcon,
  DocumentIcon,
  GridIcon,
  ScaleIcon,
  MailIcon,
  MoneyIcon,
  UserGroupIcon,
  UserIcon,
} from '@/icons';
import { USER_PAGE } from './router';

export const PATH_LEAVE = {
  LEAVE_HISTORY: 'leave-management/leave-history',
  LEAVE_RECALL: 'leave-management/leave-recall',
  LEAVE_SETTINGS: 'leave-management/leave-settings',
  RELIEF_OFFICERS: 'leave-management/relief-officers',
};

export const USER_NAVIGATION_CONFIG = [
  {
    title: 'Dashboard',
    path: USER_PAGE.DASHBOARD,
  },
  {
    title: 'Requests',
    path: '',
  },
  {
    title: 'Payroll',
    path: '',
  },
  {
    title: 'Company',
    path: '',
  },
  {
    title: 'Extras',
    path: '',
  },
];

export const ADMIN_NAVIGATION_CONFIG = [
  {
    title: 'Features',
    navItem: [
      {
        title: 'Dashboard',
        icon: GridIcon,
        url: 'dashboard',
      },
      {
        title: 'Messages',
        icon: MailIcon,
        url: '',
      },
    ],
  },
  {
    title: 'Recruitment',
    navItem: [
      {
        title: 'Jobs',
        icon: BagIcon,
        url: '',
      },
      {
        title: 'Candidates',
        icon: UserGroupIcon,
        url: '',
      },
      {
        title: 'Resumes',
        icon: DocumentIcon,
        url: '',
      },
    ],
  },
  {
    title: 'Organization',
    navItem: [
      {
        title: 'Employee Management',
        icon: UserIcon,
        url: '',
      },
      {
        title: 'Leave Management',
        icon: BookIcon,
        url: 'leave-management',
      },
      {
        title: 'Performance Management',
        icon: ScaleIcon,
        url: '',
      },
    ],
  },
  {
    title: 'KRIS Pay',
    navItem: [
      {
        title: 'Payroll Management',
        icon: MoneyIcon,
        url: '',
      },
    ],
  },
];

export const LEAVE_NAVIGATION = [
  {
    title: 'Leave Settings',
    path: PATH_LEAVE.LEAVE_SETTINGS,
  },
  {
    title: 'Leave Recall',
    path: PATH_LEAVE.LEAVE_RECALL,
  },
  {
    title: 'Leave History',
    path: PATH_LEAVE.LEAVE_HISTORY,
  },
  {
    title: 'Relief Officers',
    path: PATH_LEAVE.RELIEF_OFFICERS,
  },
];
