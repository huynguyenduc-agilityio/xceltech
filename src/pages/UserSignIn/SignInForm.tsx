import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// Constants
import { AUTHENTICATION_PAGE, MESSAGES } from '@/constants';

// Types
import { ILoginUser } from '@/types';

// Hooks
import { useLogin } from '@/hooks';

// Utils
import { SignInFormValues, signInSchema } from '@/utils';

// Components
import {
  Button,
  Checkbox,
  Form,
  FormField,
  FormMessage,
  Label,
  TextField,
} from '@/components';

const initialValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const { handleLoginUser, isLoginLoading, isLoginError } = useLogin();

  const form = useForm<SignInFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInSchema),
    defaultValues: initialValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = form;

  const onSubmit = async (data: ILoginUser) => {
    await handleLoginUser(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-6xl font-bold text-primary">Login</h2>
        <p className="text-gray-medium text-2xl mt-9 mb-[50px]">
          Login to your account.
        </p>

        <div className="mb-9">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                variant="secondary"
                label="E-mail Address"
                placeholder="Enter email address"
                errorMessage={errors.email?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-9">
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                type="password"
                variant="secondary"
                label="Password"
                placeholder="Enter password"
                errorMessage={errors.password?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox id="remember-me" className="mr-2" />
            <Label
              htmlFor="remember-me"
              size="secondary"
              className="text-gray-dark"
            >
              Remember me
            </Label>
          </div>
          <a href="#" className="text-lg text-primary font-bold">
            Reset Password?
          </a>
        </div>

        <div className="mt-6">
          {isLoginError && (
            <FormMessage>{MESSAGES.AUTHENTICATION.LOGIN_FAILED}</FormMessage>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full font-normal mt-4 mb-10"
          disabled={!isDirty || !isValid}
          isLoading={isLoginLoading}
        >
          Sign In
        </Button>
        <p className="text-lg text-center text-gray-dark">
          Don’t have an account yet?{' '}
          <Link
            to={AUTHENTICATION_PAGE.SIGN_UP}
            className="text-primary font-bold"
          >
            Join KRIS today.
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
