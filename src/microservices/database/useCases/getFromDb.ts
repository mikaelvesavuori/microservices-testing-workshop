import { makeNewOrderDatabase } from '../entities/Database';

export async function getFromDb(testId: number) {
  try {
    const db = makeNewOrderDatabase();
    return await db.getRecords(testId);
  } catch (error) {
    throw new Error(error);
  }
}
