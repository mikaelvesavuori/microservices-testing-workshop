import { paymentMexico } from '../../../src/microservices/order/usecases/interactors/paymentMexico';
import { paymentUs } from '../../../src/microservices/order/usecases/interactors/paymentUs';

import { makeNewOrder } from '../../../src/microservices/order/entities/Order';

import { createDummyOrder } from '../../system/utils';

/**
 * @description The Payment API/integration test will test the (fake) external Payment service
 * (one for US and one for MX markets) and their outer boundary, as used by a consumer.
 *
 * Since this is all faked by us, we are running their functions rather than through an HTTP request.
 */
describe('Failure cases', () => {
  describe('Missing data', () => {
    test('It should throw an error if no order is provided to MX payment service', () => {
      // @ts-ignore
      expect(() => paymentMexico()).toThrow();
    });

    test('It should throw an error if no order is provided to US payment service', () => {
      // @ts-ignore
      expect(() => paymentUs()).toThrow();
    });
  });
});

describe('Success cases', () => {
  describe('Payments', () => {
    test('It should successfully execute US payment', () => {
      const dummyOrder = createDummyOrder({
        market: 'US',
        customerType: 'B2C'
      });

      const order = makeNewOrder(dummyOrder);

      // @ts-ignore
      expect(() => paymentUs(order)).not.toThrow();
    });

    test('It should successfully execute MX payment', () => {
      const dummyOrder = createDummyOrder({
        market: 'MX',
        customerType: 'B2C'
      });

      const order = makeNewOrder(dummyOrder);

      // @ts-ignore
      expect(() => paymentMexico(order)).not.toThrow();
    });
  });
});
