import { PlusIcon } from 'lucide-react';

// Types
import { IEmployeeEducationInfo } from '@/types';

// Utils
import { formatDateRange } from '@/utils';

// Components
import { Button, InfoCardWrapper } from '@/components';

interface EducationSectionProps {
  title: string;
  section: 'academic' | 'professional';
  data: IEmployeeEducationInfo[];
  onAdd: (section: 'academic' | 'professional') => void;
  onEdit: (
    section: 'academic' | 'professional',
    data: IEmployeeEducationInfo,
  ) => void;
}

const EducationSection = ({
  title,
  section,
  data,
  onAdd,
  onEdit,
}: EducationSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-bold ml-4">{title}</h3>
      <div className="grid gap-3 mt-6">
        {data.map((item) => {
          const {
            id,
            name,
            startDate,
            endDate,
            course,
            department,
            location,
            description,
          } = item;
          const hasDates = startDate && endDate;
          const dateRange = hasDates ? formatDateRange(startDate, endDate) : '';

          const detailParts = [
            course,
            department ? `at ${department}` : '',
            location ? `in ${location}` : '',
            hasDates ? `, ${dateRange}` : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <InfoCardWrapper
              key={id}
              onEdit={() => onEdit(section, item)}
              titleContent={
                <div className="grid gap-2">
                  <h4 className="font-bold text-lg">{name}</h4>
                  <p className="text-sm">{detailParts}</p>
                </div>
              }
              description={<p className="text-sm">{description}</p>}
            />
          );
        })}
        <Button
          className="w-full h-[50px] bg-black-default/25 hover:opacity-60 transition-opacity"
          onClick={() => onAdd(section)}
        >
          <PlusIcon width={26} height={26} className="text-black-muted" />
        </Button>
      </div>
    </div>
  );
};

export default EducationSection;
