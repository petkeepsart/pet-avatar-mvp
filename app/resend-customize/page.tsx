"use client";

import React, { useState } from "react";

type OrderInfo = {
    id: string;
    status: string | null;
    customer_email: string | null;
    stripe_session_id: string | null;
    finalized_at?: string | null;
    created_at?: string | null;
    paid_at?: string | null;
    customize_email_sent_at?: string | null;
    customize_email_error?: string | null;
    plan: string;
    orderLink: string;
};

export default function ResendCustomizePage() {
    const [adminSecret, setAdminSecret] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [orders, setOrders] = useState<OrderInfo[]>([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isFinding, setIsFinding] = useState(false);
    const [resendingOrderId, setResendingOrderId] = useState("");

    async function handleFind() {
        setError("");
        setMessage("");
        setOrders([]);

        if (!customerEmail.trim()) {
            setError("Please enter customer email.");
            return;
        }

        if (!adminSecret.trim()) {
            setError("Please enter admin secret.");
            return;
        }

        try {
            setIsFinding(true);

            const res = await fetch("/api/admin/find-order-by-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    adminSecret,
                    customerEmail,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.error || "Failed to find orders");
            }

            setOrders(Array.isArray(data.orders) ? data.orders : []);
            setMessage(
                `Found ${Array.isArray(data.orders) ? data.orders.length : 0} order(s).`
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to find orders");
        } finally {
            setIsFinding(false);
        }
    }

    async function handleResend(orderId: string) {
        setError("");
        setMessage("");

        try {
            setResendingOrderId(orderId);

            const res = await fetch("/api/admin/resend-customize-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    adminSecret,
                    orderId,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.error || "Failed to resend email");
            }

            setMessage(`Resent to ${data.customerEmail}`);
            await handleFind();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to resend email");
        } finally {
            setResendingOrderId("");
        }
    }

    return (
        <main className="min-h-screen bg-[#f7f3ee] px-6 py-10 text-[#3f2b22]">
            <div className="mx-auto max-w-6xl rounded-[28px] border border-[#e4d7cc] bg-white p-8 shadow-sm">
                <h1 className="text-5xl font-light tracking-tight">
                    Resend Customize Email
                </h1>

                <div className="mt-10 space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Admin Secret
                        </label>
                        <input
                            type="password"
                            value={adminSecret}
                            onChange={(e) => setAdminSecret(e.target.value)}
                            className="w-full rounded-2xl border border-[#d8c9bc] px-5 py-4 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Customer Email
                        </label>
                        <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="customer@example.com"
                            className="w-full rounded-2xl border border-[#d8c9bc] px-5 py-4 outline-none"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button
                            type="button"
                            onClick={handleFind}
                            disabled={isFinding}
                            className="rounded-2xl bg-[#6f927f] px-6 py-3 font-bold text-white disabled:opacity-60"
                        >
                            {isFinding ? "Checking..." : "Check Orders"}
                        </button>
                    </div>

                    {message && (
                        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                            {error}
                        </div>
                    )}

                    {orders.length > 0 && (
                        <div className="mt-6 space-y-6">
                            {orders.map((order, index) => (
                                <div
                                    key={order.id}
                                    className="rounded-[24px] border border-[#e4d7cc] bg-[#fcfaf7] p-6"
                                >
                                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                                        <h2 className="text-2xl font-semibold">
                                            Order {index + 1}
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() => handleResend(order.id)}
                                            disabled={resendingOrderId === order.id}
                                            className="rounded-2xl border border-[#d8c9bc] bg-white px-6 py-3 font-bold disabled:opacity-60"
                                        >
                                            {resendingOrderId === order.id
                                                ? "Resending..."
                                                : "Resend Email"}
                                        </button>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <InfoRow label="Status" value={order.status || "-"} />
                                        <InfoRow label="Plan" value={order.plan || "-"} />
                                        <InfoRow label="Order ID" value={order.id} />
                                        <InfoRow
                                            label="Customer Email"
                                            value={order.customer_email || "-"}
                                        />
                                        <InfoRow
                                            label="Created Time"
                                            value={order.created_at || "-"}
                                        />
                                        <InfoRow label="Paid Time" value={order.paid_at || "-"} />
                                        <InfoRow
                                            label="Finalized Time"
                                            value={order.finalized_at || "-"}
                                        />
                                        <InfoRow
                                            label="Last Email Sent"
                                            value={order.customize_email_sent_at || "-"}
                                        />
                                        <InfoRow
                                            label="Stripe Session ID"
                                            value={order.stripe_session_id || "-"}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <div className="mb-2 text-sm font-semibold">
                                            Customize Link
                                        </div>
                                        <div className="rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 text-sm break-all">
                                            {order.orderLink}
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <div className="mb-2 text-sm font-semibold">Email Error</div>
                                        <div className="rounded-2xl border border-[#d8c9bc] bg-white px-4 py-3 text-sm break-all">
                                            {order.customize_email_error || "-"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-[#e4d7cc] bg-white px-4 py-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#8a7466]">
                {label}
            </div>
            <div className="mt-1 text-sm font-medium break-all">{value}</div>
        </div>
    );
}