function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      {/* isto passa todas as props do input para o input, como placeholder, type, etc. */}
      <input
        {...props}
        className="h-8.5 w-87.5 rounded-md border border-gray-300 bg-amber-50 px-2 py-2.75 text-sm text-[#32343E] placeholder-[#32343E]/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

export default Input;
