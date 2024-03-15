export type EmailAddress = `${string}@${string}`;

export type Password = string & {
  readonly PasswordBrand: unique symbol;
};

export enum Country {
  Romania
}

export enum State {
  Timis
}

export enum OrderStatus {
  Placed,
  InProgress,
  Delivered,
  Returned
}