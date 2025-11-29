import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import Shortner from "@/model/Shortner";


export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { orignalUrl, shortUrl } = body

        const existingEntry = await Shortner.findOne({ shortUrl })
        if (existingEntry) {
            return NextResponse.json({
                success: false,
                message: "Short URL already exists"
            }, { status: 409 })
        }

        const newShortner = new Shortner({
            orignalUrl,
            shortUrl,
        })
        await newShortner.save();

        return NextResponse.json({
            success: true,
            message: "Short URL created successfully",
        }, { status: 201 })

    } catch (error) {
        console.log("error in creating short URL:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })

    }
}