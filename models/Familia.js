import pool from '../db.js';

export default class Familia {
  static async create(nombreFamilia) {
    const checkQuery = 'SELECT id_familia FROM "FAMILIA" WHERE nombre_familia = $1';
    const checkRes = await pool.query(checkQuery, [nombreFamilia]);
    
    if (checkRes.rows.length > 0) {
      return checkRes.rows[0].id_familia;
    }

    const insertQuery = 'INSERT INTO "FAMILIA" (nombre_familia) VALUES ($1) RETURNING id_familia';
    const insertRes = await pool.query(insertQuery, [nombreFamilia]);
    return insertRes.rows[0].id_familia;
  }
}