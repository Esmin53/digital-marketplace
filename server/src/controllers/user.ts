import { Request, Response } from "express"
import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";
import mongoose from "mongoose";
import { format } from "date-fns";

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

export const getStatistics = async (req: Request, res: Response) => {
    try {

        const {id} = res.locals.user
        const authorId = new mongoose.Types.ObjectId(id);

        const products = await Order.aggregate([
                    { $unwind: "$products" },
                    { $lookup: {
                        from: "products",
                        localField: "products",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $project: {
                                    title: 1,
                                    price: 1,
                                    authorId: 1, 
                                    _id: 1
                                  }
                            }
                        ],
                        as: "productDetails"
                    }},
                    {
                        $match: { "productDetails.authorId": authorId }
                    },
                    {
                        $match: {
                          "productDetails.0": { $exists: true } 
                        }
                      },
                    {
                        $project: {
                            createdAt: 1,
                            productDetails: 1,
                            month: { $month: "$createdAt" }, 
                            year: { $year: "$createdAt" } 
                        }
                    },
                    {
                        $group: {
                          _id: {
                            year: "$year", 
                            month: "$month" 
                          },
                          orders: {
                            $push: {
                              createdAt: "$createdAt",
                              productDetails: "$productDetails"
                            }
                          },
                          total: {
                            $sum: {
                              $reduce: {
                                input: "$productDetails",
                                initialValue: 0, 
                                in: {
                                  $add: ["$$value", "$$this.price"] 
                                } 
                              }
                            }
                          }
                        }
                      },
                      {
                        $project: {
                          _id: 0, 
                          month: "$_id.month", 
                          year: "$_id.year", 
                          total: 1,
                        }
                      },
                      {
                        $sort: {
                            month: 1
                        }
                      }
                  ]);
                  
                let data: {
                    total: number
                    month: number
                    year: number
                    monthName?: string
                }[] = []

                let allMonths : {
                    total: number
                    month: number
                    year: number
                    monthName?: string
                }[] = [...data]

                for(let i = 0; i < 12; i++) {
                    const date = new Date(2025, i); 
                    const monthName = format(date, "MMMM")

                            allMonths.push({
                                total: 0,
                                month: i+1,
                                year: 2025,
                                monthName: monthName.slice(0, 3)
                            })
                }


                products.forEach((item, i) => {

                    const date = new Date(item.year, item.month - 1); 

                    const monthName = format(date, "MMMM")
                    data.push({...item,
                        monthName: monthName.slice(0, 3)
                    })

                    let monthIndex = allMonths.findIndex((monthData) => monthData.month === item.month)
                    allMonths[monthIndex] = {
                        ...item,
                        monthName: monthName.slice(0, 3)
                    }
                    
                })
        
                res.status(200).json({sucess: true, data, allMonths });
        
    } catch (error) {
        console.log(error)
    }
}

export const getUserProductsLite = async (req: Request, res: Response) => {
  try {

      const { userId } = req.params

      const idAsObjectId = new mongoose.Types.ObjectId(userId)

      const products = await User.findById(idAsObjectId).select('purchasedProducts')

      console.log("Products", products, userId)

      res.status(200).json({success: true, products: products?.purchasedProducts});
            
  } catch (error) {
      console.error(error);
      res.status(500).send({success: false, message: "Something went wrong. Please try again."});
  }
}