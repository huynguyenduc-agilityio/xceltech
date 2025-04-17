import { LogoIcon } from '@/icons';
import SignInForm from './SignInForm';

const AdminSignIn = () => {
  return (
    <div className="relative w-screen h-screen">
      <img
        src="/assets/images/adminSignInImage.webp"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-primary opacity-90"></div>

      <div className="absolute p-10">
        <LogoIcon />
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
        <SignInForm />
      </div>
    </div>
  );
};

export default AdminSignIn;
