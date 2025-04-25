// Components
import { Button } from '@/components';

// Icons
import { LogoIcon } from '@/icons';

// Constants
import { IMAGES } from '@/constants';

import RegisterForm from './RegisterForm';

const UserSignUp = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full min-h-screen">
        {/* Left Section */}
        <div className="w-1/2 bg-primary text-white flex flex-col py-7 relative">
          <div className="relative z-10">
            <LogoIcon />
          </div>
          <img
            src={IMAGES.REGISTER_IMAGE}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary opacity-85"></div>
          <div className="relative z-10 px-14 mt-[188px]">
            <h2 className="text-4xl font-bold">HR Management Platform</h2>
            <div className="w-[15%] h-4 bg-white rounded-full mt-4"></div>
            <p className="my-9 text-2xl">
              Manage all employees, payrolls, and other human resource
              operations.
            </p>
            <div className="flex space-x-6">
              <Button
                variant="secondary"
                className="w-[272px] py-5 text-xl rounded-regular"
              >
                Learn More
              </Button>
              <Button
                variant="outline"
                className="w-[272px] py-5 font-xl rounded-regular border-white text-white"
              >
                Our Features
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-14 bg-white flex flex-col justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
