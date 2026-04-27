import { createProgressEngine } from '../progress-engine';
import { createSessionLifecycle, PassiveLogInput } from '../session-lifecycle';
import Session from '../../db/models/Session';

describe('ProgressEngine reactive observation', () => {
  let database: any;
  let progressEngine: ReturnType<typeof createProgressEngine>;
  let sessionLifecycle: ReturnType<typeof createSessionLifecycle>;

  beforeEach(() => {
    database = (globalThis as any).createTestDatabase();
    progressEngine = createProgressEngine(database);
    sessionLifecycle = createSessionLifecycle(database);
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

    const sessions = await database.get<Session>('sessions').query().fetch();
    console.log('Sessions in DB:', sessions.length);
    console.log('Emissions:', emissions.length);

    expect(emissions.length).toBeGreaterThan(1);

    subscription.unsubscribe();
  });
});