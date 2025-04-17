import express from 'express';
import cors from 'cors';
import empresaRoutes from './routers/empresas.js'; // <-- importante

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', empresaRoutes); // <-- este es el que activa /empresa/:id

// Arrancar server
app.listen(PORT, () => {
  console.log(`Servidor andando en http://localhost:${PORT}`);
});
