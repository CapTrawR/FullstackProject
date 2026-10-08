import { CircleChevronRight, CircleChevronLeft, Trash } from "lucide-react";
import { formaterPrice } from "../utils/formaterPrice";

type CartItemType = {
  title: string;
  price: number | string;
  img: string;
  id: string;
  quantity: number;
};

function CartItem({ title, price, img, id, quantity }: CartItemType) {
  return (
    <div className="flex items-center gap-3">
      <img src={`./${img}`} alt="" className="w-[100px] rounded-md" />
      <div className="flex-1">
        <p className="text-sm font-bold uppercase">{title}</p>
        <p className="text-sm font-bold text-[#848484]">
          {formaterPrice(price)}
        </p>
        <div className="mt-1 flex items-center gap-4">
          <CircleChevronLeft
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={26}
          />
          <p className="text-sm font-bold">{quantity}</p>
          <CircleChevronRight
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
            size={26}
          />
        </div>
      </div>
      <Trash
        className="cursor-pointer p-1"
        size={26}
        onClick={() => alert(id)}
      />
    </div>
  );
}

export default CartItem;
