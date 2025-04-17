import { METRIC_PREFIX, REGEX } from '@/constants';

/**
 * Get string formatted a number with metric prefix
 * @param num is formatted
 * @param digits you want to round
 * @returns A string value
 */
export const formatNumberWithMetricPrefix = (
  num: number,
  digits = 1,
): string => {
  const currentValue = METRIC_PREFIX.slice()
    .reverse()
    .find((item) => {
      return num >= item.value;
    });

  return currentValue
    ? (num / currentValue.value)
        .toFixed(digits)
        .replace(REGEX.decimalZeroTrim, '$1') + currentValue.symbol
    : '0';
};

export const removeNonDigits = (value: string): string =>
  value.replace(/\D/g, '');
