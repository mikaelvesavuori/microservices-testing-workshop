import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

import { getFromDb } from '../useCases/getFromDb';

/**
 * @description Add order to database
 */
export async function GetOrders(
  event: APIGatewayProxyEvent,
  context?: Context
): Promise<APIGatewayProxyResult | void> {
  try {
    if (!event) throw new Error('No event or body!');
    const { testId } = event.body ? JSON.parse(event.body) : event;
    const data = await getFromDb(testId);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    } as APIGatewayProxyResult;
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify('Something broke!')
    } as APIGatewayProxyResult;
  }
}
