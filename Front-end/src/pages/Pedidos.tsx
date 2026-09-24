import { useState } from "react";
import CardPedido from "../components/CardPedido";

function Pedidos() {
  const [category, setCategory] = useState("Pendente");
  // Ensure category names are consistent

  const handleCategoryClick = (newCategory: string) => {
    setCategory(newCategory);
  };

  //
  const getCategoryClass = (categoryName: string) => {
    const elementoSelecionado =
      "flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#F2DAAC] text-xs font-bold text-[#161410] text-shadow-md md:h-10 md:w-32";
    const elementoNaoSelecionado =
      "flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#161410] text-sm font-bold text-[#F2DAAC] transition-colors hover:bg-[#F2DAAC] hover:text-[#161410] md:h-10 md:w-32";
    if (category === categoryName) {
      return elementoSelecionado;
    } else {
      return elementoNaoSelecionado;
    }
  };
  return (
    <div className="mx-auto w-full px-4 text-white md:w-184.25 md:px-0">
      {/* Categorias */}
      <div className="mt-1 mb-3 flex gap-2 md:my-3">
        <div
          className={getCategoryClass("Pendente")}
          onClick={() => handleCategoryClick("Pendente")}
        >
          Pendente
        </div>
        <div
          className={getCategoryClass("Retirado")}
          onClick={() => handleCategoryClick("Retirado")}
        >
          Retirado
        </div>
        <div
          className={getCategoryClass("Cancelado")}
          onClick={() => handleCategoryClick("Cancelado")}
        >
          Cancelado
        </div>
      </div>
      {/* Cartoes */}
      <div className="grid grid-cols-3 gap-2">
        <CardPedido
          id={2}
          name={"Maria"}
          date="18/12/2025"
          orderTime="20:22"
          deliveredTime="22:29"
          valorTotal={12.56}
        />
      </div>
    </div>
  );
}

export default Pedidos;
