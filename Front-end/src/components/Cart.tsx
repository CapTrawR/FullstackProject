import { X } from "lucide-react";
import Button from "./Button";
import CartItem from "./CartItem";
import { useContext, useEffect } from "react";
import { CartItemContext } from "../context/CartItemsContext";

// Props para o componente Cart, incluindo a função para controlar a exibição do carrinho
type CartTypeProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
};

function Cart({ setShowCart, showCart }: CartTypeProps) {
  // // variaveis de estado.
  // const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { cartItems, setCartItems } = useContext(CartItemContext);

  const getCartItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-cart-items", {
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Erro ao realizar a req...");
        return;
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="absolute right-0 z-1 flex h-screen w-93.75 flex-col bg-[#F2DAAC] p-5">
      <div className="flex justify-between">
        <X className="cursor-pointer" onClick={() => setShowCart(!showCart)} />
        <p className="font-bold uppercase">Carrinho</p>
      </div>

      <div className="mt-10 flex flex-1 flex-col gap-2">
        {cartItems.map((item) => (
          <CartItem
            title={item.product.name}
            price={item.product.price}
            img={item.product.img}
            id={item.product.id}
          />
        ))}
      </div>
      <Button variant="red" title="Finalizar o pedido" />
    </div>
  );
}

export default Cart;
