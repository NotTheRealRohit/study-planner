import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export default class Session extends Model {
  static table = 'sessions';

  @field('duration_minutes') durationMinutes!: number;
  @field('occurred_on') occurredOn!: number;
  @field('resource_label') resourceLabel!: string;
  @field('roadmap_id') roadmapId!: string | null;
  @field('is_exceptional') isExceptional!: boolean;
  @field('note') note!: string | null;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
