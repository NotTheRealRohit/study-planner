import { useMemo } from 'react';
import { useDatabase } from '@/db/DatabaseProvider';
import { createProgressEngine, ProgressEngine } from '@/modules/progress-engine';

export function useProgressEngine(): ProgressEngine {
  const database = useDatabase();
  return useMemo(() => createProgressEngine(database), [database]);
}