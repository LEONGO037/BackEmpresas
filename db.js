require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => console.log('🟢 Conectado a PostgreSQL correctamente'))
    .catch(err => console.error('🔴 Error de conexión a PostgreSQL:', err));

module.exports = pool;
