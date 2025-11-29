import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import Subscribe from "@/model/Subscribe";

export async function POST(req) {

    try {


        await connectDB();
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }


        const existingSubscriber = await Subscribe.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json({
                success: false,
                message: "Email already subscribed"
            },
                { status: 400 });
        }




        const newSubscriber = await Subscribe.create({ email });

        console.log(newSubscriber);

        return NextResponse.json({
            success: true,
            message: "Subscribed successfully"
        },
            { status: 201 });


    } catch (error) {
        console.log("Error subscribing:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        },
            { status: 500 });

    }



}