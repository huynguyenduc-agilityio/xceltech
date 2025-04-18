export interface IEmployeeFamilyInfo {
  id?: string;
  fullName: string;
  relationship: string;
  phone: string;
  address: string;
}

export interface IEmployeeGuarantor {
  id?: string;
  name: string;
  job: string;
  phone: string;
}

export interface IEmployeeFinancialInfo {
  id?: string;
  bankName: string;
  accountNumber: number;
  accountName: string;
}

export interface IEmployeeEducationInfo {
  id?: string;
  name: string;
  department: string;
  course: string;
  location: string;
  startDate?: Date | string;
  endDate?: Date | string;
  description: string;
  type?: EducationType;
  user?: string;
}

export enum EducationType {
  Academic = 'Academic',
  Professional = 'Professional',
}
