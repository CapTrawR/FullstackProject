import { useState } from "react";

function Home() {
  const [category, setCategory] = useState("Hamburger");
  // Ensure category names are consistent

  const handleCategoryClick = (newCategory: string) => {
    setCategory(newCategory);
  };

  //
  const getCategoryClass = (categoryName: string) => {
    const elementoSelecionado =
      "flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#F2DAAC] text-sm font-bold text-[#161410] text-shadow-md md:h-10 md:w-32";
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
      <div className="my-1 flex gap-2 md:my-3">
        <div
          className={getCategoryClass("Hamburger")}
          onClick={() => handleCategoryClick("Hamburger")}
        >
          Hamburger
        </div>
        <div
          className={getCategoryClass("Bebidas")}
          onClick={() => handleCategoryClick("Bebidas")}
        >
          Bebidas
        </div>
        <div
          className={getCategoryClass("Sobremesas")}
          onClick={() => handleCategoryClick("Sobremesas")}
        >
          Sobremesas
        </div>
      </div>
    </div>
  );
}

export default Home;
