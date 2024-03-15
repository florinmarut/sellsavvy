export default interface Config {
  host: string;
  port: string;
  addresses: Address;
}

export interface Address {
  [key: string]: string;
}

export interface QueryParams {
  [key: string]: string | number | boolean;
}
