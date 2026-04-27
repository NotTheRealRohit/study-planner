import { useMemo } from 'react';
import { useDatabase } from '@/db/DatabaseProvider';
import { createSessionLifecycle, SessionLifecycle } from '@/modules/session-lifecycle';

export function useSessionLifecycle(): SessionLifecycle {
  const database = useDatabase();
  return useMemo(() => createSessionLifecycle(database), [database]);
}