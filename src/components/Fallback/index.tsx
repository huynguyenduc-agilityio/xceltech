import { LoaderCircle } from 'lucide-react';

const Fallback = () => (
  <div className="flex h-full items-center justify-center">
    <LoaderCircle className="h-12 w-12 animate-spin text-gray-300" />
  </div>
);

export default Fallback;
