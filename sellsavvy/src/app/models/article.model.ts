import { ReviewDTO } from './review.model';
import { UserDTO } from './user.model';

export interface ArticleCreateDTO {
  id: string;
  title: string;
  description: string;
  stock: number;
  rating: number;
  price: number;
  seller: UserDTO;
  reviews: Array<ReviewDTO>;
}

export interface ArticleUpdateDTO {
  id: string;
  title: string;
  description: string;
  stock: number;
  rating: number;
  price: number;
  seller: UserDTO;
  reviews: Array<ReviewDTO>;
}

export interface ArticleDTO {
  id: string;
  title: string;
  description: string;
  stock: number;
  rating: number;
  price: number;
  seller: UserDTO;
  reviews: Array<ReviewDTO>;
}
