import { lazy, Suspense } from 'react';

// Constants
import { USER_PAGE } from '@/constants';

// Hooks
import { useGetInfoUser } from '@/hooks';

// Components
import { Breadcrumb, Fallback, NextOfKinForm, SideMenu } from '@/components';

import {
  EducationTab,
  FamilyTab,
  FinancialTab,
  GuarantorTab,
  JobDetailTab,
  PersonalDetailTab,
} from './components';

const ContactForm = lazy(() => import('@/components/Form/ContactForm'));

const BREADCRUMB_ITEMS = [
  { label: 'Dashboard', href: USER_PAGE.DASHBOARD },
  { label: 'Update Profile' },
];

const UpdateProfile = () => {
  const { userInfo } = useGetInfoUser();

  const { name, department, lineManagement, description } = userInfo?.job || {};

  const TAB_LIST = [
    {
      label: 'Personal Details',
      content: <PersonalDetailTab userInfo={userInfo} />,
    },
    {
      label: 'Contact Details',
      content: (
        <Suspense fallback={<Fallback />}>
          <ContactForm initialValues={userInfo} />
        </Suspense>
      ),
    },
    {
      label: 'Next of kin Details',
      content: <NextOfKinForm />,
    },
    {
      label: 'Education Qualifications',
      content: <EducationTab />,
    },
    {
      label: 'Guarantor Details',
      content: <GuarantorTab />,
    },
    {
      label: 'Family Details',
      content: <FamilyTab />,
    },
    {
      label: 'Job Details',
      content: (
        <JobDetailTab
          jobInfo={{
            name,
            department,
            lineManagement,
            description,
          }}
        />
      ),
    },
    {
      label: 'Financial Details',
      content: <FinancialTab />,
    },
  ];

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
