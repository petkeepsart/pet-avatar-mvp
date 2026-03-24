import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import sharp from "sharp";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_ADDRESS = process.env.RESEND_FROM || "Pet Keeps Art <info@petkeepsart.com>";

type PlanId = "bundle" | "coloring" | "keepsake" | "avatar";
type PaperSize = "a4" | "letter";
type Orientation = "portrait" | "landscape";
type SimpleFrameStyle = "none" | "thinLine" | "doubleLine";

type CertificateBg =
  | "warmCream"
  | "blushPink"
  | "softMint"
  | "ivory"
  | "dustyBlue"
  | "linenBeige";

type FontKey =
  | "elegantSerif"
  | "classicSerif"
  | "modernSans"
  | "softHandwritten"
  | "cuteRounded"
  | "playfulScript";

type AvatarStyle = "clean" | "cute" | "bold";
type AvatarShapeMode = "mixed" | "rounded" | "circle";
type AvatarBgTone = "cream" | "mint" | "blush";

type Position = { x: number; y: number };

type CustomizationPayload = {
  plan?: PlanId;

  coloringPaperSize?: PaperSize;
  coloringOrientation?: Orientation;
  coloringFrameStyle?: SimpleFrameStyle;

  certificatePaperSize?: PaperSize;
  certificateOrientation?: Orientation;
  certificateFrameStyle?: SimpleFrameStyle;
  certificateBg?: CertificateBg;
  certificateFont?: FontKey;
  certificateMainHeading?: string;
  certificateSubtitle?: string;
  certificateBottomText?: string;
  certMainPos?: Position;
  certSubtitlePos?: Position;
  certBottomPos?: Position;
  certMainSize?: number;
  certSubtitleSize?: number;
  certBottomSize?: number;
  certMainRotate?: number;
  certSubtitleRotate?: number;
  certBottomRotate?: number;

  avatarStyle?: AvatarStyle;
  avatarShapeMode?: AvatarShapeMode;
  avatarBgTone?: AvatarBgTone;
  avatarPackMode?: "auto12";
};

type DownloadFiles = {
  coloring?: string;
  keepsake?: string;
  avatar?: string;
};

const SAFE_MIN_POS = 8;
const SAFE_MAX_POS = 92;

const BG_MAP: Record<
  CertificateBg,
  { bg: string; accentLight: string; accent: string }
> = {
  warmCream: {
    bg: "#F8EEDB",
    accentLight: "#F3D9B1",
    accent: "#D99058",
  },
  blushPink: {
    bg: "#F7E3E4",
    accentLight: "#EFC9CF",
    accent: "#D9878E",
  },
  softMint: {
    bg: "#E7F3EC",
    accentLight: "#CFE5D8",
    accent: "#7DAE91",
  },
  ivory: {
    bg: "#F7F3EA",
    accentLight: "#E7DED0",
    accent: "#A58B72",
  },
  dustyBlue: {
    bg: "#E7EDF4",
    accentLight: "#D2DCE8",
    accent: "#8497B0",
  },
  linenBeige: {
    bg: "#F4EBDD",
    accentLight: "#E9DBC9",
    accent: "#B18C68",
  },
};

const FONT_MAP: Record<FontKey, string> = {
  elegantSerif: 'Georgia, "Times New Roman", serif',
  classicSerif: "Cambria, Georgia, serif",
  modernSans: "Arial, Helvetica, sans-serif",
  softHandwritten: '"Comic Sans MS", "Bradley Hand", cursive',
  cuteRounded: '"Trebuchet MS", "Arial Rounded MT Bold", sans-serif',
  playfulScript: '"Brush Script MT", cursive',
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalizeText(value: unknown, fallback = "", max = 80) {
  return typeof value === "string" ? value.trim().slice(0, max) : fallback;
}

function normalizeNumber(
  value: unknown,
  fallback: number,
  min: number,
  max: number
) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return clamp(value, min, max);
}

