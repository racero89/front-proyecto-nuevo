import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import RegistroPage from "./components/RegistroPage";
import AdminRegistrosPage from "./components/AdminRegistrosPage";

export default function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(admin);
  }, [auth]);

  if (!auth) {
    return showLogin ? (
      <>
        <LoginForm setAuth={setAuth} />
        <button onClick={() => setShowLogin(false)}>
          ¿No tienes cuenta? Regístrate
        </button>
      </>
    ) : (
      <>
        <RegisterForm setShowLogin={setShowLogin} />
        <button onClick={() => setShowLogin(true)}>
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </>
    );
  }

  return isAdmin ? (
    <AdminRegistrosPage setAuth={setAuth} />
  ) : (
    <RegistroPage setAuth={setAuth} />
  );
}
