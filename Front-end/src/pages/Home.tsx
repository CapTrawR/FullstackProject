import { useEffect, useState } from "react";
import Product from "../components/product";
import type { ProductType } from "../types/Product";

function Home() {
  const [category, setCategory] = useState("Hamburgers");
  //variavel de ambiente para os objectos
  const [products, setProducts] = useState<ProductType[]>([]);
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

  //Buscar produto
  const getProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const filtredProducts = products.filter((product) => {
    return product.category === category;
  });

  // se nao usar useEfect fica ciclo infinito
  useEffect(() => {
    getProduct();
  }, []);

  // devolve o html
  return (
    <div className="mx-auto w-full px-4 text-white md:w-184.25 md:px-0">
      <div className="my-1 flex gap-2 md:my-3">
        <div
          className={getCategoryClass("Hamburgers")}
          onClick={() => handleCategoryClick("Hamburgers")}
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
          className={getCategoryClass("Outros")}
          onClick={() => handleCategoryClick("Outros")}
        >
          Outros
        </div>
      </div>
      <p className="mt-2 mb-2 font-bold text-[#F2DAAC] uppercase">{category}</p>
      <div className="flex flex-col gap-2 md:gap-3">
        {filtredProducts.map((product) => (
          <Product
            id={product.id}
            description={product.description}
            img={product.img}
            name={product.name}
            price={product.price}
            category={product.category}
            key={product.id}
            setProducts={setProducts}
          />
        ))}
        {filtredProducts.length === 0 && (
          <p>Não existem produtos desta categoria.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
