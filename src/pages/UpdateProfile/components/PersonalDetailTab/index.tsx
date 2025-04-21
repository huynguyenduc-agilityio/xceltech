import { useCallback, useState } from 'react';

// Icons
import { EditIcon } from '@/icons';

// Types
import { IInfoUser } from '@/types';

// Utils
import { getInitialsAvatar } from '@/utils';

// Components
import { Avatar, Button, PersonalForm } from '@/components';

type PersonalTabProps = {
  userInfo?: Partial<IInfoUser>;
};

const PersonalDetailTab = ({ userInfo }: PersonalTabProps) => {
  const [activeEdit, setActiveEdit] = useState(false);

  const { firstName = '', lastName = '', avatar = '', job } = userInfo || {};

  const toggleEdit = useCallback(() => setActiveEdit((prev) => !prev), []);

  return (
    <>
      {!activeEdit ? (
        <div className="pt-16 text-center relative">
          <Avatar
            size={197}
            src={avatar as string}
            fallback={getInitialsAvatar(`${firstName} ${lastName}`)}
            className="mx-auto"
            fallbackClass="text-5xl"
          />
          <Button
            variant="ghost"
            size="fit"
            className="flex flex-col items-center justify-center absolute top-16 right-[123px]"
            onClick={toggleEdit}
          >
            <EditIcon />
            <span className="text-lg text-black-default font-normal mr-2">
              Edit
            </span>
          </Button>

          {/* Employee Info */}
          {[
            { label: 'Employee Name', value: `${firstName} ${lastName}` },
            { label: 'Department', value: job?.department },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col mt-9 text-black-default text-lg"
            >
              <span className="mb-4">{label}</span>
              <span className="text-2xl font-bold">{value}</span>
            </div>
          ))}

          {/* Job Info */}
          <div className="flex items-center justify-center gap-36 mt-[85px] text-black-default text-lg">
            {[
              { label: 'Job Title', value: job?.name },
              { label: 'Job Category', value: job?.jobCategory },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="mb-4">{label}</span>
                <span className="text-2xl font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full p-11 text-black-default">
          <h2 className="text-lg font-bold mb-[50px]">
            <Button
              variant="ghost"
              size="fit"
              className="cursor-pointer hover:text-secondary"
              onClick={toggleEdit}
            >
              Job Details
            </Button>{' '}
            / Upload Documents
          </h2>
          <PersonalForm initialValues={userInfo} onBack={toggleEdit} />
        </div>
      )}
    </>
  );
};

export default PersonalDetailTab;
