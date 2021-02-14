import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

import { OrderDataInput } from '../contracts/OrderData';

import { writeToDb } from '../useCases/writeToDb';

import { Convert, OrderDto } from '../frameworks/QuicktypeOrder';

/**
 * @description Add order to database
 */
export async function WriteOrder(
  event: APIGatewayProxyEvent,
  context?: Context
): Promise<APIGatewayProxyResult | void> {
  try {
    if (!event) throw new Error('No event or body!');
    // @ts-ignore
    const data: OrderDataInput = event.body ? JSON.parse(event.body) : event.detail;

    // Use Quicktype to force-convert; will break if input does not comply
    const order: OrderDto = Convert.toOrderDto(JSON.stringify(data));
    console.log('order', order);

    await writeToDb(order);

    return {
      statusCode: 200,
      body: JSON.stringify('Done')
    } as APIGatewayProxyResult;
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify('Something broke!')
    } as APIGatewayProxyResult;
  }
}
