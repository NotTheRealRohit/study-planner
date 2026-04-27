import { Database } from '@nozbe/watermelondb';
import Session from '../db/models/Session';

export interface PassiveLogInput {
  resourceLabel: string;
  durationMinutes: number;
  occurredOn: Date;
}

export interface SessionOutcome {
  id: string;
  resourceLabel: string;
  durationMinutes: number;
  occurredOn: Date;
}

export interface SessionLifecycle {
  logPassive(input: PassiveLogInput): Promise<SessionOutcome>;
}

function getMidnightUtc(date: Date): number {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}

export function createSessionLifecycle(database: Database): SessionLifecycle {
  return {
    async logPassive(input: PassiveLogInput): Promise<SessionOutcome> {
      if (input.durationMinutes <= 0) {
        throw new Error('Duration must be greater than zero');
      }
      if (!input.resourceLabel || !input.resourceLabel.trim()) {
        throw new Error('Resource label is required');
      }

      const occurredOnMs = getMidnightUtc(input.occurredOn);

      let outcome: SessionOutcome | null = null;

      await database.write(async () => {
        const session = await database.get<Session>('sessions').create((s) => {
          s.durationMinutes = input.durationMinutes;
          s.occurredOn = occurredOnMs;
          s.resourceLabel = input.resourceLabel;
          s.isExceptional = false;
        });

        outcome = {
          id: session.id,
          resourceLabel: session.resourceLabel,
          durationMinutes: session.durationMinutes,
          occurredOn: new Date(session.occurredOn),
        };
      });

      return outcome!;
    },
  };
}