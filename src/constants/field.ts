import { IEmployeeEducationInfo, IEmployeeGuarantor } from '@/types';

type FormFieldKey<T> = Exclude<keyof T, 'id'>;

type BaseField<T> = {
  name: FormFieldKey<T>;
  label: string;
  placeholder: string;
};

export const BASE_EDUCATION_FIELD: BaseField<
  Pick<IEmployeeEducationInfo, 'name' | 'course' | 'startDate'>
>[] = [
  {
    name: 'name',
    label: 'Name of Institution',
    placeholder: 'Enter your institution name',
  },
  {
    name: 'course',
    label: 'Course',
    placeholder: 'Enter your course',
  },
  {
    name: 'startDate',
    label: 'Start Date',
    placeholder: 'Enter your start date',
  },
];

export const ADDITIONAL_EDUCATION_FIELD: BaseField<
  Pick<IEmployeeEducationInfo, 'department' | 'location' | 'endDate'>
>[] = [
  {
    name: 'department',
    label: 'Department',
    placeholder: 'Enter your department',
  },
  {
    name: 'location',
    label: 'Location',
    placeholder: 'Enter your location',
  },
  {
    name: 'endDate',
    label: 'End Date',
    placeholder: 'Enter your end date',
  },
];

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
