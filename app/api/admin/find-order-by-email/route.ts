import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type PlanId = "bundle" | "coloring" | "keepsake" | "avatar";

function normalizePlan(value: string | null | undefined): PlanId {
    return value === "bundle" ||
        value === "coloring" ||
        value === "keepsake" ||
        value === "avatar"
        ? value
        : "bundle";
}

function getAppUrl() {
    return (
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://petkeepsart.com"
    ).replace(/\/$/, "");
}

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const adminSecret = String(body?.adminSecret || "").trim();
        const customerEmail = String(body?.customerEmail || "").trim().toLowerCase();

        if (!process.env.ADMIN_RESEND_SECRET) {
            return NextResponse.json(
                { error: "Missing ADMIN_RESEND_SECRET" },
                { status: 500 }
            );
        }

        if (adminSecret !== process.env.ADMIN_RESEND_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: "Missing STRIPE_SECRET_KEY" },
                { status: 500 }
            );
        }

        if (!customerEmail) {
            return NextResponse.json(
                { error: "Please enter customer email" },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from("orders")
            .select(
                "id, status, customer_email, stripe_session_id, finalized_at, created_at, paid_at, customize_email_sent_at, customize_email_error"
            )
            .ilike("customer_email", customerEmail)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Find orders failed:", error);
            return NextResponse.json(
                { error: "Failed to find orders" },
                { status: 500 }
            );
        }

        const rawOrders = data || [];

        if (rawOrders.length === 0) {
            return NextResponse.json({ error: "No orders found" }, { status: 404 });
        }

        const appUrl = getAppUrl();

        const orders = await Promise.all(
            rawOrders.map(async (order) => {
                let plan: PlanId = "bundle";

                if (order.stripe_session_id) {
                    try {
                        const session = await stripe.checkout.sessions.retrieve(
                            order.stripe_session_id
                        );
                        plan = normalizePlan(session.metadata?.plan);
                    } catch (stripeError) {
                        console.error(
                            `Stripe session lookup failed for ${order.id}:`,
                            stripeError
                        );
                    }
                }

                return {
                    id: order.id,
                    status: order.status,
                    customer_email: order.customer_email,
                    stripe_session_id: order.stripe_session_id,
                    finalized_at: order.finalized_at,
                    created_at: order.created_at,
                    paid_at: order.paid_at,
                    customize_email_sent_at: order.customize_email_sent_at,
                    customize_email_error: order.customize_email_error,
                    plan,
                    orderLink: `${appUrl}/customize?order_id=${encodeURIComponent(
                        order.id
                    )}&plan=${encodeURIComponent(plan)}`,
                };
            })
        );

        return NextResponse.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("find-order-by-email route error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error ? error.message : "Failed to find orders",
            },
            { status: 500 }
        );
    }
}