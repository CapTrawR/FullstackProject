//eu aqui defino o tipo que quero que sao estes especificos mas tambem os padrão de qualquer botao
type ButtonType = {
  title: string;
  variant?: "default" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

//proops para destruturar tudo o que tem no button e conseguir ter acesso ao que quisermos na pagina que quisermos
function Button({ title, variant = "default", ...props }: ButtonType) {
  const buttonVariant = () => {
    if (variant === "default") {
      return "w-full cursor-pointer border-2 border-[#F2DAAC] rounded-md bg-[#F2DAAC] py-2 text-sm font-bold text-[#161410] hover:bg-[#F2DAAC]/80 hover:text-amber-50";
    }
    if (variant === "outline") {
      return "w-full cursor-pointer rounded-md border-2 border-[#F2DAAC] bg-[#f0e5d1] py-2 text-sm font-bold text-[#161410] hover:bg-[#F2DAAC]/80 hover:text-amber-50";
    }
  };

  return (
    <button {...props} className={buttonVariant()}>
      {title}
    </button>
  );
}

export default Button;
