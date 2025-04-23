import { z } from 'zod';

// Constants
import MESSAGES from '@/constants/message';

const requiredString = (field: string) => {
  return z.string().trim().min(1, MESSAGES.VALIDATE.FIELD_REQUIRED(field));
};

export const updateProfileSchema = z.object({
  firstName: requiredString('First name'),
  lastName: requiredString('Last name'),
  avatar: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
  department: requiredString('Department'),
  id: z.string(),
  jobCategory: z.string(),
});
