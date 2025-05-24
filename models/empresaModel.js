// ✅ MODELO - models/empresaModel.js 
import db from '../db.js';

export const obtenerTodasEmpresasResumen = async () => {
  const query = `
    SELECT id_empresa, denominacion_social, url
    FROM EMPRESAS;
  `;

  const { rows } = await db.query(query);
  return rows;
};

import pool from '../db.js';

export async function getEmpresaPorId(id) {
  const query = `
    SELECT 
      e.denominacion_social,
      e.nombre_comercial,
      e.fecha_fundacion,
      e.nit,
      e.vision,
      e.mision,
      e.descripcion,
      e.url,
      e.direccion_web,
      ts.nombre_tipsoc,
      ets.fecha_inicio AS fecha_inicio_societario,
      ets.fecha_fin AS fecha_fin_societario,
      a.nombre_actividad,
      a.descripcion AS descripcion_actividad,
      r.nombre_rubro,
      oi.pais AS pais_operacion,
      f.fecha_inicio AS fecha_inicio_familia,
      f.fecha_fin AS fecha_fin_familia,
      h.descripcion AS descripcion_hito,
      h.fecha_h AS fecha_hito,
      i.nombre_item,
      i.descripcion AS descripcion_item,
      te.nombre_tamanio,
      s.nombre_edificio,
      c.nombre_ciudad,
      m.nombre_municipio,
      d.nombre_depto
    FROM EMPRESAS e
    LEFT JOIN EMPRESAS_TIPOS_SOCIETARIOS ets ON ets.id_empresa = e.id_empresa
    LEFT JOIN TIPOS_SOCIETARIOS ts ON ts.id_tipsoc = ets.id_tipsoc
    LEFT JOIN ACTIVIDADES a ON a.id_actividad = e.id_actividad
    LEFT JOIN RUBROS_EMPRESAS re ON re.id_empresa = e.id_empresa
    LEFT JOIN RUBROS r ON r.id_rubro = re.id_rubro
    LEFT JOIN OPERACIONES_INTERNACIONALES oi ON oi.id_empresa = e.id_empresa
    LEFT JOIN FAMILIA f ON f.id_empresa = e.id_empresa
    LEFT JOIN HITOS h ON h.id_empresa = e.id_empresa
    LEFT JOIN EMPRESAS_ITEMS ei ON ei.id_empresa = e.id_empresa
    LEFT JOIN ITEMS i ON i.id_item = ei.id_item
    LEFT JOIN TAMANIOS_EMPRESAS te ON te.id_tamanio = e.id_tamanio
    LEFT JOIN SEDES s ON s.id_empresa = e.id_empresa
    LEFT JOIN MUNICIPIOS m ON m.id_municipio = s.id_municipio
    LEFT JOIN CIUDADES c ON c.id_ciudad = m.id_ciudad
    LEFT JOIN DEPARTAMENTOS d ON d.id_departamento = c.id_departamento
    WHERE e.id_empresa = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows;
}