function normalizePosition(
  value: unknown,
  fallback: Position,
  min = SAFE_MIN_POS,
  max = SAFE_MAX_POS
): Position {
  if (
    typeof value !== "object" ||
    value === null ||
    !("x" in value) ||
    !("y" in value)
  ) {
    return fallback;
  }

  const x =
    typeof (value as { x: unknown }).x === "number"
      ? (value as { x: number }).x
      : fallback.x;
  const y =
    typeof (value as { y: unknown }).y === "number"
      ? (value as { y: number }).y
      : fallback.y;

  return {
    x: clamp(x, min, max),
    y: clamp(y, min, max),
  };
}

function getRenderSize(paperSize: PaperSize, orientation: Orientation) {
  // 200 DPI（原本 300 DPI）：仍足夠家用打印，但像素數少 56%，生成速度快很多
  if (paperSize === "a4") {
    return orientation === "portrait"
      ? { width: 1654, height: 2339 }
      : { width: 2339, height: 1654 };
  }

  return orientation === "portrait"
    ? { width: 1700, height: 2200 }
    : { width: 2200, height: 1700 };
}

function getPdfPageSize(paperSize: PaperSize, orientation: Orientation) {
  if (paperSize === "a4") {
    return orientation === "portrait"
      ? { width: 595.28, height: 841.89 }
      : { width: 841.89, height: 595.28 };
  }

  return orientation === "portrait"
    ? { width: 612, height: 792 }
    : { width: 792, height: 612 };
}

async function fileToBuffer(file: File) {
  return Buffer.from(await file.arrayBuffer());
}

function toDataUrl(buffer: Buffer, mime: string) {
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

function safeParseStoredFiles(raw: unknown): DownloadFiles {
  if (typeof raw !== "string" || !raw.trim()) return {};

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as DownloadFiles;
    }
    return {};
  } catch {
    if (raw.startsWith("data:")) {
      return { keepsake: raw };
    }
    return {};
  }
}

function getFrameSvg(
  frameStyle: SimpleFrameStyle,
  width: number,
  height: number
) {
  if (frameStyle === "none") return "";

  if (frameStyle === "thinLine") {
    return `
      <rect
        x="${Math.round(width * 0.055)}"
        y="${Math.round(height * 0.055)}"
        width="${Math.round(width * 0.89)}"
        height="${Math.round(height * 0.89)}"
        rx="24"
        ry="24"
        fill="none"
        stroke="#B89073"
        stroke-width="4"
      />
    `;
  }

  return `
    <rect
      x="${Math.round(width * 0.05)}"
      y="${Math.round(height * 0.05)}"
      width="${Math.round(width * 0.90)}"
      height="${Math.round(height * 0.90)}"
      rx="26"
      ry="26"
      fill="none"
      stroke="#B89073"
      stroke-width="4"
    />
    <rect
      x="${Math.round(width * 0.068)}"
      y="${Math.round(height * 0.068)}"
      width="${Math.round(width * 0.864)}"
      height="${Math.round(height * 0.864)}"
      rx="20"
      ry="20"
      fill="none"
      stroke="#D5B395"
      stroke-width="2.5"
    />
  `;
}

