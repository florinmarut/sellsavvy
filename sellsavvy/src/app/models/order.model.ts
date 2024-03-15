import { Address } from 'cluster';
import { OrderStatus } from './constants.const';
import { UserDTO } from './user.model';
import { OrderItemDTO } from './order-item.model';

export interface OrderCreateDTO {
  id: string;
  status: OrderStatus;
  price: number;
  buyer: UserDTO;
  seller: UserDTO;
  address: Address;
  items: Array<OrderItemDTO>;
}

export interface OrderUpdateDTO {
  id: string;
  status: OrderStatus;
  price: number;
  buyer: UserDTO;
  seller: UserDTO;
  address: Address;
  items: Array<OrderItemDTO>;
}

export interface OrderDTO {
  id: string;
  status: OrderStatus;
  price: number;
  buyer: UserDTO;
  seller: UserDTO;
  address: Address;
  items: Array<OrderItemDTO>;
}
