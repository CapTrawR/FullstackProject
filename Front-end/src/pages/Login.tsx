import { useState, type SubmitEventHandler } from "react";
import Input from "../components/Input.tsx";
import { Link } from "react-router";
import Button from "../components/Button.tsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação, como enviar os dados para um servidor
    console.log("Email:", email);
    console.log("Senha:", password);
    console.log("handdle login a funcionar");
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to = "/">
        <img src="./logo.png" alt="Logo da Loja Online" className="mb-4 " />
        </Link>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Entrar" variant="default" type="submit" />
        <Link to={"/register"} className="w-full">
        <Button title="Registar" variant="outline"/>
        </Link>
      </div>
    </form>
  );
}

export default Login;
