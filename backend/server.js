import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import {errorHandler, notFound} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import {Server} from "socket.io";
import {createServer} from "http";

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import adRoutes from "./routes/adRoutes.js";
import {initConnection} from "./controllers/sessionController.js";
import cors from 'cors';

dotenv.config()

connectDB();
const app = express()

app.use(morgan('dev'));
app.use(express.json())
const httpServer = createServer(app);
export const _io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});
initConnection();
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/ads', adRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(cors());
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

httpServer.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)
