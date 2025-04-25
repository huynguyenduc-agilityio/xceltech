import { Link } from 'react-router-dom';

import { USER_PAGE } from '@/constants';

const InternalServerError = ({
  path = USER_PAGE.DASHBOARD,
}: {
  path?: string;
}) => {
  return (
    <div className="flex items-center justify-center py-[300px]">
      <div className="text-center">
        <h1 className="text-black-default text-2xl font-semibold">
          500 Internal Server Error
        </h1>
        <p className="text-lg font-medium text-muted-foreground mt-2 max-w-[414px] mx-auto">
          Sorry, something went wrong. :(
        </p>

        <div className="mt-10 h-[70px] text-white">
          <Link
            to={path}
            className="bg-primary rounded-regular px-6 py-3 mt-10 font-bold text-lg transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternalServerError;
