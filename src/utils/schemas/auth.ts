import { z } from 'zod';

// Constants
import { REGEX } from '@/constants';
import MESSAGES from '@/constants/message';

const requiredString = (field: string) => {
  return z.string().trim().min(1, MESSAGES.VALIDATE.FIELD_REQUIRED(field));
};

export const signInSchema = z.object({
  email: requiredString('Email').regex(REGEX.email, {
    message: MESSAGES.VALIDATE.FIELD_VALID('email address'),
  }),
  password: requiredString('Password')
    .min(8, { message: MESSAGES.VALIDATE.LIMIT_PASSWORD })
    .regex(REGEX.password, {
      message: MESSAGES.VALIDATE.INVALID_PASSWORD,
    }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema
  .extend({
    firstName: requiredString('First name'),
    lastName: requiredString('Last name'),
    phone: requiredString('Phone').regex(REGEX.phone, {
      message: MESSAGES.VALIDATE.FIELD_VALID('phone'),
    }),
    confirmPassword: z.string(),
    isReceiveNewsletters: z.boolean(),
    isAgreeTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: MESSAGES.VALIDATE.INVALID_CONFIRM_PASSWORD,
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
