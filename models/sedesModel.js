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
    SELECT m.id_municipio, nombre_municipio, nombre_ciudad, nombre_depto
    FROM municipios m, ciudades c, departamentos d
    WHERE m.id_ciudad = c.id_ciudad AND c.id_departamento = d.id_departamento;
  `;

  const { rows } = await pool.query(query);
  return rows;
};

const newSede = async (id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud) => {
  const query = `
    INSERT INTO sedes(id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id_ubicacion;
  `;

  const values = [id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud];
  const id_ubicacion = await pool.query(query, values);
  return id_ubicacion.rows[0];
};

const newSedeEmpresa = async (id_empresa, id_ubicacion, fecha_inicio, fecha_fin, tipo) => {
  const query = `
  INSERT INTO empresas_sedes(id_empresa, id_ubicacion, fecha_inicio, fecha_fin, tipo)
  VALUES ($1, $2, $3, $4, $5);
`;

  const values = [id_empresa, id_ubicacion, fecha_inicio, fecha_fin, tipo];
  await pool.query(query, values);
  return 'Sede registrada exitosamente';
};

const verifySede = async (id_empresa, id_municipio, zona, calle, referencias, nombre_edificio) => {
  const query = `
  SELECT EXISTS(
    SELECT 1 FROM empresas_sedes e, sedes s 
    WHERE e.id_empresa = $1  AND e.id_ubicacion = s.id_ubicacion
    AND id_municipio = $2 AND zona = $3 AND calle = $4 AND referencias = $5 AND nombre_edificio = $6
  ) AS row_exists;
`;

  const values = [id_empresa, id_municipio, zona, calle, referencias, nombre_edificio];
  const row_exists = await pool.query(query, values);
  return row_exists.rows[0].row_exists;
};

export default {
  obtenerTodasSedesById,
  obtenerMunCiuDeptos,
  newSede,
  newSedeEmpresa,
  verifySede
};