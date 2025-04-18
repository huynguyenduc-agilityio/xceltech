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
  lists: () => [{ ...leavesQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ page, limit, filters }: TQueryKey) =>
    [
      {
        ...leavesQueryKeys.lists()[0],
        page,
        limit,
        ...(filters && { filters }),
      },
    ] as const,
  details: () => [{ ...leavesQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...leavesQueryKeys.details()[0], id }] as const,
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

export const educationsQueryKeys = {
  all: [{ scope: 'educations' }] as const,
  list: () => [{ ...educationsQueryKeys.all[0], entity: 'list' }] as const,
  details: () => [{ ...educationsQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) =>
    [{ ...educationsQueryKeys.details()[0], id }] as const,
};

export const guarantorsQueryKeys = {
  all: [{ scope: 'guarantors' }] as const,
  list: () => [{ ...guarantorsQueryKeys.all[0], entity: 'list' }] as const,
  details: () => [{ ...guarantorsQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) =>
    [{ ...guarantorsQueryKeys.details()[0], id }] as const,
};

export const familiesQueryKeys = {
  all: [{ scope: 'families' }] as const,
  list: () => [{ ...familiesQueryKeys.all[0], entity: 'list' }] as const,
  details: () => [{ ...familiesQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...familiesQueryKeys.details()[0], id }] as const,
};

export const financialsQueryKeys = {
  all: [{ scope: 'financials' }] as const,
  list: () => [{ ...financialsQueryKeys.all[0], entity: 'list' }] as const,
  details: () => [{ ...financialsQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) =>
    [{ ...financialsQueryKeys.details()[0], id }] as const,
};
