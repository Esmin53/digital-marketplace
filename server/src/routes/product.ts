import express from "express"
import { newProduct } from "../controllers/product";
import {verifyToken} from "../middleware/auth"

const router = express.Router()

router.post('/new-product', verifyToken, newProduct)


export default router;