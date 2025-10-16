import React, { useState } from "react";

const API_URL = "http://localhost/sirem_api/index.php?endpoint=auth";

export default function Login({ onLogin }) {
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState("");

    const manejarLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, clave }),
    });

    const data = await res.json();

    if (data.success) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        onLogin(data.usuario);
    } else {
        setError(data.message);
    }
    };

    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">🔐 Iniciar Sesión</h2>
        <form onSubmit={manejarLogin} className="flex flex-col space-y-4">
            <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
            Entrar
            </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        </div>
    </div>
    );
}
