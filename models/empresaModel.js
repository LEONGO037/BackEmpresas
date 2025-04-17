
import db from '../db.js';

export const obtenerEmpresaPorId = async (id_empresa) => {
  const query = `
    SELECT 
      e.id_empresa, e.denominacion_social, e.nombre_comercial, e.nit, e.url,
      e.fecha_fundacion, e.fecha_cierre,

      -- Propietarios
      json_agg(DISTINCT jsonb_build_object(
        'nombre', p.nombre,
        'apellido_paterno', p.apellido_paterno,
        'apellido_materno', p.apellido_materno,
        'nacionalidad', p.nacionalidad
      )) AS propietarios,

      -- Societariado
      json_agg(DISTINCT jsonb_build_object(
        'nombre_tipsoc', ts.nombre_tipsoc,
        'fecha_inicio', ets.fecha_inicio,
        'fecha_fin', ets.fecha_fin
      )) AS tipos_societarios,

      -- Premios
      json_agg(DISTINCT jsonb_build_object(
        'entidad_otorgadora', pr.entidad_otorgadora,
        'descripcion', pr.descripcion,
        'tipo_premio', pr.tipo_premio,
        'url', pr.url,
        'fecha_p', pe.fecha_p
      )) AS premios,

      -- Rubros
      json_agg(DISTINCT jsonb_build_object(
        'nombre_rubro', r.nombre_rubro
      )) AS rubros,

      -- Actividades
      json_agg(DISTINCT jsonb_build_object(
        'nombre_actividad', a.nombre_actividad,
        'descripcion', a.descripcion
      )) AS actividades,

      -- Tamaño
      json_agg(DISTINCT jsonb_build_object(
        'nombre_tamanio', te.nombre_tamanio,
        'fecha_inicio', et.fecha_inicio_et,
        'fecha_fin', et.fecha_fin_et,
        'num_empleados', et.num_empleados
      )) AS tamanios,

      -- Sedes y Ubicación
      json_agg(DISTINCT jsonb_build_object(
        'departamento', d.nombre_depto,
        'ciudad', c.nombre_ciudad,
        'municipio', m.nombre_municipio,
        'nombre_edificio', s.nombre_edificio
      )) AS sedes

    FROM EMPRESAS e
    LEFT JOIN HISTORIAL_PROPIEDAD hp ON e.id_empresa = hp.id_empresa
    LEFT JOIN PROPIETARIOS p ON hp.id_propietario = p.id_propietario
    LEFT JOIN EMPRESAS_TIPOS_SOCIETARIOS ets ON e.id_empresa = ets.id_empresa
    LEFT JOIN TIPOS_SOCIETARIOS ts ON ets.id_tipsoc = ts.id_tipsoc
    LEFT JOIN PREMIOS_EMPRESAS pe ON e.id_empresa = pe.id_empresa
    LEFT JOIN PREMIOS pr ON pe.id_premio = pr.id_premio
    LEFT JOIN EMPRESA_ACTIVIDAD ea ON e.id_empresa = ea.id_empresa
    LEFT JOIN ACTIVIDADES a ON ea.id_actividad = a.id_actividad
    LEFT JOIN RUBROS_ACTIVIDADES ra ON a.id_actividad = ra.id_actividad
    LEFT JOIN RUBROS r ON ra.id_rublo = r.id_rublo
    LEFT JOIN EMPRESAS_TAMANIOS et ON e.id_empresa = et.id_empresa
    LEFT JOIN TAMANIOS_EMPRESAS te ON et.id_tamanio = te.id_tamanio
    LEFT JOIN EMPRESAS_SEDES es ON e.id_empresa = es.id_empresa
    LEFT JOIN SEDES s ON es.id_ubicacion = s.id_ubicacion
    LEFT JOIN MUNICIPIOS m ON s.id_municipio = m.id_municipio
    LEFT JOIN CIUDADES c ON m.id_ciudad = c.id_ciudad
    LEFT JOIN DEPARTAMENTOS d ON c.id_departamento = d.id_departamento

    WHERE e.id_empresa = $1
    GROUP BY e.id_empresa;
  `;

  const { rows } = await db.query(query, [id_empresa]);
  return rows[0];
};