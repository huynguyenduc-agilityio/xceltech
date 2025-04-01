import { Link } from 'react-router-dom';

// Constants
import { USER_PAGE } from '@/constants';

import { Button } from '@/components';

const listAction = [
  { title: 'Apply for Leave', path: USER_PAGE.LEAVE },
  { title: 'KPI Goals' },
  { title: 'Take Appraisal' },
  { title: 'View Payslip' },
  { title: 'Update Profile' },
  { title: 'Events' },
];

const QuickAction = () => {
  return (
    <div className="mt-12 gap-[30px]">
      <h3 className="text-2xl">Quick Actions</h3>
      <div className="mt-[30px] flex gap-6">
        {listAction.map((action) =>
          action.path ? (
            <Link key={action.title} to={action.path} className="w-full">
              <Button className="w-full py-4 text-xl rounded-full bg-white text-black-soft shadow-lg shadow-black-default/15 hover:text-white">
                {action.title}
              </Button>
            </Link>
          ) : (
            <Button
              key={action.title}
              className="w-full py-4 text-xl rounded-full disabled:bg-white disabled:opacity-100 disabled:text-black-soft disabled:hover:bg-white"
              disabled
            >
              {action.title}
            </Button>
          ),
        )}
      </div>
    </div>
  );
};

export default QuickAction;
