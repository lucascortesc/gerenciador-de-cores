import { ReactNode } from "react";

export interface IChildren {
  children: ReactNode;
}

export interface IPallete {
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

export interface IUser {
  name: string;
  id: string;
}
