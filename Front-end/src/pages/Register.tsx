import { useState, type SubmitEventHandler } from "react";
import Input from "../components/Input.tsx";
import { Link } from "react-router";
import Button from "../components/Button.tsx";

function Register() {
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codigo_postal, setCodigoPostal] = useState("");

  const handleRegister: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (
        !email.trim().toLowerCase() ||
        !name.trim() ||
        !password ||
        !codigo_postal.trim() ||
        !confirmPassword
      ) {
        setError("Todas as informações sao obrigatórias.");
        return;
      }
      // // Liogica de validação de password
      if (password.length < 4) {
        setError("A password deve ter pelo menos 4 caracteres");
        return;
      }
      if (password !== confirmPassword) {
        setError("As passwords não coincidem");
        return;
      }

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        //ver isto nos headers no postman na parte hiden
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          codigo_postal,
        }),
      });
      switch (response.status) {
        case 409:
          setError("E-mail já está a ser utilizado.");
          break;
        case 400:
          setError("Todas as informações são obrigatorias.");
          break;
        case 500:
          setError("Erro no servidor.");
          break;
        case 201:
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setCodigoPostal("");
          setError("");
          break;
        default:
          setError("");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleRegister}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img
            src="./logo.png"
            alt="Logo da Loja Online"
            className="mx-auto mb-4"
          />
        </Link>
        <Input
          name="Name"
          placeholder="Nome"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Input
          name="codigo_postal"
          placeholder="Código Postal"
          type="text"
          autoComplete="postal-code"
          required
          value={codigo_postal}
          onChange={(e) => setCodigoPostal(e.target.value)}
        />
        {error && <p className="text-sm font-bold text-red-500">{error}</p>}
        <div className="mt-2 flex w-full flex-col gap-2">
          <Button title="Registar" variant="default" type="submit" />
          <Link to="/login" className="w-full">
            <Button
              title="Já tenho uma conta"
              variant="outline"
              type="button"
            />
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Register;
