import * as fs from "node:fs";
import * as path from "node:path";
import { randomUUID } from "node:crypto";

export type ReplyHistoryItem = {
  id: string;
  to: string;
  subject: string;
  message: string;
  attachmentName: string | null;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "data", "reply-history.json");

export function getReplyHistory(): ReplyHistoryItem[] {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const raw = fs.readFileSync(filePath, "utf8").trim();
    if (!raw) return [];

    return JSON.parse(raw) as ReplyHistoryItem[];
  } catch (error) {
    console.error("getReplyHistory error:", error);
    return [];
  }
}

export function saveReplyHistory(items: ReplyHistoryItem[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf8");
  } catch (error) {
    console.error("saveReplyHistory error:", error);
    throw error;
  }
}

export function addReplyHistory(
  item: Omit<ReplyHistoryItem, "id" | "createdAt">
) {
  const current = getReplyHistory();

  const newItem: ReplyHistoryItem = {
    id: randomUUID(),
    to: item.to,
    subject: item.subject,
    message: item.message,
    attachmentName: item.attachmentName,
    createdAt: new Date().toISOString(),
  };

  current.unshift(newItem);
  saveReplyHistory(current);

  return newItem;
}