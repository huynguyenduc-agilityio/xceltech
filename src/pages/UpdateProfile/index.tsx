import { Breadcrumb, SideMenu } from '@/components';
import PersonalTab from './components/PersonalDetail';
import JobDetailTab from './components/JobDetail';

const BREADCRUMB_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Update Profile' },
];

const TAB_LIST = [
  {
    label: 'Personal Details',
    content: <PersonalTab />,
  },
  {
    label: 'Contact Details',
  },
  {
    label: 'Next of kin Details',
  },
  {
    label: 'Education Qualifications',
  },
  {
    label: 'Guarantor Details',
  },
  {
    label: 'Family Details',
  },
  {
    label: 'Job Details',
    content: <JobDetailTab />,
  },
  {
    label: 'Financial Details',
  },
];

const UpdateProfile = () => {
  return (
    <div className="flex flex-col gap-11">
      <div className="flex items-center w-full px-[62px] py-8 bg-white">
        <Breadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <SideMenu tabs={TAB_LIST} />
    </div>
  );
};

export default UpdateProfile;
