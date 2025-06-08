import { Request, Response, NextFunction } from 'express';
import * as opportunityService from '../services/opportunityService.js'; 


export const getOpportunities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const opportunities = await opportunityService.findAll();
    res.status(200).json(opportunities);
  } catch (error) {
    next(error);
  }
};
export const getOpportunityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const opportunityId = parseInt(id, 10);

    if (isNaN(opportunityId)) {
      return res.status(400).json({ message: 'El ID proporcionado no es un número válido.' });
    }

    const opportunity = await opportunityService.findById(opportunityId);

    if (!opportunity) {
      return res.status(404).json({ message: 'Oportunidad no encontrada.' });
    }
    
    res.status(200).json(opportunity);
  } catch (error) {
    next(error);
  }
};