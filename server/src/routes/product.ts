import express from "express"
import { getProduct, getProducts, newProduct } from "../controllers/product";
import {verifyToken} from "../middleware/auth"

const router = express.Router()

router.post('/new-product', verifyToken, newProduct)
router.get('/get-products', getProducts)
router.get('/get-products/:productId', getProduct)


export default router;