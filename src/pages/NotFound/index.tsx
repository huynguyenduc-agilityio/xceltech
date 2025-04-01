import { Button } from '@/components';

const NotFound = () => {
  return (
    <div className="h-screen mx-auto text-center">
      <div className="flex flex-col items-center justify-center h-full pt-20 pb-24">
        <p className="text-black-default text-2xl font-semibold">
          Oops! Page not found
        </p>
        <p className="text-primary text-lg font-medium max-w-md mt-2">
          The page you are looking for might have been removed or temporarily
          unavailable.
        </p>
        <Button className="px-6 py-3 mt-10 transition">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