function makeColoringSvg(params: {
  photoDataUrl: string;
  paperSize: PaperSize;
  orientation: Orientation;
  frameStyle: SimpleFrameStyle;
}) {
  const { width, height } = getRenderSize(params.paperSize, params.orientation);

  const imageX = Math.round(width * 0.09);
  const imageY = Math.round(height * 0.09);
  const imageW = Math.round(width * 0.82);
  const imageH = Math.round(height * 0.82);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <filter id="bw">
        <feColorMatrix
          type="matrix"
          values="
            0.3333 0.3333 0.3333 0 0
            0.3333 0.3333 0.3333 0 0
            0.3333 0.3333 0.3333 0 0
            0      0      0      1 0"
        />
        <feComponentTransfer>
          <feFuncR type="gamma" amplitude="1" exponent="0.92" offset="0" />
          <feFuncG type="gamma" amplitude="1" exponent="0.92" offset="0" />
          <feFuncB type="gamma" amplitude="1" exponent="0.92" offset="0" />
        </feComponentTransfer>
      </filter>
    </defs>

    <rect width="${width}" height="${height}" fill="#ffffff" />

    <image
      href="${params.photoDataUrl}"
      x="${imageX}"
      y="${imageY}"
      width="${imageW}"
      height="${imageH}"
      preserveAspectRatio="xMidYMid meet"
      filter="url(#bw)"
      opacity="0.98"
    />

    ${getFrameSvg(params.frameStyle, width, height)}
  </svg>
  `;
}

function makeCertificateSvg(params: {
  photoDataUrl: string;
  paperSize: PaperSize;
  orientation: Orientation;
  frameStyle: SimpleFrameStyle;
  bgKey: CertificateBg;
  fontKey: FontKey;
  mainHeading: string;
  subtitle: string;
  bottomText: string;
  mainPos: Position;
  subtitlePos: Position;
  bottomPos: Position;
  mainSize: number;
  subtitleSize: number;
  bottomSize: number;
  mainRotate: number;
  subtitleRotate: number;
  bottomRotate: number;
}) {
  const { width, height } = getRenderSize(params.paperSize, params.orientation);
  const bg = BG_MAP[params.bgKey];
  const fontFamily = FONT_MAP[params.fontKey];

  const scale = width / 700;
  const scaledMainSize = Math.round(params.mainSize * scale);
  const scaledSubtitleSize = Math.round(params.subtitleSize * scale);
  const scaledBottomSize = Math.round(params.bottomSize * scale);

  const photoW = Math.round(width * 0.40);
  const photoH = Math.round(photoW * 1.20);
  const photoX = Math.round(width / 2 - photoW / 2);
  const photoY = Math.round(height * 0.31);

  const mainX = Math.round((params.mainPos.x / 100) * width);
  const mainY = Math.round((params.mainPos.y / 100) * height);
  const subX = Math.round((params.subtitlePos.x / 100) * width);
  const subY = Math.round((params.subtitlePos.y / 100) * height);
  const bottomX = Math.round((params.bottomPos.x / 100) * width);
  const bottomY = Math.round((params.bottomPos.y / 100) * height);

  const clipRx = Math.round(photoW * 0.09);
  const clipRy = Math.round(photoH * 0.09);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <filter id="blurA">
        <feGaussianBlur stdDeviation="95" />
      </filter>
      <filter id="blurB">
        <feGaussianBlur stdDeviation="48" />
      </filter>

      <clipPath id="photoClip">
        <rect
          x="${photoX}"
          y="${photoY}"
          width="${photoW}"
          height="${photoH}"
          rx="${clipRx}"
          ry="${clipRy}"
        />
      </clipPath>
    </defs>

    <rect width="${width}" height="${height}" fill="${bg.bg}" />

    <circle cx="${Math.round(width * 0.12)}" cy="${Math.round(height * 0.18)}" r="${Math.round(width * 0.16)}" fill="${bg.accentLight}" opacity="0.52" filter="url(#blurA)" />
    <circle cx="${Math.round(width * 0.84)}" cy="${Math.round(height * 0.20)}" r="${Math.round(width * 0.11)}" fill="${bg.accent}" opacity="0.14" filter="url(#blurA)" />
    <circle cx="${Math.round(width * 0.22)}" cy="${Math.round(height * 0.84)}" r="${Math.round(width * 0.14)}" fill="${bg.accentLight}" opacity="0.36" filter="url(#blurA)" />

    <circle cx="${Math.round(width * 0.12)}" cy="${Math.round(height * 0.18)}" r="16" fill="${bg.accent}" opacity="0.18" filter="url(#blurB)" />
    <circle cx="${Math.round(width * 0.82)}" cy="${Math.round(height * 0.16)}" r="24" fill="${bg.accentLight}" opacity="0.18" filter="url(#blurB)" />
    <circle cx="${Math.round(width * 0.14)}" cy="${Math.round(height * 0.86)}" r="26" fill="${bg.accentLight}" opacity="0.18" filter="url(#blurB)" />
    <circle cx="${Math.round(width * 0.88)}" cy="${Math.round(height * 0.84)}" r="18" fill="${bg.accent}" opacity="0.18" filter="url(#blurB)" />

    <rect
      x="${photoX}"
      y="${photoY}"
      width="${photoW}"
      height="${photoH}"
      rx="${clipRx}"
      ry="${clipRy}"
      fill="#ffffff"
      opacity="0.12"
    />

    <image
      href="${params.photoDataUrl}"
      x="${photoX}"
      y="${photoY}"
      width="${photoW}"
      height="${photoH}"
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#photoClip)"
    />

    <rect
      x="${photoX}"
      y="${photoY}"
      width="${photoW}"
      height="${photoH}"
      rx="${clipRx}"
      ry="${clipRy}"
      fill="none"
      stroke="rgba(255,255,255,0.55)"
      stroke-width="8"
    />

    <g transform="translate(${mainX} ${mainY}) rotate(${params.mainRotate})">
      <text
        x="0"
        y="0"
        text-anchor="middle"
        font-family="${escapeXml(fontFamily)}"
        font-size="${scaledMainSize}"
        font-weight="700"
        fill="#3B261C"
      >
        ${escapeXml(params.mainHeading)}
      </text>
    </g>

    <g transform="translate(${subX} ${subY}) rotate(${params.subtitleRotate})">
      <text
        x="0"
        y="0"
        text-anchor="middle"
        font-family="${escapeXml(fontFamily)}"
        font-size="${scaledSubtitleSize}"
        fill="#6A5448"
        font-style="italic"
      >
        ${escapeXml(params.subtitle)}
      </text>
    </g>

    <g transform="translate(${bottomX} ${bottomY}) rotate(${params.bottomRotate})">
      <text
        x="0"
        y="0"
        text-anchor="middle"
        font-family="${escapeXml(fontFamily)}"
        font-size="${scaledBottomSize}"
        fill="#6A5448"
        font-style="italic"
      >
        ${escapeXml(params.bottomText)}
      </text>
    </g>

    ${getFrameSvg(params.frameStyle, width, height)}
  </svg>
  `;
}

