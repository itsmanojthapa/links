import { connectToDatabase } from "@/utils/db/connectDB";
import Url from "@/models/url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();

  try {
    const shortUrl = req.nextUrl.pathname.split("/").pop();

    if (!shortUrl) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    url.clicks++;
    await url.save();

    return NextResponse.redirect(url.longUrl, { status: 302 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
