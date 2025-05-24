import express from 'express';
import {obtenerEmpresaPorId,obtenerTodasEmpresasResumen} from '../controllers/empresaController.js';

const router = express.Router();

/**
 * @swagger
 * /empresas/resumen:
 *   get:
 *     summary: Obtener listado de empresas en formato resumido
 *     description: Devuelve una lista de todas las empresas con su denominación social, nombre comercial y tamaño empresarial.
 *     tags:
 *       - Empresas
 *     responses:
 *       200:
 *         description: Listado obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   denominacion_social:
 *                     type: string
 *                   nombre_comercial:
 *                     type: string
 *                   nombre_tamanio:
 *                     type: string
 *       500:
 *         description: Error del servidor
 */

router.get('/empresas/resumen', obtenerTodasEmpresasResumen);
/**
 * @swagger
 * /empresa/{id}:
 *   get:
 *     summary: Obtener información detallada de una empresa por su ID
 *     description: Retorna los datos generales de la empresa y todas sus relaciones (tipo societario, actividad, rubros, operaciones internacionales, familia, hitos, ítems, tamaño, sedes y ubicación).
 *     tags:
 *       - Empresas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la empresa encontrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   denominacion_social:
 *                     type: string
 *                   nombre_comercial:
 *                     type: string
 *                   fecha_fundacion:
 *                     type: string
 *                     format: date
 *                   nit:
 *                     type: integer
 *                   vision:
 *                     type: string
 *                   mision:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   url:
 *                     type: string
 *                   direccion_web:
 *                     type: string
 *                   nombre_tipsoc:
 *                     type: string
 *                   fecha_inicio_societario:
 *                     type: string
 *                     format: date
 *                   fecha_fin_societario:
 *                     type: string
 *                     format: date
 *                     nullable: true
 *                   nombre_actividad:
 *                     type: string
 *                   descripcion_actividad:
 *                     type: string
 *                   nombre_rubro:
 *                     type: string
 *                   pais_operacion:
 *                     type: string
 *                   fecha_inicio_familia:
 *                     type: string
 *                     format: date
 *                   fecha_fin_familia:
 *                     type: string
 *                     format: date
 *                     nullable: true
 *                   descripcion_hito:
 *                     type: string
 *                   fecha_hito:
 *                     type: string
 *                     format: date
 *                     nullable: true
 *                   nombre_item:
 *                     type: string
 *                   descripcion_item:
 *                     type: string
 *                   nombre_tamanio:
 *                     type: string
 *                   nombre_edificio:
 *                     type: string
 *                   nombre_ciudad:
 *                     type: string
 *                   nombre_municipio:
 *                     type: string
 *                   nombre_depto:
 *                     type: string
 *       400:
 *         description: ID inválido (no numérico)
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.get('/empresa/:id', obtenerEmpresaPorId);

export default router;
