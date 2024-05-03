import { MenuItem } from './navigation.model';

export type EmailAddress = `${string}@${string}`;

export type Password = string & {
  readonly PasswordBrand: unique symbol;
};

export enum Country {
  Romania,
}

export enum State {
  Timis,
}

export enum OrderStatus {
  Placed,
  InProgress,
  Delivered,
  Returned,
}

export const ACCESS_TOKEN = 'access_token';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Profile',
    icon: 'person',
    route: 'profile',
  },
  {
    label: 'Shop',
    icon: 'store',
    route: 'shop',
  },
  {
    label: 'Orders',
    icon: 'shopping_bag',
    route: 'orders',
  },
  {
    label: 'Cart',
    icon: 'shopping_cart',
    route: 'cart',
  },
  {
    label: 'My products',
    icon: 'inventory',
    route: 'products',
  },
  {
    label: 'Sold',
    icon: 'shopping_cart',
    route: 'sell',
  },
];
