import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {

        console.error("mongodb connection error:", error)
        process.exit(1)

    }
}

export default connectDB;   