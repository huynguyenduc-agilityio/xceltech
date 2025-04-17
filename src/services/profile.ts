import { END_POINTS } from '@/constants';

import { Documents, DocumentsForm } from '@/types';

import { HttpClient } from '.';

export const getListJobs = async () => {
  return (await HttpClient.get(END_POINTS.JOB)).data;
};

export const getDocuments = async (): Promise<Documents[]> =>
  (await HttpClient.get(END_POINTS.DOCUMENT_PROFILE)).data;

export const uploadDocument = async (data: Partial<DocumentsForm>) =>
  (
    await HttpClient.post(`${END_POINTS.DOCUMENT_PROFILE}upload/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
