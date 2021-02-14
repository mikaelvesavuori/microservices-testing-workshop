import { emitEvent } from '../../../src/common/EmitEvent';

import { inputInvalid, inputValid } from '../../../__testdata__/events';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(emitEvent()).rejects.toThrow();
  });

  test('It should throw an error if passed invalid event name/data', async () => {
    expect(async () => await emitEvent('NonExistent', inputInvalid)).rejects.toThrow();
  });
});

describe('Success cases', () => {
  test('It should emit an event for "OrderCreated"', async () => {
    /**
     * The emitEvent function will call EventBridge, but the function
     * avoids doing so in a test scenario. If we cannot/do not want to
     * change a function to have that kind of check/knowledge, we could
     * instead mock the functionality, like so:
     *
     * const emitEventMock = jest.fn();
     * emitEventMock.mockReturnValueOnce(response);
     */
    expect(await emitEvent('OrderCreated', inputValid)).toMatchObject({
      EventBusName: 'default',
      Source: 'microservices-testing-ws.order',
      DetailType: 'OrderCreated',
      Detail:
        '{"name":"name","email":"email","phone":"phone","street":"street","city":"city","customerType":"customerType","market":"market","products":"products","totalPrice":"totalPrice","orgNumber":"orgNumber","testId":"testId"}'
    });
  });
});
