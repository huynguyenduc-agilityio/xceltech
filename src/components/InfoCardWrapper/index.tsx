import { ReactNode } from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';

import { Button } from '../common';

interface InfoCardWrapperProps {
  titleContent: ReactNode;
  description?: ReactNode;
  onEdit: () => void;
}

const InfoCardWrapper = ({
  titleContent,
  description,
  onEdit,
}: InfoCardWrapperProps) => (
  <div className="flex justify-between px-11 py-7 bg-blue-light rounded-[15px]">
    <div className="space-y-2  w-full">
      <div className="flex justify-between items-start gap-6">
        {titleContent}
        <div className="flex gap-2">
          <Button size="icon" className="hover:bg-primary/70" onClick={onEdit}>
            <PencilIcon size={20} />
          </Button>
          <Button size="icon" className="bg-red-500 hover:bg-red-500/70">
            <TrashIcon size={20} />
          </Button>
        </div>
      </div>
      {description}
    </div>
  </div>
);

export default InfoCardWrapper;
