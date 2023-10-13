import express from "express";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/authSchema";
import { createExpiredSessionHandler, createSessionHandler, refreshAccessTokenHandler } from "../controller/authController";

const router = express.Router()

router.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler)
router.post('/api/sessions/expired', validateResource(createSessionSchema), createExpiredSessionHandler)
router.post('/api/sessions/refresh', refreshAccessTokenHandler)

export default router