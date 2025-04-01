import { TextEncoder } from 'util';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
