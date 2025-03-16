import mongoose, { Schema, Types, Document } from 'mongoose';

interface IOrder extends Document {
  userId: Types.ObjectId; 
  products: Types.ObjectId[]; 
  totalAmount: number; 
  paymentIntentId: string; 
  paymentStatus: string; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0, 
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'refunded', 'canceled'], 
      default: 'pending',
    },
  },
  { timestamps: true } 
);

export default mongoose.model<IOrder>('Order', OrderSchema);