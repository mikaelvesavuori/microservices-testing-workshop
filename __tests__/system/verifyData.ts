import { divider } from './utils';

/**
 * @description Verify that all records are present in database and that they have integrity
 */
export function verifyData(data: any, testCount: number, testId: number) {
  divider();

  // Fail on no orders
  if (!data || !data.Items || data.Items.length === 0) throw new Error('No test orders received!');

  console.log(
    `Created ${testCount} tests and found ${data.Items.length} tests with new assigned test ID ${testId}.`
  );
  divider();

  // Fail on inconsistent length
  if (testCount !== data.Items.length)
    throw new Error('FAIL: "testCount" is not the same amount as the received order count!');

  // Pass
  console.log('PASS: System test passed successfully');
  process.exit(0);
}
