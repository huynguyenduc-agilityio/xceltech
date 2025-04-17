import moment from 'moment';

export const formatDate = (inputDate: Date | string) => {
  const date = moment(inputDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (ZZZZ)');

  return date.format('YYYY-MM-DD');
};

export const formatDateRange = (
  startDate?: Date | string,
  endDate?: Date | string,
  options?: {
    fullMonth?: boolean;
  },
): string => {
  const { fullMonth = false } = options || {};
  const format = fullMonth ? 'MMMM YYYY' : 'MMM YYYY';

  const start = moment(startDate).format(format);
  const end = moment(endDate).format(format);

  return `${start} - ${end}`;
};

export const getDaysLeft = (
  endDate: string | Date | null | undefined,
): number => {
  if (!endDate) return 0;

  const end = new Date(endDate);
  if (isNaN(end.getTime())) return 0;

  const today = new Date();
  end.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};
