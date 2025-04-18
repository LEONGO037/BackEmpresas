import express from 'express';
import cors from 'cors';
import empresaRoutes from './routers/empresas.js';
import usuarioRoutes from './routers/usuarioRouter.js';
import sedesRoutes from './routers/sedesRouter.js';
import itemsRoutes from './routers/itemsRouter.js';
import { swaggerUi, swaggerSpec } from './swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', empresaRoutes);
app.use('/usuarios', usuarioRoutes); // Las rutas estarán bajo /usuarios
app.use('/sedes', sedesRoutes);
app.use('/items', itemsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
