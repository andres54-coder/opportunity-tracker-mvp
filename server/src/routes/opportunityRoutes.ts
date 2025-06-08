import { Router, Request, Response, NextFunction } from 'express';
import { getOpportunities, getOpportunityById } from '../controllers/opportunityController.js';

const router = Router();

// GET /api/opportunities
router.get('/', getOpportunities);

// GET /api/opportunities/:id
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  getOpportunityById(req, res, next);
});

export default router;