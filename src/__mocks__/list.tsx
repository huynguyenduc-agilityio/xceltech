// Types
import { LeaveFormEnum } from '@/types';

// Components
import { InfoTile, LeaveTile } from '@/components';

// Constants
import { IMAGES } from '@/constants';

// Icons
import {
  BagIcon,
  BookIcon,
  DocumentIcon,
  MailIcon,
  MoneyIcon,
  UserGroupIcon,
  UserIcon,
} from '@/icons';

// Routers
import { USER_PAGE } from '../constants/router';

// Define mock data for progress leave list
export const PROGRESS_LEAVE_ITEMS = [
  {
    key: 'annual',
    value: 16,
    title: (
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg text-gray-steel">Annual Leave</span>
        <span className="text-lg text-gray-steel">10 of 60 day(s)</span>
      </div>
    ),
  },
  {
    key: 'sick',
    value: 0,
    title: (
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg text-gray-steel">Sick Leave</span>
        <span className="text-lg text-gray-steel">0 of 10 day(s)</span>
      </div>
    ),
  },
  {
    key: 'compassionate',
    value: 60,
    title: (
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg text-gray-steel">Compassionate Leave</span>
        <span className="text-lg text-gray-steel">8 of 15 day(s)</span>
      </div>
    ),
  },
];

// Define mock data for leave tile list
export const LEAVE_TILE_ITEMS = [
  {
    key: 'annual',
    content: (
      <LeaveTile
        count={60}
        title="Annual Leave"
        path={`${USER_PAGE.LEAVE}/${LeaveFormEnum.Annual}`}
      />
    ),
  },
  {
    key: 'sick',
    content: (
      <LeaveTile
        count={20}
        title="Sick Leave"
        path={`${USER_PAGE.LEAVE}/${LeaveFormEnum.Sick}`}
      />
    ),
  },
  {
    key: 'maternity',
    content: (
      <LeaveTile
        count={60}
        title="Maternity Leave"
        path={`${USER_PAGE.LEAVE}/${LeaveFormEnum.Maternity}`}
      />
    ),
  },
  {
    key: 'compassionate',
    content: (
      <LeaveTile
        count={30}
        title="Compassionate Leave"
        path={`${USER_PAGE.LEAVE}/${LeaveFormEnum.Compassionate}`}
      />
    ),
  },
];

export const DASHBOARD_TILE_ITEMS = [
  {
    key: 'messages',
    content: (
      <InfoTile
        title="Messages"
        count={4}
        icon={<MailIcon width={100} height={68} color="black" />}
        styled="bg-secondary text-black"
      />
    ),
  },
  {
    key: 'jobs',
    content: (
      <InfoTile
        title="Jobs"
        count={1}
        icon={<BagIcon width={91} height={73} />}
        styled="bg-primary"
      />
    ),
  },
  {
    key: 'candidates',
    content: (
      <InfoTile
        title="Candidates"
        count={30}
        icon={<UserGroupIcon width={106} height={74} />}
        styled="bg-green-primary"
      />
    ),
  },
  {
    key: 'resumes',
    content: (
      <InfoTile
        title="Resumes"
        count={2}
        icon={<DocumentIcon width={57} height={75} />}
        styled="bg-black-muted"
      />
    ),
  },
  {
    key: 'employees',
    content: (
      <InfoTile
        title="Employees"
        count={20}
        icon={<UserIcon width={83} height={83} color="black" />}
        styled="bg-secondary text-black"
      />
    ),
  },
  {
    key: 'leaves',
    content: (
      <InfoTile
        title="Leaves"
        count={8}
        icon={<BookIcon width={103} height={62} />}
        styled="bg-primary"
      />
    ),
  },
  {
    key: 'payrolls',
    content: (
      <InfoTile
        title="Payrolls"
        count={7}
        icon={<MoneyIcon width={99} height={67} />}
        styled="bg-green-primary"
      />
    ),
  },
];

export const DASHBOARD_APPLY_JOBS = [
  {
    id: 1,
    image: IMAGES.ACCESS_BANK,
    title: 'Sales Executive',
    company: 'Access Bank',
    date: '20mins ago',
  },
  {
    id: 2,
    image: IMAGES.PAY_STACK,
    title: 'User Experience Designer',
    company: 'Paystack',
    date: '20mins ago',
  },
  {
    id: 3,
    image: IMAGES.TPAY,
    title: 'Product Manager',
    company: 'T-Pay',
    date: '20mins ago',
  },
];

export const DASHBOARD_EMPLOYEES = [
  {
    id: 1,
    image: IMAGES.YOUNG_MAN,
    name: 'Aman',
    role: 'Product Manager',
  },
  {
    id: 2,
    image: IMAGES.YOUNG_GIRL,
    name: 'Gelila',
    role: 'Sales Executive',
  },
  {
    id: 3,
    image: IMAGES.OLD_MAN,
    name: 'Biruk',
    role: 'UI UX Designer',
  },
];

export const DASHBOARD_CANDIDATES = [
  {
    id: 1,
    image: IMAGES.YOUNG_MAN,
    name: 'Feven Tesfaye',
    job: ' backend Engineer',
  },
  {
    id: 2,
    image: IMAGES.YOUNG_GIRL,
    name: 'Yanet mekuriya',
    job: 'Sales',
  },
  {
    id: 3,
    image: IMAGES.YOUNG_MAN,
    name: 'Aman beyene',
    job: 'Product Manager',
  },
];

export const DASHBOARD_PAYROLLS = [
  {
    id: 1,
    image: IMAGES.YOUNG_MAN,
    name: 'Aman',
    salary: '30,000 Birr',
    status: 'Paid',
    value: 0,
  },
  {
    id: 2,
    image: IMAGES.YOUNG_GIRL,
    name: 'Gelila',
    salary: '50,000 Birr',
    status: 'Processing',
    value: 20,
  },
  {
    id: 3,
    image: IMAGES.OLD_MAN,
    name: 'Biruk',
    salary: '40,000 Birr',
    status: 'Processing',
    value: 20,
  },
];
