// app/api/auth/verify-email/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token
      }
    });

    if (!user) {
      return new NextResponse("Invalid token", { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null
      }
    });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("[VERIFY_EMAIL_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}