import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Types
import { ILoginUser, ToastStatus } from '@/types';

// Utils
import { SignInFormValues, signInSchema } from '@/utils/schemas/auth';

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

// Hooks
import { toast, useLogin } from '@/hooks';

// Constants
import { MESSAGES, RoleAuthentication } from '@/constants';

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
    const res = await handleLoginUser(data);
    const isAdmin = res.user.role === RoleAuthentication.Admin;

    if (!isAdmin) {
      toast({
        title: 'Login Error!',
        description: MESSAGES.AUTHENTICATION.LOGIN_FAILED,
        status: ToastStatus.Error,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <div className="flex flex-col items-center">
          <h2 className="text-6xl font-bold text-white">Login</h2>
          <p className="text-white text-2xl mt-9 mb-[50px]">
            Login to your account.
          </p>
        </div>

        <div className="mb-9">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                variant="secondary"
                label="E-mail Address"
                placeholder="Enter email address"
                labelClassName="text-white"
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
                labelClassName="text-white"
                errorMessage={errors.password?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              id="remember-me"
              className="mr-2 bg-white data-[state=checked]:bg-white"
            />
            <Label
              htmlFor="remember-me"
              size="secondary"
              className="text-white"
            >
              Remember me
            </Label>
          </div>
          <a href="#" className="text-lg text-white font-bold">
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
          className="w-full font-normal mt-10 mb-10 bg-secondary text-black-default hover:bg-black-default hover:text-secondary"
          disabled={!isDirty || !isValid}
          isLoading={isLoginLoading}
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
