import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_ADDRESS = process.env.RESEND_FROM || "Pet Keeps Art <info@petkeepsart.com>";
const APP_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://petkeepsart.com").replace(/\/$/, "");

type OrderRow = {
  id: string;
  status: "pending" | "paid" | "finalized" | "invalid" | string;
  customer_email: string | null;
  download_url: string | null;
  stripe_session_id: string | null;
};

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("order_id")?.trim() || "";
  const sessionId = req.nextUrl.searchParams.get("session_id")?.trim() || "";
  // attempt = 前端傳來第幾次 poll（從 1 開始）
  const attempt = parseInt(req.nextUrl.searchParams.get("attempt") || "1", 10);

  if (!orderId) {
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, status, customer_email, download_url, stripe_session_id")
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("Fetch order failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  let order = data as OrderRow;

  // 架構改進：
  // 第 1 次 poll 只查 DB（給 webhook ~0.5s 先到），第 2 次起就 call Stripe API fallback
  // 生產環境：webhook 通常在第 1 次 poll 前已更新 DB，Stripe API 不會被呼叫
  // 本機測試（無 webhook）：第 2 次 poll（約 1 秒後）就立刻呼叫 Stripe，大幅減少等待
  const shouldCallStripe = order.status === "pending" && sessionId && attempt >= 2;

  if (shouldCallStripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const metadataOrderId =
        session.metadata?.orderId || session.metadata?.order_id || "";

      const matchesViaMetadata = metadataOrderId === orderId;
      const matchesViaStoredSession = order.stripe_session_id === session.id;
      const isValidSession = matchesViaMetadata || matchesViaStoredSession;

      if (!isValidSession) {
        console.warn(
          `Session/order mismatch. orderId=${orderId}, metadataOrderId=${metadataOrderId}, storedSessionId=${order.stripe_session_id}, incomingSessionId=${session.id}`
        );
      } else if (session.payment_status === "paid") {
        const customerEmail =
          session.customer_details?.email || session.customer_email || null;

        const { error: updateError } = await supabaseAdmin
          .from("orders")
          .update({
            status: "paid",
            customer_email: customerEmail,
            stripe_session_id: session.id,
            paid_at: new Date().toISOString(),
          })
          .eq("id", orderId);

        if (updateError) {
          console.error("Update paid status failed:", updateError);
        } else {
          order = {
            ...order,
            status: "paid",
            customer_email: customerEmail,
            stripe_session_id: session.id,
          };

          // Send "go customize your order" email (fallback when webhook didn't fire)
          // Fire-and-forget: do NOT await – return paid status immediately
          if (customerEmail) {
            const plan = session.metadata?.plan || "bundle";
            const orderLink = `${APP_URL}/customize?order_id=${orderId}&session_id=${session.id}&plan=${plan}`;
            resend.emails.send({
              from: FROM_ADDRESS,
              to: customerEmail,
              subject: "Customize your Pet Keeps Art order",
              html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;">
                  <h2 style="margin-bottom:16px;">Thank you for your order!</h2>
                  <p>We received your payment successfully.</p>
                  <p>Please click the secure link below to customize your Pet Keeps Art order:</p>
                  <div style="margin:28px 0;">
                    <a href="${orderLink}" style="background:#000;color:#fff;padding:14px 22px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
                      Customize Your Art
                    </a>
                  </div>
                  <p style="font-size:14px;color:#666;">If the button does not work, copy and paste this link into your browser:</p>
                  <p style="font-size:14px;word-break:break-all;">
                    <a href="${orderLink}" style="color:#2563eb;">${orderLink}</a>
                  </p>
                  <hr style="border:none;border-top:1px solid #e5e5e5;margin:28px 0;" />
                  <p style="font-size:14px;color:#666;margin:0;">After final generation, your files will also be sent to this email address.</p>
                </div>
              `,
            })
              .then(() => console.log(`Customize email sent to ${customerEmail} for order ${orderId}`))
              .catch((emailErr: unknown) => console.error("Failed to send customize email:", emailErr));
          }
        }
      }
    } catch (stripeError) {
      console.error("Stripe verify failed:", stripeError);
    }
  }

  let files: {
    coloring?: string;
    keepsake?: string;
    avatar?: string;
  } = {};

  if (typeof order.download_url === "string" && order.download_url.trim()) {
    try {
      const parsed = JSON.parse(order.download_url);
      if (parsed && typeof parsed === "object") {
        files = parsed;
      }
    } catch {
      if (order.download_url.startsWith("http")) {
        files = { keepsake: order.download_url };
      }
    }
  }

  return NextResponse.json({
    order: {
      id: order.id,
      status: order.status,
      customerEmail: order.customer_email || "",
      files,
    },
  });
}
