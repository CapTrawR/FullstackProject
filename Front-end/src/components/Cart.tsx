import { X } from "lucide-react";
import Button from "./Button";
import CartItem from "./CartItem";

// Props para o componente Cart, incluindo a função para controlar a exibição do carrinho
type CartTypeProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
};

function Cart({ setShowCart, showCart }: CartTypeProps) {
  return (
    <div className="absolute right-0 flex h-screen w-93.75 flex-col bg-[#F2DAAC] p-5">
      <div className="flex justify-between">
        <X className="cursor-pointer" onClick={() => setShowCart(!showCart)} />
        <p className="font-bold uppercase">Carrinho</p>
      </div>

      <div className="mt-10 flex flex-1 flex-col gap-2">
        <CartItem />
        <CartItem />
      </div>
      <Button variant="red" title="Finalizar o pedido" />
    </div>
  );
}

export default Cart;
