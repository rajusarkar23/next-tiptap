import dbConnection from "@/lib/db";
import { TipTap } from "@/models/tiptap.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { richText } = await req.json();
  console.log("server");
  console.log(richText);

  if (!richText) {
    console.log("no text");
    return NextResponse.json({ success: false });
  }

  await dbConnection();
  try {
    const create = await TipTap.create({
      richText,
    });
    console.log(create);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}

// get db entries

export async function GET(req) {
    await dbConnection()
    try {
        const find = await TipTap.find()
        console.log(find);
        return NextResponse.json({success: true, find})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false})
    }
}
