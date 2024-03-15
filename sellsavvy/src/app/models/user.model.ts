import { AddressDTO } from './address.model';
import { ArticleDTO } from './article.model';
import { EmailAddress, Password } from './constants.const';

export interface UserCreateDTO {
  id: string;
  phoneNumber: string;
  email: EmailAddress;
  password: Password;
  description: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export interface UserUpdateDTO {
    id: string;
    phoneNumber: string;
    email: EmailAddress;
    password: Password;
    description: string;
    userName: string;
    firstName: string;
    lastName: string;
  }

export interface UserDTO {
  id: string;
  phoneNumber: string;
  email: EmailAddress;
  description: string;
  firstName: string;
  lastName: string;
  addresses: Array<AddressDTO>;
  articles: Array<ArticleDTO>;
}
