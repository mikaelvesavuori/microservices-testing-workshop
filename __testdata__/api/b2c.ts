export const CustomerB2CUsValid = {
  body: JSON.stringify({
    name: 'name',
    email: 'email',
    phone: 'phone',
    street: 'street',
    city: 'city',
    customerType: 'B2C',
    market: 'US',
    products: 'LB001,LB002',
    totalPrice: 12300,
    testId: Math.round(Math.random() * 10000)
    //orgNumber: 'orgNumber' || 0
  })
};

export const CustomerB2CMxValid = {
  body: JSON.stringify({
    name: 'name',
    email: 'email',
    phone: 'phone',
    street: 'street',
    city: 'city',
    customerType: 'B2C',
    market: 'MX',
    products: 'LB001,LB002',
    totalPrice: 12300,
    testId: Math.round(Math.random() * 10000)
    //orgNumber: 'orgNumber' || 0
  })
};
