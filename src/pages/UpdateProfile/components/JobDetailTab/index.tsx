import { lazy, Suspense, useState } from 'react';

// Types
import { IEmployeeJobInfo, ProfileTab } from '@/types';

// Hooks
import { useGetDocuments } from '@/hooks';

// Components
import { Button, Fallback } from '@/components';

const UploadDocuments = lazy(() => import('./UploadDocument'));
const ViewDocument = lazy(() => import('./ViewDocument'));

type JobDetailTabProps = {
  jobInfo?: Partial<IEmployeeJobInfo>;
};

const JobDetailTab = ({ jobInfo }: JobDetailTabProps) => {
  const { documents, isDocumentsLoading } = useGetDocuments();

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
              <span className="text-2xl font-bold">{jobInfo?.name}</span>
            </div>
            <div className="flex items-start justify-center gap-36 mt-[52px] text-lg">
              <div className="flex flex-col">
                <span className="mb-6">Department</span>
                <span className="text-2xl font-bold">
                  {jobInfo?.department}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="mb-6">Line Manager</span>
                <span className="text-2xl font-bold">
                  {jobInfo?.lineManagement}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <span className="text-xl font-bold mb-4">Job Description</span>
            <p className="text-md text-left">{jobInfo?.description}</p>
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

      {activeTab === ProfileTab.Upload && !isDocumentsLoading && (
        <Suspense fallback={<Fallback />}>
          <UploadDocuments files={documents} onBackJob={handleChangeJob} />
        </Suspense>
      )}

      {activeTab === ProfileTab.View && !isDocumentsLoading && (
        <Suspense fallback={<Fallback />}>
          <ViewDocument files={documents} onBackJob={handleChangeJob} />
        </Suspense>
      )}
    </div>
  );
};

export default JobDetailTab;