function getStickerShape(
  shapeMode: AvatarShapeMode,
  index: number,
  size: number,
  margin: number
) {
  const x = margin;
  const y = margin;
  const w = size - margin * 2;
  const h = size - margin * 2;

  const actualShape =
    shapeMode === "circle"
      ? "circle"
      : shapeMode === "rounded"
        ? "rounded"
        : index % 3 === 1
          ? "circle"
          : index % 3 === 2
            ? "soft"
            : "rounded";

  if (actualShape === "circle") {
    const r = Math.floor(w / 2);
    const cx = Math.floor(size / 2);
    const cy = Math.floor(size / 2);
    return {
      clip: `<circle cx="${cx}" cy="${cy}" r="${r}" />`,
      strokeOuter: `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ffffff" stroke-width="26" />`,
      strokeInner: `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(120,98,82,0.18)" stroke-width="6" />`,
    };
  }

  const rx = actualShape === "soft" ? 150 : 90;
  return {
    clip: `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${rx}" />`,
    strokeOuter: `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${rx}" fill="none" stroke="#ffffff" stroke-width="26" />`,
    strokeInner: `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${rx}" fill="none" stroke="rgba(120,98,82,0.18)" stroke-width="6" />`,
  };
}

function getStickerPalette(bgTone: AvatarBgTone, index: number) {
  const cream = ["#FFF7EC", "#FAF3E8", "#FFF9F2", "#F8EFE2"];
  const mint = ["#EEF9F0", "#E9F7EF", "#F4FFF7", "#EAF8F0"];
  const blush = ["#FFF0F4", "#FCEBF1", "#FFF6F8", "#F9E8EE"];
  const palette = bgTone === "mint" ? mint : bgTone === "blush" ? blush : cream;
  return palette[index % palette.length];
}

