export interface IPalleteRequest {
  name: string;
  colors: IColor[];
}

export interface IPalleteResponse extends IPalleteRequest {
  id: string;
}

export interface IColor {
  name: string;
  rgba: string;
  hex: string;
}
