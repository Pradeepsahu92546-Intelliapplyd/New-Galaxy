import { AccountType } from '../enums/account-type.enum';
import { UserTypeForStandard } from '../enums/user-type.enum';
import { UserTypeForEnterprise } from '../enums/user-type.enum';

// request interface
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: UserTypeForStandard | UserTypeForEnterprise;
  accountType: AccountType;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

// reponse interface

export interface RegisterResponse {
    aceessToken: string;
    tokenType: string;
    expiresIn: number;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    accountType: AccountType;
    createdAt: string;
    date_joined: string;
}

export interface LoginResponse {
  aceessToken: string;
    tokenType: string;
    expiresIn: number;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    accountType: AccountType;
    createdAt: string;
    date_joined: string;
}
