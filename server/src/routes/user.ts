import express from "express"
import {verifyToken} from "../middleware/auth"
import { getStatistics, getUser, getUserProductsLite } from "../controllers/user";

const router = express.Router()

router.get('/get-user/:userId', getUser)
router.get('/get-statistics', verifyToken, getStatistics)
router.get('/get-user-products-lite/:userId', getUserProductsLite)

export default router;