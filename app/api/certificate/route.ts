import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { title, image, link } = data;
    console.log("Problem 1", data);

    if (!title || !image || !link) {
      return NextResponse.json(
        { message: "Please send all the data" },
        { status: 404 }
      );
    }

    console.log("Problem 2");

    const response = await prisma.certificate.create({
      data: {
        title,
        image,
        link,
      },
    });

    console.log("Problem 3");

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
