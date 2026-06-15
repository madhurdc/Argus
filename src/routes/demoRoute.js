import express from 'express';
import { demoAlert } from '../controllers/demoController.js';

const router = express.Router();

router.post('/', demoAlert);

export default router;