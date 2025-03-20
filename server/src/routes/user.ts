import express from "express"
import {verifyToken} from "../middleware/auth"
import { getStatistics, getUser } from "../controllers/user";

const router = express.Router()

router.get('/get-user/:userId', getUser)
router.get('/get-statistics', verifyToken, getStatistics)

export default router;