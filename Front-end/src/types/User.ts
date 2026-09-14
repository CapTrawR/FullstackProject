// esta interface vai ser usada para passar contexto do user entre componentes para o home receber os dados do user e dizer ola x
export interface UserInterface {
  email: string;
  id: string;
  name: string;
  codigo_postal: string;
  admin: boolean;
}

// exportamos a info para poder consumida no UserContext
export type UserContextType = {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};
