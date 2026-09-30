import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";
import Cart from "./Cart";

function Header() {
  const [showCart, setShowCart] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        console.error("Falhou a deslogar o utilizador");
        return;
      }
      setUser(null);
    } catch (error) {
      console.error("Erro a deslogar o utilizador:", error);
    }
  };

  // Função para autenticar o usuário e obter suas informações do backend com base no cookie JWT armazenado
  const handleAuthUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        method: "GET",
        credentials: "include",
      });

      // Não está autenticado — situação normal
      if (response.status === 401) {
        setUser(null);
        return;
      }

      // Verificar se a resposta do backend foi bem-sucedida
      if (!response.ok) {
        console.error("Falhou a autenticar o utilizador");
        return;
      }
      // Obter os dados do usuário a partir da resposta do backend
      const data = await response.json();
      console.log(data);
      // Atualizar o estado do usuário com os dados obtidos do backend
      setUser(data);
    } catch (error) {
      console.error("Erro a autenticar o utilizador:", error);
      return;
    }
  };

  useEffect(() => {
    // Chamar a função para autenticar o usuário ao carregar o componente
    handleAuthUser();
  }, []);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1";
    if (location.pathname === path) {
      return `${baseClass} border-[#F2DAAC] bg-[#F2DAAC] text-[#161410]`;
    } else return baseClass;
  };

  return (
    <div className="bg-[#161410]">
      {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
      <div className="mx-auto flex w-full max-w-[737px] items-center justify-between gap-4 px-4 py-3 md:px-0">
        <Link to="/">
          <img src="./logo.png" alt="Logo da Loja Online" />
        </Link>

        {user ? (
          <div className="flex items-center gap-8 text-white">
            {user.admin && (
              <div className="hidden items-center gap-2 text-[#F2DAAC] md:flex">
                <Link to="/">
                  <div className={getNavItemClass("/")}>
                    <Box size={18} />
                  </div>
                </Link>

                <Link to="/pedidos">
                  <div className={getNavItemClass("/pedidos")}>
                    <LayoutDashboard size={18} />
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1">
                    <Plus size={18} />
                  </div>
                </Link>
              </div>
            )}
            <div className="relative cursor-pointer">
              <ShoppingCart size={18} onClick={() => setShowCart(!showCart)} />
              <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] p-1 text-[#161410]">
                1
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p>{user.name}</p>
              <LogOut
                size={18}
                className="cursor-pointer"
                onClick={handleLogout}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC] text-sm font-bold text-[#161410] hover:bg-[#F2DAAC]/80 hover:text-amber-50">
              Entrar
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
