import { OrderB2C } from '../contracts/Order';

import { paymentMexico } from './interactors/paymentMexico';

/**
 * @description B2C orders for Mexico market
 */
export function useCaseB2cMx(order: OrderB2C) {
  if (!order || order.market !== 'MX') throw new Error('No order or wrong market!');

  order.convertPricesToLocal('MXN');

  /**
   * Integration with Payment Provider. B2C customers pay upfront.
   */
  paymentMexico(order);
}
