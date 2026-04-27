import { createSessionLifecycle, PassiveLogInput } from '../session-lifecycle';
import { createProgressEngine } from '../progress-engine';
import Session from '../../db/models/Session';

describe('SessionLifecycle', () => {
  let database: any;
  let sessionLifecycle: ReturnType<typeof createSessionLifecycle>;
  let progressEngine: ReturnType<typeof createProgressEngine>;

  beforeEach(() => {
    database = (globalThis as any).createTestDatabase();
    sessionLifecycle = createSessionLifecycle(database);
    progressEngine = createProgressEngine(database);
  });

  describe('logPassive', () => {
    it('returns correct SessionOutcome', async () => {
      const input: PassiveLogInput = {
        resourceLabel: 'Test Video',
        durationMinutes: 45,
        occurredOn: new Date(2024, 0, 3),
      };

      const result = await sessionLifecycle.logPassive(input);

      expect(result.id).toBeDefined();
      expect(result.resourceLabel).toBe('Test Video');
      expect(result.durationMinutes).toBe(45);
      expect(result.occurredOn.getTime()).toBe(new Date(2024, 0, 3).setHours(0, 0, 0, 0));
    });

    it('logged session visible in ProgressEngine', async () => {
      await sessionLifecycle.logPassive({
        resourceLabel: 'Test Video',
        durationMinutes: 30,
        occurredOn: new Date(2024, 0, 15),
      });

      const grid = await progressEngine.streakCalendar(
        new Date(2024, 0, 1),
        new Date(2024, 0, 31)
      );

      const jan15 = grid.cells.find((c) => c.date.toDateString() === new Date(2024, 0, 15).toDateString());
      expect(jan15?.totalMinutes).toBe(30);
    });

    it('session attributed to occurrence date, not today', async () => {
      const occurrenceDate = new Date(2024, 5, 20);
      await sessionLifecycle.logPassive({
        resourceLabel: 'Past Session',
        durationMinutes: 60,
        occurredOn: occurrenceDate,
      });

      const grid = await progressEngine.streakCalendar(
        new Date(2024, 5, 1),
        new Date(2024, 5, 30)
      );

      const june20 = grid.cells.find((c) => c.date.toDateString() === new Date(2024, 5, 20).toDateString());
      expect(june20?.totalMinutes).toBe(60);
    });

    it('two sessions same date sum in streak calendar', async () => {
      const sameDate = new Date(2024, 3, 10);

      await sessionLifecycle.logPassive({
        resourceLabel: 'Video 1',
        durationMinutes: 20,
        occurredOn: sameDate,
      });

      await sessionLifecycle.logPassive({
        resourceLabel: 'Video 2',
        durationMinutes: 40,
        occurredOn: sameDate,
      });

      const grid = await progressEngine.streakCalendar(
        new Date(2024, 3, 1),
        new Date(2024, 3, 30)
      );

      const apr10 = grid.cells.find((c) => c.date.toDateString() === new Date(2024, 3, 10).toDateString());
      expect(apr10?.totalMinutes).toBe(60);
    });

    it('zero duration rejected', async () => {
      await expect(
        sessionLifecycle.logPassive({
          resourceLabel: 'Test',
          durationMinutes: 0,
          occurredOn: new Date(),
        })
      ).rejects.toThrow();
    });

    it('negative duration rejected', async () => {
      await expect(
        sessionLifecycle.logPassive({
          resourceLabel: 'Test',
          durationMinutes: -30,
          occurredOn: new Date(),
        })
      ).rejects.toThrow();
    });

    it('empty whitespace resource label rejected', async () => {
      await expect(
        sessionLifecycle.logPassive({
          resourceLabel: '   ',
          durationMinutes: 30,
          occurredOn: new Date(),
        })
      ).rejects.toThrow();
    });
  });

  describe('ProgressEngine', () => {
    it('year-long grid returns 365 or 366 cells', async () => {
      const grid = await progressEngine.streakCalendar(
        new Date(2024, 0, 1),
        new Date(2024, 11, 31)
      );

      expect(grid.cells.length).toBeGreaterThanOrEqual(365);
      expect(grid.cells.length).toBeLessThanOrEqual(366);
    });
  });
});