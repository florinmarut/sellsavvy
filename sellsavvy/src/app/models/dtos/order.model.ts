import { Address } from 'cluster';
import { OrderStatus } from '../constants.const';
import { UserDTO } from './user.model';
import { OrderItemDTO } from './order-item.model';

export interface OrderCreateDTO {
  id: string;
  status: OrderStatus;
  price: number;
  buyerId: string;
  buyer: UserDTO;
  sellerId: string;
  seller: UserDTO;
  addressId: string;
  address: Address;
  items: Array<OrderItemDTO>;
}

export interface OrderUpdateDTO {
  id: string;
  status: OrderStatus;
  price: number;
  buyerId: string;
  buyer: UserDTO;
  sellerId: string;
  seller: UserDTO;
  addressId: string;
  address: Address;
  items: Array<OrderItemDTO>;
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
  address: Address;
  items: Array<OrderItemDTO>;
}
