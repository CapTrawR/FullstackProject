import { Link } from "react-router";

function Header() {
  return (
    <div className="bg-[#161410]">
      <div className="md:p-1.2 mx-auto flex w-full items-center justify-between p-3 md:w-[737px]">
        <img src="./logo.png" alt="Logo da Loja Online" />
        <Link to="/login">
        <button className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm text-sm font-bold text-[#161410] bg-[#F2DAAC] hover:bg-[#F2DAAC]/80 hover:text-amber-50">
          Entrar
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
