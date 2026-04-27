import { useState, useEffect, useRef } from 'react';
import { useProgressEngine } from './useProgressEngine';
import { StreakGrid } from '@/modules/progress-engine';

interface UseStreakCalendarOptions {
  startDate: Date;
  endDate: Date;
}

interface UseStreakCalendarResult {
  streakGrid: StreakGrid | null;
  loading: boolean;
  error: Error | null;
}

export function useStreakCalendar(options: UseStreakCalendarOptions): UseStreakCalendarResult {
  const { startDate, endDate } = options;
  const progressEngine = useProgressEngine();
  const [streakGrid, setStreakGrid] = useState<StreakGrid | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const observable = progressEngine.observeStreakCalendar(startDate, endDate);

    const subscription = observable.subscribe({
      next: (grid) => {
        setStreakGrid(grid);
        setLoading(false);
      },
      error: (err) => {
        setError(err);
        setLoading(false);
      },
    });

    subscriptionRef.current = subscription;

    return () => {
      subscription.unsubscribe();
    };
  }, [progressEngine, startDate, endDate]);

  return { streakGrid, loading, error };
}