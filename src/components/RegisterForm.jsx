import { useState } from "react";
import API from "../services/api";

export default function RegisterForm({ setShowLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", { name, email, password });
      alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
      setShowLogin(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error al registrar usuario");
    }
  };

  return (
    <form onSubmit={register}>
      <h2>Registro</h2>
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
