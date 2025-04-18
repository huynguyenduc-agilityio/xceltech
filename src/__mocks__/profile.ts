import {
  IEmployeeEducationInfo,
  IEmployeeFamilyInfo,
  IEmployeeFinancialInfo,
  IEmployeeGuarantor,
} from '@/types';

// Dummy data Education
export const dummyAcademicData: IEmployeeEducationInfo[] = [
  {
    id: '1',
    name: 'Jimma University',
    department: 'Computer Dept',
    course: 'Computer Science',
    location: 'Jimma, Ethiopia',
    startDate: new Date('2014-05-01'),
    endDate: new Date('2018-05-01'),
    description: `• Collaborated with product managers and developers\n• Used wireframes, mockups and process flows`,
  },
];

export const dummyProfessionalData: IEmployeeEducationInfo[] = [
  {
    id: '1',
    name: 'Google UX Certification',
    department: 'UX/UI',
    course: 'UX Professional',
    location: 'Online',
    startDate: new Date('2019-01-01'),
    endDate: new Date('2019-06-01'),
    description: `• Conducted user research\n• Created high-fidelity prototypes`,
  },
];

// Dummy data Guarantor
export const dummyGuarantors: IEmployeeGuarantor[] = [
  {
    name: 'MR Natnael Dawit',
    job: 'Human resource, Abysinia bank',
    phone: '090 500 500 6000',
  },
  {
    name: 'MR Natnael Dawit',
    job: 'Accountant, Abysinia bank',
    phone: '090 500 500 6000',
  },
];

// Dummy data Family
export const dummyFamily: IEmployeeFamilyInfo[] = [
  {
    fullName: 'MR Natnael Dawit',
    relationship: 'Brother',
    phone: '090 32398888',
    address: 'Djibouti street, Addis Ababa',
  },
  {
    fullName: 'MR Natnael Dawit',
    relationship: 'Brother',
    phone: '090 32398888',
    address: 'Djibouti street, Addis Ababa',
  },
];

// Dummy data Financial
export const dummyFinancial: IEmployeeFinancialInfo[] = [
  {
    accountNo: 100013455451,
    accountName: 'John Doe',
    bankName: 'CBE',
  },
  {
    accountNo: 100055563301,
    accountName: 'Doe Johnn',
    bankName: 'Awash Bank',
  },
];
