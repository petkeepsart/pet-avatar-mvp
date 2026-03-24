import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://petkeepsart.com"

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY" },
      { status: 500 }
    );
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_SUPABASE_URL" },
      { status: 500 }
    );
  }

  if (!process.env.SUPABASE_SERVER_KEY) {
    return NextResponse.json(
      { error: "Missing SUPABASE_SERVER_KEY" },
      { status: 500 }
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error: any) {
    console.error(
      "Webhook signature verification failed:",
      error?.message || error
    );
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    const orderId =
      session.metadata?.orderId ||
      session.metadata?.order_id ||
      "";
    const customerEmail =
      session.customer_details?.email || session.customer_email || "";

    if (!orderId) {
      console.error("Missing orderId in Stripe session metadata");
      return NextResponse.json({ received: true });
    }

    const { data: order, error: fetchError } = await supabaseAdmin
      .from("orders")
      .select("id, status")
      .eq("id", orderId)
      .maybeSingle();

    if (fetchError) {
      console.error("Supabase fetch order failed:", fetchError);
      return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }

    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return NextResponse.json({ received: true });
    }

    if (order.status === "paid" || order.status === "finalized") {
      console.log(`Order ${orderId} already processed with status: ${order.status}`);
      return NextResponse.json({ received: true });
    }

    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        status: "paid",
        customer_email: customerEmail || null,
        stripe_session_id: session.id,
        paid_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Supabase update order failed:", updateError);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }

    if (customerEmail) {
      const orderLink = `${appUrl.replace(/\/$/, "")}/customize?order_id=${orderId}&plan=${session.metadata?.plan || "bundle"}`;

      try {
        const emailResult = await resend.emails.send({
          from: "Pet Keeps Art <info@petkeepsart.com>",
          to: customerEmail,
          subject: "Customize your Pet Keeps Art order",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
              <h2 style="margin-bottom: 16px;">Thank you for your order!</h2>
              <p>We received your payment successfully.</p>
              <p>Please click the secure link below to customize your Pet Keeps Art order:</p>

              <div style="margin: 28px 0;">
                <a
                  href="${orderLink}"
                  style="background:#000;color:#fff;padding:14px 22px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;"
                >
                  Customize Your Art
                </a>
              </div>

              <p style="font-size: 14px; color: #666;">
                If the button does not work, copy and paste this link into your browser:
              </p>
              <p style="font-size: 14px; word-break: break-all;">
                <a href="${orderLink}" style="color:#2563eb;">${orderLink}</a>
              </p>

              <hr style="border:none;border-top:1px solid #e5e5e5;margin:28px 0;" />

              <p style="font-size: 14px; color: #666; margin: 0;">
                After final generation, this link should become download-only.
              </p>
            </div>
          `,
        });

        if ((emailResult as any)?.error) {
          console.error("Resend send error:", (emailResult as any).error);
        } else {
          console.log(`Order email sent successfully for order: ${orderId}`);
        }
      } catch (emailError) {
        console.error(`Failed to send order email for ${orderId}:`, emailError);
      }
    } else {
      console.error(`No customer email found for order: ${orderId}`);
    }

    console.log(`Payment confirmed for order: ${orderId}`);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}