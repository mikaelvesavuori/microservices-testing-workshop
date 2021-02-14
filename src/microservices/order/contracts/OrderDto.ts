// CustomerType and Market are strings here, so they can work with Quicktype generation
export type OrderDto = {
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
