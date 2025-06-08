import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Importamos el servicio que maneja la lógica de negocio
import * as applicationService from '../services/applicationService.js';


const ApplicationCreationSchema = z.object({
  name: z.string({ required_error: 'El nombre es requerido.' }).min(2, 'El nombre debe tener al menos 2 caracteres.'),
  email: z.string({ required_error: 'El email es requerido.' }).email('El formato del email no es válido.'),
  message: z.string().optional(),
  opportunityId: z.number({ required_error: 'Se debe seleccionar una oportunidad.' }).int().positive(),
  // Campos UTM opcionales que se capturan desde la URL 
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

/**
 * Controlador para crear una nueva postulación.
 * Implementa el endpoint: POST /api/applications 
 */
export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    console.log('Validando datos de la postulación:', req.body);
    const validatedData = ApplicationCreationSchema.parse(req.body);

    const newApplication = await applicationService.create(validatedData);

    res.status(201).json(newApplication);
  } catch (error) {

    if (error instanceof z.ZodError) {

      return res.status(400).json({
        message: 'Datos de postulación inválidos.',
        errors: error.errors,
      });
    }

    next(error);
  }
};

/**
 * Controlador para obtener la lista de todas las postulaciones.
 * Diseñado para la vista de administrador.
 * Implementa el endpoint: GET /api/applications 
 */
export const getApplications = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const applications = await applicationService.findAll();
    
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};