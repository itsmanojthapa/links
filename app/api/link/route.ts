import { connectToDatabase } from "@/utils/db/connectDB";
import Url from "@/models/url";
import { NextRequest, NextResponse } from "next/server";
//@ts-expect-error: shortid has no type definitions
import shortid from "shortid";

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();

  try {
    const { longUrl }: { longUrl: string } = await req.json();
    const shortUrl = shortid.generate();

    const isExists = await Url.findOne({ longUrl });

    if (isExists) {
      return NextResponse.json({ shortUrl: isExists.shortUrl });
    }

    const url = new Url({
      longUrl,
      shortUrl,
    });
    await url.save();

    return NextResponse.json(url);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
