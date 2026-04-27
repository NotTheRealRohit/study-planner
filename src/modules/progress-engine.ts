import { Database, Q, Observable } from '@nozbe/watermelondb';
import Session from '../db/models/Session';

export interface DayCell {
  date: Date;
  totalMinutes: number;
  intensity: 0 | 1 | 2 | 3 | 4;
}

export interface StreakGrid {
  cells: DayCell[];
  startDate: Date;
  endDate: Date;
}

export interface ProgressEngine {
  streakCalendar(startDate: Date, endDate: Date): Promise<StreakGrid>;
  observeStreakCalendar(startDate: Date, endDate: Date): any;
}

interface Observer<T> {
  next(value: T): void;
  error(err: Error): void;
  complete(): void;
}

interface Subscription {
  unsubscribe(): void;
}

interface SimpleObservable<T> {
  subscribe(observer: ((value: T) => void) | Observer<T>): Subscription;
}

function getMidnightUtc(date: Date): number {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}

export function createProgressEngine(database: Database): ProgressEngine {
  return {
    async streakCalendar(startDate: Date, endDate: Date): Promise<StreakGrid> {
      const startMs = getMidnightUtc(startDate);
      const endMs = getMidnightUtc(endDate);

      const sessions = await database
        .get<Session>('sessions')
        .query(Q.where('occurred_on', Q.gte(startMs)), Q.where('occurred_on', Q.lte(endMs)))
        .fetch();

      const totalsByDate = new Map<number, number>();
      for (const session of sessions) {
        const dayKey = getMidnightUtc(new Date(session.occurredOn));
        const current = totalsByDate.get(dayKey) || 0;
        totalsByDate.set(dayKey, current + session.durationMinutes);
      }

      const cells: DayCell[] = [];
      let currentDate = new Date(startMs);
      let maxMinutes = 0;

      while (currentDate.getTime() <= endMs) {
        const dayKey = currentDate.getTime();
        const totalMinutes = totalsByDate.get(dayKey) || 0;
        if (totalMinutes > maxMinutes) maxMinutes = totalMinutes;
        cells.push({
          date: new Date(currentDate),
          totalMinutes,
          intensity: 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      for (const cell of cells) {
        if (maxMinutes > 0 && cell.totalMinutes > 0) {
          const ratio = cell.totalMinutes / maxMinutes;
          if (ratio >= 0.75) cell.intensity = 4;
          else if (ratio >= 0.5) cell.intensity = 3;
          else if (ratio >= 0.25) cell.intensity = 2;
          else cell.intensity = 1;
        } else {
          cell.intensity = 0;
        }
      }

      return {
        cells,
        startDate,
        endDate,
      };
    },

    observeStreakCalendar(startDate: Date, endDate: Date): SimpleObservable<StreakGrid> {
      let previousGrid: StreakGrid | null = null;
      const streakCalendarFn = this.streakCalendar.bind(this);

      const emit = async (observer: Observer<StreakGrid>) => {
        try {
          const grid = await streakCalendarFn(startDate, endDate);
          previousGrid = grid;
          observer.next(grid);
        } catch (e) {
          observer.error(e);
        }
      };

      let subscription: any = null;

      return {
        subscribe(observer: ((value: StreakGrid) => void) | Observer<StreakGrid>) {
          const nextFn = typeof observer === 'function' ? observer : observer.next;
          const errorFn = typeof observer === 'function' ? console.error : observer.error;
          const wrappedObserver: Observer<StreakGrid> = {
            next: nextFn,
            error: errorFn,
            complete: () => {},
          };

          emit(wrappedObserver);

          const collection = database.get<Session>('sessions');
          subscription = collection
            .query()
            .observe()
            .subscribe({
              next: () => emit(wrappedObserver),
              error: (e: Error) => wrappedObserver.error(e),
            });

          return {
            unsubscribe: () => {
              if (subscription) {
                subscription.unsubscribe();
              }
            },
          };
        },
      };
    },
  };
}
