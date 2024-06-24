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
    label: 'Followers',
    icon: 'groups',
    route: 'followers'
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
    route: 'my-products',
  },
  {
    label: 'Sold',
    icon: 'shopping_cart',
    route: 'sell',
  },
];

export const MENU_ITEMS_GUEST: MenuItem[] = [
  {
    label: 'Shop',
    icon: 'store',
    route: 'shop',
  },
  {
    label: 'Login',
    icon: 'login',
    route: 'login',
  },
  {
    label: 'Register',
    icon: 'app_registration',
    route: 'register'
  }
]

export const COUNTRIES = [
  {
    label: 'Romania',
    value: Country.Romania,
  },
];

export const STATES = [
  {
    label: 'Timis',
    value: State.Timis,
  },
];

export const CountriesMap: Map<Country, string> = new Map<Country, string>([
  [Country.Romania, 'Romania'],
]);

export const StatesMap: Map<State, string> = new Map<State, string>([
  [State.Timis, 'Timis'],
]);

export const OrderStatuses: Map<OrderStatus, string> = new Map<
  OrderStatus,
  string
>([
  [OrderStatus.Delivered, 'Delivered'],
  [OrderStatus.InProgress, 'In progress'],
  [OrderStatus.Placed, 'Placed'],
  [OrderStatus.Returned, 'Returned'],
]);
