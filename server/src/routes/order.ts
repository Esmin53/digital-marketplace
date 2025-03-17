import express from "express"
import {verifyToken} from "../middleware/auth"
import { getOrder, getOrders, payment } from "../controllers/order";


const router = express.Router()

router.post('/payment', verifyToken ,payment)
router.get('/get-orders', verifyToken ,getOrders)
router.get('/get-order/:orderId', verifyToken ,getOrder)

export default router;