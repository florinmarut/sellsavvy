import { ArticleDTO } from './article.model';
import { OrderDTO } from './order.model';

export interface OrderItemCreateDTO {
  id: string;
  amount: number;
  price: string;
  orderId: string;
  order: OrderDTO;
  articleId: string;
  article: ArticleDTO;
}

export interface OrderItemUpdateDTO {
  id: string;
  amount: number;
  price: string;
  orderId: string;
  order: OrderDTO;
  articleId: string;
  article: ArticleDTO;
}

export interface OrderItemDTO {
  id: string;
  amount: number;
  price: string;
  orderId: string;
  order: OrderDTO;
  articleId: string;
  article: ArticleDTO;
}
