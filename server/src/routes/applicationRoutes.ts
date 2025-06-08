import { Router, Request, Response, NextFunction } from 'express';
import { getApplications, createApplication } from '../controllers/applicationController.js';

const router = Router();

// GET /api/applications
router.get('/', getApplications);

// POST /api/applications
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  createApplication(req, res, next);
});

export default router;