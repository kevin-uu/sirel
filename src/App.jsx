// src/App.jsx
import React, { useState } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout/Layout";
import UsuariosPage from "./components/Usuarios/UsuariosPage";

export default function App() {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  const [paginaActual, setPaginaActual] = useState("dashboard");

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  // ⚙️ Control de permisos según rol
  // Control de permisos según rol
const tieneAcceso = (pagina) => {
  if (!usuario) return false;
  return usuario.permisos?.includes(pagina);
};


  // 🔄 Renderiza el contenido correcto
  const renderPaginaActual = () => {
    if (!tieneAcceso(paginaActual)) {
      return (
        <div className="flex items-center justify-center min-h-screen text-gray-600">
          🚫 No tienes permisos para acceder a esta sección.
        </div>
      );
    }

    switch (paginaActual) {
      case "dashboard":
        return <Dashboard usuario={usuario} />;
      case "usuarios":
        return <UsuariosPage />;
      default:
        return <Dashboard usuario={usuario} />;
    }
  };

  if (!usuario) {
    return (
      <Login
        onLogin={(user) => {
          setUsuario(user);
          setPaginaActual("dashboard");
        }}
      />
    );
  }

  return (
    <Layout
      usuario={usuario}
      onCerrarSesion={cerrarSesion}
      onPaginaCambio={setPaginaActual}
      paginaActual={paginaActual}
    >
      {renderPaginaActual()}
    </Layout>
  );
}


