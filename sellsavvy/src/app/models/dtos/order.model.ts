import { OrderStatus } from '../constants.const';
import { UserDTO } from './user.model';
import { AddressDTO } from './address.model';
import { ProductDTO } from './product.model';

export interface OrderCreateDTO {
  id?: string;
  status: OrderStatus;
  price: number;
  buyerId: string;
  buyer?: UserDTO;
  sellerId: string;
  seller?: UserDTO;
  addressId: string;
  address?: AddressDTO;
  productId: string;
  product?: ProductDTO;
}

export interface OrderUpdateDTO {
  id: string;
  status: OrderStatus;
  price: number;
  buyerId: string;
  buyer?: UserDTO;
  sellerId: string;
  seller?: UserDTO;
  addressId: string;
  address?: AddressDTO;
  productId: string;
  product?: ProductDTO;
}

export interface OrderDTO {
  id: string;
  status: OrderStatus;
  price: number;
  buyerId: string;
  buyer: UserDTO;
  sellerId: string;
  seller: UserDTO;
  addressId: string;
  address: AddressDTO;
  productId: string;
  product: ProductDTO;
}
