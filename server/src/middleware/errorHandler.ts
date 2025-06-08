import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log del error para debugging
  
  
  res.status(500).json({
    success: false,
    message: 'Ha ocurrido un error inesperado.',
  });
};