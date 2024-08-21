import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
const eventBridge = new EventBridgeClient({ region: process.env.REGION });

import { events } from './events';

/**
 * @description Utility to emit events with AWS EventBridge library
 *
 * @see https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html
 * @see https://www.npmjs.com/package/@aws-sdk/client-eventbridge
 */
export async function emitEvent(
  eventName: string,
  data: Record<string, unknown>
): Promise<any> {
  if (!eventName || typeof eventName !== 'string' || !data || typeof data !== 'object')
    throw new Error('Missing eventName and/or data!');

  try {
    const command: any = events[eventName](data);
    const event = new PutEventsCommand({ Entries: [command] });
    if (!event) throw new Error('No such event name!');
    /**
     * Ugly hack, but we make it really clear already in the code that
     * this should not call EventBridge if we are doing a test.
     */
    if (process.env.NODE_ENV !== 'test') await eventBridge.send(event);
    return event.input.Entries[0];
  } catch (error) {
    throw new Error('Failed to emit event!');
  }
}
