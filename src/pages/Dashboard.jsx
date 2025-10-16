import React, { useEffect, useState } from "react";
import { obtenerEstadisticas, obtenerActividadReciente, obtenerDatosGraficos } from "../api/dashboard";
import StatsCards from "../components/Dashboard/StatsCards"; // ← CORREGIDO
import RecentActivity from "../components/Dashboard/RecentActivity"; // ← CORREGIDO
import BarChart from "../components/Dashboard/Charts/BarChart"; // ← CORREGIDO
import PieChart from "../components/Dashboard/Charts/PieChart"; // ← CORREGIDO

/**
 * Página principal del Dashboard con resumen del sistema
 * Muestra estadísticas, gráficos y actividad reciente
 */

export default function Dashboard() {
    // Estados para manejar los datos del dashboard
    const [estadisticas, setEstadisticas] = useState(null);
    const [actividad, setActividad] = useState([]);
    const [datosGraficos, setDatosGraficos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Efecto para cargar todos los datos del dashboard al montar el componente
     */
    useEffect(() => {
        cargarDashboard();
    }, []);

    /**
     * Función principal para cargar todos los datos del dashboard
     * Maneja loading states y errores
     */
    const cargarDashboard = async () => {
        try {
        setCargando(true);
        setError(null);

        // Ejecutar todas las peticiones en paralelo para mejor performance
        const [estadisticasRes, actividadRes, graficosRes] = await Promise.all([
            obtenerEstadisticas(),
            obtenerActividadReciente(),
            obtenerDatosGraficos()
        ]);

        // Procesar respuestas
        if (estadisticasRes.success) {
            setEstadisticas(estadisticasRes.data);
        }

        if (actividadRes.success) {
            setActividad(actividadRes.data);
        }

        if (graficosRes.success) {
            setDatosGraficos(graficosRes.data);
        }

        } catch (err) {
        console.error('Error cargando dashboard:', err);
        setError('Error al cargar los datos del dashboard');
        } finally {
        setCargando(false);
        }
    };

    /**
     * Renderizar estado de carga
     */
    if (cargando) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando dashboard...</p>
            </div>
        </div>
        );
    }

    /**
     * Renderizar estado de error
     */
    if (error) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
                onClick={cargarDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
                Reintentar
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado del Dashboard */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido al Dashboard
            </h1>
            <p className="text-gray-600">
            Resumen general y métricas del sistema SIREL
            </p>
        </div>

        {/* Tarjetas de Estadísticas */}
        <StatsCards estadisticas={estadisticas} />

        {/* Grid de Gráficos y Actividad */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de Barras - Ocupa 2 columnas en desktop */}
            <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Transacciones Mensuales
                </h3>
                <div className="h-80">
                <BarChart datos={datosGraficos?.transaccionesMensuales} />
                </div>
            </div>
            </div>

            {/* Gráfico Circular y Actividad Reciente - Ocupa 1 columna */}
            <div className="space-y-6">
            {/* Gráfico Circular */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Usuarios por Rol
                </h3>
                <div className="h-64">
                <PieChart datos={datosGraficos?.usuariosPorRol} />
                </div>
            </div>

            {/* Actividad Reciente */}
            <RecentActivity actividad={actividad} />
            </div>
        </div>

        {/* Botón de actualizar */}
        <div className="flex justify-center pt-6">
            <button 
            onClick={cargarDashboard}
            className="flex items-center space-x-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-sm"
            >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Actualizar Datos</span>
            </button>
        </div>
        </div>
    );
}