import { CircleChevronRight, CircleChevronLeft, Trash } from "lucide-react";

function CartItem() {
  return (
    <div className="flex items-center gap-3">
      <img src="./duplo-da-casa.png" alt="" className="w-[100px] rounded-md" />
      <div className="flex-1">
        <p className="font-bold uppercase">DUPLO DA CASA</p>
        <p className="font-bold text-[#848484]">28.90 €</p>
        <div className="mt-1 flex gap-4">
          <CircleChevronLeft
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={26}
          />
          <p className="font-bold">1</p>
          <CircleChevronRight
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={26}
          />
        </div>
      </div>
      <Trash className="cursor-pointer p-1" size={26} />
    </div>
  );
}

export default CartItem;
