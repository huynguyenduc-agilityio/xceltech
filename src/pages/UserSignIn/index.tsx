// Components
import SignInForm from './SignInForm';

const UserSignIn = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full min-h-screen">
        {/* Left Section */}
        <div className="w-1/2 p-14 bg-white flex flex-col justify-center">
          <SignInForm />
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-primary text-white flex flex-col pl-12 justify-end relative">
          <img
            src="/public/assets/images/signinImage.webp"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary opacity-85"></div>
          <div className="mb-[25%]">
            <p className="text-5xl font-bold relative z-10">
              Manage all <span className="text-secondary">HR Operations</span>{' '}
              from
            </p>
            <p className="text-5xl font-bold relative z-10">
              the comfort of your home.
            </p>
          </div>
          <div className="absolute bottom-[63px] left-12 flex space-x-2">
            <span className="w-20 h-4 bg-secondary rounded-full"></span>
            <span className="w-20 h-4 bg-white rounded-full"></span>
            <span className="w-20 h-4 bg-white rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
