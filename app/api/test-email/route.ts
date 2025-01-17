// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    console.log("Testing email send to:", email);
    console.log("Using Resend API key:", process.env.RESEND_API_KEY?.slice(0, 5) + "...");

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Test Email',
      html: '<p>This is a test email from your e-commerce application.</p>'
    });

    console.log("Email sent successfully:", data);

    return NextResponse.json({ message: "Test email sent", data });
  } catch (error) {
    console.error("Error sending test email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}