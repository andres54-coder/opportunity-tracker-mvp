import prisma from '../lib/prisma.js';

// Importamos el tipo que definimos para el payload, para mayor seguridad
import { ApplicationPayload } from '../types/index.js'; 


/**
 * Crea una nueva postulación en la base de datos.
 * Guarda los datos del formulario, los parámetros UTM y un timestamp.
 * Corresponde al endpoint: POST /api/applications 
 * @param applicationData Los datos de la postulación, ya validados por el controlador.
 */
export const create = async (applicationData: ApplicationPayload) => {
  return await prisma.application.create({
    data: applicationData, // Prisma mapea esto directamente a las columnas de la tabla
  });
};

/**
 * Devuelve todas las postulaciones para la vista de admin.
 * Incluye la información de la oportunidad asociada.
 * Corresponde al endpoint: GET /api/applications 
 */
export const findAll = async () => {
  return await prisma.application.findMany({
    orderBy: {
      timestamp: 'desc', 
    },
    include: {
      opportunity: {
        select: {
          // id: true, 
          title: true, 
          shortDescription: true, 
        },
      },
    },
  });
};