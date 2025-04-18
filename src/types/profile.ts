import { z } from 'zod';

import { updateProfileSchema } from '@/utils';

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
