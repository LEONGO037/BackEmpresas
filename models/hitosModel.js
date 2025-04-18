import pool from '../db.js';

const obtenerHitosAgrupados = async () => {
  const query = `
    SELECT descripcion
    FROM HITOS
    GROUP BY descripcion
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error en obtenerHitosAgrupados:', error);
    throw new Error('Error al consultar los hitos');
  }
};


const crearHito = async ({ id_empresa, descripcion, fecha_h, url }) => {
  const query = `
    INSERT INTO HITOS (id_empresa, descripcion, fecha_h, url)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [id_empresa, descripcion, fecha_h, url];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error en crearHito:', error);
    throw new Error('Error al crear el hito');
  }
};

export default {
  obtenerHitosAgrupados,
  crearHito,
};
