import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: "Missing stripe-signature or STRIPE_WEBHOOK_SECRET" },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail =
        session.customer_details?.email || session.customer_email;

      if (customerEmail) {
        await resend.emails.send({
          from: "Pet Keeps Art <info@petkeepsart.com>",
          to: customerEmail,
          subject: "Your Pet Keeps Art order",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Thank you for your order</h2>
              <p>We received your payment successfully.</p>
              <p>Your order is now being processed.</p>
              <p>If you have any questions, reply to this email.</p>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}