export const getRecordRange = (
  currentPage: number,
  pageSize: number,
  totalRecords: number,
) => {
  const startRecord = (currentPage - 1) * pageSize + 1;
  let endRecord = currentPage * pageSize;

  if (endRecord > totalRecords) {
    endRecord = totalRecords;
  }

  return `${startRecord} - ${endRecord} of ${totalRecords} ${totalRecords === 1 ? 'Leave' : 'Leaves'}`;
};
