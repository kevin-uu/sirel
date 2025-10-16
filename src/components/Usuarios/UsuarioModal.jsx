/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { agregarUsuario, actualizarUsuario as editarUsuario } from "../../api/usuarios";

export default function UsuarioModal({ usuario, onClose, onGuardado }) {
    const [nombre, setNombre] = useState(usuario?.nombre || "");
    const [correo, setCorreo] = useState(usuario?.correo || "");
    const [rol, setRol] = useState(usuario?.rol_id || 1); // ✅ valor por defecto: Cajero

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !correo || !rol) {
            alert("Completa todos los campos, incluido el rol");
            return;
        }

        const nuevoUsuario = { nombre, correo, rol_id: parseInt(rol) };

        const data = usuario
            ? await editarUsuario({ id: usuario.id, ...nuevoUsuario })
            : await agregarUsuario(nuevoUsuario);

        alert(data.message);
        if (data.success) {
            onGuardado();
            onClose();
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
        >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {usuario ? "✏️ Editar Usuario" : "➕ Nuevo Usuario"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />

                {/* ✅ Lista desplegable de roles */}
                <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                    <option value="1">💰 Cajero</option>
                    <option value="2">👨‍💼 Supervisor</option>
                    <option value="3">👑 Administrador</option>
                    <option value="4">🧭 Gerente</option>
                </select>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
