import { ProductValidator } from "@shared/validators/product";
import { Request, Response } from "express"
import Product from "../models/Product";
import { stripe } from "@shared/lib/stripe";
import User from "../models/User";
import Order from "../models/Order";

export const newProduct = async (req: Request, res: Response) => {
    try {
        const {title, description, category, subCategory, price, images, files} = ProductValidator.parse(req.body)
        const {id} = res.locals.user

        if(!images || !files || images.length === 0 || files.length === 0) {
            res.status(400).json({ success: false, message: "Please provide all required information" })
            return
        }

        const createdProduct = await stripe.products.create({
            name: title,
            default_price_data: {
                currency: "USD",
                unit_amount: Math.round(price * 100)
            }
        })


        const product = new Product({ 
            title,
            description,
            price,
            category,
            subCategory,
            images,
            files,
            authorId: id,
            stripe_id: createdProduct.id,
            price_id: createdProduct.default_price
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
        const isFeatured = req.query.isFeatured || null
        const limit = Number(req.query.limit) || 10
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
        if(isFeatured !== null) filters.isFeatured = true 

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

        const product = await Product.findById(productId).select('title price price_id _id authorId images averageRating category subCategory description').populate('authorId', 'username id purchasedProducts')

        res.status(200).send({succes: true, product: product})
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const getUsersRating = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params

        const {id} = res.locals.user
    
        const userRating = await Product.findById(productId).select('ratings')

        const prevRating = userRating?.ratings?.find((item) => item.userId === id) || null
        
        res.status(200).send({succes: true, rating: prevRating})
    } catch (error) {
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const rateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params

        let {rating} = req.body
        
        const {id} = res.locals.user

        const product = await Product.findById(productId).select('averageRating ratings')

        let tempRatings = product?.ratings || []

        let averageRating = product?.averageRating

        let usersPrevRating = tempRatings?.find((item) => item.userId === id) || null

        if(usersPrevRating === null) {
            tempRatings?.push({
                userId: id,
                rating
            })

        } else if(usersPrevRating) {
            tempRatings = tempRatings?.filter((item) => item.userId !== id)

            tempRatings.push({
                userId: id,
                rating
            })
        }

        averageRating = tempRatings?.reduce((prev, curr) => {
            return curr.rating + prev
          }, 0) / tempRatings?.length

        await Product.updateOne({
            averageRating,
            ratings: tempRatings
        }).where({_id: productId})

        res.status(200).send({succes: true, newRating: averageRating})
    }
    catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const getUsersProducts = async (req: Request, res: Response) => {
    try {
      const { id } = res.locals.user;
  

      const user = await User.findById(id)
        .select('purchasedProducts')
        .populate({
          path: 'purchasedProducts',
          select: 'title price _id authorId images averageRating',
        });
  
      if (!user) {
        res.status(404).send({ success: false, message: 'User not found' });
        return 
      }
  
      res.status(200).send({ success: true, products: user.purchasedProducts });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: 'Something went wrong. Please try again.' });
    }
  };

  export const getBestratedProducts = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 10
        const category = req.query.category || null
        
        let filters: any = {}

        if(category !== null) filters.category = category as string

        const products = await Product.find().select('title price _id authorId images averageRating').
        limit(limit).
        populate('authorId', 'username id').
        sort({
            averageRating: "desc"
        }).
        where(filters)

        res.status(200).json({sucess: true, products });
              
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const getPopularProducts = async (req: Request, res: Response) => {
    try {
        const mostOrderedProducts = await Order.aggregate([

            { $unwind: "$products" },
            {
              $group: {
                _id: "$products", 
                count: { $sum: 1 }, 
              },
            },
          
            { $sort: { count: -1 } },
          
            { $limit: 20 }, 
          ]);
          
          const populatedProducts = await Product.populate(mostOrderedProducts, {
            path: '_id',
            model: 'Product',
          })
          
          let products = populatedProducts.map((item) => item._id)

        res.status(200).json({sucess: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}