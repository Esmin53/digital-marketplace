import { CATEGORIES_ENUM, SUBCATEGORIES_ENUM } from '../lib/enums';
import mongoose, { Schema, Document, Types } from 'mongoose';

interface IProduct extends Document {
  title: string;
  authorId: Types.ObjectId;
  description: string;
  price: number;
  price_id: string;
  stripe_id: string;
  category: string;
  subCategory: string;
  images: string[];
  files: string[];
  discount: number;
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ratings: {
    userId: string;
    rating: number;
  }[];
  averageRating: number;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 characters long"],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [25, "Description must be at least 25 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: [0.1, "Price must be at least 0.1"],
  },
  price_id: {
    type: String,
    required: true, 
  },
  stripe_id: {
    type: String,
    required: true, 
  },
  category: {
    type: String,
    required: true,
    enum: CATEGORIES_ENUM,
  },
  subCategory: {
    type: String,
    required: true,
    enum: SUBCATEGORIES_ENUM,
  },
  images: {
    type: [String],
    default: [],
  },
  files: {
    type: [String],
    default: [],
  },
  discount: {
    type: Number,
    min: [0, "Discount must be at least 0"],
    max: [100, "Discount cannot exceed 100"],
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  ratings: [
    {
      userId: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
      },
      default: []
    },
  ],
  averageRating: {
    type: Number,
    min: [0, "Average rating cannot be less than 0"],
    max: [5, "Average rating cannot exceed 5"],
    default: 0,
  },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
