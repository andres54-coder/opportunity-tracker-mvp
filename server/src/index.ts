import express from 'express';
import cors from 'cors';

// 1. IMPORTACIÓN DE RUTAS
import opportunityRoutes from './routes/opportunityRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

// 2. IMPORTACIÓN DEL MANEJADOR DE ERRORES
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares generales
app.use(cors());
app.use(express.json());

// Montaje de Rutas
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/applications', applicationRoutes);

// 3. USO DEL MANEJADOR DE ERRORES
// Debe ser el ÚLTIMO middleware que se añade a la aplicación.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// import prisma from './lib/prisma.js';

// async function testPrismaConnection() {
//   try {
//     console.log('Iniciando prueba de conexión de Prisma...');
//     await prisma.$connect();
//     console.log('✅ Conexión con Prisma exitosa.');
//   } catch (error) {
//     console.error('❌ Falló la conexión con Prisma:', error);
//   } finally {
//     await prisma.$disconnect();
//     console.log('Conexión con Prisma cerrada.');
//   }
// }

// testPrismaConnection();