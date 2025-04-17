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
  startDate?: Date;
  endDate?: Date;
  description: string;
}

export type DocumentsForm = {
  offerLetter?: File | null;
  birthCertificate?: File | null;
  guarantorForm?: File | null;
  degreeCertificate?: File | null;
};

export type Documents = {
  documentFile: string;
  documentType: string;
};
