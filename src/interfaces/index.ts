import { ReactNode } from "react";

export interface Response {
  success?: string;
  error?: string;
}

export interface IChildren {
  children: ReactNode;
}

export interface IPalette {
  id?: string;
  name: string;
  colors: IColor[];
}

export interface IColor {
  name: string;
  rgba: string;
  hex: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
}

export interface IRegisterSchema extends IUserRegister {
  confirmPassword: string;
}

export interface IUser {
  name: string;
  id: string;
}

export interface IStep1 {
  name: string;
}

export interface ICreatePalette {
  id?: string;
  step?: number;
  name?: string;
  colors?: IColor[];
}

export interface formColor {
  [key: string]: string;
}
