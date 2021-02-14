import { WriteOrder } from '../../../src/microservices/database/controllers/WriteOrder';

import { databaseInputValid } from '../../../__testdata__/database';

/**
 * @description This tests the WriteOrder service in a similar way that EventBridge would call it.
 */
describe('Failure cases', () => {
  test('It should throw an error if no body is provided', async () => {
    // @ts-ignore
    expect(await WriteOrder({})).toMatchObject({
      body: '"Something broke!"',
      statusCode: 400
    });
  });
});

describe('Success cases', () => {
  test('It should insert item', async () => {
    // @ts-ignore
    expect(await WriteOrder({ detail: databaseInputValid })).toMatchObject({
      body: '"Done"',
      statusCode: 200
    });
  });
});
