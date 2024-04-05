export default interface Config {
  host: string;
  port: string;
  addresses: Address;
  origin: string;
}

export interface Address {
  [key: string]: string | Address;
}

export interface QueryParams {
  [key: string]: string | number | boolean;
}
