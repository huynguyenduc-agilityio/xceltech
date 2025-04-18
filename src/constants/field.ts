import { IEmployeeGuarantor } from '@/types';

type FormFieldKey<T> = Exclude<keyof T, 'id'>;

type BaseField<T> = {
  name: FormFieldKey<T>;
  label: string;
  placeholder: string;
};

export const BASE_GUARANTOR_FIELD: BaseField<IEmployeeGuarantor>[] = [
  {
    name: 'name',
    label: 'Guarantor’s Name',
    placeholder: 'Enter your guarantor’s name',
  },
  {
    name: 'job',
    label: 'Job Title / Occupation',
    placeholder: 'Enter your job title / occupation',
  },
  {
    name: 'phone',
    label: 'Phone No',
    placeholder: 'Enter your phone number',
  },
];
