import { z } from 'zod';

import { contactSchema, nextOfKinSchema } from '@/utils';

import { IRegisterUser } from './auth';

export type ContactFormValues = z.infer<typeof contactSchema>;
export type NextOfKinFormValues = z.infer<typeof nextOfKinSchema>;

export interface IInfoUser
  extends Omit<IRegisterUser, 'password' | 'confirmPassword' | 'isAgreeTerms'> {
  id?: string;
  documents?: string[];
  avatar?: File | string;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
  isActive?: boolean;
  jobId?: string;
  job?: IEmployeeJobInfo;
  contact?: IEmployeeContactInfo;
  kin?: IEmployeeNextOfKinInfo;
}

export interface IEmployeeJobInfo {
  id?: string;
  name?: string;
  description?: string;
  department: string;
  lineManagement?: string;
  jobCategory: string;
}

export interface IEmployeeContactInfo {
  phoneNum2?: string;
  cityOfResidence?: string;
  residentialAddress?: string;
}

export interface IEmployeeNextOfKinInfo extends NextOfKinFormValues {
  id?: string;
}
