"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const TEMPLATES = {
  orderReady: {
    subject: "Your Pet Keeps Art files are ready",
    message: `Hi,\n\nThank you for your order.\n\nYour files are attached.\n\nPlease let us know if you have any questions.\n\nBest regards,\nPet Keeps Art`,
  },
  revisionReply: {
    subject: "Re: Your Pet Keeps Art order",
    message: `Hi,\n\nThank you for your message.\n\nWe received your request and will review it shortly.\n\nBest regards,\nPet Keeps Art`,
  },
  supportReply: {
    subject: "Pet Keeps Art support",
    message: `Hi,\n\nThank you for contacting Pet Keeps Art.\n\nWe will get back to you as soon as possible.\n\nBest regards,\nPet Keeps Art`,
  },
};

export default function ReplyCustomerPage() {
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) setTo(email);
  }, [searchParams]);

  function processFile(file: File) {
    const maxRawSize = 20 * 1024 * 1024; // 20MB

    if (file.size > maxRawSize) {
      setStatus("Attachment too large. Please keep it under 20MB.");
      setAttachment(null);
      return;
    }
    
    setAttachment(file);
    setStatus("");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setAttachment(null);
      return;
    }
    processFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  }

  function applyTemplate(templateKey: keyof typeof TEMPLATES) {
    const template = TEMPLATES[templateKey];
    setSubject(template.subject);
    setMessage(template.message);
  }

  function clearAttachment() {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus("Sending...");

    try {
      // 1. 使用 FormData 封裝資料
      const formData = new FormData();
      formData.append("customerEmail", to);
      formData.append("subject", subject);
      formData.append("message", message);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      // 2. 傳送請求，千萬不要手動設定 Content-Type
      const res = await fetch("/api/reply-customer", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let data: any;

      try {
        data = JSON.parse(text);
      } catch {
        setStatus("Server returned non-JSON error.");
        return;
      }

      if (data.success) {
        setStatus("✅ Email sent successfully.");
        setTo("");
        setSubject("");
        setMessage("");
        clearAttachment();
      } else {
        setStatus(data.error || "Failed to send email.");
      }
    } catch (error: any) {
      setStatus(error?.message || "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Reply to Customer</h1>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
          Quick Templates
        </label>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="button" onClick={() => applyTemplate("orderReady")} style={templateButtonStyle}>
            Files Ready
          </button>
          <button type="button" onClick={() => applyTemplate("revisionReply")} style={templateButtonStyle}>
            Revision Reply
          </button>
          <button type="button" onClick={() => applyTemplate("supportReply")} style={templateButtonStyle}>
            Support Reply
          </button>
        </div>
      </div>

      <form onSubmit={handleSend} style={{ display: "grid", gap: "16px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px" }}>Customer Email</label>
          <input type="email" value={to} onChange={(e) => setTo(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px" }}>Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px" }}>Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={10} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px" }}>Attachment (optional)</label>
          <label
            htmlFor="attachment-upload"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              border: isDragging ? "2px solid #333" : "1px solid #d9d9d9",
              borderRadius: "10px",
              padding: "14px 16px",
              cursor: "pointer",
              background: isDragging ? "#f3f3f3" : "#fafafa",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>📎</span>
              <span style={{ color: "#333" }}>{attachment ? attachment.name : "Choose a file or drag it here"}</span>
            </div>

            {attachment && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  clearAttachment();
                }}
                style={{
                  border: "1px solid #ccc",
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            )}
          </label>

          <input id="attachment-upload" ref={fileInputRef} type="file" onChange={handleFileChange} style={{ display: "none" }} />

          {attachment ? (
            <p style={{ fontSize: "14px", marginTop: "8px" }}>Attached: {attachment.name}</p>
          ) : (
            <p style={{ fontSize: "13px", color: "#666", marginTop: "8px" }}>Supports one file. Max 20MB.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          style={{
            padding: "12px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: sending ? "not-allowed" : "pointer",
            background: "#111",
            color: "#fff",
            fontSize: "16px",
            opacity: sending ? 0.7 : 1,
          }}
        >
          {sending ? "Sending..." : "Send Email"}
        </button>
      </form>

      {status && <p style={{ marginTop: "16px" }}>{status}</p>}
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
};

const templateButtonStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  background: "#fff",
  borderRadius: "8px",
  padding: "10px 14px",
  cursor: "pointer",
  fontSize: "14px",
};