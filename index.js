import express from 'express';
import cors from 'cors';
import empresaRoutes from './routers/empresas.js';
import usuarioRoutes from './routers/usuarioRouter.js';
import propietarioRoutes from './routers/propietarioRoutes.js'; // Asegúrate que esta línea existe
import { swaggerUi, swaggerSpec } from './swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/empresas', empresaRoutes); // Cambiado de '/' a '/empresas'
app.use('/usuarios', usuarioRoutes);
app.use('/propietarios', propietarioRoutes); // Asegúrate que esta línea está presente

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});