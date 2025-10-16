// API para obtener datos del dashboard
const API_URL = "http://localhost/sirem_api/index.php"; 

/**
 * Obtiene las estadísticas generales del sistema
 * @returns {Promise} Promesa con los datos del dashboard
 */

export async function obtenerEstadisticas() {
    try {
        const res = await fetch(`${API_URL}?dashboard=estadisticas`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        return { success: 0, message: "Error de conexión", data:{
            totalUsuarios: 0, totalClientes:0, transaccionesHoy: 0,
            montoTotalHoy: 0,usuariosActivos: 0, transaccionesMes: 0


        } };
    }       
}

/**
 * Obtiene la actividad reciente del sistema
 * @returns {Promise} Promesa con la actividad reciente
 */

export async function obtenerActividadReciente() {
    try {
        const res = await fetch(`${API_URL}?dashboard=actividad`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener actividad reciente:", error);
        return { success: 0, message: "Error de conexión", data: [] };
    }   
}

/**
 * Obtiene datos para gráficos (usuarios por rol, transacciones por mes)
 * @returns {Promise} Promesa con datos para gráficos
 */
export async function obtenerDatosGraficos() {
    try {
        const res = await fetch(`${API_URL}?dashboard=graficos`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener datos para gráficos:", error);
        return { success: 0, message: "Error de conexión", data: {
            usuariosPorRol: [], transaccionesPorMes: []
        } };
    }
}