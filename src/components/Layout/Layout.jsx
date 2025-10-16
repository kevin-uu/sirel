// src/components/Layout/Layout.jsx
import React from "react";
import Header from "./Header";

/**
 * Layout principal de la aplicación
 * Controla la estructura visual y navegación lateral.
 * Ahora incluye control de visibilidad basado en roles.
 */

export default function Layout({ children, usuario, onCerrarSesion, onPaginaCambio, paginaActual }) {
    const [sidebarAbierto, setSidebarAbierto] = React.useState(false);

    // 🔹 Determina si una opción de menú está activa
    const isActive = (page) =>
        paginaActual === page
        ? "bg-blue-700 text-white"
        : "text-blue-200 hover:bg-blue-700";

    // 🔹 Determina el rol del usuario (para controlar permisos)
    const esGerente = usuario?.rol_id === 4; 
    const esAdmin = usuario?.rol_id === 3;
    const esSupervisor = usuario?.rol_id === 2;
    const esCajero = usuario?.rol_id === 1;

    return (
        <div className="flex h-screen bg-gray-50">
        {/* Fondo oscuro cuando el sidebar está abierto en móvil */}
        {sidebarAbierto && (
            <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={() => setSidebarAbierto(false)}
            />
        )}

        {/* ===== SIDEBAR ===== */}
        <div
            className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-800 to-blue-900 transform transition-transform duration-300 ease-in-out ${
            sidebarAbierto ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
        >
            {/* Logo y nombre */}
            <div className="p-6 border-b border-blue-700">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl font-bold">💸</span>
                </div>
                <div>
                <h1 className="text-xl font-bold text-white">SIREL</h1>
                <p className="text-blue-200 text-xs">Sistema de Remesas</p>
                </div>
            </div>
            </div>

            {/* ===== Navegación ===== */}
            <nav className="mt-8 px-4 space-y-2">
            {/* Dashboard visible para todos */}
            <button
                onClick={() => onPaginaCambio("dashboard")}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl font-medium transition ${isActive("dashboard")}`}
            >
                <span>📊</span>
                <span>Dashboard</span>
            </button>

            {/* 👥 Usuarios → Solo Administradores y Gerente*/}
            {(esAdmin || esGerente) && (
                <button
                onClick={() => onPaginaCambio("usuarios")}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl font-medium transition ${isActive("usuarios")}`}
                >
                <span>👥</span>
                <span>Usuarios</span>
                </button>
            )}

            {/* 💳 Transacciones → Supervisores y Cajeros */}
            {(esSupervisor || esCajero || esAdmin || esGerente) && (
                <button
                disabled
                className="flex items-center space-x-3 w-full px-4 py-3 text-blue-300 hover:bg-blue-700 rounded-xl transition-colors duration-200"
                >
                <span>💳</span>
                <span>Transacciones</span>
                </button>
            )}

            {/* 📈 Reportes → Solo Supervisores y Administradores */}
            {(esSupervisor || esAdmin || esGerente) && (
                <button
                disabled
                className="flex items-center space-x-3 w-full px-4 py-3 text-blue-300 hover:bg-blue-700 rounded-xl transition-colors duration-200"
                >
                <span>📈</span>
                <span>Reportes</span>
                </button>
            )}
            </nav>

            {/* ===== Información del usuario ===== */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                {usuario?.nombre?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{usuario?.nombre}</p>
                <p className="text-blue-300 text-xs truncate">
                    {usuario?.rol_id === 4
                    ? "Gerente"
                    : usuario?.rol_id === 3
                    ? "Administrador"
                    : usuario?.rol_id === 2
                    ? "Supervisor"
                    : usuario?.rol_id === 1
                    ? "Cajero"
                    : "Desconocido"}
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <div className="flex-1 flex flex-col overflow-hidden">
            <Header
            usuario={usuario}
            onCerrarSesion={onCerrarSesion}
            onToggleSidebar={() => setSidebarAbierto(!sidebarAbierto)}
            />
            <main className="flex-1 overflow-auto bg-gray-100 p-6">{children}</main>
        </div>
        </div>
    );
}
