import { EmailAddress, Password } from "./constants.const";

export interface CreateUser {
    id: string,
    phoneNumber: string,
    email: EmailAddress,
    password: Password,
    description: string,
    userName: string,
    firstName: string,
    lastName: string,
}
