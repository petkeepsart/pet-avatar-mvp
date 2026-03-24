import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

const stripe = new Stripe(stripeSecretKey);

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id")?.trim();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Session not paid" }, { status: 400 });
    }

    const email =
      session.customer_details?.email?.trim() ||
      (typeof session.customer_email === "string"
        ? session.customer_email.trim()
        : "");

    if (!email) {
      return NextResponse.json({ error: "No payment email found" }, { status: 400 });
    }

    return NextResponse.json({ email }, { status: 200 });
  } catch (error) {
    console.error("checkout-session-email error:", error);

    return NextResponse.json(
      { error: "Failed to load payment email" },
      { status: 500 }
    );
  }
}