import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'sessions',
      columns: [
        { name: 'duration_minutes', type: 'number' },
        { name: 'occurred_on', type: 'number' },
        { name: 'resource_label', type: 'string' },
        { name: 'roadmap_id', type: 'string', isOptional: true },
        { name: 'is_exceptional', type: 'boolean' },
        { name: 'note', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
