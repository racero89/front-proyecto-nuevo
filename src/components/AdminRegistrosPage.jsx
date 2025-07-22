import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminRegistrosPage({ setAuth }) {
  const [registros, setRegistros] = useState([]);

  const fetchTodosRegistros = async () => {
    try {
      const res = await API.get("/registros/todos");
      setRegistros(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al obtener los registros");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    fetchTodosRegistros();
  }, []);

  return (
    <div>
      <h2>Registros de todos los empleados</h2>
      <button onClick={logout}>Cerrar sesión</button>

      <table border="1" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Entrada</th>
            <th>Salida</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr key={r._id}>
              <td>{r.userId?.nombre || "Sin nombre"}</td>
              <td>{r.userId?.email || "Sin email"}</td>
              <td>{r.fecha}</td>
              <td>{r.horaEntrada}</td>
              <td>{r.horaSalida || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
