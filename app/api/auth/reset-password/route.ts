// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("[RESET_PASSWORD_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
