// controllers/usuarioController.js
import usuarioModel from '../models/usuarioModel.js';

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión con usuario y contraseña.
 *     description: Verifica las credenciales del usuario y devuelve la información correspondiente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: El nombre de usuario del usuario.
 *               contrasenia:
 *                 type: string
 *                 description: La contraseña del usuario.
 *             required:
 *               - usuario
 *               - contrasenia
 *     responses:
 *       200:
 *         description: Usuario encontrado y login exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje indicando que el usuario fue encontrado.
 *                 encontrado:
 *                   type: integer
 *                   description: Indica si el usuario fue encontrado (1 para sí, 0 para no).
 *                 usuario:
 *                   type: object
 *                   description: Información del usuario encontrado.
 *       400:
 *         description: Se requiere el nombre de usuario y la contraseña.
 *       404:
 *         description: El usuario no fue encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
const loginUsuario = async (req, res) => {
  const { usuario, contrasenia } = req.body;

  if (!usuario || !contrasenia) {
    return res.status(400).json({
      mensaje: 'Debe proporcionar usuario y contraseña',
      encontrado: 0,
    });
  }

  try {
    const usuarioEncontrado = await usuarioModel.buscarUsuario(usuario, contrasenia);
    
    if (usuarioEncontrado) {
      return res.status(200).json({
        mensaje: 'Usuario encontrado',
        encontrado: 1,
        usuario: usuarioEncontrado, 
      });
    } else {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado',
        encontrado: 0,
      });
    }
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    return res.status(500).json({
      mensaje: 'Error del servidor',
      encontrado: 0,
    });
  }
};

export default {
  loginUsuario,
};
