import React from "react";

/**
 * Header de la aplicación con menú de usuario y notificaciones.
 * Incluye la detección de roles actualizada (1=Cajero, 2=Supervisor, 3=Administrador, 4=Gerente)
 */
export default function Header({ usuario, onCerrarSesion, onToggleSidebar }) {
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);

    // 🔹 Determina el nombre legible del rol según el ID
    const obtenerRolNombre = (rol_id) => {
        switch (rol_id) {
        case 4:
            return "Gerente";
        case 3:
            return "Administrador";
        case 2:
            return "Supervisor";
        case 1:
            return "Cajero";
        default:
            return "Desconocido";
        }
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-6 py-4">
            {/* ===== Botón menú móvil y título ===== */}
            <div className="flex items-center space-x-4">
            <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
                </svg>
            </button>

            {/* Título principal del dashboard */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 text-sm">
                Resumen general del sistema
                </p>
            </div>
            </div>

            {/* ===== Menú de usuario y notificaciones ===== */}
            <div className="flex items-center space-x-4">
            {/* 🔔 Botón de notificaciones */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 11.5 2.25v4.5a6 6 0 0 1-6 6h-1.5v2.25L9 15H7.5a6 6 0 0 1-6-6v-4.5a6 6 0 0 1 6-6h3z"
                />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
                </span>
            </button>

            {/* 👤 Menú de usuario */}
            <div className="relative">
                <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                {/* Inicial del usuario */}
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {usuario?.nombre?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {/* Nombre y rol */}
                <div className="text-left hidden md:block">
                    <p className="text-sm font-medium text-gray-900">
                    {usuario?.nombre || "Usuario"}
                    </p>
                    <p className="text-xs text-gray-600">
                    {obtenerRolNombre(usuario?.rol_id)}
                    </p>
                </div>

                {/* Flecha del dropdown */}
                <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                    />
                </svg>
                </button>

                {/* ===== Dropdown menu ===== */}
                {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <a
                    href="#perfil"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                    <span>👤</span>
                    <span>Mi Perfil</span>
                    </a>
                    <a
                    href="#configuracion"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                    <span>⚙️</span>
                    <span>Configuración</span>
                    </a>

                    <div className="border-t border-gray-200 my-1"></div>

                    {/* 🔴 Botón de cierre de sesión */}
                    <button
                    onClick={onCerrarSesion}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                    <span>🚪</span>
                    <span>Cerrar Sesión</span>
                    </button>
                </div>
                )}
            </div>
            </div>
        </div>
        </header>
    );
}

