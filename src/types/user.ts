import { IRegisterUser } from './auth';

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
  name: string;
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

export interface IEmployeeNextOfKinInfo {
  name: string;
  job: string;
  phone: string;
  relationship: string;
  address: string;
}
