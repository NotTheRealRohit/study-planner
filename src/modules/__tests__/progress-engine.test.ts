import { createProgressEngine, StreakGrid, DayCell } from '../progress-engine';
import Session from '../../db/models/Session';

describe('ProgressEngine', () => {
  let database: any;
  let progressEngine: ReturnType<typeof createProgressEngine>;

  beforeEach(() => {
    database = (globalThis as any).createTestDatabase();
    progressEngine = createProgressEngine(database);
  });

  describe('streakCalendar', () => {
    it('returns all-zero grid for empty DB', async () => {
      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 7);

      const result = await progressEngine.streakCalendar(startDate, endDate);

      expect(result.cells).toHaveLength(7);
      expect(result.startDate).toEqual(startDate);
      expect(result.endDate).toEqual(endDate);
      result.cells.forEach((cell: DayCell) => {
        expect(cell.totalMinutes).toBe(0);
        expect(cell.intensity).toBe(0);
      });
    });

    it('returns nonzero cell for single session', async () => {
      const sessionDate = new Date(2024, 0, 3);
      sessionDate.setHours(12, 0, 0, 0);
      const occurredOnMs = sessionDate.getTime();

      await database.write(async () => {
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 30;
          session.occurredOn = occurredOnMs;
          session.resourceLabel = 'Test Video';
          session.isExceptional = false;
        });
      });

      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 7);

      const result = await progressEngine.streakCalendar(startDate, endDate);

      const cellOn3rd = result.cells.find(
        (c) => c.date.getDate() === 3 && c.date.getMonth() === 0
      );
      expect(cellOn3rd).toBeDefined();
      expect(cellOn3rd!.totalMinutes).toBe(30);
      expect(cellOn3rd!.intensity).toBe(4);
    });

    it('sums multiple sessions on same date', async () => {
      const sessionDate = new Date(2024, 0, 3);
      sessionDate.setHours(12, 0, 0, 0);
      const occurredOnMs = sessionDate.getTime();

      await database.write(async () => {
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 30;
          session.occurredOn = occurredOnMs;
          session.resourceLabel = 'Video 1';
          session.isExceptional = false;
        });
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 45;
          session.occurredOn = occurredOnMs;
          session.resourceLabel = 'Video 2';
          session.isExceptional = false;
        });
      });

      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 7);

      const result = await progressEngine.streakCalendar(startDate, endDate);

      const cellOn3rd = result.cells.find(
        (c) => c.date.getDate() === 3 && c.date.getMonth() === 0
      );
      expect(cellOn3rd).toBeDefined();
      expect(cellOn3rd!.totalMinutes).toBe(75);
    });

    it('orders intensity by total minutes (more minutes >= higher intensity)', async () => {
      await database.write(async () => {
        const day2 = new Date(2024, 0, 2);
        day2.setUTCHours(12, 0, 0, 0);
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 20;
          session.occurredOn = day2.getTime();
          session.resourceLabel = 'Video A';
          session.isExceptional = false;
        });

        const day4 = new Date(2024, 0, 4);
        day4.setUTCHours(12, 0, 0, 0);
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 60;
          session.occurredOn = day4.getTime();
          session.resourceLabel = 'Video B';
          session.isExceptional = false;
        });

        const day6 = new Date(2024, 0, 6);
        day6.setUTCHours(12, 0, 0, 0);
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 40;
          session.occurredOn = day6.getTime();
          session.resourceLabel = 'Video C';
          session.isExceptional = false;
        });
      });

      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 7);

      const result = await progressEngine.streakCalendar(startDate, endDate);

      const cellsWithActivity = result.cells.filter((c) => c.totalMinutes > 0);
      expect(cellsWithActivity).toHaveLength(3);

      const byMinutes = [...cellsWithActivity].sort((a, b) => a.totalMinutes - b.totalMinutes);
      for (let i = 1; i < byMinutes.length; i++) {
        expect(byMinutes[i].intensity).toBeGreaterThanOrEqual(byMinutes[i - 1].intensity);
      }
    });

    it('excludes sessions outside date range', async () => {
      await database.write(async () => {
        const dec31 = new Date(2023, 11, 31);
        dec31.setUTCHours(12, 0, 0, 0);
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 100;
          session.occurredOn = dec31.getTime();
          session.resourceLabel = 'Dec 31';
          session.isExceptional = false;
        });

        const jan5 = new Date(2024, 0, 5);
        jan5.setUTCHours(12, 0, 0, 0);
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 50;
          session.occurredOn = jan5.getTime();
          session.resourceLabel = 'Jan 5';
          session.isExceptional = false;
        });

        const jan8 = new Date(2024, 0, 8);
        jan8.setUTCHours(12, 0, 0, 0);
        await database.get<Session>('sessions').create((session) => {
          session.durationMinutes = 200;
          session.occurredOn = jan8.getTime();
          session.resourceLabel = 'Jan 8';
          session.isExceptional = false;
        });
      });

      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 7);

      const result = await progressEngine.streakCalendar(startDate, endDate);

      const cellsWithActivity = result.cells.filter((c) => c.totalMinutes > 0);
      expect(cellsWithActivity).toHaveLength(1);
      expect(cellsWithActivity[0].totalMinutes).toBe(50);
    });
  });
});
