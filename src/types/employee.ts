import { z } from 'zod';

import {
  educationSchema,
  familySchema,
  financialSchema,
  guarantorSchema,
} from '@/utils';

export type EducationFormValues = z.infer<typeof educationSchema>;
export type GuarantorFormValues = z.infer<typeof guarantorSchema>;
export type FamilyFormValues = z.infer<typeof familySchema>;
export type FinancialFormValues = z.infer<typeof financialSchema>;

export interface IEmployeeEducationInfo extends EducationFormValues {
  id?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  type?: EducationType;
}

export enum EducationType {
  Academic = 'Academic',
  Professional = 'Professional',
}

export interface IEmployeeGuarantor extends GuarantorFormValues {
  id?: string;
}

export interface IEmployeeFamilyInfo extends FamilyFormValues {
  id?: string;
}

export interface IEmployeeFinancialInfo extends FinancialFormValues {
  id?: string;
}

export type DocumentsForm = {
  documents: {
    offerLetter?: File | null;
    birthCertificate?: File | null;
    guarantorForm?: File | null;
    degreeCertificate?: File | null;
  };
};

export type Documents = {
  documentFile: string;
  documentType: string;
};
