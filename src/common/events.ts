import { OrderDto } from '../microservices/order/contracts/OrderDto';

const EVENTBUS_NAME = 'default'; //process.env.NODE_ENV === 'test' ? 'testing-bus' : 'production-bus';

/**
 * @description Event catalog, that holds examples of valid events.
 * This approach of consolidating "valid events" is only really feasible in a small-scale, controlled setting. See it as a convenience!
 * Expect schemas to be stored (only) in Eventbridge in a real setting.
 */
export const events = {
  /**
   * Order has been validated and created as an entity.
   * Runs in Payment service (if B2C: after Payment Provider purchase complete)
   */
  OrderCreated: (data: OrderDto) => ({
    EventBusName: EVENTBUS_NAME,
    Source: 'microservices-testing-ws.order',
    DetailType: 'OrderCreated',
    Detail: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      street: data.street,
      city: data.city,
      customerType: data.customerType,
      market: data.market,
      products: data.products,
      totalPrice: data.totalPrice,
      orgNumber: data.orgNumber,
      testId: data.testId
    })
  })
};
