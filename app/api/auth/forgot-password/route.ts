// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: expires
      }
    });

    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("[FORGOT_PASSWORD_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

