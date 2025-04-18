import pool from '../db.js'; 

const obtenerTodasSedesById = async (id_empresa) => {
  const query = `
    SELECT nombre_edificio, zona, calle, referencias, nombre_municipio, nombre_ciudad, nombre_depto, fecha_inicio, fecha_fin
    FROM empresas_sedes es, sedes s, municipios m, ciudades c, departamentos d
    WHERE es.id_empresa = $1 AND es.id_ubicacion = s.id_ubicacion AND s.id_municipio = m.id_municipio AND m.id_ciudad = c.id_ciudad AND c.id_departamento = d.id_departamento
    ORDER BY s.id_ubicacion asc;
  `;

  const { rows } = await pool.query(query, [id_empresa]);
  return rows;
};

const obtenerMunCiuDeptos = async () => {
  const query = `
    SELECT nombre_municipio, nombre_ciudad, nombre_depto
    FROM municipios m, ciudades c, departamentos d
    WHERE m.id_ciudad = c.id_ciudad AND c.id_departamento = d.id_departamento;
  `;

  const { rows } = await pool.query(query);
  return rows;
};

export default {
  obtenerTodasSedesById,
  obtenerMunCiuDeptos
};