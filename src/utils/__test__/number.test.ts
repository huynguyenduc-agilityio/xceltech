import {
  decimalPartMocker,
  minMetricPrefixLimit,
  numberMocker,
} from '@/__mocks__';

import { formatNumberWithMetricPrefix, removeNonDigits } from '../number';

describe('formatNumberWithMetricPrefix function', () => {
  const expectedMetricPrefix = {
    zero: '0',
    million: '365.3m',
    millionWithSecondDecimal: '365.26m',
    millionWithThirdDecimal: '365.259m',
    thousandWithSecondDecimal: '365.26k',
    hundred: '365',
  };

  it('should return 0 if parameter is undefined', () => {
    const result = formatNumberWithMetricPrefix(Number(undefined), undefined);

    expect(result).toBe(expectedMetricPrefix.zero);
  });

  it('should return 0 if the parameter num is undefined', () => {
    const result = formatNumberWithMetricPrefix(
      Number(undefined),
      decimalPartMocker.secondDigit,
    );

    expect(result).toBe(expectedMetricPrefix.zero);
  });

  it('should return a string formatted to a number with a metric prefix is million and no decimals if the digit parameter is undefined', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.million,
      undefined,
    );

    expect(result).toBe(expectedMetricPrefix.million);
  });

  it('should return a string formatted to real numbers consisting 2 decimal places and a metric prefix is million if the digit is 2', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.million,
      decimalPartMocker.secondDigit,
    );

    expect(result).toBe(expectedMetricPrefix.millionWithSecondDecimal);
  });

  it('should return a string formatted to real numbers consisting 3 decimal places and a metric prefix is million if the digit is 3', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.million,
      decimalPartMocker.thirdDigit,
    );

    expect(result).toBe(expectedMetricPrefix.millionWithThirdDecimal);
  });

  it('should return a string formatted to real numbers consisting 2 decimal places and a metric prefix is thousand if the digit is 2', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.thousand,
      decimalPartMocker.secondDigit,
    );

    expect(result).toBe(expectedMetricPrefix.thousandWithSecondDecimal);
  });

  it('should return the default string number if the num parameter is not more than 1000', () => {
    const result = formatNumberWithMetricPrefix(
      numberMocker.hundred,
      decimalPartMocker.secondDigit,
    );

    expect(Number(result)).toBeLessThan(minMetricPrefixLimit);
    expect(result).toBe(expectedMetricPrefix.hundred);
  });
});

describe('removeNonDigits', () => {
  it('should remove all non-digit characters', () => {
    expect(removeNonDigits('123-456-7890')).toBe('1234567890');
    expect(removeNonDigits('(123) 456-7890')).toBe('1234567890');
    expect(removeNonDigits('abc123xyz')).toBe('123');
  });

  it('should return an empty string if no digits are present', () => {
    expect(removeNonDigits('abc')).toBe('');
    expect(removeNonDigits('!!!')).toBe('');
  });

  it('should handle an empty string', () => {
    expect(removeNonDigits('')).toBe('');
  });

  it('should return the input string if it contains only digits', () => {
    expect(removeNonDigits('123456')).toBe('123456');
  });

  it('should remove spaces as non-digits', () => {
    expect(removeNonDigits('1 2 3 4 5')).toBe('12345');
  });

  it('should work with other special characters', () => {
    expect(removeNonDigits('$%12^34&56')).toBe('123456');
  });
});
