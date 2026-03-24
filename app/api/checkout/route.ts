import { NextResponse } from "next/server";
import Stripe from "stripe";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type PlanId = "bundle" | "coloring" | "keepsake" | "avatar";

const PLANS: Record<
  PlanId,
  {
    name: string;
    amount: number;
    description: string;
  }
> = {
  bundle: {
    name: "Pet Keeps Art - Bundle Deal",
    amount: 1999,
    description: "All 3 keepsakes included.",
  },
  coloring: {
    name: "Pet Keeps Art - Coloring Page",
    amount: 1299,
    description: "Single purchase.",
  },
  keepsake: {
    name: "Pet Keeps Art - Keepsake Certificate",
    amount: 1299,
    description: "Single purchase.",
  },
  avatar: {
    name: "Pet Keeps Art - 12 Avatar Pack",
    amount: 1299,
    description: "Single purchase.",
  },
};

function getBaseUrl(req: Request) {
  const env =
    process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, "");

  const origin = req.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");

  return new URL(req.url).origin;
}

export async function POST(req: Request) {
  let orderId = "";

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
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

    const body = await req.json();

    const plan = body?.plan as PlanId;
    const customerCountry = String(body?.customerCountry || "").trim();
    const customerProvince = String(body?.customerProvince || "").trim();

    const normalizedCountry = customerCountry.toLowerCase();
    const normalizedProvince = customerProvince.toLowerCase();

    const isCanada =
      normalizedCountry === "canada" || normalizedCountry === "ca";

    const missingProvince = isCanada && !customerProvince;

    const isQuebecBlocked =
      isCanada && ["qc", "quebec", "québec"].includes(normalizedProvince);

    if (missingProvince) {
      return NextResponse.json(
        { error: "Please select a province to continue." },
        { status: 400 }
      );
    }

    if (isQuebecBlocked) {
      return NextResponse.json(
        {
          error:
            "Sorry, this service is not currently available to customers located in Québec.",
        },
        { status: 403 }
      );
    }

    if (!plan || !PLANS[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const selected = PLANS[plan];
    const baseUrl = getBaseUrl(req);

    // 1) 先建立一筆 pending order
    orderId = randomUUID();

    const { error: insertError } = await supabaseAdmin.from("orders").insert({
      id: orderId,
      status: "pending",
    });

    if (insertError) {
      console.error("Supabase insert order failed:", insertError);
      return NextResponse.json(
        { error: "Failed to create order record" },
        { status: 500 }
      );
    }

    // 2) 建立 Stripe checkout session，並把 orderId 放入 metadata
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: selected.amount,
            product_data: {
              name: selected.name,
              description: selected.description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId,
        plan,
        customer_country: customerCountry,
        customer_province: customerProvince,
      },
      custom_text: {
        submit: {
          message: "Final price shown at checkout.",
        },
      },
      // 不再直接跳去 customize，避免繞過 email link
      success_url: `${baseUrl}/customize?order_id=${orderId}&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/customize?plan=${plan}`,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      await supabaseAdmin.from("orders").delete().eq("id", orderId);

      return NextResponse.json(
        { error: "Failed to create Stripe checkout URL" },
        { status: 500 }
      );
    }

    // 3) 把 Stripe session id 寫回 orders table
    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Supabase update stripe_session_id failed:", updateError);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    // 建 session 途中失敗，就刪走剛剛建立的 pending order
    if (orderId) {
      try {
        await supabaseAdmin.from("orders").delete().eq("id", orderId);
      } catch (cleanupError) {
        console.error("Cleanup pending order failed:", cleanupError);
      }
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Stripe checkout failed",
      },
      { status: 500 }
    );
  }
}