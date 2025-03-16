import express from "express"
import {verifyToken} from "../middleware/auth"
import { payment, webhookHandler } from "../controllers/payment";


const router = express.Router()

router.post('/payment', verifyToken ,payment)
router.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler)

export default router;