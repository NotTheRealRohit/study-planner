import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import { schema } from '../../db/schema';
import Session from '../../db/models/Session';
import { createProgressEngine, ProgressEngine } from '../progress-engine';
import { createSessionLifecycle, SessionLifecycle } from '../session-lifecycle';

export interface TestContext {
  database: Database;
  progressEngine: ProgressEngine;
  sessionLifecycle: SessionLifecycle;
}

export function createTestContext(): TestContext {
  const database = new Database({
    adapter: new LokiJSAdapter({
      schema,
      useWebWorker: false,
      useIncrementalIndexedDB: true,
    }),
    modelClasses: [Session],
  });

  return {
    database,
    progressEngine: createProgressEngine(database),
    sessionLifecycle: createSessionLifecycle(database),
  };
}