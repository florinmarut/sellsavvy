import { EmailAddress, Password } from './constants.const';

export interface LoginBody {
  email: EmailAddress;
  password: Password;
}
