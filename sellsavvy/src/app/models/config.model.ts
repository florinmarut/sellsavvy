export default interface Config {
  host: string;
  port: string;
  addresses: Address;
}

export interface Address {
  name: string;
  url: string;
}

export interface QueryParams {
    [key: string]: string | number | boolean
}
