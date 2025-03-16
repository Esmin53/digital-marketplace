import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: "user" | "admin";
  favourites: Types.ObjectId[];
  orders: Types.ObjectId[];
  purchasedProducts: Types.ObjectId[]
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      default: [],
    },
  ],
  purchasedProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    },
  ],
}, { timestamps: true });

const User = model<IUser>("User", userSchema);
export default User;