import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: "user" | "admin";
  favourites: string[];
  orders: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favourites: { type: [String], default: [] },
  orders: { type: [String], default: [] },
}, { timestamps: true });

const User = model<IUser>("User", userSchema);
export default User;