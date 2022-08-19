export interface IPalleteRequest {
  name: string;
  colors: IColor[];
}

export interface IPaletteResponse extends IPalleteRequest {
  id: string;
}

export interface IColor {
  name: string;
  rgba: string;
  hex: string;
}

export interface IPaletteUpdate {
  nome?: string;
  colors?: IColor[];
}
