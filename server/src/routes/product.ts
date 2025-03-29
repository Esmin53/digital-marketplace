import express from "express"
import { getProduct, getProducts, getUsersProducts, getUsersRating, newProduct, rateProduct, getBestratedProducts, getPopularProducts, updateProduct, getProductStats, download } from "../controllers/product";
import {verifyToken} from "../middleware/auth"

const router = express.Router()

router.post('/new-product', verifyToken, newProduct)
router.get('/get-products', getProducts)
router.get('/get-bestrated-products', getBestratedProducts)
router.get('/get-popular-products', getPopularProducts)
router.get('/get-user-products', verifyToken, getUsersProducts)
router.get('/get-products/:productId', getProduct)
router.get('/get-product-stats/:productId',verifyToken, getProductStats)
router.get('/download/:productId',verifyToken, download)
router.post('/update-product/:productId', verifyToken, updateProduct)
router.post('/rate-products/:productId', verifyToken, rateProduct)
router.get('/get-user-rating/:productId', verifyToken, getUsersRating)


export default router;