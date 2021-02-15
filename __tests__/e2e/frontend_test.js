// Reference: https://codecept.io/basics/#getting-started

Feature('Order items');

Scenario('Order single item as US B2C customer', ({ I }) => {
  I.amOnPage('http://127.0.0.1:8000');

  I.seeElement('//button[contains(., "300 $")]');
  I.click('300 $');
  I.see('1', '#cart-itemcount');
  I.click('#cartsymbol');

  I.fillField('#input-name', 'Anders Andersson');
  I.fillField('#input-street', 'Thisway 123');
  I.fillField('#input-city', 'Göteborg');
  I.fillField('#input-email', 'asdf@nowhere.xyz');
  I.fillField('#input-phone', '123123123123');

  I.click('Submit order');
  I.see('Thank you for your order!');
  I.seeInCurrentUrl('/success');
});

Scenario('Order single item as US B2B customer', ({ I }) => {
  I.amOnPage('http://127.0.0.1:8000');

  I.seeElement('//button[contains(., "150 $")]');
  I.click('150 $');
  I.see('1', '#cart-itemcount');
  I.click('#cartsymbol');

  I.selectOption('#customer-type', 'B2B');
  I.fillField('#input-orgnumber', '123123123');

  I.fillField('#input-name', 'Anders Andersson');
  I.fillField('#input-street', 'Thisway 123');
  I.fillField('#input-city', 'Göteborg');
  I.fillField('#input-email', 'asdf@nowhere.xyz');
  I.fillField('#input-phone', '123123123123');

  I.click('Submit order');
  I.see('Thank you for your order!');
  I.seeInCurrentUrl('/success');
});

Scenario('Order single item as MX B2C customer', ({ I }) => {
  I.amOnPage('http://127.0.0.1:8000');

  I.seeElement('//button[contains(., "150 $")]');
  I.click('180 $');
  I.see('1', '#cart-itemcount');
  I.click('#cartsymbol');

  I.selectOption('#country', 'MX');

  I.fillField('#input-name', 'Anders Andersson');
  I.fillField('#input-street', 'Thisway 123');
  I.fillField('#input-city', 'Göteborg');
  I.fillField('#input-email', 'asdf@nowhere.xyz');
  I.fillField('#input-phone', '123123123123');

  I.click('Submit order');
  I.see('Thank you for your order!');
  I.seeInCurrentUrl('/success');
});
