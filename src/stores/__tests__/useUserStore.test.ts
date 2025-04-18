import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';

// Stores
import { useUser, useUserActions } from '@/stores';

// Types
import { IAuthUser } from '@/types';

beforeEach(() => {
  localStorage.clear();
  jest.resetAllMocks();
});

const mockUser: IAuthUser = {
  user: {
    id: '1',
    email: 'a@b.com',
    role: 'admin',
    username: 'ab',
  },
  access: 'accessToken',
  refresh: 'refreshToken',
};

describe('useUserStore', () => {
  it('should return null initially', () => {
    const { result } = renderHook(() => useUser());
    expect(result.current).toBe(null);
  });

  it('should set user correctly', () => {
    const { result: actionsResult } = renderHook(() => useUserActions());
    const { result: userResult } = renderHook(() => useUser());

    act(() => {
      actionsResult.current.setUser(mockUser);
    });

    expect(userResult.current).toEqual(mockUser);
  });

  it('should clear user correctly', () => {
    const { result: actionsResult } = renderHook(() => useUserActions());
    const { result: userResult } = renderHook(() => useUser());

    act(() => {
      actionsResult.current.setUser(mockUser);
    });

    expect(userResult.current).toEqual(mockUser);

    act(() => {
      actionsResult.current.clearUser();
    });

    expect(userResult.current).toBe(null);
  });
});
