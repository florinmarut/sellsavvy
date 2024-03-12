export type EmailAddress = `${string}@${string}`;

export type Password = string & {
  readonly PasswordBrand: unique symbol;
};
