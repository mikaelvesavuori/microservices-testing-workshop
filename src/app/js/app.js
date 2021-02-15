/**
 * ENDPOINTS
 */
const AWS_ENDPOINT_ID = 'yvjvzwy652'; // EDIT THIS {{UNIQUE_ID}}
const AWS_REGION = 'eu-north-1'; // EDIT THIS

const CREATE_ORDER_ENDPOINT = `https://${AWS_ENDPOINT_ID}.execute-api.${AWS_REGION}.amazonaws.com/dev/createOrder`;

/**
 * DOM BINDINGS
 */
const APP = document.querySelector('#app');
const HEADER = document.querySelector('#header');
const FOOTER = document.querySelector('#footer');

/**
 * COMPONENTS
 */
function renderComponents() {
  HEADER.innerHTML = htmlHeader;
  FOOTER.innerHTML = htmlFooter;
}

/**
 * UTILITIES
 */
function goToCart() {
  window.location.href = '/cart.html';
}

/**
 * HTML
 */
const htmlProducts = (() => {
  let html = ``;

  try {
    products.forEach(
      (product) =>
        (html += `<div class="product" id="product-${product.sku}"><img src="${product.imageUrl}"><h2>${product.name}</h2><button class="btn-cart" onClick="updateCart('${product.sku}')">${product.price.usd} $</button></div>`)
    );

    return html;
  } catch (error) {
    return html;
  }
})();

const htmlProductsInCart = (() => {
  let html = ``;

  try {
    const ls = getStorage();
    if (!ls) return;

    const cartSkus = ls.split(',');
    const cartProducts = products.filter((product) => cartSkus.includes(product.sku));

    if (cartProducts && cartProducts.length > 0)
      cartProducts.forEach(
        (product) =>
          (html += `<div class="product" id="product-${product.sku}"><img src="${product.imageUrl}"><h2>${product.name}</h2><button class="btn-cart" onClick="updateCart('${product.sku}')">${product.price.usd} $</button></div>`)
      );

    return html;
  } catch (error) {
    return html;
  }
})();

const htmlCustomerTypeOptions = `<option value="B2C">Individual</option><option value="B2B">Business</option>`;

const htmlCountryOptions = `<option value="US">United States</option><option value="MX">Mexico</option>`;

const htmlShop = `
<div class="products">
  ${htmlProducts}
</div>
<div id="cartsymbol" onclick="goToCart()"><div id="cart-itemcount">0</div></div>`;

const htmlForm = `
<div>
  <a href="index.html">Go back to products</a>
</div>

<div class="products">
  ${htmlProductsInCart}
</div>

<form onsubmit="submitForm(); return false">
  <div class="field">
    <label>Customer type</label>
    <select id="customer-type" onchange="updateCustomerTypeOptions()" required>
      ${htmlCustomerTypeOptions}
    </select>
  </div>

  <div class="field hide" id="orgnumber">
    <label>Org. number</label>
    <input type="number" id="input-orgnumber" placeholder=" " minlength="6" maxlength="20"></input>
  </div>

  <div class="field">
    <label>Country</label>
    <select id="country" onchange="updateCountryOptions()" required>
      ${htmlCountryOptions}
    </select>
  </div>

  <div class="field">
    <label>Name</label>
    <input type="text" id="input-name" placeholder=" " required minlength="3" maxlength="50"></input>
  </div>

  <div class="field">
    <label>Street</label>
    <input type="text" id="input-street" placeholder=" " required minlength="3" maxlength="50"></input>
  </div>

  <div class="field">
    <label>City</label>
    <input type="text" id="input-city" placeholder=" " required minlength="3" maxlength="30"></input>
  </div>

  <div class="field">
    <label>Email</label>
    <input type="email" id="input-email" placeholder=" " required minlength="3" maxlength="50"></input>
  </div>

  <div class="field">
    <label>Phone</label>
    <input type="tel" id="input-phone" placeholder=" " required minlength="3" maxlength="30"></input>
  </div>

  <button id="submit">Submit order</button>
</form>`;

const htmlHeader = `<header><h1>ACME Corp. Potted Plants Shop</h1></header>`;

const htmlFooter = `<footer>™ ACME Corp. Potted Plants Shop</footer>`;

const htmlConfirmation = `<h2>Thank you for your order!</h2>`;

/**
 * VIEWS
 */
async function renderView(view) {
  renderComponents();

  if (view === 'confirmation') APP.innerHTML = htmlConfirmation;

  if (view === 'shop') {
    APP.innerHTML = htmlShop;
    startup();
  }

  if (view === 'cart') {
    APP.innerHTML = htmlForm;
    startup();
  }
}

function startup() {
  const ls = getStorage();
  if (ls) {
    const products = ls.split(',');
    if (products && products.length > 0) products.forEach((item) => updateButtonState(item));
    updateCartCount();
  }
}
