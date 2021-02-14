import { Convert, OrderDto } from './src/microservices/database/frameworks/QuicktypeOrder';
import { createDummyOrder } from './__tests__/system/utils';

import { CreateOrder } from './src/microservices/order/controllers/CreateOrder';

/**
 * We will use the Order API's DTO as our contract or model
 */
const dummyOrder: OrderDto = createDummyOrder({
  market: 'MX',
  customerType: 'B2B'
});

/**
 * Check if the dummy order complies with the Quicktype-generated converter
 */
const order: OrderDto = Convert.toOrderDto(JSON.stringify(dummyOrder));

/**
 * Create an order with the verified order
 */
function orderApiMock(order: OrderDto): void {
  // @ts-ignore
  CreateOrder({ body: JSON.stringify(order) });
}

orderApiMock(order);
