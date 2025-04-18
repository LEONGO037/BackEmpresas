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

export default {
  obtenerHitosAgrupados,
};