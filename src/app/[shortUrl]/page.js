import { redirect } from "next/navigation";
import Shortner from "@/model/Shortner";
import connectDB from "@/db/connectDB";

export default async function Page({ params }) {
  const resolvedParams = await params; //👈 ye line add karo
  await connectDB();

  const shortUrl = resolvedParams.shortUrl;

  const doc = await Shortner.findOneAndUpdate(
    { shortUrl: shortUrl },
    { $inc: {clicks:1 }  },
    { new: true }
  );

  if (doc) {
    let redirectUrl = doc.orignalUrl;
    if (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://")) {
      redirectUrl = "https://" + redirectUrl;
    }
    redirect(redirectUrl);
  } else {
    redirect(`${process.env.NEXT_PUBLIC_URL}`);
  }

  return <div></div>;
}
