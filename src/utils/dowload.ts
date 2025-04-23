export const downloadBlobFile = (data: BlobPart, filename: string) => {
  const blob = new Blob([data]);
  const fileURL = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = fileURL;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(fileURL);
  document.body.removeChild(link);
};
