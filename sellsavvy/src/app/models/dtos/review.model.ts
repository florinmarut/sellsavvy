import { ProductDTO } from './product.model';
import { UserDTO } from './user.model';

export interface ReviewCreateDTO {
  comment: string;
  rating: number;
  productId: string;
  product?: ProductDTO;
  userId: string;
  user?: UserDTO;
}

export interface ReviewUpdateDTO {
  id: string;
  comment: string;
  rating: number;
  productId: string;
  product: ProductDTO;
  userId: string;
  user: UserDTO;
}

export interface ReviewDTO {
  id: string;
  comment: string;
  rating: number;
  productId: string;
  product: ProductDTO;
  userId: string;
  user: UserDTO;
}
