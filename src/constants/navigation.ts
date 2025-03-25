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

export const USER_NAVIGATION_CONFIG = [
  {
    title: 'Dashboard',
    path: '',
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
        url: '',
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
