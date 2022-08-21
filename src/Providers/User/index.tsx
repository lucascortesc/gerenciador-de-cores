import { createContext, useContext, useEffect, useState } from "react";
import { IChildren, IUser, IUserLogin, IUserRegister } from "../../interfaces";
import { api } from "../../services/api";

interface UserProvider {
  user: IUser;
  signIn: (data: IUserLogin) => Promise<any>;
  registerUser: (data: IUserRegister) => Promise<any>;
}

const UserContext = createContext<UserProvider>({} as UserProvider);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    const retrieveUser = localStorage.getItem("user");
    if (retrieveUser) {
      setUser(JSON.parse(retrieveUser));
    }
  }, []);

  const signIn = async (data: IUserLogin) => {
    let response = "";
    await api
      .post("/login", data)
      .then((res) => {
        const user = {
          id: res.data.id,
          name: res.data.name,
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.data.token);

        setUser(user);
        response = "Login feito com sucesso";
      })
      .catch((err) => (response = err.response.data));

    return response;
  };

  const registerUser = async (data: IUserRegister) => {
    let response = "";

    await api
      .post("/register", data)
      .then((res) => {
        response = "Usuário cadastrado com sucesso";
      })
      .catch((err) => (response = err.response.data));

    return response;
  };

  return <UserContext.Provider value={{ user, signIn, registerUser }}>{children}</UserContext.Provider>;
};
