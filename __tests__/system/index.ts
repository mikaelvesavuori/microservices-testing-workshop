import { verifyData } from './verifyData';
import { createOptions, callService, createDummyOrder, sleep, generateTestId } from './utils';
import { getEndpointConfig } from './config';

/**
 * Environment
 * Update this to your values
 */
// API Gateway ID
const ID = 'abcde12345'; // {{UNIQUE_ID}}
// AWS region
const REGION = 'eu-north-1';
// API Gateway stage
const ENV = 'dev';

/**
 * Test configuration
 * Modify if you want, or just leave it be
 */
// ID for this specific test run
const TEST_ID = generateTestId();
// Time to wait until first verification
const WAIT_TIME = 5000;
// Time to wait until running next iteration in call-loop
const LOOP_WAIT_TIME = 150;
// How many test orders to produce
const TEST_COUNT = 2;
// Test can be an empty object, in which case defaults will be used
const TEST_CONFIG = {
  customerType: 'B2C',
  market: 'US'
};

/**
 * @description Full system test, starting with a number of test orders and verify presence in order database at the end.
 */
async function SystemTestController(testCount = 1, customerData = {}) {
  console.log('Generated test ID is', TEST_ID, '\n');

  try {
    /**
     * Get endpoints for our environment
     */
    const { createOrderServiceEndpoint, getOrdersServiceEndpoint } = getEndpointConfig(
      ID,
      REGION,
      ENV
    );

    /**
     * Loop-call service
     */
    for (let i = 1; i <= testCount; i++) {
      const order = createDummyOrder({ ...customerData, testId: TEST_ID });
      const resp = await callService(createOrderServiceEndpoint, createOptions('POST', order));
      await sleep(LOOP_WAIT_TIME);
      console.log(i, order, resp, '\n');
    }

    /**
     * Wait for events to have settled a bit
     */
    await sleep(WAIT_TIME);

    /**
     * Get data
     */
    const dbData = await callService(
      getOrdersServiceEndpoint,
      createOptions('POST', {
        testId: TEST_ID
      })
    );

    console.log('Count of items is', dbData.Count);

    /**
     * Verify
     */
    verifyData(dbData, testCount, TEST_ID);
  } catch (error) {
    throw new Error(error);
  }
}

// Run tests
SystemTestController(TEST_COUNT, TEST_CONFIG);
