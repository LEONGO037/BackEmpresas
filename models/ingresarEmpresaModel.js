import pool from '../db.js';

const insertarEmpresa = async (empresaData) => {
  const query = `
    INSERT INTO EMPRESAS (
      denominacion_social,
      nombre_comercial,
      fecha_fundacion,
      nit,
      vision,
      mision,
      descripcion,
      url,
      direccion_web,
      id_actividad,
      id_tamanio
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id_empresa
  `;

  const values = [
    empresaData.denominacion_social,
    empresaData.nombre_comercial,
    empresaData.fecha_fundacion,
    empresaData.nit,
    empresaData.vision,
    empresaData.mision,
    empresaData.descripcion,
    empresaData.url,
    empresaData.direccion_web,
    empresaData.id_actividad,
    empresaData.id_tamanio
  ];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0].id_empresa;
  } catch (error) {
    console.error('Error en insertarEmpresa:', error);
    console.error('Detalle del error PostgreSQL:', error.message);
    throw new Error('Error al crear la empresa');
  }
};

export default {
  insertarEmpresa,
};
