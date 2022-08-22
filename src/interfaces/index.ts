import { ReactNode } from "react";

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
  isDark?: boolean;
}

export interface IColorBrithness extends IColor {
  isDark: boolean;
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
  name_1?: string;
  name_2?: string;
  name_3?: string;
  name_4?: string;
  name_5?: string;
  name_6?: string;
  name_7?: string;
  name_8?: string;
  name_9?: string;
  name_10?: string;
}
