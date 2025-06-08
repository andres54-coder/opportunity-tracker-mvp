import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Creamos una única instancia. Si estamos en desarrollo y ya existe una (por el hot-reload),
// la reutilizamos. Si no, creamos una nueva.
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;