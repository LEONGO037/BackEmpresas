import pool from '../db.js'; 

const obtenerTodosItems = async () => {
    const query = `
      SELECT i.id_item, nombre_item, ci.nombre as categoria
      FROM items i, items_categorias ic, categorias_items ci
      WHERE ic.id_item = i.id_item AND ci.id_categoria = ic.id_categoria;
    `;
  
    const { rows } = await pool.query(query);
    return rows;
  };

const obtenerTodosItemsById = async (id_empresa) => {
    const query = `
        SELECT nombre_item, i.descripcion, ci.nombre as categoria, fecha_inicio_c as fecha_inicio, fecha_fin_c as fecha_fin
        FROM empresas_items ei, items i, items_categorias ic, categorias_items ci
        WHERE id_empresa = $1 AND ei.id_item = i.id_item AND ic.id_item = i.id_item AND ci.id_categoria = ic.id_categoria;
    `;

    const { rows } = await pool.query(query, [id_empresa]);
    return rows;
};

const insertarItem = async (id_empresa, id_item, fecha_inicio, fecha_fin) => {
    const query = `
      INSERT INTO empresas_items(id_empresa_item, id_empresa, id_item, fecha_inicio_c, fecha_fin_c)
      VALUES((SELECT MAX(id_empresa_item) FROM empresas_items) + 1, $1, $2 , $3, $4);
    `;
    const values = [id_empresa, id_item, fecha_inicio, fecha_fin];
    await pool.query(query, values);
    return 'Ítem registrado exitosamente';
};

export default {
  obtenerTodosItemsById,
  obtenerTodosItems,
  insertarItem
};