import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

type ReplyHistoryItem = {
  id?: string;
  customerEmail?: string;
  subject?: string;
  message?: string;
  sentAt?: string;
  attachmentName?: string | null;
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

export async function GET() {
  try {
    ensureHistoryFile();

    const filePath = getHistoryFilePath();
    const raw = fs.readFileSync(filePath, "utf8").trim();

    if (!raw) {
      return NextResponse.json({
        success: true,
        items: [],
      });
    }

    const parsed = JSON.parse(raw);

    return NextResponse.json({
      success: true,
      items: Array.isArray(parsed) ? parsed : [],
    });
  } catch (error) {
    console.error("reply-history GET error:", error);

    return NextResponse.json(
      {
        success: false,
        items: [],
        error: "Failed to load reply history",
      },
      { status: 500 }
    );
  }
}