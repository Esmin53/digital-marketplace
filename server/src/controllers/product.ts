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
        const subCategory = req.query.subCategory || null
        const category = req.query.category || null
        const limit = Number(req.query.limit) || 6
        const orderBy = req.query.orderBy || 'title-asc'
        const page = Number(req.query.page) || 1

        let sort: any = {}

        if(orderBy === 'title-asc') {
           sort.title = "asc"
        } else if(orderBy === 'title-desc') {
            sort.title = "desc"
        } else if(orderBy === 'price-asc') {
            sort.price = "asc"
        } else if(orderBy === 'price-desc') {
            sort.price = "desc"
        }

        let filters: any = {}

        if(subCategory !== null) filters.subCategory = subCategory as string
        if(category !== null) filters.category = category as string

        const products = await Product.find().select('title price _id authorId images averageRating').
        where(filters).
        limit(limit).
        skip((page-1) * limit).
        populate('authorId', 'username id').
        sort(sort)
        
        const totalResults = await Product.countDocuments().where(filters)

        res.status(200).json({products, totalResults});
              
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