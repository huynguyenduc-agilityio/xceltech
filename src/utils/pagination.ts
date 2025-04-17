export const getRecordRange = (
  currentPage: number,
  limit: number,
  totalRecords: number,
) => {
  const startRecord = (currentPage - 1) * limit + 1;
  let endRecord = currentPage * limit;

  if (endRecord > totalRecords) {
    endRecord = totalRecords;
  }

  return `${startRecord} - ${endRecord} of ${totalRecords} ${totalRecords === 1 ? 'Leave' : 'Leaves'}`;
};
