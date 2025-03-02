import { Request, Response } from "express"
import User from "../models/User";
import Product from "../models/Product";

export const getUser = async (req: Request, res: Response) => {
    try {

        const { userId } = req.params

        const userData = await User.findById(userId).select('username, _id ')

        const products = await Product.find().select('title price _id authorId images averageRating').
        where({authorId: userId})

        res.status(200).json({success: true, userData, products});
              
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}