function getStickerStyleAdjustments(style: AvatarStyle, index: number) {
  const zooms =
    style === "bold"
      ? [1.24, 1.18, 1.16, 1.22, 1.20, 1.17, 1.23, 1.19, 1.15, 1.21, 1.18, 1.16]
      : style === "cute"
        ? [1.14, 1.10, 1.12, 1.13, 1.11, 1.09, 1.14, 1.10, 1.12, 1.13, 1.11, 1.09]
        : [1.08, 1.06, 1.07, 1.09, 1.05, 1.04, 1.08, 1.06, 1.07, 1.09, 1.05, 1.04];

  const offsets = [
    { x: 0, y: 0 },
    { x: -18, y: 4 },
    { x: 14, y: -8 },
    { x: -10, y: -12 },
    { x: 16, y: 8 },
    { x: -14, y: 10 },
    { x: 8, y: -14 },
    { x: -8, y: -6 },
    { x: 12, y: 12 },
    { x: -12, y: -4 },
    { x: 10, y: -10 },
    { x: -6, y: 14 },
  ];

  return {
    zoom: zooms[index % zooms.length],
    offset: offsets[index % offsets.length],
  };
}

function makeStickerSvg(params: {
  photoDataUrl: string;
  index: number;
  avatarStyle: AvatarStyle;
  avatarShapeMode: AvatarShapeMode;
  avatarBgTone: AvatarBgTone;
}) {
  const size = 800;
  const margin = 61; // 按比例縮放（78 * 800/1024 ≈ 61）
  const bg = getStickerPalette(params.avatarBgTone, params.index);
  const shape = getStickerShape(
    params.avatarShapeMode,
    params.index,
    size,
    margin
  );
  const adjust = getStickerStyleAdjustments(params.avatarStyle, params.index);

  const inner = size - margin * 2;
  const imgSize = Math.round(inner * adjust.zoom);
  const imgX = Math.round((size - imgSize) / 2 + adjust.offset.x);
  const imgY = Math.round((size - imgSize) / 2 + adjust.offset.y);

  const shadowOpacity =
    params.avatarStyle === "bold"
      ? 0.18
      : params.avatarStyle === "cute"
        ? 0.12
        : 0.10;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000000" flood-opacity="${shadowOpacity}" />
      </filter>

      <clipPath id="clipShape">
        ${shape.clip}
      </clipPath>
    </defs>

    <rect width="${size}" height="${size}" fill="transparent" />

    <g filter="url(#shadow)">
      ${shape.strokeOuter.replace('fill="none"', `fill="${bg}"`)}
    </g>

    <image
      href="${params.photoDataUrl}"
      x="${imgX}"
      y="${imgY}"
      width="${imgSize}"
      height="${imgSize}"
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#clipShape)"
    />

    ${shape.strokeOuter}
    ${shape.strokeInner}
  </svg>
  `;
}

async function rasterizeSvgToPng(svg: string) {
  // compressionLevel 3 比 9 快約 3-4 倍，檔案大小只輕微增加
  return sharp(Buffer.from(svg))
    .png({ compressionLevel: 3 })
    .toBuffer();
}

async function makePdfFromPng(
  pngBuffer: Buffer,
  paperSize: PaperSize,
  orientation: Orientation
) {
  const pdfDoc = await PDFDocument.create();
  const { width, height } = getPdfPageSize(paperSize, orientation);
  const page = pdfDoc.addPage([width, height]);
  const image = await pdfDoc.embedPng(pngBuffer);

  page.drawImage(image, {
    x: 0,
    y: 0,
    width,
    height,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

async function buildColoringPdf(params: {
  photoDataUrl: string;
  paperSize: PaperSize;
  orientation: Orientation;
  frameStyle: SimpleFrameStyle;
}) {
  const svg = makeColoringSvg(params);
  const png = await rasterizeSvgToPng(svg);
  return makePdfFromPng(png, params.paperSize, params.orientation);
}

async function buildCertificatePdf(params: {
  photoDataUrl: string;
  paperSize: PaperSize;
  orientation: Orientation;
  frameStyle: SimpleFrameStyle;
  bgKey: CertificateBg;
  fontKey: FontKey;
  mainHeading: string;
  subtitle: string;
  bottomText: string;
  mainPos: Position;
  subtitlePos: Position;
  bottomPos: Position;
  mainSize: number;
  subtitleSize: number;
  bottomSize: number;
  mainRotate: number;
  subtitleRotate: number;
  bottomRotate: number;
}) {
  const svg = makeCertificateSvg(params);
  const png = await rasterizeSvgToPng(svg);
  return makePdfFromPng(png, params.paperSize, params.orientation);
}

async function buildStickerZip(params: {
  photoDataUrl: string;
  avatarStyle: AvatarStyle;
  avatarShapeMode: AvatarShapeMode;
  avatarBgTone: AvatarBgTone;
}) {
  const zip = new JSZip();

  // ✅ 12張貼圖同時生成（平行處理）
  const stickerBuffers = await Promise.all(
    Array.from({ length: 12 }, (_, i) =>
      rasterizeSvgToPng(
        makeStickerSvg({
          photoDataUrl: params.photoDataUrl,
          index: i,
          avatarStyle: params.avatarStyle,
          avatarShapeMode: params.avatarShapeMode,
          avatarBgTone: params.avatarBgTone,
        })
      )
    )
  );

  stickerBuffers.forEach((png, i) => {
    zip.file(`sticker-${String(i + 1).padStart(2, "0")}.png`, png);
  });

  zip.file(
    "README.txt",
    [
      "Pet Keeps Art - Sticker Pack",
      "",
      "This ZIP contains 12 individual PNG stickers.",
      "You can upload or use them one by one on social apps and platforms.",
      "",
    ].join("\n")
  );

  return zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const orderId = normalizeText(formData.get("order_id"), "");
    const plan = normalizeText(formData.get("plan"), "bundle") as PlanId;
    const photo = formData.get("photo");
    const customizationRaw = formData.get("customization");

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id." }, { status: 400 });
    }

    const { data: order, error: fetchError } = await supabaseAdmin
      .from("orders")
      .select("id, status, download_url, customer_email")
      .eq("id", orderId)
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch order failed:", fetchError);
      return NextResponse.json({ error: "Failed to fetch order." }, { status: 500 });
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.status === "finalized") {
      const existingFiles = safeParseStoredFiles(order.download_url);
      if (existingFiles.coloring || existingFiles.keepsake || existingFiles.avatar) {
        return NextResponse.json({ ok: true, files: existingFiles });
      }

      return NextResponse.json(
        { error: "Order already finalized, but files were not found." },
        { status: 409 }
      );
    }

    if (order.status !== "paid") {
      return NextResponse.json(
        { error: "Order is not ready for finalization." },
        { status: 403 }
      );
    }

    if (!(photo instanceof File)) {
      return NextResponse.json(
        { error: "Missing uploaded photo." },
        { status: 400 }
      );
    }

    const customization: CustomizationPayload =
      typeof customizationRaw === "string" && customizationRaw.trim()
        ? JSON.parse(customizationRaw)
        : {};

    const photoBuffer = await fileToBuffer(photo);

    // 同時準備兩個尺寸：PDF 用 1200px，sticker 用 400px（sticker 輸出 800px，相片只佔一半）
    const [photoPngBuffer, photoStickerBuffer] = await Promise.all([
      sharp(photoBuffer)
        .rotate()
        .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 3 })
        .toBuffer(),
      sharp(photoBuffer)
        .rotate()
        .resize({ width: 400, height: 400, fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 3 })
        .toBuffer(),
    ]);
    const photoDataUrl = toDataUrl(photoPngBuffer, "image/png");
    const photoDataUrlSmall = toDataUrl(photoStickerBuffer, "image/png");

    const coloringPaperSize: PaperSize =
      customization.coloringPaperSize === "letter" ? "letter" : "a4";
    const coloringOrientation: Orientation =
      customization.coloringOrientation === "landscape" ? "landscape" : "portrait";
    const coloringFrameStyle: SimpleFrameStyle =
      customization.coloringFrameStyle === "thinLine"
        ? "thinLine"
        : customization.coloringFrameStyle === "doubleLine"
          ? "doubleLine"
          : "none";

    const certificatePaperSize: PaperSize =
      customization.certificatePaperSize === "letter" ? "letter" : "a4";
    const certificateOrientation: Orientation =
      customization.certificateOrientation === "landscape" ? "landscape" : "portrait";
    const certificateFrameStyle: SimpleFrameStyle =
      customization.certificateFrameStyle === "thinLine"
        ? "thinLine"
        : customization.certificateFrameStyle === "doubleLine"
          ? "doubleLine"
          : "none";

    const certificateBg: CertificateBg =
      customization.certificateBg && customization.certificateBg in BG_MAP
        ? customization.certificateBg
        : "linenBeige";

    const certificateFont: FontKey =
      customization.certificateFont && customization.certificateFont in FONT_MAP
        ? customization.certificateFont
        : "elegantSerif";

    const mainHeading = normalizeText(customization.certificateMainHeading, "Your Main Heading");
    const subtitle = normalizeText(customization.certificateSubtitle, "Your subtitle goes here");
    const bottomText = normalizeText(customization.certificateBottomText, "Your bottom text");

    const certMainPos = normalizePosition(customization.certMainPos, { x: 50, y: 14 });
    const certSubtitlePos = normalizePosition(customization.certSubtitlePos, { x: 50, y: 25 });
    const certBottomPos = normalizePosition(customization.certBottomPos, { x: 50, y: 84 }, SAFE_MIN_POS, 86);

    const certMainSize = normalizeNumber(customization.certMainSize, 56, 28, 84);
    const certSubtitleSize = normalizeNumber(customization.certSubtitleSize, 28, 18, 48);
    const certBottomSize = normalizeNumber(customization.certBottomSize, 24, 16, 42);

    const certMainRotate = normalizeNumber(customization.certMainRotate, 0, -20, 20);
    const certSubtitleRotate = normalizeNumber(customization.certSubtitleRotate, 0, -20, 20);
    const certBottomRotate = normalizeNumber(customization.certBottomRotate, 0, -20, 20);

    const avatarStyle: AvatarStyle =
      customization.avatarStyle === "cute"
        ? "cute"
        : customization.avatarStyle === "bold"
          ? "bold"
          : "clean";

    const avatarShapeMode: AvatarShapeMode =
      customization.avatarShapeMode === "rounded"
        ? "rounded"
        : customization.avatarShapeMode === "circle"
          ? "circle"
          : "mixed";

    const avatarBgTone: AvatarBgTone =
      customization.avatarBgTone === "mint"
        ? "mint"
        : customization.avatarBgTone === "blush"
          ? "blush"
          : "cream";

    // ✅ 改動在這裡：三件事同時做，不再排隊等
    const tasks: Promise<Buffer | undefined>[] = [];
    const taskKeys: ("coloring" | "keepsake" | "avatar")[] = [];

    if (plan === "bundle" || plan === "coloring") {
      tasks.push(
        buildColoringPdf({
          photoDataUrl,
          paperSize: coloringPaperSize,
          orientation: coloringOrientation,
          frameStyle: coloringFrameStyle,
        })
      );
      taskKeys.push("coloring");
    }

    if (plan === "bundle" || plan === "keepsake") {
      tasks.push(
        buildCertificatePdf({
          photoDataUrl,
          paperSize: certificatePaperSize,
          orientation: certificateOrientation,
          frameStyle: certificateFrameStyle,
          bgKey: certificateBg,
          fontKey: certificateFont,
          mainHeading,
          subtitle,
          bottomText,
          mainPos: certMainPos,
          subtitlePos: certSubtitlePos,
          bottomPos: certBottomPos,
          mainSize: certMainSize,
          subtitleSize: certSubtitleSize,
          bottomSize: certBottomSize,
          mainRotate: certMainRotate,
          subtitleRotate: certSubtitleRotate,
          bottomRotate: certBottomRotate,
        })
      );
      taskKeys.push("keepsake");
    }

    if (plan === "bundle" || plan === "avatar") {
      tasks.push(
        buildStickerZip({
          photoDataUrl: photoDataUrlSmall,
          avatarStyle,
          avatarShapeMode,
          avatarBgTone,
        })
      );
      taskKeys.push("avatar");
    }

    // 🚀 同時生成所有檔案
    const results = await Promise.all(tasks);

    const files: DownloadFiles = {};
    taskKeys.forEach((key, i) => {
      const buf = results[i];
      if (!buf) return;
      if (key === "coloring") files.coloring = toDataUrl(buf, "application/pdf");
      if (key === "keepsake") files.keepsake = toDataUrl(buf, "application/pdf");
      if (key === "avatar") files.avatar = toDataUrl(buf, "application/zip");
    });

    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        status: "finalized",
        finalized_at: new Date().toISOString(),
        download_url: JSON.stringify(files),
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Update finalized order failed:", updateError);
      return NextResponse.json(
        { error: "Failed to finalize order." },
        { status: 500 }
      );
    }

    // Send email in background — do NOT await, so download response is instant
    const customerEmail = (order as any).customer_email as string | null;
    if (customerEmail) {
      // Fire-and-forget: build attachments and send email without blocking the response
      (async () => {
        try {
          function dataUrlToBuffer(dataUrl: string): Buffer {
            const base64 = dataUrl.replace(/^data:[^;]+;base64,/, "");
            return Buffer.from(base64, "base64");
          }

          const attachments: { filename: string; content: Buffer }[] = [];
          if (files.coloring) attachments.push({ filename: "coloring-page.pdf", content: dataUrlToBuffer(files.coloring!) });
          if (files.keepsake) attachments.push({ filename: "keepsake-certificate.pdf", content: dataUrlToBuffer(files.keepsake!) });
          if (files.avatar)   attachments.push({ filename: "avatar-pack.zip",          content: dataUrlToBuffer(files.avatar!) });

          const totalBytes = attachments.reduce((sum, a) => sum + a.content.byteLength, 0);
          const useAttachments = totalBytes <= 35 * 1024 * 1024;

          const fileList = [
            files.coloring ? "🎨 <strong>Coloring Page</strong> (coloring-page.pdf)" : "",
            files.keepsake ? "🏅 <strong>Keepsake Certificate</strong> (keepsake-certificate.pdf)" : "",
            files.avatar   ? "🐾 <strong>12 Avatar Pack</strong> (avatar-pack.zip)" : "",
          ].filter(Boolean).map(item => `<li>${item}</li>`).join("");

          const emailResult = await resend.emails.send({
            from: FROM_ADDRESS,
            to: customerEmail,
            subject: "🐾 Your Pet Keeps Art files are ready!",
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;">
                <h2 style="color:#5a7a68;">Your Pet Keeps Art files are ready! 🎉</h2>
                <p>Hi there! Your personalized pet art files have been generated successfully.</p>
                ${useAttachments
                  ? `<p>Please find your files attached to this email:</p><ul>${fileList}</ul>`
                  : `<p>Your files have been downloaded in your browser. Please check your browser downloads folder for:</p><ul>${fileList}</ul>`
                }
                <p style="font-size:13px;color:#888;">
                  Print or share your files — we hope you love them!<br/>
                  Thank you for choosing Pet Keeps Art. 🐾
                </p>
              </div>
            `,
            attachments: useAttachments ? attachments : [],
          });

          if ((emailResult as any)?.error) {
            console.error("Resend finalize email error:", (emailResult as any).error);
          } else {
            console.log(`Finalize email sent to ${customerEmail} for order ${orderId}`);
          }
        } catch (emailErr) {
          console.error("Failed to send finalize email:", emailErr);
        }
      })();
    }

    return NextResponse.json({ ok: true, files });
  } catch (error) {
    console.error("finalize-download route error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}