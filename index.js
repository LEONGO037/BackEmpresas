import express from 'express';
import cors from 'cors';
import empresaRoutes from './routers/empresas.js';
import usuarioRoutes from './routers/usuarioRouter.js';
import busquedaRouter from './routers/busquedas.routes.js';
import hitosRouter from './routers/hitosRouter.js';
import tamaniosRouter from './routers/tamanioRouter.js';
import { swaggerUi, swaggerSpec } from './swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', empresaRoutes);
app.use('/usuarios', usuarioRoutes); // Las rutas estarán bajo /usuarios
app.use(busquedaRouter);
app.use('/', hitosRouter);
app.use('/', tamaniosRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
