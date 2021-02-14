import DynamoDB from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';

import { OrderData, OrderDataInput } from '../contracts/OrderData';

const dynamo = new DynamoDB.DocumentClient({ region: process.env.REGION });

const TABLE_NAME = process.env.TABLE_NAME;

export const makeNewOrderDatabase = () => new StatusDatabase();

/**
 * @description Database entity for vehicle network status pings
 */
class StatusDatabase {
  constructor() {}

  public async addRecord(input: OrderDataInput): Promise<any> {
    console.info('Adding record to database...');

    const {
      name,
      email,
      phone,
      street,
      city,
      customerType,
      market,
      products,
      totalPrice,
      testId,
      orgNumber
    } = input;

    const record: OrderData = {
      name,
      email,
      phone,
      street,
      city,
      customerType,
      market,
      products,
      totalPrice,
      testId,
      orgNumber,
      id: uuidv4()
      //timestampStored: Date.now().toString()
    };

    const params = {
      TableName: TABLE_NAME,
      Item: record
    };

    /**
     * Ugly hack: Only call DynamoDB if not a test
     */
    if (process.env.NODE_ENV !== 'test')
      return new Promise((resolve, reject) => {
        dynamo.put(params, (error, data) => {
          if (error) {
            console.log('Error', error);
            reject(error);
          } else {
            console.log('Success', data);
            resolve('');
          }
        });
      });

    return;
  }

  public async getRecords(testId: number) {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: 'testId = :testId',
      ExpressionAttributeValues: { ':testId': testId }
    };

    return new Promise((resolve, reject) => {
      dynamo.scan(params, (error, data) => {
        if (error) {
          console.log('Error', error);
          reject(error);
        } else {
          console.log('Success', data);
          resolve(data);
        }
      });
    });
  }
}
