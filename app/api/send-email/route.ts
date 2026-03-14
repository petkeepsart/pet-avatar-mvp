import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const data = await resend.emails.send({
      from: "Pet Keeps Art <info@petkeepsart.com>",
      to: email,
      subject: "Your Pet Keeps Art Order",
      html: "<p>Your order is ready. Thank you!</p>",
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}