
import express from 'express';
import { getEmpresaDetalle } from '../controllers/empresaController.js';

const router = express.Router();
/**
 * @swagger
 * /empresa/{id}:
 *   get:
 *     summary: Obtener detalle completo de una empresa
 *     tags:
 *       - Empresas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Detalle completo de la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_empresa:
 *                   type: integer
 *                 denominacion_social:
 *                   type: string
 *                 nombre_comercial:
 *                   type: string
 *                 nit:
 *                   type: integer
 *                 url:
 *                   type: string
 *                 fecha_fundacion:
 *                   type: string
 *                   format: date
 *                 fecha_cierre:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *                 propietarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                       nacionalidad:
 *                         type: string
 *                       apellido_materno:
 *                         type: string
 *                       apellido_paterno:
 *                         type: string
 *                 tipos_societarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_tipsoc:
 *                         type: string
 *                       fecha_inicio:
 *                         type: string
 *                         format: date
 *                       fecha_fin:
 *                         type: string
 *                         format: date
 *                 premios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       entidad_otorgadora:
 *                         type: string
 *                       descripcion:
 *                         type: string
 *                       tipo_premio:
 *                         type: boolean
 *                       url:
 *                         type: string
 *                       fecha_p:
 *                         type: string
 *                         format: date
 *                 rubros:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_rubro:
 *                         type: string
 *                 actividades:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_actividad:
 *                         type: string
 *                       descripcion:
 *                         type: string
 *                 tamanios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_tamanio:
 *                         type: string
 *                       fecha_inicio:
 *                         type: string
 *                         format: date
 *                       fecha_fin:
 *                         type: string
 *                         format: date
 *                       num_empleados:
 *                         type: integer
 *                 sedes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ciudad:
 *                         type: string
 *                       municipio:
 *                         type: string
 *                       departamento:
 *                         type: string
 *                       nombre_edificio:
 *                         type: string
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.get('/empresa/:id', getEmpresaDetalle);

export default router;

