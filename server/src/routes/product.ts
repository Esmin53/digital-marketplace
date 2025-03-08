import express from "express"
import { getProduct, getProducts, getUsersRating, newProduct, rateProduct } from "../controllers/product";
import {verifyToken} from "../middleware/auth"

const router = express.Router()

router.post('/new-product', verifyToken, newProduct)
router.get('/get-products', getProducts)
router.get('/get-products/:productId', getProduct)
router.post('/rate-products/:productId', verifyToken, rateProduct)
router.get('/get-user-rating/:productId', verifyToken, getUsersRating)


export default router;