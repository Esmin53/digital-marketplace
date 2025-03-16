import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRouter from "./routes/auth"
import productRouter from "./routes/product"
import userRouter from "./routes/user"
import paymentRouter from "./routes/payment"
import { webhookHandler } from "./controllers/payment";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/payment', paymentRouter)


async function startServer() {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error(`Failed to start server: ${error}`);
      process.exit(1);
    }
  }
  
  startServer();