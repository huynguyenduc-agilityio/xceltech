import { TDataSource } from '@/types';

export const mockColumns = [
  {
    title: 'Name(s)',
    key: 'name',
    renderBody: ({ employeeName }: TDataSource) => `Name: ${employeeName}`,
  },
  {
    title: 'Duration(s)',
    key: 'duration',
  },
  {
    title: 'Start Date',
    key: 'startDate',
  },
  {
    title: 'End Date',
    key: 'endDate',
  },
  {
    title: 'Type',
    key: 'type',
  },
  {
    title: 'Reason(s)',
    key: 'reason',
  },
];
