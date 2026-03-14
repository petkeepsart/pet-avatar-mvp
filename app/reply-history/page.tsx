"use client";

import { useEffect, useState } from "react";

type ReplyHistoryItem = {
  id?: string;
  customerEmail?: string;
  subject?: string;
  message?: string;
  sentAt?: string;
  attachmentName?: string | null;
};

export default function ReplyHistoryPage() {
  const [items, setItems] = useState<ReplyHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/reply-history", {
          cache: "no-store",
        });

        const text = await res.text();

        if (!text) {
          setItems([]);
          return;
        }

        const data = JSON.parse(text);

        if (!res.ok) {
          throw new Error(data?.error || "Failed to load reply history");
        }

        if (data.success) {
          setItems(Array.isArray(data.items) ? data.items : []);
        } else {
          setItems([]);
          setError(data.error || "Failed to load reply history");
        }
      } catch (err) {
        console.error("Failed to load history:", err);
        setItems([]);
        setError("Failed to load reply history.");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "48px", fontWeight: 600, marginBottom: "28px" }}>
        Reply History
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && error && (
        <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
      )}

      {!loading && !error && items.length === 0 && (
        <p>No reply history yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div style={{ display: "grid", gap: "16px" }}>
          {items.map((item, index) => (
            <div
              key={item.id || `${item.customerEmail || "item"}-${index}`}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <p><strong>To:</strong> {item.customerEmail || "-"}</p>
              <p><strong>Subject:</strong> {item.subject || "-"}</p>
              <p style={{ whiteSpace: "pre-wrap" }}>
                <strong>Message:</strong>{" "}
                {item.message || "-"}
              </p>
              <p><strong>Sent At:</strong> {item.sentAt || "-"}</p>
              <p><strong>Attachment:</strong> {item.attachmentName || "None"}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}