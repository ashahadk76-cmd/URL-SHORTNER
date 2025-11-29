import mongoose from "mongoose";

const shortnerSchema = new mongoose.Schema({
    orignalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    clicks: {
        type: Number,
        default: 0
    },
}, { timestamps: true })


export default mongoose.models.Shortner || mongoose.model('Shortner', shortnerSchema)