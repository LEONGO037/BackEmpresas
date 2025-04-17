import pool from '../db.js';

export default class Propietario {
  static async create({ id_familia, nombre, apellido_paterno, apellido_materno, nacionalidad, es_familia }) {
    const query = `
      INSERT INTO "PROPIETARIOS" 
      (id_familia, nombre, apellido_paterno, apellido_materno, nacionalidad, es_familia)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_propietario
    `;
    const res = await pool.query(query, [
      id_familia,
      nombre,
      apellido_paterno,
      apellido_materno,
      nacionalidad,
      es_familia
    ]);
    return res.rows[0].id_propietario;
  }

  static async getByEmpresa(idEmpresa) {
    const query = `
      SELECT p.nombre, p.apellido_paterno, p.apellido_materno, p.id_propietario, 
             h.fecha_inicio, h.fecha_fin
      FROM "PROPIETARIOS" p
      JOIN "HISTORIAL_PROPIEDAD" h ON p.id_propietario = h.id_propietario
      WHERE h.id_empresa = $1
    `;
    const res = await pool.query(query, [idEmpresa]);
    return res.rows;
  }

  static async getAll() {
    const query = `
      SELECT nombre, apellido_paterno, apellido_materno, id_propietario
      FROM "PROPIETARIOS"
    `;
    const res = await pool.query(query);
    return res.rows;
  }
}