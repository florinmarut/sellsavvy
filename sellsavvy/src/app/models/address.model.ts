import { Country, State } from './constants.const';
import { UserDTO } from './user.model';

export interface AddressCreateDTO {
  id: string;
  city: string;
  state: State;
  country: Country;
  street: string;
  zip: string;
  user: UserDTO;
}

export interface AddressUpdateDTO {
  id: string;
  city: string;
  state: State;
  country: Country;
  street: string;
  zip: string;
  user: UserDTO;
}

export interface AddressDTO {
  id: string;
  city: string;
  state: State;
  country: Country;
  street: string;
  zip: string;
  user: UserDTO;
}
