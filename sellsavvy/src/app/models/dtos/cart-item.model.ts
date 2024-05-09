import { ProductDTO } from './product.model';
import { UserDTO } from './user.model';

export interface CartItemCreateDTO {
  id?: string;
  amount: number;
  productId: string;
  product?: ProductDTO;
  userId: string;
  user?: UserDTO;
}

export interface CartItemUpdateDTO {
  id: string;
  amount: number;
  productId: string;
  product: ProductDTO;
  userId: string;
  user: UserDTO;
}

export interface CartItemDTO {
  id: string;
  amount: number;
  productId: string;
  product: ProductDTO;
  userId: string;
  user: UserDTO;
}
