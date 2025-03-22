import { stripe } from "@shared/lib/stripe"
import { Request, Response } from "express"
import { Types } from "mongoose"
import Stripe from "stripe"
import Order from "../models/Order"
import User from "../models/User"

type CartIem = {
    product: {
        _id: string,
        title: string,
        image: string,
        price: number,
        price_id: string
        author: string
    } 
}

export const payment = async (req: Request, res: Response) => {
    try {
        const {id} = res.locals.user
        let {items}: {items: CartIem[]}  = req.body

        if(items.length === 0) {
            res.status(400).send({success: false, message: "Please add some items to your cart before proceeding."});
            return
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

        items.forEach(({product}) => {
            line_items.push({
                price: product.price_id,
                quantity: 1
            })
        });

        const orderId = new Types.ObjectId().toString();

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.SERVER_URL}/orders?orderId=${orderId}`,
            cancel_url: `${process.env.SERVER_URL}/checkout`,
            payment_method_types: ["card"],
            client_reference_id: id,
            payment_intent_data: {
                metadata: {
                    userId: id,
                    orderId
                }
            },
            metadata: {
                userId: id,
                orderId,
                products: JSON.stringify(items.map((item) => item.product._id))
            },
            mode: "payment",
            line_items
        })

        res.status(200).json({success: true, message: "Payment successful", url: stripeSession.url});
              
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: "Something went wrong. Please try again."});
    }
}

export const webhookHandler = async (req: Request, res: Response) => {
    try {
      const sig = req.headers['stripe-signature'];
      const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;
  
      let event;
  
      try {
        event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret!);

      } catch (err) {
        console.error('Webhook signature verification failed:', err);
        res.status(400).send(`Webhook Error: ${err}`);
        return
      }
  
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
  
          const { id: paymentIntentId, amount_total, client_reference_id, metadata } = session;
  
          if (!metadata || !amount_total) {
            res.status(400).json({ success: false, message: 'Missing metadata or amount' });
            return 
          }
  
          const products = JSON.parse(metadata.products);
  
          const orderId = new Types.ObjectId(metadata.orderId);

          const order = new Order({
            _id: orderId,
            userId: client_reference_id, 
            products, 
            totalAmount: amount_total / 100, 
            paymentIntentId,
            paymentStatus: 'succeeded',
          });
  
          await order.save();

          const user = await User.findById(client_reference_id);
          if (user) {
            user.purchasedProducts.push(...products); 
            user.orders.push(orderId)
            await user.save();
          }
  
          break;
  
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
  
      res.status(200).json({ success: true, message: 'Webhook received' });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
  };

  export const getOrders = async (req: Request, res: Response) => {
      try {
        const {id} = res.locals.user
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
  
          const orders = await Order.find().
          where({
            userId: id
          }).
          select('_id createdAt totalAmount').
          limit(limit).
          skip((page-1) * limit)
  
          res.status(200).send({succes: true, orders})
      } catch (error) {
          console.error(error);
          res.status(500).send({success: false, message: "Something went wrong. Please try again."});
      }
  }

  export const getOrder = async (req: Request, res: Response) => {
      try {
          const { orderId } = req.params
  
          const order = await Order.findById(orderId).
          populate('products', '_id title price images category subCategory')

          console.log("Order: ", order)
  
          res.status(200).send({succes: true, order})
      } catch (error) {
          console.error(error);
          res.status(500).send({success: false, message: "Something went wrong. Please try again."});
      }
  }