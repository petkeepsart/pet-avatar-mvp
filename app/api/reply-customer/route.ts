import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

type ReplyHistoryItem = {
  id: string;
  customerEmail: string;
  subject: string;
  message: string;
  sentAt: string;
  attachmentName: string | null;
  resendId: string | null;
};

function getStorageDir() {
  return path.join(process.cwd(), "storage");
}

function getHistoryFilePath() {
  return path.join(getStorageDir(), "reply-history.json");
}

function ensureHistoryFile() {
  const storageDir = getStorageDir();
  const filePath = getHistoryFilePath();

  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }
}

function readHistory(): ReplyHistoryItem[] {
  ensureHistoryFile();

  const filePath = getHistoryFilePath();
  const raw = fs.readFileSync(filePath, "utf8").trim();

  if (!raw) return [];

  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function writeHistory(items: ReplyHistoryItem[]) {
  ensureHistoryFile();

  const filePath = getHistoryFilePath();
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf8");
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;

    if (!resendApiKey || !resendFrom) {
      return NextResponse.json(
        { success: false, error: "Missing RESEND_API_KEY or RESEND_FROM" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const formData = await req.formData();

    const customerEmail = String(formData.get("customerEmail") || formData.get("to") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const file = formData.get("attachment") as File | null;

    if (!customerEmail || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing customerEmail/to, subject, or message" },
        { status: 400 }
      );
    }

    // 處理附件 (將 File 轉為 Resend 接受的 Buffer 格式)
    const attachments = [];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const { data, error } = await resend.emails.send({
      from: resendFrom,
      to: [customerEmail],
      subject,
      text: message,
      html: `<div style="white-space: pre-wrap; font-family: Arial, sans-serif;">${escapeHtml(message)}</div>`,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    const history = readHistory();

    history.unshift({
      id: randomUUID(),
      customerEmail,
      subject,
      message,
      sentAt: new Date().toISOString(),
      attachmentName: file ? file.name : null,
      resendId: data?.id ?? null,
    });

    writeHistory(history);

    return NextResponse.json({
      success: true,
      resendId: data?.id ?? null,
    });
  } catch (error) {
    console.error("reply-customer POST error:", error);

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}