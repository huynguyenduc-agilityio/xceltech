import { z } from 'zod';

// Constants
import { REGEX } from '@/constants';
import MESSAGES from '@/constants/message';

const requiredString = (field: string) => {
  return z.string().trim().min(1, MESSAGES.VALIDATE.FIELD_REQUIRED(field));
};

export const contactSchema = z.object({
  phone: requiredString('Phone Number 1').regex(REGEX.phone, {
    message: MESSAGES.VALIDATE.FIELD_VALID('phone'),
  }),
  phoneNum2: z
    .string()
    .optional()
    .refine((val) => !val || REGEX.phone.test(val), {
      message: MESSAGES.VALIDATE.FIELD_VALID('phone'),
    }),
  email: requiredString('Email').regex(REGEX.email, {
    message: MESSAGES.VALIDATE.FIELD_VALID('email address'),
  }),
  cityOfResidence: requiredString('City of residence'),
  residentialAddress: requiredString('Residential Address'),
});

export const nextOfKinSchema = z.object({
  name: requiredString('Next of kin name'),
  job: requiredString('Job / Occupation'),
  phone: requiredString('Phone Number').regex(REGEX.phone, {
    message: MESSAGES.VALIDATE.FIELD_VALID('phone'),
  }),
  relationship: requiredString('Relationship'),
  residentialAddress: requiredString('Residential Address'),
});

export const guarantorSchema = z.object({
  name: requiredString('Guarantor name'),
  job: requiredString('Job Title / Occupation'),
  phone: requiredString('Phone No').regex(REGEX.phone, {
    message: MESSAGES.VALIDATE.FIELD_VALID('phone'),
  }),
});

export const familySchema = z.object({
  fullName: requiredString('Full Name'),
  relationship: requiredString('Relationship'),
  phone: requiredString('Phone No').regex(REGEX.phone, {
    message: MESSAGES.VALIDATE.FIELD_VALID('phone'),
  }),
  address: requiredString('Address'),
});

export const financialSchema = z.object({
  bankName: requiredString('Bank Name'),
  accountName: requiredString('Account Name'),
  accountNo: z.preprocess(
    (val) => Number(val),
    z.number().min(1, MESSAGES.VALIDATE.FIELD_REQUIRED('Account No')),
  ),
});

export const educationSchema = z.object({
  name: requiredString('Name of Institution'),
  course: requiredString('Course'),
  startDate: z.union([z.date(), z.string(), z.undefined()]).optional(),
  department: requiredString('Department'),
  location: requiredString('Location'),
  endDate: z.union([z.date(), z.string(), z.undefined()]).optional(),
  description: z.string(),
});
