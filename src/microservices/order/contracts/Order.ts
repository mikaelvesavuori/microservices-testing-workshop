import { OrderDto } from './OrderDto';

export interface Order {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  customerType: CustomerType;
  market: Market;
  products: string;
  totalPrice: number;
  localPrice: number;
  testId?: null | number;
  convertPricesToLocal: (newCurrency: Currency) => void;
  getLocalPrice: () => number;
  getRequiredOrderPlacementData: () => OrderDto;
}

export interface OrderB2B extends Order {
  verifyOrganizationNumber: () => boolean;
}

export interface OrderB2C extends Order {}

export type CustomerType = 'B2B' | 'B2C';

export type Market = 'US' | 'MX';

export type Currency = 'MXN' | 'USD';
