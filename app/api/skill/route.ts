import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { title, icon } = data;

    if (!title || !icon) {
      return NextResponse.json(
        { message: "Please send all the data" },
        { status: 404 }
      );
    }

    const response = await prisma.skill.create({
      data: {
        title,
        icon,
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
