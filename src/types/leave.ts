import { StatusLeave } from './status';

export enum LeaveType {
  Annual = 'Annual',
  Casual = 'Casual',
  Sick = 'Sick',
  Maternity = 'Maternity',
}

export enum LeaveFormEnum {
  Annual = 'annual',
  Compassionate = 'compassionate',
  Sick = 'sick',
  Maternity = 'maternity',
}

export type MetaData = {
  limit: number;
  page: number;
  totalCount: number;
};

export type LeaveHistory = {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  durations: number;
  resumptionDate: string;
  reason: string;
  documentPath?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  employee?: string;
  reliefOfficer: string;
  isRecalled: boolean;
  recallStatus: StatusLeave;
  recallDate?: string;
  reliefOfficerFirstName: string;
  reliefOfficerLastName: string;
};

export type LeaveHistoryResponse = {
  metaData: MetaData;
  results: LeaveHistory[];
};

export type LeaveRequestForm = {
  id?: string;
  type: string;
  durations: number;
  documentPath?: File | null;
  startDate: Date | string;
  endDate: Date | string;
  resumptionDate: Date | string;
  reason: string;
  employee?: string;
  reliefOfficer: string;
};

export type LeaveRecallForm = {
  id: string;
  employeeName: string;
  department: string;
  startDate?: Date | string;
  endDate?: Date | string;
  remainingDate: number;
  recallDate?: Date;
  reliefOfficer: string;
  reliefOfficerFirstName: string;
  reliefOfficerLastName: string;
};

export type LeaveRecallRequest = {
  recallDate: string;
  recallReason?: string;
  recallStatus: StatusLeave;
  isRecalled: boolean;
};
