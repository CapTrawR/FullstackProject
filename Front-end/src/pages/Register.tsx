import { useState, type SubmitEventHandler } from "react";
import Input from "../components/Input.tsx";
import { Link } from "react-router";
import Button from "../components/Button.tsx";

function Register() {
  const [passwordError, setPasswordError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleRegister: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // Liogica de validação de password
    if (password.length < 8) {
      setPasswordError("A password deve ter pelo menos 8 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("As passwords não coincidem");
      return;
    }

    setPasswordError("");

    console.log({ name, email, password, confirmPassword, postalCode });

    console.log("Handle Register a funcionar");
  };

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleRegister}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to="/">
          <img src="./logo.png" alt="Logo da Loja Online" className="mb-4" />
        </Link>
        <Input
          name="Name"
          placeholder="Nome"
          type="text"
          autoComplete="name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )}
        <Input
          name="PostalCode"
          placeholder="Código Postal"
          type="text"
          autoComplete="postal-code"
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <Button title="Registar" variant="default" type="submit" />
        <Link to="/login" className="w-full">
        <Button title="Já tenho uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
}

export default Register;
