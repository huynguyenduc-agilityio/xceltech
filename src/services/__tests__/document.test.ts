import axiosMockAdapter from 'axios-mock-adapter';

// Constants
import { END_POINTS, MESSAGES } from '@/constants';

// Types
import { DocumentsForm } from '@/types';

// Services
import {
  HttpClient,
  getDocuments,
  addDocument,
  editDocument,
  downloadAllDocuments,
} from '@/services';

describe('documentService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get documents successfully', async () => {
    const mockDocuments = [{ id: '1', name: 'Document 1' }];
    mock.onGet(END_POINTS.DOCUMENTS).reply(200, mockDocuments);

    const result = await getDocuments();

    expect(result).toEqual(mockDocuments);
  });

  it('should add document successfully', async () => {
    const mockResponse = { id: '1', name: 'New Document' };
    const formData = new FormData();
    formData.append('file', new File(['test content'], 'test.pdf'));

    mock.onPost(`${END_POINTS.DOCUMENTS}upload/`).reply(201, mockResponse);

    const result = await addDocument(formData as Partial<DocumentsForm>);

    expect(result).toEqual(mockResponse);
  });

  it('should throw error when add document fails', async () => {
    const formData = new FormData();
    formData.append('file', new File(['fail test'], 'fail.pdf'));

    mock
      .onPost(`${END_POINTS.DOCUMENTS}upload/`)
      .reply(400, { detail: 'Request failed with status code 400' });

    await expect(
      addDocument(formData as Partial<DocumentsForm>),
    ).rejects.toThrow('Request failed with status code 400');
  });

  it('should edit document successfully', async () => {
    const mockResponse = { id: '1', name: 'Updated Document' };
    const formData = new FormData();
    formData.append('file', new File(['updated'], 'updated.pdf'));

    mock.onPatch(`${END_POINTS.DOCUMENTS}upload/`).reply(200, mockResponse);

    const result = await editDocument(formData as Partial<DocumentsForm>);

    expect(result).toEqual(mockResponse);
  });

  it('should throw error when edit document fails', async () => {
    const formData = new FormData();
    formData.append('file', new File(['fail test'], 'fail-edit.pdf'));

    mock
      .onPatch(`${END_POINTS.DOCUMENTS}upload/`)
      .reply(400, { detail: 'Request failed with status code 400' });

    await expect(
      editDocument(formData as Partial<DocumentsForm>),
    ).rejects.toThrow('Request failed with status code 400');
  });

  it('should download all documents successfully', async () => {
    const mockBlob = new Blob(['dummy data']);
    mock.onGet(`${END_POINTS.DOCUMENTS}download-all/`).reply(200, mockBlob);

    const result = await downloadAllDocuments();

    expect(result).toEqual(mockBlob);
  });

  it('should throw error when download all documents fails', async () => {
    const errorMessage = MESSAGES.COMMON.EXPORT_FAILED;

    mock
      .onGet(`${END_POINTS.DOCUMENTS}download-all/`)
      .reply(400, { detail: errorMessage });

    await expect(downloadAllDocuments()).rejects.toThrow(errorMessage);
  });

  it('should throw error when get documents fails', async () => {
    mock
      .onGet(END_POINTS.DOCUMENTS)
      .reply(500, { detail: 'Request failed with status code 500' });

    await expect(getDocuments()).rejects.toThrow(
      'Request failed with status code 500',
    );
  });
});
