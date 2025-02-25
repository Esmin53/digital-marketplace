import { ProductValidator } from "@shared/validators/product";
import { Request, Response } from "express"
import Product from "../models/Product";

export const newProduct = async (req: Request, res: Response) => {
    try {
        const {title, description, category, subCategory, price, images, files} = ProductValidator.parse(req.body)
        const {id} = res.locals.user

        if(!images || !files || images.length === 0 || files.length === 0) {
            res.status(400).json({ success: false, message: "Please provide all required information" })
            return
        }

        const product = new Product({ 
            title,
            description,
            price,
            category,
            subCategory,
            images,
            files,
            authorId: id
        });

        const newProduct = await product.save();

        res.status(200).json({success: true, product: newProduct, productId: product._id});
              
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().select('title price _id authorId images averageRating').limit(5).populate('authorId', 'username id')
        
        
        res.status(200).json({products});
              
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params

        const product = await Product.findById(productId).select('title price _id authorId images averageRating category subCategory description').populate('authorId', 'username id')

        res.status(200).send({succes: true, product: product})
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}