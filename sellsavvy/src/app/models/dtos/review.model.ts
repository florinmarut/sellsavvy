import { ArticleDTO } from './article.model';
import { UserDTO } from './user.model';

export interface ReviewCreateDTO {
  id: string;
  comment: string;
  rating: number;
  article: ArticleDTO;
  user: UserDTO;
}

export interface ReviewUpdateDTO {
  id: string;
  comment: string;
  rating: number;
  article: ArticleDTO;
  user: UserDTO;
}

export interface ReviewDTO {
  id: string;
  comment: string;
  rating: number;
  article: ArticleDTO;
  user: UserDTO;
}
