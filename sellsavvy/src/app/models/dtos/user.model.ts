import { AddressDTO } from './address.model';
import { ProductDTO } from './product.model';
import { EmailAddress, Password } from '../constants.const';
import { CartItemDTO } from './cart-item.model';
import { OrderDTO } from './order.model';

export interface UserCreateDTO {
  id: string;
  phoneNumber: string;
  email: EmailAddress;
  password: Password;
  description: string;
  firstName: string;
  lastName: string;
}

export interface UserUpdateDTO {
  id: string;
  phoneNumber: string;
  email: EmailAddress;
  password: Password;
  description: string;
  firstName: string;
  lastName: string;
}

export interface UserDTO {
  id: string;
  phoneNumber: string;
  email: EmailAddress;
  description: string;
  firstName: string;
  lastName: string;
  addresses: Array<AddressDTO>;
  products: Array<ProductDTO>;
  cartItems: Array<CartItemDTO>;
  orders: Array<OrderDTO>;
}
