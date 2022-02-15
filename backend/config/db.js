import mongoose from 'mongoose'
import {db_url} from "./db_url.js";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(db_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(
            `MongoDB connected: ${conn.connection.host}`
        )
    } catch (err) {
        console.error(`💥💥💥 Error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB
