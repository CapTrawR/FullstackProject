import { createContext, useState, type ReactNode } from "react";
import type { UserContextType } from "../types/User";

// Criar o contexto do usuário com valores padrão
export const UserContext = createContext<UserContextType>({
    user:null,
    setUser: () =>{},
});

// Criar um provedor de contexto para o usuário
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    // Provider do contexto do usuário
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

