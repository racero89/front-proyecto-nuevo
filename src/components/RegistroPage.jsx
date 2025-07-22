import { useEffect, useState } from "react";
import API from "../services/api";

export default function RegistroPage({ setAuth, isAdmin }) {
  const [registros, setRegistros] = useState([]);

  const getRegistros = async () => {
    try {
      const url = isAdmin ? "/registros/todos" : "/registros";
      const res = await API.get(url);
      setRegistros(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar registros");
    }
  };

  const entrada = async () => {
    try {
      await API.post("/registros/entrada");
      getRegistros();
    } catch (err) {
      console.error(err);
      alert("Error al registrar entrada");
    }
  };

  const salida = async () => {
    try {
      await API.post("/registros/salida");
      getRegistros();
    } catch (err) {
      console.error(err);
      alert("Error al registrar salida");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setAuth(false);
  };

  useEffect(() => {
    getRegistros();
  }, []);

  return (
    <div>
      <h2>Registra Hora</h2>

      {!isAdmin && (
        <>
          <button onClick={entrada}> Entrada</button>
          <button onClick={salida} style={{ marginLeft: "10px" }}>
            Salida
          </button>
        </>
      )}

      <button onClick={logout} style={{ marginLeft: "20px" }}>
        Cerrar sesión
      </button>

      <table border="1" style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            {isAdmin && <th>Empleado</th>}
            <th>Fecha</th>
            <th>Entradas / Salidas</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro._id}>
              {isAdmin && (
                <td>
                  {registro.userId?.nombre ||
                    registro.userId?.email ||
                    "Empleado"}
                </td>
              )}
              <td>{registro.fecha}</td>
              <td>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {registro.entradasSalidas?.map((item, idx) => (
                    <li key={idx}>
                      Entrada: {item.entrada || "-"} | Salida:{" "}
                      {item.salida || "-"}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
