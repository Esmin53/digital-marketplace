import express from "express"
import {verifyToken} from "../middleware/auth"
import { getUser } from "../controllers/user";

const router = express.Router()

router.get('/get-user/:userId', getUser)

export default router;