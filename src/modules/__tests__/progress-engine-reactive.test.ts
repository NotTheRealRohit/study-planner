import { createProgressEngine } from '../progress-engine';
import { createSessionLifecycle } from '../session-lifecycle';
import { createTestContext } from './test-helpers';

describe('ProgressEngine reactive observation', () => {
  let database: any;
  let progressEngine: ReturnType<typeof createProgressEngine>;
  let sessionLifecycle: ReturnType<typeof createSessionLifecycle>;

  beforeEach(() => {
    const ctx = createTestContext();
    database = ctx.database;
    progressEngine = ctx.progressEngine;
    sessionLifecycle = ctx.sessionLifecycle;
  });

  it('observable re-emits when session is written', async () => {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2024, 0, 7);

    const observable = progressEngine.observeStreakCalendar(startDate, endDate);

    const emissions: any[] = [];
    const subscription = observable.subscribe((grid: any) => {
      emissions.push(grid);
    });

    await sessionLifecycle.logPassive({
      resourceLabel: 'Test Video',
      durationMinutes: 30,
      occurredOn: new Date(2024, 0, 3),
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(emissions.length).toBeGreaterThan(1);

    subscription.unsubscribe();
  });
});