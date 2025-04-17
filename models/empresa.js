// Importamos la conexión desde db.js
const pool = require('../db');

// Función para obtener empresa básica por ID
const getEmpresaById = async (id_empresa) => {
    try {
        const result = await pool.query('SELECT * FROM EMPRESAS WHERE id_empresa = $1', [id_empresa]);
        return result.rows[0]; // Retorna la primera fila (empresa)
    } catch (error) {
        throw error;
    }
};

// Función para obtener empresa con todos los detalles por ID
const getEmpresaDetalleById = async (id_empresa) => {
    const query = `
    SELECT 
      e.id_empresa,
      e.denominacion_social,
      e.nombre_comercial,
      e.nit,
      e.fecha_fundacion,
      e.fecha_cierre,

      -- Ubicación principal
      d.nombre_depto,
      c.nombre_ciudad,
      m.nombre_municipio,

      -- Tipo societario
      ts.nombre_tipsoc,
      ets.fecha_inicio as fecha_inicio_societario,
      ets.fecha_fin as fecha_fin_societario,

      -- Premios
      pr.entidad_otorgadora,
      pe.fecha_p as fecha_premio,

      -- Items o servicios
      it.nombre_item,
      ei.fecha_inicio_c as fecha_inicio_item,
      ei.fecha_fin_c as fecha_fin_item,

      -- Tamaño de empresa
      te.nombre_tamanio,
      et.fecha_inicio_et as fecha_inicio_tamanio,
      et.fecha_fin_et as fecha_fin_tamanio,
      et.num_empleados,

      -- Actividad o rubro
      act.nombre_actividad,
      ea.fecha_inicio as fecha_inicio_actividad,
      ea.fecha_fin as fecha_fin_actividad,

      -- Propietarios
      p.nombre as nombre_propietario,
      p.apellido_paterno,
      p.apellido_materno,
      hp.fecha_inicio as fecha_inicio_propietario,
      hp.fecha_fin as fecha_fin_propietario

    FROM EMPRESAS e

    -- Ubicación
    LEFT JOIN EMPRESAS_SEDES es ON es.id_empresa = e.id_empresa
    LEFT JOIN SEDES s ON s.id_ubicacion = es.id_ubicacion
    LEFT JOIN MUNICIPIOS m ON m.id_municipio = s.id_municipio
    LEFT JOIN CIUDADES c ON c.id_ciudad = m.id_ciudad
    LEFT JOIN DEPARTAMENTOS d ON d.id_departamento = c.id_departamento

    -- Tipo societario
    LEFT JOIN EMPRESAS_TIPOS_SOCIETARIOS ets ON ets.id_empresa = e.id_empresa
    LEFT JOIN TIPOS_SOCIETARIOS ts ON ts.id_tipsoc = ets.id_tipsoc

    -- Premios
    LEFT JOIN PREMIOS_EMPRESAS pe ON pe.id_empresa = e.id_empresa
    LEFT JOIN PREMIOS pr ON pr.id_premio = pe.id_premio

    -- Items / Servicios
    LEFT JOIN EMPRESAS_ITEMS ei ON ei.id_empresa = e.id_empresa
    LEFT JOIN ITEMS it ON it.id_item = ei.id_item

    -- Tamaño empresa
    LEFT JOIN EMPRESAS_TAMANIOS et ON et.id_empresa = e.id_empresa
    LEFT JOIN TAMANIOS_EMPRESAS te ON te.id_tamanio = et.id_tamanio

    -- Actividad / rubro
    LEFT JOIN EMPRESA_ACTIVIDAD ea ON ea.id_empresa = e.id_empresa
    LEFT JOIN ACTIVIDADES act ON act.id_actividad = ea.id_actividad

    -- Propietarios
    LEFT JOIN HISTORIAL_PROPIEDAD hp ON hp.id_empresa = e.id_empresa
    LEFT JOIN PROPIETARIOS p ON p.id_propietario = hp.id_propietario

    WHERE e.id_empresa = $1
  `;

    try {
        const result = await pool.query(query, [id_empresa]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Exportamos ambas funciones
module.exports = {
    getEmpresaById,
    getEmpresaDetalleById
};
