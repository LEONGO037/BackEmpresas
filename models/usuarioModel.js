// models/usuarioModel.js
import pool from '../db.js'; // Asegúrate de que tu archivo db.js también use `export default`

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario.
 *         usuario:
 *           type: string
 *           description: El nombre de usuario.
 *         contrasenia:
 *           type: string
 *           description: La contraseña del usuario.
 */

/**
 * @swagger
 * definitions:
 *   buscarUsuario:
 *     type: object
 *     properties:
 *       usuario:
 *         type: string
 *       contrasenia:
 *         type: string
 */
const buscarUsuario = async (usuario, contrasenia) => {
  const query = `
    SELECT * FROM USUARIOS
    WHERE usuario = $1 AND contrasenia = $2
    LIMIT 1
  `;
  const values = [usuario, contrasenia];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error en buscarUsuario:', error);
    throw new Error('Error al consultar la base de datos');
  }
};

export default {
  buscarUsuario,
};
