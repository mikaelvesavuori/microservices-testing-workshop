import faker from 'faker';
import fetch from 'node-fetch';

/**
 * @description Create request options object
 */
export const createOptions = (method = 'GET', data) => ({
  method,
  headers: {
    'Content-Type': 'application/json'
  },
  body: data && typeof data === 'object' ? JSON.stringify(data) : data ? data : null
});

/**
 * @description Call endpoint
 */
export async function callService(endpoint, options) {
  return await fetch(endpoint, options)
    .then(async (res) => {
      if (res.status >= 400)
        throw new Error(
          //@ts-ignore
          `Failed to call ${endpoint}; received status ${res.status} and error ${res.message}`
        );
      console.log(`Successfully called ${endpoint}!`);
      return await res.json();
    })
    .catch((error) => console.error(error));
}

/**
 * @description Create (test) order
 */
export function createDummyOrder(customerData) {
  let {
    name,
    email,
    phone,
    street,
    city,
    customerType,
    market,
    products,
    totalPrice,
    orgNumber,
    testId
  } = customerData;

  const MARKET_US_QUOTA = 50; // US vs MX quota
  const CUSTOMER_TYPE_B2B_QUOTA = 20; // B2B vs B2C quota

  market = market
    ? market
    : (() => {
        const chance = Math.round(Math.random() * 100);
        if (chance <= MARKET_US_QUOTA) return 'US';
        return 'MX';
      })();

  customerType = customerType
    ? customerType
    : (() => {
        // Mexico is B2C-only
        if (market === 'MX') return 'B2C';

        const chance = Math.round(Math.random() * 100);
        if (chance <= CUSTOMER_TYPE_B2B_QUOTA) return 'B2B';
        return 'B2C';
      })();

  if (market === 'US') faker.locale = 'en_US';
  if (market === 'MX') faker.locale = 'es_MX';

  orgNumber = (() => {
    if (customerType === 'B2C') return 0;
    return orgNumber
      ? orgNumber
      : faker.random.number({
          min: 6,
          max: 20
        });
  })();

  const firstName = name ? name : faker.name.firstName();
  const lastName = name ? name : faker.name.lastName();
  email = email ? email : faker.internet.email();
  phone = phone ? phone : faker.phone.phoneNumber();
  street = street ? street : faker.address.streetAddress();
  city = city ? city : faker.address.city();
  products = products ? products : 'BB001,BA002';
  totalPrice = totalPrice ? totalPrice : parseInt(Math.round(Math.random() * 1500) + '00');

  const customer = {
    name: `${firstName} ${lastName}`,
    email,
    phone,
    street,
    city,
    customerType,
    market,
    products,
    totalPrice,
    orgNumber,
    testId
  };

  return JSON.parse(faker.fake(JSON.stringify(customer)));
}

/**
 * @description Sleep helper
 *
 * @see https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time
 */
export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * @description Generate test ID
 */
export const generateTestId = () =>
  Math.round(Math.random() * 1000 * Math.round(Math.random() * 1000));

/**
 * @description Output divider helper
 */
export const divider = () => console.log('\n——————————————————\n');
