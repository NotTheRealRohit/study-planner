import { createTestContext } from './test-helpers';
import { createProgressEngine } from '../progress-engine';
import { createSessionLifecycle } from '../session-lifecycle';

describe('test-helpers', () => {
  it('creates valid test context with database and modules', () => {
    const { database, progressEngine, sessionLifecycle } = createTestContext();

    expect(database).toBeDefined();
    expect(progressEngine).toBeDefined();
    expect(sessionLifecycle).toBeDefined();
    expect(typeof progressEngine.streakCalendar).toBe('function');
    expect(typeof progressEngine.observeStreakCalendar).toBe('function');
    expect(typeof sessionLifecycle.logPassive).toBe('function');
  });

  it('test context modules work with real database', async () => {
    const { database, progressEngine, sessionLifecycle } = createTestContext();

    await sessionLifecycle.logPassive({
      resourceLabel: 'Test Video',
      durationMinutes: 30,
      occurredOn: new Date(2024, 0, 3),
    });

    const grid = await progressEngine.streakCalendar(
      new Date(2024, 0, 1),
      new Date(2024, 0, 7)
    );

    const cellOn3rd = grid.cells.find(
      (c) => c.date.getDate() === 3 && c.date.getMonth() === 0
    );
    expect(cellOn3rd?.totalMinutes).toBe(30);
  });
});