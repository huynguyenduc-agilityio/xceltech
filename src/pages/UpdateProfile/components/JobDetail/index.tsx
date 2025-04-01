import { lazy, Suspense, useState } from 'react';

// Types
import { ProfileTab } from '@/types';

// Components
import { Button, Fallback } from '@/components';

const UploadDocuments = lazy(() => import('./UploadDocument'));
const ViewDocument = lazy(() => import('./ViewDocument'));

const JobDetailTab = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.Job);

  const handleChangeJob = () => {
    setActiveTab(ProfileTab.Job);
  };

  return (
    <div className="w-full p-11 text-black-default">
      {activeTab === ProfileTab.Job && (
        <>
          <h3 className="text-lg font-bold">View Job Details</h3>

          <div className="text-center mt-6">
            <div className="flex flex-col text-xl">
              <span className="mb-6">Job Role</span>
              <span className="text-2xl font-bold">UI UX Designer</span>
            </div>
            <div className="flex items-center justify-center gap-36 mt-[52px] text-lg">
              <div className="flex flex-col">
                <span className="mb-6">Department</span>
                <span className="text-2xl font-bold">Design & Marketing</span>
              </div>
              <div className="flex flex-col">
                <span className="mb-6">Line Manager</span>
                <span className="text-2xl font-bold">Mr Domino’s Pizza</span>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <span className="text-xl font-bold mb-4">Job Description</span>
            <p className="text-md text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto at
              enim vitae libero explicabo consequatur animi deleniti id tenetur
              accusantium obcaecati, rem qui quo ex nihil tempora magni dolor
              dicta.
            </p>
            <p className="text-md text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto at
              enim vitae libero explicabo consequatur animi deleniti id tenetur
              accusantium obcaecati, rem qui quo ex nihil tempora magni dolor
              dicta.
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              size="md"
              className="w-[260px] rounded-md"
              onClick={() => setActiveTab(ProfileTab.Upload)}
            >
              Upload Documents
            </Button>
            <Button
              size="md"
              variant="outline"
              className="w-[260px] border-[4px] text-green-primary border-green-primary rounded-md"
              onClick={() => setActiveTab(ProfileTab.View)}
            >
              View Documents
            </Button>
          </div>
        </>
      )}

      {activeTab === ProfileTab.Upload && (
        <Suspense fallback={<Fallback />}>
          <UploadDocuments onBackJob={handleChangeJob} />
        </Suspense>
      )}

      {activeTab === ProfileTab.View && (
        <Suspense fallback={<Fallback />}>
          <ViewDocument onBackJob={handleChangeJob} />
        </Suspense>
      )}
    </div>
  );
};

export default JobDetailTab;
