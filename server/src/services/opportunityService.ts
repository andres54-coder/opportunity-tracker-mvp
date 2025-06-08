import prisma from '../lib/prisma.js';

/**
 * Devuelve una lista de oportunidades con campos específicos para la vista pública.
 * Corresponde al endpoint: GET /api/opportunities 
 */
export const findAll = async () => {
  return await prisma.opportunity.findMany({
    // Seleccionamos solo los campos necesarios para la lista 
    select: {
      id: true,
      title: true,
      shortDescription: true,
      deadline: true,
    },
    orderBy: {
      deadline: 'asc', // Ordenamos por la fecha límite más próxima
    },
  });
};

/**
 * Busca una oportunidad por su ID y devuelve todos sus detalles.
 * Corresponde al endpoint: GET /api/opportunities/:id 
 */
export const findById = async (id: number) => {
  return await prisma.opportunity.findUnique({
    where: {
      id: id,
    },
  });
};