import { makeNewOrderDatabase } from '../entities/Database';

import { OrderDataInput } from '../contracts/OrderData';

export async function writeToDb(input: OrderDataInput) {
  try {
    const db = makeNewOrderDatabase();
    await db.addRecord(input);
  } catch (error) {
    throw new Error(error);
  }
}
