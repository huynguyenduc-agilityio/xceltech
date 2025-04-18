// Constants
import { END_POINTS } from '@/constants';

// Types
import { Documents, DocumentsForm, ErrorType } from '@/types';

import { HttpClient } from '.';

export const getDocuments = async (): Promise<Documents[]> =>
  (await HttpClient.get(END_POINTS.DOCUMENTS)).data;

export const addDocument = async (data: Partial<DocumentsForm>) =>
  (
    await HttpClient.post(`${END_POINTS.DOCUMENTS}upload/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

export const editDocument = async (data: Partial<DocumentsForm>) =>
  (
    await HttpClient.patch(`${END_POINTS.DOCUMENTS}upload/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

export const downloadAllDocuments = async () => {
  try {
    return (
      await HttpClient.get(`${END_POINTS.DOCUMENTS}download-all/`, {
        responseType: 'blob',
      })
    ).data;
  } catch (error) {
    throw new Error((error as ErrorType).detail);
  }
};
