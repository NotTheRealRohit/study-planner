import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import { schema } from './src/db/schema';
import Session from './src/db/models/Session';

export function createTestDatabase(): Database {
  const adapter = new LokiJSAdapter({
    schema,
    useWebWorker: false,
    useIncrementalIndexedDB: true,
  });

  return new Database({
    adapter,
    modelClasses: [Session],
  });
}

(globalThis as any).createTestDatabase = createTestDatabase;
