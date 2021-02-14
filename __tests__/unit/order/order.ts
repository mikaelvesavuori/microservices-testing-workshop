import { makeNewOrder } from '../../../src/microservices/order/entities/Order';

import { createDummyOrder } from '../../system/utils';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => makeNewOrder()).toThrow();
  });

  describe('Market support', () => {
    test('It should throw an error if given an unsupported/unknown market', () => {
      const customerUnknownMarket = createDummyOrder({
        market: 'xx'
      });
      expect(() => makeNewOrder(customerUnknownMarket)).toThrow();
    });

    test('It should throw an error if given an unsupported/unknown customer type', () => {
      const customerUnknownType = createDummyOrder({
        customerType: 'xx'
      });
      expect(() => makeNewOrder(customerUnknownType)).toThrow();
    });

    test('It should throw an error if given an B2B customer without an organization number', () => {
      const customerB2bNoOrgNumber = createDummyOrder({
        market: 'US',
        customerType: 'B2B'
      });
      customerB2bNoOrgNumber.orgNumber = null;
      expect(() => makeNewOrder(customerB2bNoOrgNumber)).toThrow();
    });

    test('It should throw an error if given a B2B customer from MX market', () => {
      const customerB2bMx = createDummyOrder({
        market: 'MX',
        customerType: 'B2B'
      });
      expect(() => makeNewOrder(customerB2bMx)).toThrow();
    });
  });
});

describe('Success cases', () => {
  describe('Order creation', () => {
    test('It should be able to create an order with a customer in the US market', () => {
      const customerUs = createDummyOrder({
        market: 'US'
      });
      expect(makeNewOrder(customerUs)).toMatchObject(customerUs);
    });

    test('It should be able to create an order with a customer in the MX market', () => {
      const customerMx = createDummyOrder({
        market: 'MX'
      });
      expect(makeNewOrder(customerMx)).toMatchObject(customerMx);
    });
  });
});
