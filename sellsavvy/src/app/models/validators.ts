import { Password } from './constants.const';

export function validatePassword(password: string): password is Password {
    const hasSixChars = password.length >= 6;
    const hasNonAlphanumeric = /\W/.test(password);
    const hasDigit = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
  
    return hasSixChars && hasNonAlphanumeric && hasDigit && hasUppercase;
  }