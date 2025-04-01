import { ProductValidator } from "../lib/validators/product";
import { Request, Response } from "express"
import Product from "../models/Product";
import { stripe } from "../lib/stripe";
import User from "../models/User";
import Order from "../models/Order";
import mongoose from "mongoose";
import { format } from "date-fns";

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
        const authorId = req.query.authorId || null
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
        if(authorId !== null) filters.authorId = authorId as string
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
      const limit = Number(req.query.limit) || 10
      const page = Number(req.query.page) || 1

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

      let idAsObjectId = new mongoose.Types.ObjectId(id);
      let p = (page-1) * limit

      const data = await User.aggregate([
        { $match: { "_id": idAsObjectId}},
        { $unwind: "$purchasedProducts"},
        { $lookup: {
            from: "products",
            localField: "purchasedProducts",
            foreignField: "_id",
            as: "product"
        }},
        { $project: {
            product: 1,
            _id: 0
        }},
        { $unwind: "$product"},
        { $project: {
            "product._id": 1,
            "product.title": 1,
            "product.price": 1,
            "product.images": 1
        }},
        { $project: {
            product: 1
        }},
        { $replaceRoot: { newRoot: "$product" } },
        {
            $facet: {
              products: [
                { $skip: p },
                { $limit: limit }
              ],
              totalCount: [
                { $count: "count" }
              ]
            }
          }
      ])

      const result = data[0];
      const products = result.products;
      const totalCount = result.totalCount[0].count;
  
      res.status(200).send({ success: true, products, totalCount });
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

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = res.locals.user;
        const { productId } = req.params
        let { title, description} = req.body

        const product = await Product.findById(productId).select('_id authorId')
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return 
        }

        if(!new mongoose.Types.ObjectId(id).equals(product.authorId)) {
            res.status(401).json({sucess: false, message: "Unauthorized"})
            return
        }

        await Product.findByIdAndUpdate(product._id, {
            title,
            description
        })

        res.status(200).json({ sucess: true, message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

const updatePrice = async (req: Request, res: Response) => {
    try {
        
        res.status(200).json({ sucess: true, message: "Product updated successfully" });
    } catch (error) {
        
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const getProductStats = async (req: Request, res: Response) => {
    try {
        const { id } = res.locals.user;
        const { productId } = req.params
        
        const idAsObjectId = new mongoose.Types.ObjectId(productId)
        const products = await Order.aggregate([
            { $unwind: "$products" },
            { $match: { "products": idAsObjectId}},
            { $lookup: {
                from: "products",
                localField: "products",
                foreignField: "_id",
                as: "product"
            }}, 
            { $unwind: "$product" },
            { $addFields: {
                price: "$product.price"
            }},
            { $project: {
                createdAt: 1,
                price: 1,
                month: { $month: "$createdAt" }, 
                year: { $year: "$createdAt" } 
            }},
            { $facet: {
                salesByMonth: [{
                    $group: {
                        _id: "$month",
                        totalSales: { $sum: "$price" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                    _id: 1
                    }
                }],
                totalEarnings: [
                    { 
                        $group: { 
                            _id: null,
                            total: { $sum: "$price" } 
                        } 
                    }
                ]
            }}
  
        ])

        let salesByMonth: {
            _id: number, 
            totalSales: number, 
            count: number,
            month?: string
        }[] = []

        const results: {
            _id: number, 
            totalSales: number, 
            count: number,
            month?: string
        }[] = products[0].salesByMonth

        const totalEarnings = products[0]?.totalEarnings[0]?.total || 0
        const totalSales = results.reduce((sum, item) => sum + item.count, 0);

        let j = 0
        for(let i = 1; i < 13; i++) {
            const date = new Date(2025, i-1); 
            const month = format(date, "MMMM")

            if(results[j]?._id === i ) {
                salesByMonth.push({
                    ...results[j],
                    month: month.slice(0, 3)
                })
                j++
            } else {
                salesByMonth.push({
                    _id: i,
                    totalSales: 0,
                    count: 0,
                    month: month.slice(0, 3)
                })
            }
        }

        res.status(200).json({ sucess: true, message: "Product data", salesByMonth, totalEarnings, totalSales });
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const download = async (req: Request, res: Response) => {
    try {
        const { id } = res.locals.user;
        const { productId } = req.params

        const userId = new mongoose.Types.ObjectId(id)
        const productIdAsObject = new mongoose.Types.ObjectId(productId)

        const result = await User.aggregate([
            { $match: { "_id": userId}},
            { $unwind: "$purchasedProducts" },
            { $match: { "purchasedProducts": productIdAsObject}},
            { $lookup: {
                from: "products",
                localField: "purchasedProducts",
                foreignField: "_id",
                as: "product"
            }}, 
            {
                $replaceRoot: {
                  newRoot: { $arrayElemAt: ["$product", 0] }
                }
            },
            {
                $project: {
                    _id: 0,
                    files: 1
                }
            }
        ])

        if(result.length === 0) {
            res.status(401).json({ sucess: false, message: "Unauthorized, please buy the product first." })
            return
        }

        let files = result[0].files
        console.log("Result: ", files)

        res.status(200).json({ sucess: true, message: "Download", files });
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}