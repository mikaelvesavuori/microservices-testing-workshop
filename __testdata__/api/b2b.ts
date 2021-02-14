export const CustomerB2BUsValid = {
  body: JSON.stringify({
    name: 'name',
    email: 'email',
    phone: 'phone',
    street: 'street',
    city: 'city',
    customerType: 'B2B',
    market: 'US',
    products: 'LB001,LB002',
    totalPrice: 12300,
    testId: Math.round(Math.random() * 10000),
    orgNumber: 12345678
  })
};
