import { User, CalendarFold, Clock1, Clock3 } from "lucide-react";
type CardPedidoType = {
  id: number;
  name: string;
  date: string;
  orderTime: string;
  deliveredTime?: string;
  valorTotal: number;
};

function CardPedido({
  id,
  name,
  date,
  orderTime,
  deliveredTime,
  valorTotal,
}: CardPedidoType) {
  return (
    <div className="rounded-md bg-[#F2DAAC] p-2 text-[#32343E]">
      <div className="flex justify-between">
        <p className="font-bold">#{id}</p>
        <select name="" id="" className="font-bold">
          <option value="" defaultChecked disabled>
            Pendente
          </option>
          <option value="">Retirado</option>
          <option value="">Cancelado</option>
        </select>
      </div>
      {/* Cartoes parte nome hora e data */}
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <User size={16} />
          <p className="text-xs">{name}</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarFold size={16} />
          <p className="text-sm">{date}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Clock1 size={16} />
            <p className="text-xs">{orderTime}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            <p className="text-xs">{deliveredTime ? deliveredTime : "-"}</p>
          </div>
        </div>
      </div>
      <div className="mt-1 h-0.5 w-full bg-[#32343E]"></div>
      <p className="text-right text-lg font-bold">{valorTotal} €</p>
    </div>
  );
}

export default CardPedido;
