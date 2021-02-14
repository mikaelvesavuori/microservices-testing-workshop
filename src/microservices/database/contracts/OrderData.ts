/**
 * @description Order data when it first arrives in the Database service
 */
export type OrderDataInput = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  customerType: string;
  market: string;
  products: string;
  totalPrice: number;
  testId?: number;
  orgNumber?: number;
};

/**
 * @description Final order data before being written to the database
 */
export interface OrderData {
  // Customer name
  name: string;
  // Customer email
  email: string;
  // Customer phone number
  phone: string;
  // Customer street address
  street: string;
  // Customer city
  city: string;
  // Customer type
  customerType: string;
  // Customer market
  market: string;
  // Comma-separated string list of product IDs that have been purchased in this order
  products: string;
  // Total price of wares in USD cents
  totalPrice: number;
  // If this is a test, what is the test ID of this run?
  testId: number | undefined;
  // If this is a business user, what is the customer's organization number?
  orgNumber: number | undefined;
  // Unique ID
  id: string;
}
