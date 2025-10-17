// src/api/usuarios.js

// src/api/usuarios.js

//http://localhost/sirem_api/index.php?endpoint=usuarios
// src/api/usuarios.js
// 📁 src/api/usuarios.js
const API_URL = "http://localhost/sirem_api/index.php";

/**
 * 🔹 Obtener lista de usuarios activos
 */
export async function obtenerUsuarios() {
    try {
        const res = await fetch(`${API_URL}?endpoint=usuarios`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return { success: 0, message: "Error de conexión" };
    }
}

/**
 * 🔹 Obtener lista de usuarios inactivos
 */
export async function obtenerUsuariosInactivos() {
    try {
        const res = await fetch(`${API_URL}?endpoint=usuarios&inactivos=1`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener usuarios inactivos:", error);
        return { success: 0, message: "Error de conexión" };
    }
}

/**
 * ➕ Agregar nuevo usuario
 */
export async function agregarUsuario(usuario) {
    try {
        const res = await fetch(`${API_URL}?endpoint=usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
        });
        return await res.json();
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        return { success: 0, message: "Error de conexión" };
    }
    }

    /**
     * ✏️ Actualizar usuario existente
     */
    export async function actualizarUsuario(usuario) {
    try {
        const res = await fetch(`${API_URL}?endpoint=usuarios`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
        });
        return await res.json();
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return { success: 0, message: "Error de conexión" };
    }
    }

    /**
     * ❌ Inactivar (desactivar) usuario
     */
    export async function eliminarUsuario(id, usuarioActual) {
    try {
        const token = btoa(
        JSON.stringify({
            id: usuarioActual.id,
            rol_id: usuarioActual.rol_id,
        })
        );

        const res = await fetch(`${API_URL}?endpoint=usuarios`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ id }),
        });

        return await res.json();
    } catch (error) {
        console.error("Error al inactivar usuario:", error);
        return { success: 0, message: "Error de conexión" };
    }
    }

    /**
     * ♻️ Reactivar usuario inactivo
     */
    export async function reactivarUsuario(id) {
    try {
        const res = await fetch(`${API_URL}?endpoint=usuarios&accion=reactivar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        return await res.json();
    } catch (error) {
        console.error("Error al reactivar usuario:", error);
        return { success: 0, message: "Error de conexión" };
    }
}
