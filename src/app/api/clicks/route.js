import Shortner from "@/model/Shortner";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";


export  async function POST(req) {
    await connectDB();
    const body = await req.json();

    const { shortUrl } = body;


    const doc = await Shortner.findOne(({ shortUrl: shortUrl }));

    if (!doc) {
        return NextResponse.json({ success: false, message: "Short URL not found" }, { status: 404 });
    } else if (doc === "") {

        return NextResponse.json({ success: false, message: "Short URL is empty" }, { status: 400 });
    }
    return NextResponse.json({ success: true, clicks: doc.clicks, message: "tete" }, { status: 200 });
}
