import { saveController } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post('/', saveController);

export default router;
