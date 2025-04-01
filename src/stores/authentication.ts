import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';

// Constant
import { USER_KEY } from '@/constants';

// Types
import { IAuthUser } from '@/types';

interface IInitialState {
  authUser: IAuthUser | null;
}

const initialState: IInitialState = {
  authUser: null,
};

interface IAuthState extends IInitialState {
  actions: {
    setUser: (authUser: IAuthUser) => void;
    clearUser: () => void;
  };
}

const useUserStore = create<IAuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        actions: {
          setUser: (authUser) =>
            set(
              produce((state) => {
                state.authUser = { ...authUser };
              }),
            ),
          clearUser: () =>
            set(
              produce((state) => {
                state.authUser = null;
              }),
            ),
        },
      }),
      {
        name: USER_KEY,
        partialize: ({ actions, ...rest }) => rest,
      },
    ),
  ),
);

export const useUser = () =>
  useUserStore(useShallow((state) => state.authUser));
export const useUserActions = () => useUserStore((state) => state.actions);
