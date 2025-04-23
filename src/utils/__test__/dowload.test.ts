import { downloadBlobFile } from '../dowload';

describe('downloadBlobFile', () => {
  let createObjectURLMock: jest.Mock;
  let revokeObjectURLMock: jest.Mock;
  let appendChildMock: jest.Mock;
  let removeChildMock: jest.Mock;

  beforeEach(() => {
    createObjectURLMock = jest.fn().mockReturnValue('fake-url');
    revokeObjectURLMock = jest.fn();

    appendChildMock = jest.fn();
    removeChildMock = jest.fn();

    window.URL.createObjectURL = createObjectURLMock;
    window.URL.revokeObjectURL = revokeObjectURLMock;
    document.body.appendChild = appendChildMock;
    document.body.removeChild = removeChildMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a blob, create a URL, append a link, click it, and revoke the object URL', () => {
    const data = 'test data';
    const filename = 'testfile.txt';

    downloadBlobFile(data, filename);

    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));

    expect(appendChildMock).toHaveBeenCalled();

    const link = appendChildMock.mock.calls[0][0];
    expect(link.href).toContain('fake-url');
    expect(link.download).toBe(filename);

    link.click();

    expect(revokeObjectURLMock).toHaveBeenCalledWith('fake-url');

    expect(removeChildMock).toHaveBeenCalledWith(link);
  });
});
