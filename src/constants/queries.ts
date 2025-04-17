// Type
import { TQueryKey } from '@/types';

export const accountsQueryKeys = {
  all: [{ scope: 'accounts' }] as const,
  lists: () => [{ ...accountsQueryKeys.all[0], entity: 'list' }] as const,
  list: () => [{ ...accountsQueryKeys.lists()[0] }] as const,
  details: () => [{ ...accountsQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...accountsQueryKeys.details()[0], id }] as const,
};

export const usersQueryKeys = {
  all: [{ scope: 'users' }] as const,
  lists: () => [{ ...usersQueryKeys.all[0], entity: 'list' }] as const,
  list: () => [{ ...usersQueryKeys.lists()[0] }] as const,
  details: () => [{ ...usersQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...usersQueryKeys.details()[0], id }] as const,
};

export const leavesQueryKeys = {
  all: [{ scope: 'leaves' }] as const,
  lists: (userId?: string) =>
    [{ ...leavesQueryKeys.all[0], userId, entity: 'list' }] as const,
  list: ({ userId, page, limit, filters }: TQueryKey & { userId?: string }) =>
    [
      {
        ...leavesQueryKeys.lists(userId)[0],
        page,
        limit,
        ...(filters && { filters }),
      },
    ] as const,
  details: (userId: string) =>
    [{ ...leavesQueryKeys.all[0], userId, entity: 'detail' }] as const,
  detail: (id?: string, userId = '') =>
    [{ ...leavesQueryKeys.details(userId)[0], id }] as const,
};

export const notificationsQueryKeys = {
  all: [{ scope: 'notifications' }] as const,
  lists: () => [{ ...notificationsQueryKeys.all[0], entity: 'list' }] as const,
  list: () => [{ ...notificationsQueryKeys.lists()[0] }] as const,
  details: () =>
    [{ ...notificationsQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) =>
    [{ ...notificationsQueryKeys.details()[0], id }] as const,
};

export const jobsQueryKeys = {
  all: [{ scope: 'jobs' }] as const,
  lists: () => [{ ...jobsQueryKeys.all[0], entity: 'list' }] as const,
  list: () => [{ ...jobsQueryKeys.lists()[0] }] as const,
};

export const documentsQueryKeys = {
  all: [{ scope: 'documents' }] as const,

  list: (userId?: string) =>
    [{ ...documentsQueryKeys.all[0], userId, entity: 'list' }] as const,
};
