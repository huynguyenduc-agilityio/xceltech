import { z } from 'zod';

// Constants
import MESSAGES from '@/constants/message';
import { REGEX } from '@/constants';

const requiredString = (field: string) => {
  return z.string().trim().min(1, MESSAGES.VALIDATE.FIELD_REQUIRED(field));
};

export const leaveRequestSchema = z
  .object({
    type: requiredString('Leave Type'),
    startDate: z.date(),
    endDate: z.date(),
    documentPath: z
      .instanceof(File)
      .refine((file) => REGEX.leaveFile.test(file.name), {
        message: MESSAGES.LEAVE_REQUEST.INVALID_FILE_TYPE,
      })
      .optional(),
    durations: z.preprocess(
      (val) => Number(val),
      z.number().min(1, MESSAGES.LEAVE_REQUEST.INVALID_DURATION),
    ),
    resumptionDate: z.date(),
    reason: requiredString('Reason for leave'),
    reliefOfficer: requiredString('Relief Officer'),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      return data.startDate >= tomorrow;
    },
    {
      message: MESSAGES.LEAVE_REQUEST.INVALID_START_DATE,
      path: ['startDate'],
    },
  )
  .refine(
    (data) => {
      const startDateOnly = new Date(data.startDate);
      startDateOnly.setHours(0, 0, 0, 0);
      const endDateOnly = new Date(data.endDate);
      endDateOnly.setHours(0, 0, 0, 0);

      return endDateOnly >= startDateOnly;
    },
    {
      message: MESSAGES.LEAVE_REQUEST.INVALID_END_DATE,
      path: ['endDate'],
    },
  )
  .refine(
    (data) => {
      const expectedResumptionDate = new Date(data.endDate);
      expectedResumptionDate.setDate(expectedResumptionDate.getDate() + 1);

      return data.resumptionDate.getTime() === expectedResumptionDate.getTime();
    },
    {
      message: MESSAGES.LEAVE_REQUEST.INVALID_RESUMPTION_DATE,
      path: ['resumptionDate'],
    },
  );

export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;
