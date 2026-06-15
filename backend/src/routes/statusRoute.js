import express from 'express';
import { getCurrentStatus, getComponents, getIncidents } from '../controllers/statusController.js';

const router = express.Router();

router.get('/current', getCurrentStatus);
router.get('/components', getComponents);
router.get('/incidents', getIncidents);

export default router;
