export interface IUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  email: string;
  name: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IResponseLogin extends IUserResponse {
  token: string;
}
