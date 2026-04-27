import { Platform } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import { schema } from './schema';
import Session from './models/Session';

const isWeb = Platform.OS === 'web';

const adapter = isWeb
  ? new LokiJSAdapter({
      schema,
      useWebWorker: false,
      useIncrementalIndexedDB: true,
    })
  : new SQLiteAdapter({
      schema,
      jsi: true,
      onSetUpError: (error) => {
        console.error('Database setup error:', error);
      },
    });

export const database = new Database({
  adapter,
  modelClasses: [Session],
});

export { Session };
