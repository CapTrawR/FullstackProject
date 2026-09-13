import { useState, type SubmitEventHandler } from "react";
import Input from "../components/Input.tsx";
import { Link } from "react-router";
import Button from "../components/Button.tsx";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.tsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      //testar no front para nao mandar requisiçoes
      if (!email || !password) {
        setError("Usuário e password são obrigatórios.");
        return;
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 404) {
        setError("Usuario nao encontrado.");
        return;
      }

      if (response.status === 400) {
        setError("Usuário e password são obrigatórios.");
        return;
      }

      if (response.status === 401) {
        setError("Password inválida.");
        return;
      }

      if (response.status === 500) {
        setError("Erro no servidor. Tente novamente mais tarde.");
        return;
      }

      if (response.status === 200) {
        // zera o erro caso tenha
        setError("");
        // para ver o que vem na resposta do fetch, temos que fazer o parse para json, senao nao conseguimos ver o que vem
        const data = await response.json();
        navigate("/");
        setUser(data);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img
            src="./logo.png"
            alt="Logo da Loja Online"
            className="mx-auto mb-4"
          />
        </Link>
        <div className="mb-3 flex flex-col gap-2">
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
          {error && <p className="text-sm font-bold text-red-500">{error}</p>}
        </div>

        <Button
          title="Entrar"
          variant="default"
          type="submit"
          className="mt-4"
        />
        <Link to={"/register"} className="w-full">
          <Button title="Registar" variant="outline" type="button" />
        </Link>
      </div>
    </form>
  );
}

export default Login;
