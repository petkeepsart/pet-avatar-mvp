import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;

    if (!apiKey || !from) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing RESEND_API_KEY or RESEND_FROM",
          hasApiKey: !!apiKey,
          from: from || null,
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: ["petkeepsart@outlook.com"], // 改成你真實收信 email
      subject: "Pet Keeps Art test",
      text: "Test email from Resend",
      html: "<p>Test email from Resend</p>",
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}