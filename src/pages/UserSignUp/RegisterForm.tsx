import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { AUTHENTICATION_PAGE, MESSAGES } from '@/constants';

// Types
import { IRegisterUser, ToastStatus } from '@/types';

// Hooks
import { useRegister, useToast } from '@/hooks';

// Utils
import { SignUpFormValues, signUpSchema } from '@/utils';

// Components
import {
  Button,
  Checkbox,
  Form,
  FormField,
  Label,
  TextField,
} from '@/components';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  isAgreeTerms: false,
  isReceiveNewsletters: false,
};

const RegisterForm = () => {
  const { toast } = useToast();
  const { handleRegisterUser, isRegisterLoading } = useRegister();

  const form = useForm<SignUpFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: initialValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    getValues,
  } = form;

  const agreeTermsChecked = useWatch({
    control,
    name: 'isAgreeTerms',
    defaultValue: false,
  });

  const onSubmit = async (data: IRegisterUser) => {
    const { isAgreeTerms, ...formData } = data;
    try {
      await handleRegisterUser(formData);

      toast({
        title: 'Register Success!',
        description: MESSAGES.AUTHENTICATION.REGISTER_SUCCESS,
        status: ToastStatus.Success,
      });

      reset(initialValues);
    } catch (error) {
      toast({
        title: 'Register Error!',
        description: MESSAGES.COMMON.DUPLICATE('User with this email'),
        status: ToastStatus.Error,
      });

      reset(getValues());
    }
  };

  const disableSubmit =
    !isDirty || !isValid || !agreeTermsChecked || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-6xl font-bold text-primary">Welcome to XCELTECH</h2>
        <p className="text-gray-medium text-2xl mt-[63px] mb-11">
          Register your account
        </p>

        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField
                variant="secondary"
                label="First Name"
                placeholder="Enter first name"
                errorMessage={errors.firstName?.message}
                {...field}
              />
            )}
          />
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextField
                variant="secondary"
                label="Last Name"
                placeholder="Enter last name"
                errorMessage={errors.lastName?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 mt-9">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                variant="secondary"
                type="email"
                label="E-mail Address"
                placeholder="Enter email"
                errorMessage={errors.email?.message}
                {...field}
              />
            )}
          />
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <TextField
                variant="secondary"
                label="Phone Number"
                placeholder="Enter phone number"
                errorMessage={errors.phone?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 mt-9">
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                variant="secondary"
                type="password"
                label="Password"
                placeholder="Enter password"
                errorMessage={errors.password?.message}
                {...field}
              />
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                variant="secondary"
                type="password"
                label="Confirm Password"
                placeholder="Re-enter password"
                errorMessage={errors.confirmPassword?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="mt-14">
          <FormField
            control={control}
            name="isReceiveNewsletters"
            render={({ field }) => (
              <div className="flex items-center">
                <Checkbox
                  id="isReceiveNewsletters"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label
                  htmlFor="isReceiveNewsletters"
                  size="secondary"
                  className="ml-2 text-gray-dark"
                >
                  Yes, I want to receive KRIS newsletters
                </Label>
              </div>
            )}
          />
        </div>
        <div className="mt-6 mb-9">
          <FormField
            control={control}
            name="isAgreeTerms"
            render={({ field }) => (
              <div className="flex items-center">
                <Checkbox
                  id="isAgreeTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label
                  htmlFor="isAgreeTerms"
                  size="secondary"
                  className="ml-2 text-gray-dark"
                >
                  I agree to all the
                </Label>
                <p className="text-primary text-lg ml-1">
                  Terms, Privacy Policy
                </p>
              </div>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-[312px] text-lg font-normal my-4"
          isLoading={isRegisterLoading}
          disabled={disableSubmit}
        >
          Create Account
        </Button>
        <p className="text-lg text-gray-dark mt-11">
          Already have an account?{' '}
          <Link
            to={AUTHENTICATION_PAGE.USER_SIGN_IN}
            className="text-primary font-bold"
          >
            Log In
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;
