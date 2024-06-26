import { ReviewDTO } from './review.model';
import { UserDTO } from './user.model';

export interface ProductCreateDTO {
  id: string;
  title: string;
  description: string;
  stock: number;
  rating: number;
  price: number;
  sellerId: string;
  seller: UserDTO;
  reviews: Array<ReviewDTO>;
  isAvailable: boolean;
}

export interface ProductUpdateDTO {
  id: string;
  title: string;
  description: string;
  stock: number;
  rating: number;
  price: number;
  sellerId: string;
  seller: UserDTO;
  reviews: Array<ReviewDTO>;
  isAvailable: boolean;
}

export interface ProductDTO {
  id: string;
  title: string;
  description: string;
  stock: number;
  rating: number;
  price: number;
  sellerId: string;
  seller: UserDTO;
  reviews: Array<ReviewDTO>;
  isAvailable: boolean;
  presignedUrls: string[];
}
