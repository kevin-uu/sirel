/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion"; // ✅ usado en JSX

/**
 * Tabla de usuarios con soporte para mostrar activos o inactivos.
 * @param {Array} usuarios - Lista de usuarios a mostrar
 * @param {Object} usuarioActual - Usuario logueado
 * @param {Function} onEditar - Acción para editar usuario
 * @param {Function} onEliminar - Acción para desactivar usuario
 * @param {Function} onReactivar - Acción para reactivar usuario inactivo
 * @param {boolean} mostrarInactivos - Modo de vista (activos/inactivos)
 */
    export default function UsuariosTable({
    usuarios,
    usuarioActual,
    onEditar,
    onEliminar,
    onReactivar,
    mostrarInactivos,
    }) {
    if (!usuarios.length)
        return (
        <p className="text-center text-gray-500 mt-10">
            No hay usuarios registrados.
        </p>
        );

    return (
        <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-xl overflow-hidden"
        >
        <table className="min-w-full border-collapse">
            <thead className="bg-blue-600 text-white">
            <tr>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Correo</th>
                <th className="py-3 px-4 text-left">Rol</th>
                <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((u, index) => (
                <motion.tr
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b ${
                    u.activo ? "hover:bg-gray-50" : "bg-gray-100"
                }`}
                >
                <td className="py-3 px-4 font-medium text-gray-800">{u.nombre}</td>
                <td className="py-3 px-4 text-gray-600">{u.correo}</td>
                <td className="py-3 px-4 text-gray-500">{u.rol_nombre}</td>
                <td className="py-3 px-4 text-center">
                    {/* 🔹 Acciones dinámicas según modo */}
                    {!mostrarInactivos ? (
                    <>
                        <button
                        onClick={() => onEditar(u)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >
                        ✏️
                        </button>
                        <button
                        onClick={() => onEliminar(u.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                        🚫
                        </button>
                    </>
                    ) : (
                    <button
                        onClick={() => onReactivar(u.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                        ♻️ Reactivar
                    </button>
                    )}
                </td>
                </motion.tr>
            ))}
            </tbody>
        </table>
        </motion.div>
    );
}



