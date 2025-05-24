import express from 'express';
import usuarioController from '../controllers/usuarioController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Autenticación
 *    description: Operaciones de autenticación y registro de usuarios
 */

/**
 * @swagger
 * /usuarios/login:
 *  post:
 *    tags:
 *      - Autenticación
 *    summary: Inicia sesión con usuario y contraseña
 *    description: Verifica las credenciales del usuario y devuelve la información correspondiente
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - usuario
 *              - contrasenia
 *            properties:
 *              usuario:
 *                type: string
 *                example: "colaborador1"
 *              contrasenia:
 *                type: string
 *                example: "Password123!"
 *    responses:
 *      200:
 *        description: Login exitoso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                mensaje:
 *                  type: string
 *                encontrado:
 *                  type: integer
 *                usuario:
 *                  type: object
 *                  properties:
 *                    id_usuario:
 *                      type: integer
 *                    id_rol:
 *                      type: integer
 *                    usuario:
 *                      type: string
 *      400:
 *        description: Credenciales incompletas
 *      401:
 *        description: Credenciales inválidas
 *      500:
 *        description: Error interno del servidor
 */

/**
 * @swagger
 * /usuarios/registro:
 *  post:
 *    tags:
 *      - Autenticación
 *    summary: Registra un nuevo usuario colaborador
 *    description: Crea un nuevo usuario con rol de colaborador (rol fijo 2)
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - usuario
 *              - contrasenia
 *              - id_usuario
 *            properties:
 *              usuario:
 *                type: string
 *                example: "nuevoUsuario"
 *              contrasenia:
 *                type: string
 *                example: "Password123!"
 *              id_usuario:
 *                type: integer
 *                example: 1
 *    responses:
 *      201:
 *        description: Colaborador registrado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                usuario:
 *                  type: object
 *                  properties:
 *                    id_usuario:
 *                      type: integer
 *                    id_rol:
 *                      type: integer
 *                    usuario:
 *                      type: string
 *      400:
 *        description: |
 *          Error en la solicitud:
 *          - Campos requeridos faltantes
 *          - Nombre de usuario ya existe
 *      500:
 *        description: Error interno del servidor
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Error al crear colaborador"
 */
router.post('/login', usuarioController.loginUsuario);
router.post('/registro', usuarioController.createColaborador);

export default router;