/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import UsuariosTable from "./UsuariosTable";
import UsuarioModal from "./UsuarioModal";
import {
    obtenerUsuarios,
    obtenerUsuariosInactivos,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    reactivarUsuario,
    } from "../../api/usuarios";
    import { motion, AnimatePresence } from "framer-motion";

    export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [inactivos, setInactivos] = useState([]);
    const [mostrarInactivos, setMostrarInactivos] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        cargarUsuarios();
    }, [cargarUsuarios]);

    const cargarUsuarios = useCallback (async () => {
        if (mostrarInactivos) {
        const res = await obtenerUsuariosInactivos();
        if (res.success) setInactivos(res.usuarios);
        } else {
        const res = await obtenerUsuarios();
        if (res.success) setUsuarios(res.usuarios);
        }
    },[mostrarInactivos] );

    const handleNuevo = () => {
        setUsuarioEditando(null);
        setModalAbierto(true);
    };

    const handleEditar = (usuario) => {
        setUsuarioEditando(usuario);
        setModalAbierto(true);
    };

    const handleEliminar = async (id) => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioActual) return alert("Error: sesión expirada");

    if (window.confirm("¿Seguro que deseas inactivar este usuario?")) {
        const res = await eliminarUsuario(id, usuarioActual);
        alert(res.message);

        // ✅ Si fue exitoso, verificamos si se eliminó al usuario logueado
        if (res.success) {
            if (usuarioActual.id === id) {
                alert("Tu cuenta ha sido desactivada. Se cerrará la sesión.");
                localStorage.removeItem("usuario");
                window.location.reload(); // 🔄 redirige al login automáticamente
            } else {
                cargarUsuarios(); // 🔁 refresca la tabla
            }
        }
    }
};

    const handleReactivar = async (id) => {
        if (window.confirm("¿Deseas reactivar este usuario?")) {
        const res = await reactivarUsuario(id);
        alert(res.message);
        if (res.success) cargarUsuarios();
        }
    };

    const usuariosFiltrados = (mostrarInactivos ? inactivos : usuarios).filter((u) =>
        u.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
        {/* 🔹 Encabezado */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">👥 Gestión de Usuarios</h1>
            <button
            onClick={handleNuevo}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
            ➕ Nuevo Usuario
            </button>
        </div>

        {/* 🧭 Pestañas */}
        <div className="flex space-x-2 mb-6">
            <button
            onClick={() => {
                setMostrarInactivos(false);
                cargarUsuarios();
            }}
            className={`px-4 py-2 rounded-lg font-semibold ${
                !mostrarInactivos
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            >
            🟢 Activos
            </button>
            <button
            onClick={() => {
                setMostrarInactivos(true);
                cargarUsuarios();
            }}
            className={`px-4 py-2 rounded-lg font-semibold ${
                mostrarInactivos
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            >
            ⚪ Inactivos
            </button>
        </div>

        {/* 🔍 Buscador */}
        <input
            type="text"
            placeholder={`Buscar usuario ${mostrarInactivos ? "inactivo" : "activo"}...`}
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* 📋 Tabla */}
        <UsuariosTable
            usuarios={usuariosFiltrados}
            onEditar={!mostrarInactivos ? handleEditar : undefined}
            onEliminar={!mostrarInactivos ? handleEliminar : undefined}
            onReactivar={mostrarInactivos ? handleReactivar : undefined}
            mostrarInactivos={mostrarInactivos}
        />

        {/* 💫 Modal */}
        <AnimatePresence>
            {modalAbierto && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            >
                <UsuarioModal
                usuario={usuarioEditando}
                onClose={() => setModalAbierto(false)}
                onGuardado={cargarUsuarios}
                />
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
}
