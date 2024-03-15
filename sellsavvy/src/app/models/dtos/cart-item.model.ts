import { ArticleDTO } from './article.model';
import { UserDTO } from './user.model';

export interface CartItemCreateDTO {
  id: string;
  amount: number;
  article: ArticleDTO;
  user: UserDTO;
}

export interface CartItemUpdateDTO {
  id: string;
  amount: number;
  article: ArticleDTO;
  user: UserDTO;
}

export interface CartItemDTO {
  id: string;
  amount: number;
  article: ArticleDTO;
  user: UserDTO;
}
