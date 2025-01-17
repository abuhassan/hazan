// app/api/register/route.ts
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken
      }
    });

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
      message: "Verification email sent"
    });
  } catch (error) {
    console.log("[REGISTRATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}