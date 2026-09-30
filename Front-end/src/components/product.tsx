import { ShoppingCart } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formaterPrice } from "../utils/formaterPrice";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function Product({
  id,
  name,
  description,
  price,
  img,
  category,
  setProducts,
}: ProductType) {
  const { user } = useContext(UserContext);

  //apagar o produto funcao
  const handleDleteProduct = async (id: string) => {
    try {
      if (!id) {
        console.log("Id nao encontrado");
      }
      const response = await fetch(
        `http://localhost:3000/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log("Erro ao realizar requisição");
        return;
      }
      //atualiza o front-end
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  //Buscar produto atualiza
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

  return (
    <div>
      <div className="flex gap-2">
        <img src={`./${img}`} className="h-20.75 w-25 md:h-41.5 md:w-50" />
        <div className="flex w-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold uppercase md:text-lg">{name}</p>
            {user?.admin && (
              <div
                className="flex cursor-pointer items-center rounded-md border-1 px-1 text-xs text-red-400 uppercase"
                onClick={() => handleDleteProduct(id)}
              >
                Apagar
              </div>
            )}
          </div>
          <p className="md:text-md flex-1 text-xs text-[#848484]">
            {description}
          </p>
          <div className="flex items-center justify-end gap-2">
            <p className="text-xs font-bold text-[#F2DAAC] md:text-lg">
              {formaterPrice(Number(price))}
            </p>
            <ShoppingCart size={18} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
