import { APIGatewayProxyEvent } from 'aws-lambda';

import { CreateOrder } from '../../../src/microservices/order/controllers/CreateOrder';

import { CustomerB2BUsValid } from '../../../__testdata__/api/b2b';
import { CustomerB2CUsValid, CustomerB2CMxValid } from '../../../__testdata__/api/b2c';

/**
 * @description The Order API/integration test will test our Order service and its outer boundary, as used by a consumer.
 */
describe('Failure cases', () => {
  test('It should return status 400 if no argument/event is provided', async () => {
    // @ts-ignore
    const resp = await CreateOrder();
    expect(resp).toBeDefined();
    expect(resp.statusCode).toBe(400);
  });
});

describe('Success cases', () => {
  describe('Business-to-business (B2B)', () => {
    test('It should handle a B2B customer in the US market', async () => {
      const resp = await CreateOrder(CustomerB2BUsValid as APIGatewayProxyEvent);
      expect(resp).toBeDefined();
      expect(resp.statusCode).toBe(200);
    });
  });

  describe('Business-to-consumer (B2C)', () => {
    test('It should handle a B2C customer in the US market', async () => {
      const resp = await CreateOrder(CustomerB2CUsValid as APIGatewayProxyEvent);
      expect(resp).toBeDefined();
      expect(resp.statusCode).toBe(200);
    });

    test('It should handle a B2C customer in the MX market', async () => {
      const resp = await CreateOrder(CustomerB2CMxValid as APIGatewayProxyEvent);
      expect(resp).toBeDefined();
      expect(resp.statusCode).toBe(200);
    });
  });
});
