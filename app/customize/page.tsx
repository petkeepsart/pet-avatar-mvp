"use client";




import React, { useEffect, useRef, useState, useId } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";




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
  | "linenBeige"
  | "white"
  | "custom";




type FontKey =
  | "elegantSerif"
  | "classicSerif"
  | "modernSans"
  | "softHandwritten"
  | "cuteRounded"
  | "playfulScript";




type AvatarStyle = "clean" | "cute" | "bold" | "happy" | "sleepy" | "cool" | "party";
type AvatarShapeMode = "mixed" | "rounded" | "circle";
type AvatarBgTone = "cream" | "mint" | "blush";




type Position = { x: number; y: number };




type DragState =
  | {
    mode: "cert";
    target: "main" | "subtitle" | "bottom";
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }
  | null;




type BundleStatus = "not_started" | "editing" | "ready";


type DownloadablePlanId = "coloring" | "keepsake" | "avatar";

// Template base names (no orientation/size suffix)
type TemplateBaseName = "floral" | "birthday" | "minimal" | "rainbow";
type TemplateKey = TemplateBaseName | "none" | "customDesign";

type TemplateSizeKey = "a4_portrait" | "a4_landscape" | "letter_portrait" | "letter_landscape";

// Fixed image map — one image per paper+orientation combination, no dynamic scaling
const TEMPLATE_IMAGE_MAP: Record<TemplateBaseName, Record<TemplateSizeKey, string>> = {
  floral: {
    a4_portrait: "/templates/floral_a4_portrait.png",
    a4_landscape: "/templates/floral_a4_landscape.png",
    letter_portrait: "/templates/floral_letter_portrait.png",
    letter_landscape: "/templates/floral_letter_landscape.png",
  },
  birthday: {
    a4_portrait: "/templates/birthday_a4_portrait.png",
    a4_landscape: "/templates/birthday_a4_landscape.png",
    letter_portrait: "/templates/birthday_letter_portrait.png",
    letter_landscape: "/templates/birthday_letter_landscape.png",
  },
  minimal: {
    a4_portrait: "/templates/minimal_a4_portrait.png",
    a4_landscape: "/templates/minimal_a4_landscape.png",
    letter_portrait: "/templates/minimal_letter_portrait.png",
    letter_landscape: "/templates/minimal_letter_landscape.png",
  },
  rainbow: {
    a4_portrait: "/templates/rainbow_a4_portrait.png",
    a4_landscape: "/templates/rainbow_a4_landscape.png",
    letter_portrait: "/templates/rainbow_letter_portrait.png",
    letter_landscape: "/templates/rainbow_letter_landscape.png",
  },
};

// Helper: resolve correct template image for current paper size + orientation
function getTemplateImageSrc(
  template: TemplateKey,
  paperSize: PaperSize,
  orientation: Orientation
): string {
  if (template === "none" || template === "customDesign") return "";
  const sizeKey: TemplateSizeKey = `${paperSize}_${orientation}`;
  return TEMPLATE_IMAGE_MAP[template as TemplateBaseName]?.[sizeKey] ?? "";
}

// Helper: get dynamic aspect ratio string
function getDynamicAspectRatio(paperSize: PaperSize, orientation: Orientation): string {
  if (paperSize === "a4") {
    return orientation === "portrait" ? "210/297" : "297/210";
  }
  return orientation === "portrait" ? "8.5/11" : "11/8.5";
}

const TEMPLATE_LABELS: Record<string, string> = {
  floral: "🌸 Floral",
  birthday: "🎂 Birthday",
  minimal: "✦ Minimal",
  rainbow: "🌈 Rainbow",
  none: "✕ No Template",
  customDesign: "🎨 Custom Design",
};

// Default text positions applied when switching templates
const TEMPLATE_TEXT_DEFAULTS: Partial<Record<TemplateKey, {
  main: { x: number; y: number }; subtitle: { x: number; y: number }; bottom: { x: number; y: number };
  mainSize: number; subtitleSize: number; bottomSize: number;
}>> = {
  floral: { main: { x: 50, y: 13 }, subtitle: { x: 50, y: 23 }, bottom: { x: 50, y: 84 }, mainSize: 38, subtitleSize: 26, bottomSize: 22 },
  birthday: { main: { x: 50, y: 13 }, subtitle: { x: 50, y: 23 }, bottom: { x: 50, y: 84 }, mainSize: 38, subtitleSize: 26, bottomSize: 22 },
  minimal: { main: { x: 50, y: 13 }, subtitle: { x: 50, y: 23 }, bottom: { x: 50, y: 84 }, mainSize: 38, subtitleSize: 26, bottomSize: 22 },
  rainbow: { main: { x: 50, y: 13 }, subtitle: { x: 50, y: 23 }, bottom: { x: 50, y: 84 }, mainSize: 38, subtitleSize: 26, bottomSize: 22 },
  none: { main: { x: 50, y: 14 }, subtitle: { x: 50, y: 25 }, bottom: { x: 50, y: 84 }, mainSize: 38, subtitleSize: 28, bottomSize: 24 },
  customDesign: { main: { x: 50, y: 14 }, subtitle: { x: 50, y: 25 }, bottom: { x: 50, y: 84 }, mainSize: 38, subtitleSize: 28, bottomSize: 24 },
};


const DOWNLOAD_FILE_NAMES: Record<LocaleKey, Record<DownloadablePlanId, string>> = {
  en: {
    coloring: "Pet-Keeps-Art-Coloring-Page.pdf",
    keepsake: "Pet-Keeps-Art-Keepsake-Certificate.pdf",
    avatar: "Pet-Keeps-Art-12-Avatar-Pack.zip",
  },
  "zh-hk": {
    coloring: "Pet-Keeps-Art-填色畫紙.pdf",
    keepsake: "Pet-Keeps-Art-紀念證書.pdf",
    avatar: "Pet-Keeps-Art-12款頭像包.zip",
  },
  "zh-cn": {
    coloring: "Pet-Keeps-Art-填色画纸.pdf",
    keepsake: "Pet-Keeps-Art-纪念证书.pdf",
    avatar: "Pet-Keeps-Art-12款头像包.zip",
  },
  ja: {
    coloring: "Pet-Keeps-Art-塗り絵.pdf",
    keepsake: "Pet-Keeps-Art-記念証明書.pdf",
    avatar: "Pet-Keeps-Art-12アバターパック.zip",
  },
  ko: {
    coloring: "Pet-Keeps-Art-컬러링-페이지.pdf",
    keepsake: "Pet-Keeps-Art-기념-인증서.pdf",
    avatar: "Pet-Keeps-Art-12-아바타-팩.zip",
  },
  es: {
    coloring: "Pet-Keeps-Art-Pagina-para-Colorear.pdf",
    keepsake: "Pet-Keeps-Art-Certificado-de-Recuerdo.pdf",
    avatar: "Pet-Keeps-Art-Paquete-de-12-Avatares.zip",
  },
  de: {
    coloring: "Pet-Keeps-Art-Ausmalbild.pdf",
    keepsake: "Pet-Keeps-Art-Zertifikat.pdf",
    avatar: "Pet-Keeps-Art-12-Avatar-Paket.zip",
  },
  ar: {
    coloring: "Pet-Keeps-Art-صفحة-تلوين.pdf",
    keepsake: "Pet-Keeps-Art-شهادة-تذكارية.pdf",
    avatar: "Pet-Keeps-Art-باقة-12-صورة-رمزية.zip",
  },
};


// --- 多語言設定開始 ---
type LocaleKey = "en" | "zh-hk" | "zh-cn" | "ja" | "ko" | "es" | "de" | "ar";




const LANGUAGE_OPTIONS: { key: LocaleKey; label: string }[] = [
  { key: "en", label: "ENG" },
  { key: "zh-hk", label: "繁中" },
  { key: "zh-cn", label: "简中" },
  { key: "ja", label: "日本語" },
  { key: "ko", label: "한국어" },
  { key: "es", label: "Español" },
  { key: "de", label: "Deutsch" },
  { key: "ar", label: "العربية" },
];




const HOME_PATH_BY_LOCALE: Record<LocaleKey, string> = {
  en: "/",
  "zh-hk": "/zh-hk",
  "zh-cn": "/zh-cn",
  ja: "/ja",
  ko: "/ko",
  es: "/es",
  de: "/de",
  ar: "/ar",
};




function normalizeLocale(value: string | null): LocaleKey {
  const validLocales = ["en", "zh-hk", "zh-cn", "ja", "ko", "es", "de", "ar"];
  return validLocales.includes(value as string) ? (value as LocaleKey) : "en";
}


interface CustomizeTranslation {
  step2: string;
  resetLayout: string;
  orientation: string;
  portrait: string;
  landscape: string;
  paperSize: string;
  a4: string;
  letter: string;
  borderStyle: string;
  printerFriendly: string;
  none: string;
  thinLine: string;
  doubleLine: string;
  bgColor: string;
  fontStyle: string;
  petNameHeading: string;
  subtitle: string;
  bottomText: string;
  textSize: string;
  rotation: string;
  xPos: string;
  yPos: string;
  resetPos: string;
  bgLabels: Record<string, string>;
  fontLabels: Record<string, string>;
  placeholders: {
    petName: string;
    subtitle: string;
    bottomText: string;
  };
}

const FALLBACK_TRANSLATION = {
  back: "Back",
  orderLabel: "Order:",
  plans: {
    bundle: "Bundle Deal",
    coloring: "Coloring Page",
    keepsake: "Keepsake Certificate",
    avatar: "12 Avatar Pack",
  },
  banners: {
    blocked: "Sorry, service not available in Québec.",
    missingProv: "Please go back and select your province.",
    missingOrder: "Invalid link. Order not found.",
    checking: "Checking your order...",
    verifying: "Verifying payment... Please wait a moment.",
    invalid: "Invalid order link.",
    finalized: "Order already finalized. This link is now download-only.",
    paymentRecv: "Payment received. Upload photo below.",
    highResReady: "Order finalized. High-res files ready.",
    noStripeEmail: "Checkout email not found. Will use Stripe record if available.",
  },
  upload: {
    canvasReady: "Canvas is Ready",
    uploadPrompt: "Upload pet photo on the right to start.",
    designsReady: "Designs Ready",
    downloadPrompt: "Please download your files on the right.",
    hint: "Tip: Drag text on the canvas, or use the sliders to adjust position.",
    step1: "Upload Photo",
    draftRestored: "✨ Draft restored. Please upload photo to preview.",
    clickToUpload: "Click to upload photo",
    fileTypes: "JPG, PNG, WEBP (Max 15MB)",
    browse: "Browse",
    uploaded: "Photo Uploaded",
    replace: "Replace",
    remove: "Remove",
    draftSaved: "Draft settings saved. Upload new photo to continue.",
  },
  bundle: {
    title: "Bundle Items",
    coloringSub: "Printable PDF",
    keepsakeSub: "Keepsake PDF",
    avatarSub: "PNG Pack",
    statusReady: "Ready",
    statusEditing: "Editing",
    statusNotStarted: "Not Started",
  },
  customize: {
    step2: "Customize",
    resetLayout: "Reset Layout",
    orientation: "Orientation",
    portrait: "Portrait",
    landscape: "Landscape",
    paperSize: "Paper Size",
    a4: "A4",
    letter: "Letter",
    borderStyle: "Border Style",
    printerFriendly: "Printer-friendly",
    none: "None",
    thinLine: "Thin Line",
    doubleLine: "Double Line",
    bgColor: "Background Color",
    fontStyle: "Font Style",
    petNameHeading: "Pet Name / Main Heading",
    subtitle: "Subtitle",
    bottomText: "Bottom Text",
    textSize: "Text Size",
    rotation: "Rotation",
    xPos: "← Left / Right →",
    yPos: "↑ Up / Down ↓",
    resetPos: "Reset",
    bgLabels: {
      warmCream: "Warm Cream",
      blushPink: "Blush Pink",
      softMint: "Soft Mint",
      ivory: "Ivory",
      dustyBlue: "Dusty Blue",
      linenBeige: "Linen Beige",
      white: "White",
      custom: "Custom",
    },
    fontLabels: {
      elegantSerif: "Elegant Serif",
      classicSerif: "Classic Serif",
      modernSans: "Modern Sans",
      softHandwritten: "Soft Handwritten",
      cuteRounded: "Cute Rounded",
      playfulScript: "Playful Script",
    },
    placeholders: {
      petName: "e.g. Charlie🐾",
      subtitle: "e.g. Forever in our hearts💛",
      bottomText: "e.g. 2010 - 2026 · Always loved",
    },
  },
  avatar: {
    autoGenMsg1: "Your avatar pack will be",
    autoGenMsg2: "automatically generated",
    autoGenMsg3: "from your photo using AI. Guide the overall feel below.",
    avatarStyle: "Avatar Style",
    clean: "Clean",
    cleanDesc: "Simple & minimal",
    cute: "Cute",
    cuteDesc: "Soft & playful",
    bold: "Bold",
    boldDesc: "Vivid & expressive",
    shapeStyle: "Frame Shape",
    mixed: "Mixed",
    mixedDesc: "Variety of shapes",
    rounded: "Rounded",
    roundedDesc: "Square rounded frames",
    circle: "Circle",
    circleDesc: "Round portrait frames",
    previewBg: "Preview Background",
    cream: "Cream",
    mint: "Mint",
    blush: "Blush",
    features: [
      "12 unique effects",
      "Style-guided preview",
      "High-res final pack",
      "No extra editing",
    ],
    previewTitle: "12-Avatar AI Preview",
    happy: "😄 Happy",
    happyDesc: "Bright & joyful",
    sleepy: "😴 Sleepy",
    sleepyDesc: "Soft & dreamy",
    cool: "😎 Cool",
    coolDesc: "Blue & stylish",
    party: "🎉 Party",
    partyDesc: "Bold & festive"
  },
  finalize: {
    step3: "Finalize Order",
    downloadsTitle: "Your Order Downloads",
    readyTitle: "Your Keepsakes are Ready!",
    readySub: "High-resolution files generated.",
    sentTo: "Files sent to:",
    download: "Download",
    blockedMsg:
      "If your browser blocked the automatic download, please use the buttons above.",
    bundleValue: "Bundle Value:",
    save23: "SAVE 23%",
    totalPaid: "Total Paid:",
    deliveryEmail: "Delivery Email (Read-only)",
    confirm:
      "I confirm my designs are ready. I understand this action is final and will instantly generate high-res watermark-free files.",
    generateBtn: "❤️ Create My Pet Keepsake",
    processing: "Processing Files...",
    prepareSteps: [
      "Uploading your photo...",
      "Creating coloring page...",
      "Designing your certificate...",
      "Generating avatar stickers...",
      "Almost ready! Packaging files...",
    ],
    guarantees: ["Satisfaction Guarantee", "Secure Payment", "High-Res Export"],
  },
};




const TRANSLATIONS: Record<LocaleKey, any> = {
  en: FALLBACK_TRANSLATION,
  "zh-hk": {
    back: "返回",
    orderLabel: "訂單：",
    plans: {
      bundle: "超值套裝",
      coloring: "填色畫紙",
      keepsake: "紀念證書",
      avatar: "12款頭像包",
    },
    banners: {
      blocked: "抱歉，魁北克省暫不提供此服務。",
      missingProv: "請返回並先選擇您的省份。",
      missingOrder: "連結無效，找不到訂單。",
      checking: "正在檢查您的訂單...",
      verifying: "正在確認付款，請稍候...",
      invalid: "訂單連結無效。",
      finalized: "訂單已完成，此連結目前僅供下載。",
      paymentRecv: "已收到付款，請在下方上傳照片。",
      highResReady: "訂單已完成，高畫質檔案已準備就緒。",
      noStripeEmail: "找不到結帳電郵，將使用 Stripe 紀錄（如有）。",
    },
    upload: {
      canvasReady: "畫布已準備好",
      uploadPrompt: "請在右側上傳寵物照片以開始。",
      designsReady: "設計已完成",
      downloadPrompt: "請在右側下載您的檔案。",
      hint: "提示：可在畫布上拖曳文字，或使用左右／上下滑桿調整位置。",
      step1: "上傳照片",
      draftRestored: "✨ 已恢復草稿。請上傳照片以預覽。",
      clickToUpload: "點擊上傳照片",
      fileTypes: "JPG, PNG, WEBP (最大 15MB)",
      browse: "瀏覽檔案",
      uploaded: "照片已上傳",
      replace: "更換",
      remove: "移除",
      draftSaved: "草稿已儲存。請上傳新照片以繼續。",
    },
    bundle: {
      title: "套裝項目",
      coloringSub: "可列印 PDF",
      keepsakeSub: "紀念 PDF",
      avatarSub: "PNG 圖檔包",
      statusReady: "已準備",
      statusEditing: "編輯中",
      statusNotStarted: "未開始",
    },
    customize: {
      step2: "客製化",
      resetLayout: "重設排版",
      orientation: "方向",
      portrait: "直向",
      landscape: "橫向",
      paperSize: "紙張尺寸",
      a4: "A4",
      letter: "Letter",
      borderStyle: "邊框樣式",
      printerFriendly: "適合列印",
      none: "無",
      thinLine: "細線",
      doubleLine: "雙線",
      bgColor: "背景顏色",
      fontStyle: "字體風格",
      petNameHeading: "寵物名字 / 主標題",
      subtitle: "副標題",
      bottomText: "底部文字",
      textSize: "文字大小",
      rotation: "旋轉角度",
      xPos: "← 左右 →",
      yPos: "↑ 上下 ↓",
      resetPos: "重設",
      bgLabels: {
        warmCream: "暖奶油",
        blushPink: "淡玫瑰",
        softMint: "薄荷綠",
        ivory: "象牙白",
        dustyBlue: "霧藍",
        linenBeige: "亞麻米",
        white: "純白",
        custom: "自訂",
      },
      fontLabels: {
        elegantSerif: "優雅襯線",
        classicSerif: "古典襯線",
        modernSans: "現代黑體",
        softHandwritten: "柔和手寫",
        cuteRounded: "可愛圓體",
        playfulScript: "活潑草書",
      },
      placeholders: {
        petName: "例如：小白🐾",
        subtitle: "例如：永遠在我們心中💛",
        bottomText: "例如：2010 - 2026 · 永遠愛你",
      },
    },
    avatar: {
      autoGenMsg1: "您的頭像包將由 AI",
      autoGenMsg2: "自動生成",
      autoGenMsg3: "。請在下方選擇您想要的整體風格。",
      avatarStyle: "頭像風格",
      clean: "清晰乾淨",
      cleanDesc: "簡約清爽風格",
      cute: "可愛活潑",
      cuteDesc: "柔和俏皮感",
      bold: "大膽鮮明",
      boldDesc: "色彩鮮艷有力",
      shapeStyle: "頭像框形",
      mixed: "混合",
      mixedDesc: "多種形狀搭配",
      rounded: "圓角方框",
      roundedDesc: "柔和方形邊框",
      circle: "圓形",
      circleDesc: "圓形肖像框",
      previewBg: "預覽背景色",
      cream: "奶油白",
      mint: "薄荷綠",
      blush: "胭脂粉",
      features: [
        "12 款獨特濾鏡",
        "風格導向預覽",
        "高畫質最終圖包",
        "無需額外編輯",
      ],
      previewTitle: "12 款 AI 頭像預覽",
      happy: "😄 開心",
      happyDesc: "明亮活潑",
      sleepy: "😴 睡眼",
      sleepyDesc: "柔和夢幻",
      cool: "😎 型酷",
      coolDesc: "藍調時尚",
      party: "🎉 派對",
      partyDesc: "繽紛節日感",
    },
    finalize: {
      step3: "確認訂單",
      downloadsTitle: "下載您的訂單檔案",
      readyTitle: "您的紀念品已準備好！",
      readySub: "高畫質檔案已成功生成。",
      sentTo: "檔案已發送至：",
      download: "下載",
      blockedMsg: "如果您的瀏覽器阻擋了自動下載，請使用上方按鈕。",
      bundleValue: "套裝總值：",
      save23: "節省 23%",
      totalPaid: "實付總額：",
      deliveryEmail: "接收電郵 (唯讀)",
      confirm:
        "我確認設計已完成。我明白此操作為最終決定，系統將立即生成無浮水印的高畫質檔案。",
      generateBtn: "❤️ 立即製作我的寵物紀念品",
      processing: "檔案處理中...",
      prepareSteps: [
        "正在上傳您的照片...",
        "正在製作填色頁...",
        "正在設計紀念證書...",
        "正在生成頭像貼紙...",
        "快完成了！正在打包檔案...",
      ],
      guarantees: ["滿意保證", "安全付款", "高畫質輸出"],
    },
  },
  "zh-cn": {
    back: "返回",
    orderLabel: "订单：",
    plans: {
      bundle: "超值套装",
      coloring: "填色画纸",
      keepsake: "纪念证书",
      avatar: "12款头像包",
    },
    banners: {
      blocked: "抱歉，魁北克省暂不提供此服务。",
      missingProv: "请返回并先选择您的省份。",
      missingOrder: "链接无效，找不到订单。",
      checking: "正在检查您的订单...",
      verifying: "正在确认付款，请稍候...",
      invalid: "订单链接无效。",
      finalized: "订单已完成，此链接目前仅供下载。",
      paymentRecv: "已收到付款，请在下方上传照片。",
      highResReady: "订单已完成，高画质文件已准备就绪。",
      noStripeEmail: "找不到结账电邮，将使用 Stripe 记录（如有）。",
    },
    upload: {
      canvasReady: "画布已准备好",
      uploadPrompt: "请在右侧上传宠物照片以开始。",
      designsReady: "设计已完成",
      downloadPrompt: "请在右侧下载您的文件。",
      hint: "提示：可在画布上拖曳文字，或使用左右／上下滑杆调整位置。",
      step1: "上传照片",
      draftRestored: "✨ 已恢复草稿。请上传照片以预览。",
      clickToUpload: "点击上传照片",
      fileTypes: "JPG, PNG, WEBP (最大 15MB)",
      browse: "浏览文件",
      uploaded: "照片已上传",
      replace: "更换",
      remove: "移除",
      draftSaved: "草稿已保存。请上传新照片以继续。",
    },
    bundle: {
      title: "套装项目",
      coloringSub: "可打印 PDF",
      keepsakeSub: "纪念 PDF",
      avatarSub: "PNG 图档包",
      statusReady: "已准备",
      statusEditing: "编辑中",
      statusNotStarted: "未开始",
    },
    customize: {
      step2: "定制",
      resetLayout: "重设排版",
      orientation: "方向",
      portrait: "竖向",
      landscape: "横向",
      paperSize: "纸张尺寸",
      a4: "A4",
      letter: "Letter",
      borderStyle: "边框样式",
      printerFriendly: "适合打印",
      none: "无",
      thinLine: "细线",
      doubleLine: "双线",
      bgColor: "背景颜色",
      fontStyle: "字体风格",
      petNameHeading: "宠物名字 / 主标题",
      subtitle: "副标题",
      bottomText: "底部文字",
      textSize: "文字大小",
      rotation: "旋转角度",
      xPos: "← 左右 →",
      yPos: "↑ 上下 ↓",
      resetPos: "重设",
      bgLabels: {
        warmCream: "暖奶油",
        blushPink: "淡玫瑰",
        softMint: "薄荷绿",
        ivory: "象牙白",
        dustyBlue: "雾蓝",
        linenBeige: "亚麻米",
        white: "纯白",
        custom: "自定义",
      },
      fontLabels: {
        elegantSerif: "优雅衬线",
        classicSerif: "古典衬线",
        modernSans: "现代黑体",
        softHandwritten: "柔和手写",
        cuteRounded: "可爱圆体",
        playfulScript: "活泼草书",
      },
      placeholders: {
        petName: "例如：小白🐾",
        subtitle: "例如：永远在我们心中💛",
        bottomText: "例如：2010 - 2026 · 永远爱你",
      },
    },
    avatar: {
      autoGenMsg1: "您的头像包将由 AI",
      autoGenMsg2: "自动生成",
      autoGenMsg3: "。请在下方选择您想要的整体风格。",
      avatarStyle: "头像风格",
      clean: "清晰干净",
      cute: "可爱活泼",
      bold: "大胆鲜明",
      shapeStyle: "形状样式",
      mixed: "混合",
      rounded: "圆角",
      roundedDesc: "柔和方形边框",
      circle: "圆形",
      circleDesc: "圆形肖像框",
      mixedDesc: "多种形状搭配",
      previewBg: "预览背景色",
      cream: "奶油白",
      mint: "薄荷绿",
      blush: "胭脂粉",
      features: [
        "12 款独特滤镜",
        "风格导向预览",
        "高画质最终图包",
        "无需额外编辑",
      ],
      previewTitle: "12 款 AI 头像预览",
      happy: "😄 开心",
      happyDesc: "明亮活泼",
      sleepy: "😴 睡眼",
      sleepyDesc: "柔和梦幻",
      cool: "😎 型酷",
      coolDesc: "蓝调时尚",
      party: "🎉 派对",
      partyDesc: "缤纷节日感",
    },
    finalize: {
      step3: "确认订单",
      downloadsTitle: "下载您的订单文件",
      readyTitle: "您的纪念品已准备好！",
      readySub: "高画质文件已成功生成。",
      sentTo: "文件已发送至：",
      download: "下载",
      blockedMsg: "如果您的浏览器阻挡了自动下载，请使用上方按钮。",
      bundleValue: "套装总值：",
      save23: "节省 23%",
      totalPaid: "实付总额：",
      deliveryEmail: "接收电邮 (只读)",
      confirm:
        "我确认设计已完成。我明白此操作为最终决定，系统将立即生成无水印的高画质文件。",
      generateBtn: "❤️ 立即制作我的宠物纪念品",
      processing: "文件处理中...",
      prepareSteps: [
        "正在上传您的照片...",
        "正在制作填色页...",
        "正在设计纪念证书...",
        "正在生成头像贴纸...",
        "快完成了！正在打包文件...",
      ],
      guarantees: ["满意保证", "安全付款", "高画质输出"],
    },
  },
  ja: {
    back: "戻る",
    orderLabel: "注文：",
    plans: {
      bundle: "バンドルセット",
      coloring: "塗り絵",
      keepsake: "記念証明書",
      avatar: "12アバターパック",
    },
    banners: {
      blocked: "申し訳ありませんが、ケベック州ではこのサービスを利用できません。",
      missingProv: "戻って州を選択してください。",
      missingOrder: "無効なリンク。注文が見つかりません。",
      checking: "注文を確認しています...",
      verifying: "支払いを確認しています。しばらくお待ちください。",
      invalid: "無効な注文リンクです。",
      finalized: "注文は完了しました。このリンクはダウンロード専用です。",
      paymentRecv: "支払いを受け付けました。下に写真をアップロードしてください。",
      highResReady: "注文が確定しました。高解像度ファイルの準備ができました。",
      noStripeEmail: "メールが見つかりません。Stripeの記録を使用します。",
    },
    upload: {
      canvasReady: "キャンバスの準備完了",
      uploadPrompt: "右側にペットの写真をアップロードして開始してください。",
      designsReady: "デザイン準備完了",
      downloadPrompt: "右側からファイルをダウンロードしてください。",
      hint: "ヒント：キャンバス上でテキストをドラッグするか、スライダーで位置を調整できます。",
      step1: "写真をアップロード",
      draftRestored: "✨ 下書きを復元しました。プレビューするには写真をアップロードしてください。",
      clickToUpload: "クリックしてアップロード",
      fileTypes: "JPG, PNG, WEBP (最大 15MB)",
      browse: "参照",
      uploaded: "アップロード完了",
      replace: "置き換え",
      remove: "削除",
      draftSaved: "下書きを保存しました。続行するには新しい写真をアップロードしてください。",
    },
    bundle: {
      title: "バンドルアイテム",
      coloringSub: "印刷可能なPDF",
      keepsakeSub: "記念PDF",
      avatarSub: "PNGパック",
      statusReady: "準備完了",
      statusEditing: "編集中",
      statusNotStarted: "未開始",
    },
    customize: {
      step2: "カスタマイズ",
      resetLayout: "レイアウトをリセット",
      orientation: "向き",
      portrait: "縦",
      landscape: "横",
      paperSize: "用紙サイズ",
      a4: "A4",
      letter: "Letter",
      borderStyle: "境界線のスタイル",
      printerFriendly: "印刷に最適",
      none: "なし",
      thinLine: "細い線",
      doubleLine: "二重線",
      bgColor: "背景色",
      fontStyle: "フォントスタイル",
      petNameHeading: "ペットの名前 / メイン見出し",
      subtitle: "サブタイトル",
      bottomText: "下部のテキスト",
      textSize: "テキストサイズ",
      rotation: "回転",
      xPos: "← 左 / 右 →",
      yPos: "↑ 上 / 下 ↓",
      resetPos: "リセット",
      bgLabels: {
        warmCream: "ウォームクリーム",
        blushPink: "ブラッシュピンク",
        softMint: "ソフトミント",
        ivory: "アイボリー",
        dustyBlue: "ダスティブルー",
        linenBeige: "リネンベージュ",
        white: "ホワイト",
        custom: "カスタム",
      },
      fontLabels: {
        elegantSerif: "エレガント明朝",
        classicSerif: "クラシック明朝",
        modernSans: "モダンゴシック",
        softHandwritten: "やわらか手書き",
        cuteRounded: "かわいい丸体",
        playfulScript: "ポップ筆記体",
      },
      placeholders: {
        petName: "例：ポチ🐾",
        subtitle: "例：いつまでも心の中に💛",
        bottomText: "例：2010 - 2026 · ずっと愛してる",
      },
    },
    avatar: {
      autoGenMsg1: "アバターパックはAIを使用して",
      autoGenMsg2: "自動生成",
      autoGenMsg3: "されます。以下で好みのスタイルを選択してください。",
      avatarStyle: "アバタースタイル",
      clean: "クリーン",
      cleanDesc: "シンプル＆ミニマル",
      cute: "キュート",
      cuteDesc: "やわらかくて遊び心",
      bold: "ボールド",
      boldDesc: "鮮やかで力強い",
      shapeStyle: "図形のスタイル",
      mixed: "ミックス",
      mixedDesc: "様々な形のミックス",
      rounded: "角丸",
      roundedDesc: "柔らかい角丸フレーム",
      circle: "円形",
      circleDesc: "丸いポートレート",
      previewBg: "プレビューの背景",
      cream: "クリーム",
      mint: "ミント",
      blush: "ブラッシュ",
      features: [
        "12種類のユニークな効果",
        "スタイルに合わせたプレビュー",
        "高解像度の最終パック",
        "追加編集なし",
      ],
      previewTitle: "12-アバターAIプレビュー",
      happy: "😄 ハッピー",
      happyDesc: "明るく元気",
      sleepy: "😴 眠そう",
      sleepyDesc: "柔らか夢",
      cool: "😎 クール",
      coolDesc: "スタイリッシュ",
      party: "🎉 パーティー",
      partyDesc: "カラフル",
    },
    finalize: {
      step3: "注文を確定",
      downloadsTitle: "注文のダウンロード",
      readyTitle: "記念品の準備ができました！",
      readySub: "高解像度ファイルが生成されました。",
      sentTo: "送信先：",
      download: "ダウンロード",
      blockedMsg: "ブラウザが自動ダウンロードをブロックした場合は、上のボタンを使用してください。",
      bundleValue: "バンドル価格：",
      save23: "23%節約",
      totalPaid: "合計支払額：",
      deliveryEmail: "配信先メール (読み取り専用)",
      confirm:
        "デザインの完成を確認します。この操作は最終的であり、透かしのない高解像度ファイルが即座に生成されることを理解しています。",
      generateBtn: "❤️ ペットの記念品を作る",
      processing: "処理中...",
      prepareSteps: [
        "写真をアップロード中...",
        "塗り絵ページを作成中...",
        "証明書をデザイン中...",
        "アバターステッカーを生成中...",
        "もうすぐ完了！ファイルを梱包中...",
      ],
      guarantees: ["満足度保証", "安全な支払い", "高解像度エクスポート"],
    },
  },
  ko: {
    back: "뒤로",
    orderLabel: "주문:",
    plans: {
      bundle: "번들 세트",
      coloring: "컬러링 페이지",
      keepsake: "기념 인증서",
      avatar: "12 아바타 팩",
    },
    banners: {
      blocked: "죄송합니다. 퀘벡주에서는 이 서비스를 이용할 수 없습니다.",
      missingProv: "뒤로 돌아가서 주를 선택해 주세요.",
      missingOrder: "잘못된 링크입니다. 주문을 찾을 수 없습니다.",
      checking: "주문을 확인하는 중...",
      verifying: "결제를 확인 중입니다. 잠시만 기다려 주세요.",
      invalid: "잘못된 주문 링크입니다.",
      finalized: "주문이 이미 확정되었습니다. 이 링크는 이제 다운로드 전용입니다.",
      paymentRecv: "결제가 완료되었습니다. 아래에 사진을 업로드해 주세요.",
      highResReady: "주문이 확정되었습니다. 고해상도 파일이 준비되었습니다.",
      noStripeEmail: "이메일을 찾을 수 없습니다. Stripe 기록을 사용합니다.",
    },
    upload: {
      canvasReady: "캔버스 준비 완료",
      uploadPrompt: "오른쪽에 반려동물 사진을 업로드하여 시작하세요.",
      designsReady: "디자인 준비 완료",
      downloadPrompt: "오른쪽에서 파일을 다운로드해 주세요.",
      hint: "힌트: 캔버스에서 텍스트를 드래그하거나 슬라이더로 위치를 조정하세요.",
      step1: "사진 업로드",
      draftRestored: "✨ 임시 저장이 복원되었습니다. 미리 보려면 사진을 업로드해 주세요.",
      clickToUpload: "클릭하여 업로드",
      fileTypes: "JPG, PNG, WEBP (최대 15MB)",
      browse: "찾아보기",
      uploaded: "업로드 완료",
      replace: "교체",
      remove: "삭제",
      draftSaved: "임시 저장이 완료되었습니다. 계속하려면 새 사진을 업로드해 주세요.",
    },
    bundle: {
      title: "번들 아이템",
      coloringSub: "인쇄용 PDF",
      keepsakeSub: "기념 PDF",
      avatarSub: "PNG 팩",
      statusReady: "준비 완료",
      statusEditing: "편집 중",
      statusNotStarted: "시작 안 함",
    },
    customize: {
      step2: "커스터마이즈",
      resetLayout: "레이아웃 초기화",
      orientation: "방향",
      portrait: "세로",
      landscape: "가로",
      paperSize: "용지 크기",
      a4: "A4",
      letter: "Letter",
      borderStyle: "테두리 스타일",
      printerFriendly: "인쇄용",
      none: "없음",
      thinLine: "얇은 선",
      doubleLine: "이중 선",
      bgColor: "배경색",
      fontStyle: "글꼴 스타일",
      petNameHeading: "반려동물 이름 / 메인 제목",
      subtitle: "부제목",
      bottomText: "하단 텍스트",
      textSize: "텍스트 크기",
      rotation: "회전",
      xPos: "← 좌 / 우 →",
      yPos: "↑ 위 / 아래 ↓",
      resetPos: "초기화",
      bgLabels: {
        warmCream: "따뜻한 크림",
        blushPink: "블러쉬 핑크",
        softMint: "소프트 민트",
        ivory: "아이보리",
        dustyBlue: "더스티 블루",
        linenBeige: "리넨 베이지",
        white: "화이트",
        custom: "커스텀",
      },
      fontLabels: {
        elegantSerif: "엘레강트 세리프",
        classicSerif: "클래식 세리프",
        modernSans: "모던 산스",
        softHandwritten: "부드러운 손글씨",
        cuteRounded: "귀여운 둥근체",
        playfulScript: "발랄한 스크립트",
      },
      placeholders: {
        petName: "예: 초코🐾",
        subtitle: "예: 영원히 우리 마음속에💛",
        bottomText: "예: 2010 - 2026 · 영원히 사랑해",
      },
    },
    avatar: {
      autoGenMsg1: "아바타 팩은 AI를 사용하여",
      autoGenMsg2: "자동으로 생성",
      autoGenMsg3: "됩니다. 아래에서 원하는 스타일을 선택하세요.",
      avatarStyle: "아바타 스타일",
      clean: "깔끔한",
      cleanDesc: "심플 & 미니멀",
      cute: "귀여운",
      cuteDesc: "부드럽고 발랄한",
      bold: "선명한",
      boldDesc: "생동감 있고 강렬한",
      shapeStyle: "모양 스타일",
      mixed: "혼합",
      mixedDesc: "다양한 모양 조합",
      rounded: "둥근 모서리",
      roundedDesc: "부드러운 사각 프레임",
      circle: "원형",
      circleDesc: "원형 초상화 프레임",
      previewBg: "미리보기 배경",
      cream: "크림",
      mint: "민트",
      blush: "블러쉬",
      features: [
        "12가지 독특한 효과",
        "스타일 가이드 미리보기",
        "고해상도 최종 팩",
        "추가 편집 없음",
      ],
      previewTitle: "12-아바타 AI 미리보기",
      happy: "😄 해피",
      happyDesc: "밝고 활발",
      sleepy: "😴 졸린",
      sleepyDesc: "몽환적",
      cool: "😎 쿨",
      coolDesc: "스타일리시",
      party: "🎉 파티",
      partyDesc: "화려한",
    },
    finalize: {
      step3: "주문 완료",
      downloadsTitle: "주문 다운로드",
      readyTitle: "기념품이 준비되었습니다!",
      readySub: "고해상도 파일이 생성되었습니다.",
      sentTo: "보낸 곳:",
      download: "다운로드",
      blockedMsg: "브라우저가 자동 다운로드를 차단한 경우 위의 버튼을 사용하세요.",
      bundleValue: "번들 가치:",
      save23: "23% 절약",
      totalPaid: "총 결제 금액:",
      deliveryEmail: "수신 이메일 (읽기 전용)",
      confirm:
        "디자인이 준비되었음을 확인합니다. 이 작업은 최종적이며 워터마크가 없는 고해상도 파일이 즉시 생성됨을 이해합니다.",
      generateBtn: "❤️ 내 반려동물 기념품 만들기",
      processing: "처리 중...",
      prepareSteps: [
        "사진을 업로드하는 중...",
        "색칠 페이지를 만드는 중...",
        "인증서를 디자인하는 중...",
        "아바타 스티커를 생성하는 중...",
        "거의 다 됐어요! 파일을 묶는 중...",
      ],
      guarantees: ["만족 보장", "안전한 결제", "고해상도 내보내기"],
    },
  },
  es: {
    back: "Volver",
    orderLabel: "Pedido:",
    plans: {
      bundle: "Paquete de Oferta",
      coloring: "Página para Colorear",
      keepsake: "Certificado de Recuerdo",
      avatar: "Paquete de 12 Avatares",
    },
    banners: {
      blocked: "Lo sentimos, el servicio no está disponible en Quebec.",
      missingProv: "Por favor, vuelve y selecciona tu provincia.",
      missingOrder: "Enlace no válido. Pedido no encontrado.",
      checking: "Comprobando tu pedido...",
      verifying: "Verificando el pago... Por favor, espera un momento.",
      invalid: "Enlace de pedido no válido.",
      finalized: "El pedido ya está finalizado. Este enlace es solo para descargas.",
      paymentRecv: "Pago recibido. Sube la foto abajo.",
      highResReady: "Pedido finalizado. Archivos de alta resolución listos.",
      noStripeEmail: "Correo no encontrado. Se usará el registro de Stripe si está disponible.",
    },
    upload: {
      canvasReady: "El lienzo está listo",
      uploadPrompt: "Sube la foto de tu mascota a la derecha para empezar.",
      designsReady: "Diseños Listos",
      downloadPrompt: "Por favor, descarga tus archivos a la derecha.",
      hint: "Sugerencia: Arrastra el texto en el lienzo o usa los controles deslizantes para ajustar la posición.",
      step1: "Subir Foto",
      draftRestored: "✨ Borrador restaurado. Sube la foto para previsualizar.",
      clickToUpload: "Haz clic para subir foto",
      fileTypes: "JPG, PNG, WEBP (Max 15MB)",
      browse: "Examinar",
      uploaded: "Foto Subida",
      replace: "Reemplazar",
      remove: "Eliminar",
      draftSaved: "Ajustes guardados. Sube una nueva foto para continuar.",
    },
    bundle: {
      title: "Artículos del Paquete",
      coloringSub: "PDF Imprimible",
      keepsakeSub: "PDF de Recuerdo",
      avatarSub: "Paquete PNG",
      statusReady: "Listo",
      statusEditing: "Editando",
      statusNotStarted: "No Iniciado",
    },
    customize: {
      step2: "Personalizar",
      resetLayout: "Restablecer Diseño",
      orientation: "Orientación",
      portrait: "Vertical",
      landscape: "Horizontal",
      paperSize: "Tamaño de Papel",
      a4: "A4",
      letter: "Carta",
      borderStyle: "Estilo de Borde",
      printerFriendly: "Fácil de Imprimir",
      none: "Ninguno",
      thinLine: "Línea Fina",
      doubleLine: "Línea Doble",
      bgColor: "Color de Fondo",
      fontStyle: "Estilo de Fuente",
      petNameHeading: "Nombre de Mascota / Título Principal",
      subtitle: "Subtítulo",
      bottomText: "Texto Inferior",
      textSize: "Tamaño de Texto",
      rotation: "Rotación",
      xPos: "← Izq / Der →",
      yPos: "↑ Arriba / Abajo ↓",
      resetPos: "Restablecer",
      bgLabels: {
        warmCream: "Crema Cálida",
        blushPink: "Rosa Suave",
        softMint: "Menta Suave",
        ivory: "Marfil",
        dustyBlue: "Azul Polvo",
        linenBeige: "Beige Lino",
        white: "Blanco",
        custom: "Personalizado",
      },
      fontLabels: {
        elegantSerif: "Serif Elegante",
        classicSerif: "Serif Clásico",
        modernSans: "Sans Moderno",
        softHandwritten: "Manuscrita Suave",
        cuteRounded: "Redondeada Linda",
        playfulScript: "Script Juguetón",
      },
      placeholders: {
        petName: "Ej: Luna🐾",
        subtitle: "Ej: Por siempre en nuestros corazones💛",
        bottomText: "Ej: 2010 - 2026 · Siempre amada",
      },
    },
    avatar: {
      autoGenMsg1: "Tu paquete de avatares será",
      autoGenMsg2: "generado automáticamente",
      autoGenMsg3: "a partir de tu foto mediante IA. Selecciona el estilo general.",
      avatarStyle: "Estilo de Avatar",
      clean: "Limpio",
      cleanDesc: "Simple y minimalista",
      cute: "Lindo",
      cuteDesc: "Suave y juguetón",
      bold: "Atrevido",
      boldDesc: "Vívido y expresivo",
      shapeStyle: "Estilo de Forma",
      mixed: "Mixto",
      mixedDesc: "Variedad de formas",
      rounded: "Redondeado",
      roundedDesc: "Marcos cuadrados redondeados",
      circle: "Círculo",
      circleDesc: "Marcos de retrato circular",
      previewBg: "Fondo de Vista Previa",
      cream: "Crema",
      mint: "Menta",
      blush: "Rubor",
      features: [
        "12 efectos únicos",
        "Vista previa con guía de estilo",
        "Paquete final en alta resolución",
        "Sin edición adicional",
      ],
      previewTitle: "Vista Previa de IA: 12 Avatares",
      happy: "😄 Feliz",
      happyDesc: "Brillante y alegre",
      sleepy: "😴 Soñoliento",
      sleepyDesc: "Suave y soñador",
      cool: "😎 Genial",
      coolDesc: "Elegante y moderno",
      party: "🎉 Fiesta",
      partyDesc: "Colorido y festivo",
    },
    finalize: {
      step3: "Finalizar Pedido",
      downloadsTitle: "Tus Descargas",
      readyTitle: "¡Tus recuerdos están listos!",
      readySub: "Archivos de alta resolución generados.",
      sentTo: "Archivos enviados a:",
      download: "Descargar",
      blockedMsg: "Si su navegador bloqueó la descarga automática, utilice los botones.",
      bundleValue: "Valor del Paquete:",
      save23: "AHORRA 23%",
      totalPaid: "Total Pagado:",
      deliveryEmail: "Correo de Entrega (Solo lectura)",
      confirm:
        "Confirmo que mis diseños están listos. Entiendo que esta acción es definitiva y generará archivos de alta resolución al instante.",
      generateBtn: "❤️ Crear Mi Recuerdo",
      processing: "Procesando Archivos...",
      prepareSteps: [
        "Subiendo tu foto...",
        "Creando página de colorear...",
        "Diseñando tu certificado...",
        "Generando stickers de avatar...",
        "¡Casi listo! Empaquetando archivos...",
      ],
      guarantees: ["Garantía de Satisfacción", "Pago Seguro", "Exportación en Alta Resolución"],
    },
  },
  de: {
    back: "Zurück",
    orderLabel: "Bestellung:",
    plans: {
      bundle: "Sparpaket",
      coloring: "Ausmalbild",
      keepsake: "Zertifikat",
      avatar: "12-Avatar-Paket",
    },
    banners: {
      blocked: "Leider ist der Service in Québec nicht verfügbar.",
      missingProv: "Bitte gehen Sie zurück und wählen Sie Ihre Provinz aus.",
      missingOrder: "Ungültiger Link. Bestellung nicht gefunden.",
      checking: "Bestellung wird überprüft...",
      verifying: "Zahlung wird überprüft... Bitte warten Sie einen Moment.",
      invalid: "Ungültiger Bestell-Link.",
      finalized: "Bestellung bereits abgeschlossen. Dieser Link ist jetzt nur zum Download.",
      paymentRecv: "Zahlung erhalten. Foto unten hochladen.",
      highResReady: "Bestellung abgeschlossen. Hochauflösende Dateien bereit.",
      noStripeEmail: "E-Mail nicht gefunden. Stripe-Eintrag wird verwendet, falls vorhanden.",
    },
    upload: {
      canvasReady: "Leinwand ist bereit",
      uploadPrompt: "Laden Sie rechts ein Foto Ihres Haustiers hoch, um zu beginnen.",
      designsReady: "Designs bereit",
      downloadPrompt: "Bitte laden Sie Ihre Dateien rechts herunter.",
      hint: "Tipp: Ziehen Sie den Text auf der Leinwand oder verwenden Sie die Schieberegler.",
      step1: "Foto hochladen",
      draftRestored: "✨ Entwurf wiederhergestellt. Bitte Foto hochladen.",
      clickToUpload: "Klicken zum Hochladen",
      fileTypes: "JPG, PNG, WEBP (Max 15MB)",
      browse: "Durchsuchen",
      uploaded: "Foto hochgeladen",
      replace: "Ersetzen",
      remove: "Entfernen",
      draftSaved: "Entwurf gespeichert. Neues Foto hochladen, um fortzufahren.",
    },
    bundle: {
      title: "Paketartikel",
      coloringSub: "Druckbares PDF",
      keepsakeSub: "Erinnerungs-PDF",
      avatarSub: "PNG-Paket",
      statusReady: "Bereit",
      statusEditing: "In Bearbeitung",
      statusNotStarted: "Nicht gestartet",
    },
    customize: {
      step2: "Anpassen",
      resetLayout: "Layout zurücksetzen",
      orientation: "Ausrichtung",
      portrait: "Hochformat",
      landscape: "Querformat",
      paperSize: "Papierformat",
      a4: "A4",
      letter: "Letter",
      borderStyle: "Rahmenstil",
      printerFriendly: "Druckerfreundlich",
      none: "Keiner",
      thinLine: "Dünne Linie",
      doubleLine: "Doppellinie",
      bgColor: "Hintergrundfarbe",
      fontStyle: "Schriftart",
      petNameHeading: "Name des Haustiers / Hauptüberschrift",
      subtitle: "Untertitel",
      bottomText: "Unterer Text",
      textSize: "Textgröße",
      rotation: "Drehung",
      xPos: "← Links / Rechts →",
      yPos: "↑ Oben / Unten ↓",
      resetPos: "Zurücksetzen",
      bgLabels: {
        warmCream: "Warmes Creme",
        blushPink: "Zartrosa",
        softMint: "Sanftes Mint",
        ivory: "Elfenbein",
        dustyBlue: "Staubiges Blau",
        linenBeige: "Leinenbeige",
        white: "Weiß",
        custom: "Benutzerdefiniert",
      },
      fontLabels: {
        elegantSerif: "Elegante Serife",
        classicSerif: "Klassische Serife",
        modernSans: "Modernes Sans",
        softHandwritten: "Weiche Handschrift",
        cuteRounded: "Süße Rundschrift",
        playfulScript: "Verspieltes Skript",
      },
      placeholders: {
        petName: "z.B. Bello🐾",
        subtitle: "z.B. Für immer in unseren Herzen💛",
        bottomText: "z.B. 2010 - 2026 · Für immer geliebt",
      },
    },
    avatar: {
      autoGenMsg1: "Ihr Avatar-Paket wird",
      autoGenMsg2: "automatisch generiert",
      autoGenMsg3: "mit KI aus Ihrem Foto erstellt. Wählen Sie unten den Stil.",
      avatarStyle: "Avatar-Stil",
      clean: "Klar",
      cleanDesc: "Einfach & minimal",
      cute: "Süß",
      cuteDesc: "Weich & verspielt",
      bold: "Kräftig",
      boldDesc: "Lebendig & ausdrucksstark",
      shapeStyle: "Formstil",
      mixed: "Gemischt",
      mixedDesc: "Verschiedene Formen",
      rounded: "Abgerundet",
      roundedDesc: "Weiche eckige Rahmen",
      circle: "Kreis",
      circleDesc: "Runde Porträtrahmen",
      previewBg: "Vorschau-Hintergrund",
      cream: "Creme",
      mint: "Minze",
      blush: "Rouge",
      features: [
        "12 einzigartige Effekte",
        "Stilgeführte Vorschau",
        "Hochauflösendes Endpaket",
        "Keine zusätzliche Bearbeitung",
      ],
      previewTitle: "12-Avatar KI-Vorschau",
      happy: "😄 Fröhlich",
      happyDesc: "Hell & lebhaft",
      sleepy: "😴 Schläfrig",
      sleepyDesc: "Sanft & verträumt",
      cool: "😎 Cool",
      coolDesc: "Stilvoll & modern",
      party: "🎉 Party",
      partyDesc: "Bunt & festlich",
    },
    finalize: {
      step3: "Bestellung abschließen",
      downloadsTitle: "Ihre Downloads",
      readyTitle: "Ihre Erinnerungsstücke sind bereit!",
      readySub: "Hochauflösende Dateien generiert.",
      sentTo: "Dateien gesendet an:",
      download: "Herunterladen",
      blockedMsg: "Falls Ihr Browser den Download blockiert, verwenden Sie die Schaltflächen.",
      bundleValue: "Paketwert:",
      save23: "23% SPAREN",
      totalPaid: "Insgesamt bezahlt:",
      deliveryEmail: "Zustell-E-Mail (Schreibgeschützt)",
      confirm:
        "Ich bestätige, dass meine Designs fertig sind. Ich verstehe, dass diese Aktion endgültig ist und sofort hochauflösende Dateien generiert.",
      generateBtn: "❤️ Mein Erinnerungsstück erstellen",
      processing: "Dateien werden verarbeitet...",
      prepareSteps: [
        "Foto wird hochgeladen...",
        "Malseite wird erstellt...",
        "Zertifikat wird gestaltet...",
        "Avatar-Sticker werden generiert...",
        "Fast fertig! Dateien werden verpackt...",
      ],
      guarantees: ["Zufriedenheitsgarantie", "Sichere Zahlung", "Hochauflösender Export"],
    },
  },
  ar: {
    back: "رجوع",
    orderLabel: "الطلب:",
    plans: {
      bundle: "باقة التوفير",
      coloring: "صفحة تلوين",
      keepsake: "شهادة تذكارية",
      avatar: "باقة 12 صورة رمزية",
    },
    banners: {
      blocked: "عذراً، الخدمة غير متوفرة في كيبيك.",
      missingProv: "يرجى العودة واختيار مقاطعتك.",
      missingOrder: "رابط غير صالح. لم يتم العثور على الطلب.",
      checking: "جاري التحقق من طلبك...",
      verifying: "جاري التحقق من الدفع... يرجى الانتظار لحظة.",
      invalid: "رابط الطلب غير صالح.",
      finalized: "تم إكمال الطلب بالفعل. هذا الرابط مخصص للتنزيل فقط.",
      paymentRecv: "تم استلام الدفع. قم بتحميل الصورة أدناه.",
      highResReady: "تم إكمال الطلب. الملفات عالية الدقة جاهزة.",
      noStripeEmail: "لم يتم العثور على بريد الدفع. سيتم استخدام سجل Stripe.",
    },
    upload: {
      canvasReady: "اللوحة جاهزة",
      uploadPrompt: "قم بتحميل صورة حيوانك الأليف على اليمين للبدء.",
      designsReady: "التصاميم جاهزة",
      downloadPrompt: "يرجى تنزيل ملفاتك على اليمين.",
      hint: "تلميح: اسحب النص على اللوحة أو استخدم المنزلقات لضبط الموضع.",
      step1: "تحميل الصورة",
      draftRestored: "✨ تم استعادة المسودة. يرجى تحميل الصورة للمعاينة.",
      clickToUpload: "انقر لتحميل الصورة",
      fileTypes: "JPG, PNG, WEBP (الحد الأقصى 15MB)",
      browse: "تصفح",
      uploaded: "تم تحميل الصورة",
      replace: "استبدال",
      remove: "إزالة",
      draftSaved: "تم حفظ الإعدادات. قم بتحميل صورة جديدة للمتابعة.",
    },
    bundle: {
      title: "عناصر الباقة",
      coloringSub: "PDF قابل للطباعة",
      keepsakeSub: "PDF تذكاري",
      avatarSub: "باقة صور PNG",
      statusReady: "جاهز",
      statusEditing: "قيد التعديل",
      statusNotStarted: "لم يبدأ",
    },
    customize: {
      step2: "تخصيص",
      resetLayout: "إعادة ضبط المخطط",
      orientation: "الاتجاه",
      portrait: "عمودي",
      landscape: "أفقي",
      paperSize: "حجم الورق",
      a4: "A4",
      letter: "Letter",
      borderStyle: "نمط الإطار",
      printerFriendly: "سهل الطباعة",
      none: "بدون",
      thinLine: "خط رفيع",
      doubleLine: "خط مزدوج",
      bgColor: "لون الخلفية",
      fontStyle: "نمط الخط",
      petNameHeading: "اسم الحيوان الأليف / العنوان الرئيسي",
      subtitle: "العنوان الفرعي",
      bottomText: "النص السفلي",
      textSize: "حجم النص",
      rotation: "دوران",
      xPos: "← يسار / يمين →",
      yPos: "↑ أعلى / أسفل ↓",
      resetPos: "إعادة تعيين",
      bgLabels: {
        warmCream: "كريم دافئ",
        blushPink: "وردي ناعم",
        softMint: "نعناعي ناعم",
        ivory: "عاجي",
        dustyBlue: "أزرق مائل",
        linenBeige: "بيج كتاني",
        white: "أبيض",
        custom: "مخصص",
      },
      fontLabels: {
        elegantSerif: "سيريف أنيق",
        classicSerif: "سيريف كلاسيكي",
        modernSans: "سانس عصري",
        softHandwritten: "خط يدوي ناعم",
        cuteRounded: "خط مدوّر لطيف",
        playfulScript: "خط سكريبت مرح",
      },
      placeholders: {
        petName: "مثال: لولو🐾",
        subtitle: "مثال: إلى الأبد في قلوبنا💛",
        bottomText: "مثال: 2010 - 2026 · محبوب دائماً",
      },
    },
    avatar: {
      autoGenMsg1: "سيتم",
      autoGenMsg2: "إنشاء باقة الصور الرمزية تلقائيًا",
      autoGenMsg3: "من صورتك باستخدام الذكاء الاصطناعي. اختر النمط العام أدناه.",
      avatarStyle: "نمط الصورة الرمزية",
      clean: "نقي",
      cleanDesc: "بسيط وأنيق",
      cute: "لطيف",
      cuteDesc: "ناعم ومرح",
      bold: "بارز",
      boldDesc: "حيوي ومعبّر",
      shapeStyle: "نمط الشكل",
      mixed: "مختلط",
      mixedDesc: "مجموعة متنوعة",
      rounded: "زوايا دائرية",
      roundedDesc: "إطارات مربعة ناعمة",
      circle: "دائري",
      circleDesc: "إطارات دائرية",
      previewBg: "خلفية المعاينة",
      cream: "كريمي",
      mint: "نعناعي",
      blush: "وردي",
      features: [
        "12 تأثير فريد",
        "معاينة موجهة بالنمط",
        "باقة نهائية عالية الدقة",
        "بدون تعديل إضافي",
      ],
      previewTitle: "معاينة الذكاء الاصطناعي لـ 12 صورة رمزية",
      happy: "😄 سعيد",
      happyDesc: "مشرق ومبهج",
      sleepy: "😴 نعسان",
      sleepyDesc: "ناعم وحالم",
      cool: "😎 أنيق",
      coolDesc: "عصري وراقٍ",
      party: "🎉 حفلة",
      partyDesc: "ملوّن واحتفالي",
    },
    finalize: {
      step3: "إتمام الطلب",
      downloadsTitle: "تنزيلات طلبك",
      readyTitle: "تذكاراتك جاهزة!",
      readySub: "تم إنشاء ملفات عالية الدقة.",
      sentTo: "تم إرسال الملفات إلى:",
      download: "تنزيل",
      blockedMsg: "إذا قام متصفحك بحظر التنزيل التلقائي، يرجى استخدام الأزرار أعلاه.",
      bundleValue: "قيمة الباقة:",
      save23: "توفير 23%",
      totalPaid: "إجمالي المدفوع:",
      deliveryEmail: "بريد التسليم (للقراءة فقط)",
      confirm:
        "أؤكد أن تصميماتي جاهزة. أدرك أن هذا الإجراء نهائي وسيؤدي فورًا إلى إنشاء ملفات عالية الدقة بدون علامة مائية.",
      generateBtn: "❤️ إنشاء تذكاري الخاصة",
      processing: "جاري معالجة الملفات...",
      prepareSteps: [
        "جاري رفع صورتك...",
        "جاري إنشاء صفحة التلوين...",
        "جاري تصميم الشهادة...",
        "جاري إنشاء ملصقات الأفاتار...",
        "اقتربنا من الانتهاء! جاري تجميع الملفات...",
      ],
      guarantees: ["ضمان الرضا", "دفع آمن", "تصدير عالي الدقة"],
    },
  },
};




function getTranslation(locale: LocaleKey) {
  const source = TRANSLATIONS[locale] ?? {};
  return {
    ...FALLBACK_TRANSLATION,
    ...source,
    plans: { ...FALLBACK_TRANSLATION.plans, ...(source.plans ?? {}) },
    banners: { ...FALLBACK_TRANSLATION.banners, ...(source.banners ?? {}) },
    upload: { ...FALLBACK_TRANSLATION.upload, ...(source.upload ?? {}) },
    bundle: { ...FALLBACK_TRANSLATION.bundle, ...(source.bundle ?? {}) },
    customize: {
      ...FALLBACK_TRANSLATION.customize,
      ...(source.customize ?? {}),
      bgLabels: { ...FALLBACK_TRANSLATION.customize.bgLabels, ...(source.customize?.bgLabels ?? {}) },
      fontLabels: { ...FALLBACK_TRANSLATION.customize.fontLabels, ...(source.customize?.fontLabels ?? {}) },
      placeholders: { ...FALLBACK_TRANSLATION.customize.placeholders, ...(source.customize?.placeholders ?? {}) },
    },
    avatar: {
      ...FALLBACK_TRANSLATION.avatar,
      ...(source.avatar ?? {}),
      features: source.avatar?.features ?? FALLBACK_TRANSLATION.avatar.features,
    },
    finalize: {
      ...FALLBACK_TRANSLATION.finalize,
      ...(source.finalize ?? {}),
      guarantees: source.finalize?.guarantees ?? FALLBACK_TRANSLATION.finalize.guarantees,
    },
  };
}


const DRAFT_VERSION = "v3";
const COMPANY_LOGO_PATH = "/images/petkeepsart_logo2.png";
const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const PRICES_USD: Record<PlanId, number> = {
  bundle: 29.95,
  coloring: 12.99,
  keepsake: 12.99,
  avatar: 12.99,
};

const BUNDLE_VALUE_USD = 38.97;

const FONT_OPTIONS: Record<FontKey, { label: string; family: string }> = {
  elegantSerif: { label: "Elegant Serif", family: 'Georgia, "Times New Roman", serif' },
  classicSerif: { label: "Classic Serif", family: "Cambria, Georgia, serif" },
  modernSans: { label: "Modern Sans", family: "Arial, Helvetica, sans-serif" },
  softHandwritten: { label: "Soft Handwritten", family: '"Comic Sans MS", "Bradley Hand", cursive' },
  cuteRounded: { label: "Cute Rounded", family: '"Trebuchet MS", "Arial Rounded MT Bold", sans-serif' },
  playfulScript: { label: "Playful Script", family: '"Brush Script MT", cursive' },
};

const CERTIFICATE_BG_OPTIONS: Record<CertificateBg, { label: string; bg: string; accentLight: string; accent: string }> = {
  warmCream: { label: "Warm Cream", bg: "#F8EEDB", accentLight: "#F3D9B1", accent: "#D99058" },
  blushPink: { label: "Blush Pink", bg: "#F7E3E4", accentLight: "#EFC9CF", accent: "#D9878E" },
  softMint: { label: "Soft Mint", bg: "#E7F3EC", accentLight: "#CFE5D8", accent: "#7DAE91" },
  ivory: { label: "Ivory", bg: "#F7F3EA", accentLight: "#E7DED0", accent: "#A58B72" },
  dustyBlue: { label: "Dusty Blue", bg: "#E7EDF4", accentLight: "#D2DCE8", accent: "#8497B0" },
  linenBeige: { label: "Linen Beige", bg: "#F4EBDD", accentLight: "#E9DBC9", accent: "#B18C68" },
  white: { label: "White", bg: "#FFFFFF", accentLight: "#EEEEEE", accent: "#CCCCCC" },
  custom: { label: "Custom", bg: "#FFFFFF", accentLight: "#EEEEEE", accent: "#CCCCCC" },
};

const DEFAULT_CERT_MAIN_POS: Position = { x: 50, y: 14 };
const DEFAULT_CERT_SUB_POS: Position = { x: 50, y: 25 };
const DEFAULT_CERT_BOTTOM_POS: Position = { x: 50, y: 84 };

const SAFE_MIN_POS = 8;
const SAFE_MAX_POS = 92;

const AVATAR_FILTERS: Record<AvatarStyle, string[]> = {
  clean: ["brightness-[1.03] contrast-[1.04]", "brightness-[1.05] contrast-[1.06]", "brightness-[1.04] contrast-[1.08]", "brightness-[1.06] contrast-[1.04]", "brightness-[1.04] contrast-[1.05]", "brightness-[1.05] contrast-[1.07]", "brightness-[1.03] contrast-[1.09]", "brightness-[1.06] contrast-[1.06]", "brightness-[1.05] contrast-[1.05]", "brightness-[1.04] contrast-[1.07]", "brightness-[1.06] contrast-[1.08]", "brightness-[1.05] contrast-[1.06]"],
  cute: ["saturate-[1.16] brightness-[1.07]", "saturate-[1.18] brightness-[1.06]", "saturate-[1.22] brightness-[1.05]", "saturate-[1.15] brightness-[1.08]", "saturate-[1.2] brightness-[1.07]", "saturate-[1.17] brightness-[1.08]", "saturate-[1.19] brightness-[1.06]", "saturate-[1.23] brightness-[1.05]", "saturate-[1.18] brightness-[1.08]", "saturate-[1.2] brightness-[1.07]", "saturate-[1.21] brightness-[1.05]", "saturate-[1.18] brightness-[1.07]"],
  bold: ["contrast-[1.18] saturate-[1.18] brightness-[1.04]", "contrast-[1.16] saturate-[1.2] brightness-[1.05]", "contrast-[1.2] saturate-[1.16] brightness-[1.03]", "contrast-[1.17] saturate-[1.22] brightness-[1.04]", "contrast-[1.19] saturate-[1.18] brightness-[1.05]", "contrast-[1.16] saturate-[1.2] brightness-[1.06]", "contrast-[1.22] saturate-[1.18] brightness-[1.03]", "contrast-[1.18] saturate-[1.24] brightness-[1.04]", "contrast-[1.2] saturate-[1.19] brightness-[1.05]", "contrast-[1.17] saturate-[1.21] brightness-[1.04]", "contrast-[1.22] saturate-[1.2] brightness-[1.05]", "contrast-[1.18] saturate-[1.18] brightness-[1.06]"],
  happy: ["saturate-[1.3] brightness-[1.1] contrast-[1.05]", "saturate-[1.28] brightness-[1.12] contrast-[1.04]", "saturate-[1.32] brightness-[1.1] contrast-[1.06]", "saturate-[1.29] brightness-[1.11] contrast-[1.05]", "saturate-[1.31] brightness-[1.1] contrast-[1.05]", "saturate-[1.3] brightness-[1.12] contrast-[1.06]", "saturate-[1.28] brightness-[1.11] contrast-[1.04]", "saturate-[1.32] brightness-[1.1] contrast-[1.07]", "saturate-[1.3] brightness-[1.12] contrast-[1.05]", "saturate-[1.29] brightness-[1.1] contrast-[1.06]", "saturate-[1.31] brightness-[1.11] contrast-[1.05]", "saturate-[1.3] brightness-[1.1] contrast-[1.06]"],
  sleepy: ["brightness-[0.94] saturate-[0.72] contrast-[0.96]", "brightness-[0.93] saturate-[0.7] contrast-[0.95]", "brightness-[0.95] saturate-[0.74] contrast-[0.97]", "brightness-[0.94] saturate-[0.71] contrast-[0.96]", "brightness-[0.93] saturate-[0.73] contrast-[0.95]", "brightness-[0.95] saturate-[0.72] contrast-[0.97]", "brightness-[0.94] saturate-[0.7] contrast-[0.96]", "brightness-[0.93] saturate-[0.74] contrast-[0.95]", "brightness-[0.95] saturate-[0.71] contrast-[0.97]", "brightness-[0.94] saturate-[0.73] contrast-[0.96]", "brightness-[0.93] saturate-[0.72] contrast-[0.95]", "brightness-[0.95] saturate-[0.7] contrast-[0.97]"],
  cool: ["hue-rotate-[200deg] saturate-[1.18] brightness-[1.04] contrast-[1.1]", "hue-rotate-[195deg] saturate-[1.2] brightness-[1.05] contrast-[1.08]", "hue-rotate-[205deg] saturate-[1.16] brightness-[1.04] contrast-[1.12]", "hue-rotate-[198deg] saturate-[1.19] brightness-[1.05] contrast-[1.09]", "hue-rotate-[202deg] saturate-[1.18] brightness-[1.04] contrast-[1.1]", "hue-rotate-[196deg] saturate-[1.2] brightness-[1.06] contrast-[1.08]", "hue-rotate-[204deg] saturate-[1.17] brightness-[1.04] contrast-[1.11]", "hue-rotate-[200deg] saturate-[1.19] brightness-[1.05] contrast-[1.1]", "hue-rotate-[197deg] saturate-[1.18] brightness-[1.06] contrast-[1.09]", "hue-rotate-[203deg] saturate-[1.2] brightness-[1.04] contrast-[1.1]", "hue-rotate-[199deg] saturate-[1.17] brightness-[1.05] contrast-[1.11]", "hue-rotate-[201deg] saturate-[1.19] brightness-[1.04] contrast-[1.1]"],
  party: ["saturate-[1.5] brightness-[1.08] contrast-[1.12] hue-rotate-[10deg]", "saturate-[1.48] brightness-[1.1] contrast-[1.1] hue-rotate-[350deg]", "saturate-[1.52] brightness-[1.07] contrast-[1.14] hue-rotate-[20deg]", "saturate-[1.49] brightness-[1.09] contrast-[1.11] hue-rotate-[340deg]", "saturate-[1.51] brightness-[1.08] contrast-[1.12] hue-rotate-[15deg]", "saturate-[1.47] brightness-[1.1] contrast-[1.1] hue-rotate-[355deg]", "saturate-[1.53] brightness-[1.07] contrast-[1.13] hue-rotate-[25deg]", "saturate-[1.5] brightness-[1.09] contrast-[1.12] hue-rotate-[345deg]", "saturate-[1.48] brightness-[1.08] contrast-[1.11] hue-rotate-[12deg]", "saturate-[1.52] brightness-[1.1] contrast-[1.13] hue-rotate-[348deg]", "saturate-[1.49] brightness-[1.07] contrast-[1.12] hue-rotate-[18deg]", "saturate-[1.51] brightness-[1.09] contrast-[1.1] hue-rotate-[352deg]"],
};

const Icons = {
  Upload: () => (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>),
  Spinner: () => (<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4Z" /></svg>),
  Check: () => (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>),
  Download: () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>),
  Reset: () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 2v6h6" /><path d="M3.05 13a9 9 0 1 0 2.13-9.36L3 8" /></svg>),
  Trash: () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>),
  Replace: () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><polyline points="3 3 3 8 8 8" /></svg>),
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getPaperAspectRatio(paperSize: PaperSize, orientation: Orientation) {
  return paperSize === "a4"
    ? orientation === "portrait" ? "210 / 297" : "297 / 210"
    : orientation === "portrait" ? "8.5 / 11" : "11 / 8.5";
}

function getBundleStatus(activeTab: PlanId, tab: PlanId, hasPhoto: boolean, isFinalized: boolean, isEdited: boolean, hasVisited: boolean): BundleStatus {
  if (!hasPhoto) return "not_started";
  if (isFinalized) return "ready";
  if (activeTab === tab) return "editing";
  if (isEdited) return "ready";
  if (hasVisited) return "editing";
  return "not_started";
}

function getAvatarTileClasses(style: AvatarStyle, index: number) {
  return `h-full w-full object-cover transition-transform duration-200 ${AVATAR_FILTERS[style][index % 12]}`;
}

function getAvatarShapeClass(shapeMode: AvatarShapeMode, index: number) {
  if (shapeMode === "circle") return "rounded-full";
  if (shapeMode === "rounded") return "rounded-[18px]";
  const mod = index % 3;
  if (mod === 0) return "rounded-[16px]";
  if (mod === 1) return "rounded-full";
  return "rounded-[26px]";
}

function getAvatarBgStyle(bgTone: AvatarBgTone, index: number) {
  const tones = bgTone === "cream" ? ["#FFF8F0", "#FFFDF8", "#FAF4EA"] : bgTone === "mint" ? ["#F1FAF4", "#F7FFF8", "#EAF7EF"] : ["#FFF3F5", "#FFF8FA", "#FAECEF"];
  return { backgroundColor: tones[index % tones.length] };
}

function getFinalizeBlockedReason(params: { blocked: boolean; missingProvince: boolean; missingOrder: boolean; orderStatus: "loading" | "pending" | "paid" | "finalized" | "invalid"; hasPhoto: boolean; isConfirmedFinal: boolean; }, t: any) {
  if (params.blocked) return t.banners.blocked;
  if (params.missingProvince) return t.banners.missingProv;
  if (params.missingOrder) return t.banners.missingOrder;
  if (params.orderStatus === "loading") return t.banners.checking;
  if (params.orderStatus === "pending") return t.banners.verifying;
  if (params.orderStatus === "invalid") return t.banners.invalid;
  if (params.orderStatus === "finalized") return t.banners.finalized;
  if (!params.hasPhoto) return t.upload.uploadPrompt;
  if (!params.isConfirmedFinal) return t.finalize.confirm;
  return "";
}

function getDraftStorageKey(orderId: string) {
  return `pka_draft_${DRAFT_VERSION}_${orderId}`;
}




export default function CustomizePage() {
  const searchParams = useSearchParams();
  const rawPlan = searchParams.get("plan");

  const plan: PlanId = rawPlan === "bundle" || rawPlan === "coloring" || rawPlan === "keepsake" || rawPlan === "avatar" ? rawPlan : "bundle";

  const locale = normalizeLocale(searchParams.get("locale"));
  const t = getTranslation(locale);
  const isRtl = locale === "ar";
  const homeHref = HOME_PATH_BY_LOCALE[locale];
  const planLabel = t.plans[plan];

  const makeLocaleHref = (nextLocale: LocaleKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("locale", nextLocale);
    return `/customize?${params.toString()}`;
  };

  const orderId = (searchParams.get("order_id") ?? "").trim();
  const sessionId = (searchParams.get("session_id") ?? "").trim();
  const blocked = searchParams.get("blocked") === "qc";
  const missingProvince = searchParams.get("missing_province") === "1";
  const missingOrder = !orderId;
  const isBundle = plan === "bundle";

  const [orderStatus, setOrderStatus] = useState<"loading" | "pending" | "paid" | "finalized" | "invalid">(missingOrder ? "invalid" : "loading");
  const [activeTab, setActiveTab] = useState<PlanId>(isBundle ? "coloring" : plan);
  const [visitedTabs, setVisitedTabs] = useState<Set<PlanId>>(new Set());
  const [editedTabs, setEditedTabs] = useState<Set<PlanId>>(new Set());

  const didMountRef = useRef(false);
  const draftLoadedRef = useRef(false);
  const autosaveTimerRef = useRef<number | null>(null);

  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [restoredDraft, setRestoredDraft] = useState(false);

  const [isConfirmedFinal, setIsConfirmedFinal] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [isPreparingDownloads, setIsPreparingDownloads] = useState(false);
  const [prepareStep, setPrepareStep] = useState(0);
  const prepareTimerRef = useRef<number | null>(null);

  const [downloadFiles, setDownloadFiles] = useState<{ coloring?: string; keepsake?: string; avatar?: string; }>({});

  const [coloringPaperSize, setColoringPaperSize] = useState<PaperSize>("a4");
  const [coloringOrientation, setColoringOrientation] = useState<Orientation>("portrait");
  const [coloringFrameStyle, setColoringFrameStyle] = useState<SimpleFrameStyle>("none");

  const [certificatePaperSize, setCertificatePaperSize] = useState<PaperSize>("a4");
  const [certificateOrientation, setCertificateOrientation] = useState<Orientation>("portrait");
  const [certificateFrameStyle, setCertificateFrameStyle] = useState<SimpleFrameStyle>("thinLine");
  const [certificateBg, setCertificateBg] = useState<CertificateBg>("linenBeige");
  const [certificateFont, setCertificateFont] = useState<FontKey>("elegantSerif");
  const [customBgColor, setCustomBgColor] = useState("#FFFFFF");
  const [customBgImageUrl, setCustomBgImageUrl] = useState<string>("");
  const [customBgImageError, setCustomBgImageError] = useState<string>("");
  const customBgImageInputRef = useRef<HTMLInputElement | null>(null);
  const [certificateTemplate, setCertificateTemplate] = useState<TemplateKey>("floral");

  const [certificateMainHeading, setCertificateMainHeading] = useState("");
  const [certificateSubtitle, setCertificateSubtitle] = useState("");
  const [certificateBottomText, setCertificateBottomText] = useState("");

  const [certMainPos, setCertMainPos] = useState<Position>(DEFAULT_CERT_MAIN_POS);
  const [certSubtitlePos, setCertSubtitlePos] = useState<Position>(DEFAULT_CERT_SUB_POS);
  const [certBottomPos, setCertBottomPos] = useState<Position>(DEFAULT_CERT_BOTTOM_POS);

  const [certMainSize, setCertMainSize] = useState(38);
  const [certSubtitleSize, setCertSubtitleSize] = useState(28);
  const [certBottomSize, setCertBottomSize] = useState(24);

  const [certMainRotate, setCertMainRotate] = useState(0);
  const [certSubtitleRotate, setCertSubtitleRotate] = useState(0);
  const [certBottomRotate, setCertBottomRotate] = useState(0);

  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>("clean");
  const [avatarShapeMode, setAvatarShapeMode] = useState<AvatarShapeMode>("mixed");
  const [avatarBgTone, setAvatarBgTone] = useState<AvatarBgTone>("cream");

  const certificateCanvasRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragState, setDragState] = useState<DragState>(null);

  const totalUsd = PRICES_USD[plan];
  const hasStripeEmail = deliveryEmail.trim().length > 0;
  const stripeEmailDisplay = hasStripeEmail ? deliveryEmail : t.banners.noStripeEmail;

  const selectedCertBg = certificateBg === "custom"
    ? { ...CERTIFICATE_BG_OPTIONS["custom"], bg: customBgColor }
    : CERTIFICATE_BG_OPTIONS[certificateBg];

  const isCustomMode = certificateTemplate === "customDesign" || certificateTemplate === "none";
  const resolvedTemplateSrc = getTemplateImageSrc(certificateTemplate, certificatePaperSize, certificateOrientation);

  const controlsLocked = isFinalized || blocked || missingProvince || missingOrder || isPreparingDownloads;
  const generateLocked = controlsLocked || orderStatus === "loading" || orderStatus === "pending";

  const finalizeBlockedReason = getFinalizeBlockedReason({ blocked, missingProvince, missingOrder, orderStatus, hasPhoto: Boolean(photoFile), isConfirmedFinal }, t);
  const canFinalize = !isFinalized && !isPreparingDownloads && finalizeBlockedReason.length === 0;

  useEffect(() => {
    if (!orderId) { setOrderStatus("invalid"); return; }
    let cancelled = false;
    let pollTimer: number | null = null;
    let attempts = 0;
    async function loadOrderStatus() {
      try {
        const attemptParam = `&attempt=${attempts + 1}`;
        const statusUrl = sessionId
          ? `/api/order-status?order_id=${encodeURIComponent(orderId)}&session_id=${encodeURIComponent(sessionId)}${attemptParam}`
          : `/api/order-status?order_id=${encodeURIComponent(orderId)}${attemptParam}`;
        const res = await fetch(statusUrl, { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (!cancelled) { if (res.status === 404) { setOrderStatus("invalid"); } else { setOrderStatus("pending"); } }
          return;
        }
        const dbStatus = data?.order?.status;
        if (cancelled) return;
        if (dbStatus === "finalized") {
          setOrderStatus("finalized");
          if (typeof data?.order?.customerEmail === "string") setDeliveryEmail(data.order.customerEmail.trim());
          setIsFinalized(true);
          setDownloadFiles(data?.order?.files || {});
        } else if (dbStatus === "paid") {
          setOrderStatus("paid");
          if (typeof data?.order?.customerEmail === "string") setDeliveryEmail(data.order.customerEmail.trim());
        } else if (dbStatus === "pending") {
          setOrderStatus("pending");
          if (attempts < 20) {
            attempts++;
            const delay = attempts <= 8 ? 1000 : 2000;
            pollTimer = window.setTimeout(loadOrderStatus, delay);
          } else { setOrderStatus("pending"); }
        } else { setOrderStatus("invalid"); }
      } catch (error) {
        console.error("Load order status failed:", error);
        if (!cancelled) setOrderStatus("invalid");
      }
    }
    loadOrderStatus();
    return () => { cancelled = true; if (pollTimer) window.clearTimeout(pollTimer); };
  }, [orderId, sessionId]);

  useEffect(() => {
    if (!orderId || typeof window === "undefined") { draftLoadedRef.current = true; return; }
    try {
      const raw = window.localStorage.getItem(getDraftStorageKey(orderId));
      if (raw) {
        const draft = JSON.parse(raw) as any;
        if (draft.activeTab) setActiveTab(draft.activeTab);
        if (draft.coloringPaperSize) setColoringPaperSize(draft.coloringPaperSize);
        if (draft.coloringOrientation) setColoringOrientation(draft.coloringOrientation);
        if (draft.coloringFrameStyle) setColoringFrameStyle(draft.coloringFrameStyle);
        if (draft.certificatePaperSize) setCertificatePaperSize(draft.certificatePaperSize);
        if (draft.certificateOrientation) setCertificateOrientation(draft.certificateOrientation);
        if (draft.certificateFrameStyle) setCertificateFrameStyle(draft.certificateFrameStyle);
        if (draft.certificateBg) setCertificateBg(draft.certificateBg);
        if (draft.certificateFont) setCertificateFont(draft.certificateFont);
        if (draft.customBgColor) setCustomBgColor(draft.customBgColor);
        if (draft.certificateTemplate) setCertificateTemplate(draft.certificateTemplate);
        if (draft.certificateMainHeading !== undefined) setCertificateMainHeading(draft.certificateMainHeading);
        if (draft.certificateSubtitle !== undefined) setCertificateSubtitle(draft.certificateSubtitle);
        if (draft.certificateBottomText !== undefined) setCertificateBottomText(draft.certificateBottomText);
        if (draft.certMainPos) setCertMainPos(draft.certMainPos);
        if (draft.certSubtitlePos) setCertSubtitlePos(draft.certSubtitlePos);
        if (draft.certBottomPos) setCertBottomPos(draft.certBottomPos);
        if (typeof draft.certMainSize === "number") setCertMainSize(draft.certMainSize);
        if (typeof draft.certSubtitleSize === "number") setCertSubtitleSize(draft.certSubtitleSize);
        if (typeof draft.certBottomSize === "number") setCertBottomSize(draft.certBottomSize);
        if (typeof draft.certMainRotate === "number") setCertMainRotate(draft.certMainRotate);
        if (typeof draft.certSubtitleRotate === "number") setCertSubtitleRotate(draft.certSubtitleRotate);
        if (typeof draft.certBottomRotate === "number") setCertBottomRotate(draft.certBottomRotate);
        if (draft.avatarStyle) setAvatarStyle(draft.avatarStyle);
        if (draft.avatarShapeMode) setAvatarShapeMode(draft.avatarShapeMode);
        if (draft.avatarBgTone) setAvatarBgTone(draft.avatarBgTone);
        setRestoredDraft(true);
      }
    } catch { } finally { draftLoadedRef.current = true; }
  }, [orderId]);

  useEffect(() => {
    if (!photoFile) { setPhotoPreviewUrl(""); return; }
    const objectUrl = URL.createObjectURL(photoFile);
    setPhotoPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photoFile]);

  useEffect(() => {
    if (!photoPreviewUrl) return;
    setVisitedTabs((prev) => { const next = new Set(prev); next.add(activeTab); return next; });
  }, [photoPreviewUrl, activeTab]);

  useEffect(() => {
    if (!didMountRef.current) return;
    setEditedTabs((prev) => new Set(prev).add("coloring"));
  }, [coloringPaperSize, coloringOrientation, coloringFrameStyle]);

  useEffect(() => {
    if (!didMountRef.current) return;
    const defaults = TEMPLATE_TEXT_DEFAULTS[certificateTemplate];
    if (!defaults) return;
    setCertMainPos(defaults.main);
    setCertSubtitlePos(defaults.subtitle);
    setCertBottomPos(defaults.bottom);
    setCertMainSize(defaults.mainSize);
    setCertSubtitleSize(defaults.subtitleSize);
    setCertBottomSize(defaults.bottomSize);
    setCertMainRotate(0);
    setCertSubtitleRotate(0);
    setCertBottomRotate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateTemplate]);

  useEffect(() => {
    if (!didMountRef.current) return;
    setEditedTabs((prev) => new Set(prev).add("keepsake"));
  }, [certificatePaperSize, certificateOrientation, certificateFrameStyle, certificateBg, certificateFont, customBgColor, certificateTemplate, certificateMainHeading, certificateSubtitle, certificateBottomText, certMainPos, certSubtitlePos, certBottomPos, certMainSize, certSubtitleSize, certBottomSize, certMainRotate, certSubtitleRotate, certBottomRotate]);

  useEffect(() => {
    if (!didMountRef.current) return;
    setEditedTabs((prev) => new Set(prev).add("avatar"));
  }, [avatarStyle, avatarShapeMode, avatarBgTone]);

  useEffect(() => { didMountRef.current = true; }, []);

  useEffect(() => {
    if (!isPreparingDownloads) {
      setPrepareStep(0);
      if (prepareTimerRef.current) { window.clearInterval(prepareTimerRef.current); prepareTimerRef.current = null; }
      return;
    }
    setPrepareStep(0);
    const steps = (t.finalize.prepareSteps as string[]) ?? [];
    const totalSteps = steps.length || 5;
    let current = 0;
    prepareTimerRef.current = window.setInterval(() => {
      current += 1;
      if (current < totalSteps - 1) { setPrepareStep(current); }
      else { setPrepareStep(totalSteps - 1); if (prepareTimerRef.current) { window.clearInterval(prepareTimerRef.current); prepareTimerRef.current = null; } }
    }, 2200);
    return () => { if (prepareTimerRef.current) { window.clearInterval(prepareTimerRef.current); prepareTimerRef.current = null; } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPreparingDownloads]);

  useEffect(() => {
    if (!draftLoadedRef.current || !didMountRef.current || !orderId || isFinalized || typeof window === "undefined") return;
    if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = window.setTimeout(() => {
      const draft = { activeTab, coloringPaperSize, coloringOrientation, coloringFrameStyle, certificatePaperSize, certificateOrientation, certificateFrameStyle, certificateBg, certificateFont, customBgColor, certificateTemplate, certificateMainHeading, certificateSubtitle, certificateBottomText, certMainPos, certSubtitlePos, certBottomPos, certMainSize, certSubtitleSize, certBottomSize, certMainRotate, certSubtitleRotate, certBottomRotate, avatarStyle, avatarShapeMode, avatarBgTone };
      try { window.localStorage.setItem(getDraftStorageKey(orderId), JSON.stringify(draft)); } catch { }
    }, 450);
    return () => { if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current); };
  }, [orderId, isFinalized, activeTab, coloringPaperSize, coloringOrientation, coloringFrameStyle, certificatePaperSize, certificateOrientation, certificateFrameStyle, certificateBg, certificateFont, customBgColor, certificateTemplate, certificateMainHeading, certificateSubtitle, certificateBottomText, certMainPos, certSubtitlePos, certBottomPos, certMainSize, certSubtitleSize, certBottomSize, certMainRotate, certSubtitleRotate, certBottomRotate, avatarStyle, avatarShapeMode, avatarBgTone]);

  useEffect(() => {
    if (!dragState || controlsLocked) return;
    document.body.style.userSelect = "none";
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect?: string }).webkitUserSelect = "none";
    const onPointerMove = (e: PointerEvent) => {
      const rect = certificateCanvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = ((e.clientX - dragState.startX) / rect.width) * 100;
      const dy = ((e.clientY - dragState.startY) / rect.height) * 100;
      const maxBottomY = 86;
      const nextY = dragState.target === "bottom" ? clamp(dragState.originY + dy, SAFE_MIN_POS, maxBottomY) : clamp(dragState.originY + dy, SAFE_MIN_POS, SAFE_MAX_POS);
      const next = { x: clamp(dragState.originX + dx, SAFE_MIN_POS, SAFE_MAX_POS), y: nextY };
      if (dragState.target === "main") setCertMainPos(next);
      if (dragState.target === "subtitle") setCertSubtitlePos(next);
      if (dragState.target === "bottom") setCertBottomPos(next);
    };
    const clearDragging = () => {
      setDragState(null);
      document.body.style.userSelect = "";
      (document.body.style as CSSStyleDeclaration & { webkitUserSelect?: string }).webkitUserSelect = "";
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", clearDragging);
    window.addEventListener("pointercancel", clearDragging);
    window.addEventListener("blur", clearDragging);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", clearDragging);
      window.removeEventListener("pointercancel", clearDragging);
      window.removeEventListener("blur", clearDragging);
      document.body.style.userSelect = "";
      (document.body.style as CSSStyleDeclaration & { webkitUserSelect?: string }).webkitUserSelect = "";
    };
  }, [dragState, controlsLocked]);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const pickedFile = e.target.files?.[0] ?? null;
    setUploadError(""); setSubmitError("");
    if (!pickedFile) { if (fileInputRef.current) fileInputRef.current.value = ""; return; }
    if (!ACCEPTED_IMAGE_TYPES.has(pickedFile.type)) { setUploadError(t.upload.fileTypes); if (fileInputRef.current) fileInputRef.current.value = ""; return; }
    if (pickedFile.size > MAX_IMAGE_SIZE_BYTES) { setUploadError(t.upload.fileTypes); if (fileInputRef.current) fileInputRef.current.value = ""; return; }
    setPhotoFile(pickedFile);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleRemovePhoto() { if (controlsLocked) return; setPhotoFile(null); setUploadError(""); }
  function handleTabChange(tab: PlanId) { if (controlsLocked) return; setActiveTab(tab); }

  function startCertificateDrag(e: React.PointerEvent<HTMLDivElement>, target: "main" | "subtitle" | "bottom", origin: Position) {
    if (controlsLocked) return;
    e.preventDefault();
    setDragState({ mode: "cert", target, startX: e.clientX, startY: e.clientY, originX: origin.x, originY: origin.y });
  }

  function resetCertificateLayout() {
    setCertMainPos(DEFAULT_CERT_MAIN_POS); setCertSubtitlePos(DEFAULT_CERT_SUB_POS); setCertBottomPos(DEFAULT_CERT_BOTTOM_POS);
    setCertMainSize(38); setCertSubtitleSize(28); setCertBottomSize(24);
    setCertMainRotate(0); setCertSubtitleRotate(0); setCertBottomRotate(0);
  }

  function handleCustomBgImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCustomBgImageError("");
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.has(file.type)) { setCustomBgImageError("Please upload a JPG, PNG, or WEBP image."); return; }
    if (file.size > MAX_IMAGE_SIZE_BYTES) { setCustomBgImageError("File too large. Max 15MB."); return; }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.width < 800 || img.height < 600) { setCustomBgImageError("Image resolution too low. For best results, use a high-resolution, light background image."); return; }
      const reader = new FileReader();
      reader.onload = (ev) => { setCustomBgImageUrl(ev.target?.result as string); };
      reader.readAsDataURL(file);
    };
    img.onerror = () => { URL.revokeObjectURL(url); setCustomBgImageError("Could not read image."); };
    img.src = url;
    if (customBgImageInputRef.current) customBgImageInputRef.current.value = "";
  }

  async function handleFinalize() {
    if (!canFinalize || !photoFile) return;
    let timeoutId: number | undefined;
    try {
      setSubmitError(""); setIsPreparingDownloads(true);
      const customizationPayload = { plan, coloringPaperSize, coloringOrientation, coloringFrameStyle, certificatePaperSize, certificateOrientation, certificateFrameStyle, certificateBg, certificateFont, customBgColor, certificateTemplate, certificateMainHeading, certificateSubtitle, certificateBottomText, certMainPos, certSubtitlePos, certBottomPos, certMainSize, certSubtitleSize, certBottomSize, certMainRotate, certSubtitleRotate, certBottomRotate, avatarStyle, avatarShapeMode, avatarBgTone, avatarPackMode: "auto12" };
      const formData = new FormData();
      formData.append("order_id", orderId);
      formData.append("plan", plan);
      formData.append("photo", photoFile, photoFile.name);
      formData.append("customization", JSON.stringify(customizationPayload));
      const controller = new AbortController();
      timeoutId = window.setTimeout(() => controller.abort(), 45000);
      const res = await fetch("/api/finalize-download", { method: "POST", body: formData, signal: controller.signal });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || t.finalize.processing);
      const files = data?.files || {};
      if (!files.coloring && !files.keepsake && !files.avatar) throw new Error("No download links returned.");
      setDownloadFiles(files);
      setIsFinalized(true);
      if (typeof window !== "undefined" && orderId) window.localStorage.removeItem(getDraftStorageKey(orderId));
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") { setSubmitError("Taking too long. Try again."); }
      else { setSubmitError(err instanceof Error ? err.message : "Something went wrong."); }
    } finally {
      if (timeoutId) window.clearTimeout(timeoutId);
      setIsPreparingDownloads(false);
    }
  }

  const showSuccessBanner = orderStatus === "paid" && !blocked && !missingProvince && !missingOrder;

  // ─── Dynamic aspect ratio for template cards ───
  const templateCardAr = getDynamicAspectRatio(certificatePaperSize, certificateOrientation);

  return (
    <main className="min-h-screen bg-[#F5EFE6] px-4 py-5 font-sans text-[#422B1E] selection:bg-[#6B8E7B] selection:text-white md:px-6 md:py-8">
      <div className="mx-auto max-w-[1500px]">
        <div dir={isRtl ? "rtl" : "ltr"} className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#dacdbf] bg-white/85 px-5 py-4 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-12 w-auto overflow-hidden sm:h-14">
              <img src={COMPANY_LOGO_PATH} alt="Pet Keeps Art" className="h-full w-full object-contain" />
            </div>
            <Link href={homeHref} className={`inline-flex items-center gap-2 rounded-full border border-[#d7c9bb] bg-[#fcf9f5] px-4 py-2 text-[13px] font-bold text-[#5B4334] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${isPreparingDownloads ? "pointer-events-none opacity-50" : ""}`}>
              {isRtl ? (<><span>{t.back}</span><span aria-hidden="true">→</span></>) : (<><span aria-hidden="true">←</span><span>{t.back}</span></>)}
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {LANGUAGE_OPTIONS.map((lang) => (
                <Link key={lang.key} href={makeLocaleHref(lang.key)} className={`inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-[16px] border px-3 py-1.5 text-[12px] font-bold transition ${lang.key === locale ? "border-[#3A2418] bg-[#3A2418] text-white" : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"}`}>
                  {lang.label}
                </Link>
              ))}
            </div>
            <div className="rounded-full border border-[#d7c9bb] bg-[#F9F7F5] px-5 py-2 text-[13px] font-bold text-[#7A5A46]">
              {t.orderLabel} <span className="font-extrabold text-[#4B3427]">{planLabel}</span>
            </div>
          </div>
        </div>

        {blocked && <Banner tone="red">{t.banners.blocked}</Banner>}
        {missingProvince && <Banner tone="amber">{t.banners.missingProv}</Banner>}
        {missingOrder && <Banner tone="red">{t.banners.missingOrder}</Banner>}
        {!missingOrder && orderStatus === "loading" && <Banner tone="amber">{t.banners.checking}</Banner>}
        {!missingOrder && orderStatus === "invalid" && <Banner tone="red">{t.banners.invalid}</Banner>}
        {!missingOrder && orderStatus === "pending" && <Banner tone="amber">{t.banners.verifying}</Banner>}
        {!missingOrder && orderStatus === "finalized" && <Banner tone="green">{t.banners.finalized}</Banner>}
        {showSuccessBanner && !photoPreviewUrl && !isFinalized && <Banner tone="green">{t.banners.paymentRecv}</Banner>}
        {isFinalized && orderStatus !== "finalized" && <Banner tone="green">{t.banners.highResReady}</Banner>}
        {!hasStripeEmail && !missingOrder && !blocked && orderStatus === "paid" && <Banner tone="amber">{t.banners.noStripeEmail}</Banner>}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[55%_45%] lg:gap-8 xl:grid-cols-[60%_40%]">
          <div className="relative z-0 flex flex-col gap-4 lg:sticky lg:top-6 lg:z-10" dir="ltr">
            <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-[#dacdbf] bg-[#fcf9f5] p-4 shadow-lg sm:min-h-[430px] lg:min-h-[640px]">
              <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-[#eadfd2]" />
              {!photoPreviewUrl && !isFinalized ? (
                <div className="flex flex-col items-center p-8 text-center transition-opacity duration-500">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white text-[36px] shadow-md">📸</div>
                  <div className="text-[24px] font-black text-[#4B3427]">{t.upload.canvasReady}</div>
                  <p className="mt-2 max-w-[260px] text-[15px] leading-relaxed text-[#8A7464]">{t.upload.uploadPrompt}</p>
                </div>
              ) : !photoPreviewUrl && isFinalized ? (
                <div className="flex flex-col items-center p-8 text-center transition-opacity duration-500">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-[36px] shadow-md">✨</div>
                  <div className="text-[24px] font-black text-[#4B3427]">{t.upload.designsReady}</div>
                  <p className="mt-2 max-w-[260px] text-[15px] leading-relaxed text-[#8A7464]">{t.upload.downloadPrompt}</p>
                </div>
              ) : (
                <div className="z-[1] flex h-full w-full flex-col items-center transition-opacity duration-500">
                  <div className={`relative flex h-full w-full items-center justify-center p-1 sm:p-2 transition-opacity ${isPreparingDownloads ? "opacity-60" : ""}`}>
                    {activeTab === "coloring" && (<ColorPreview url={photoPreviewUrl} paperSize={coloringPaperSize} orientation={coloringOrientation} frameStyle={coloringFrameStyle} isFinalized={isFinalized} />)}
                    {activeTab === "keepsake" && (<CertificatePreview canvasRef={certificateCanvasRef} paperSize={certificatePaperSize} orientation={certificateOrientation} bg={selectedCertBg} frameStyle={isCustomMode ? certificateFrameStyle : "none"} templateSrc={resolvedTemplateSrc} isCustomMode={isCustomMode} customBgImageUrl={isCustomMode ? customBgImageUrl : ""} photoUrl={photoPreviewUrl} font={FONT_OPTIONS[certificateFont].family} mainHeading={certificateMainHeading || t.customize.petNameHeading} subtitle={certificateSubtitle || t.customize.subtitle} bottomText={certificateBottomText || t.customize.bottomText} mainPos={certMainPos} subtitlePos={certSubtitlePos} bottomPos={certBottomPos} mainSize={certMainSize} subtitleSize={certSubtitleSize} bottomSize={certBottomSize} mainRotate={certMainRotate} subtitleRotate={certSubtitleRotate} bottomRotate={certBottomRotate} isFinalized={isFinalized} isLocked={controlsLocked} onMainPointerDown={(e) => startCertificateDrag(e, "main", certMainPos)} onSubtitlePointerDown={(e) => startCertificateDrag(e, "subtitle", certSubtitlePos)} onBottomPointerDown={(e) => startCertificateDrag(e, "bottom", certBottomPos)} />)}
                    {activeTab === "avatar" && (<AvatarPreview url={photoPreviewUrl} styleMode={avatarStyle} shapeMode={avatarShapeMode} bgTone={avatarBgTone} isFinalized={isFinalized} t={t} />)}
                  </div>
                  {!isFinalized && activeTab === "keepsake" && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#eadfd2] bg-white/90 px-4 py-2 text-[13px] font-bold text-[#6B5345] shadow-sm backdrop-blur-md sm:mt-6">
                      <span className="text-[16px]">💡</span>{t.upload.hint}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-6 lg:pr-4 xl:pr-6">
            {isBundle && photoPreviewUrl && !isFinalized && (
              <div className="rounded-[24px] border border-[#dacdbf] bg-[#fdfbf9] p-5 shadow-sm transition-opacity duration-500">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-[#eadfd2]" />
                  <span className="text-[13px] font-black uppercase tracking-wider text-[#8A7464]">{t.bundle.title}</span>
                  <div className="h-[1px] flex-1 bg-[#eadfd2]" />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <BundleProgressCard id="coloring" title={t.plans.coloring} subtitle={t.bundle.coloringSub} previewSrc={photoPreviewUrl} status={getBundleStatus(activeTab, "coloring", Boolean(photoPreviewUrl), isFinalized, editedTabs.has("coloring"), visitedTabs.has("coloring"))} isActive={activeTab === "coloring"} onClick={() => handleTabChange("coloring")} disabled={controlsLocked} t={t} />
                  <BundleProgressCard id="keepsake" title={t.plans.keepsake} subtitle={t.bundle.keepsakeSub} previewSrc={photoPreviewUrl} status={getBundleStatus(activeTab, "keepsake", Boolean(photoPreviewUrl), isFinalized, editedTabs.has("keepsake"), visitedTabs.has("keepsake"))} isActive={activeTab === "keepsake"} onClick={() => handleTabChange("keepsake")} disabled={controlsLocked} t={t} />
                  <BundleProgressCard id="avatar" title={t.plans.avatar} subtitle={t.bundle.avatarSub} previewSrc={photoPreviewUrl} status={getBundleStatus(activeTab, "avatar", Boolean(photoPreviewUrl), isFinalized, editedTabs.has("avatar"), visitedTabs.has("avatar"))} isActive={activeTab === "avatar"} onClick={() => handleTabChange("avatar")} disabled={controlsLocked} t={t} />
                </div>
              </div>
            )}

            {!isFinalized && (
              <div className={`rounded-[24px] border border-[#dacdbf] bg-white p-6 shadow-sm transition-all ${!photoFile && !controlsLocked ? "ring-2 ring-[#6B8E7B]/25" : ""}`}>
                <h3 className="mb-4 flex items-center gap-2 text-[18px] font-black text-[#4B3427]">
                  <StepBadge number="1" /> {t.upload.step1}
                </h3>
                {!photoFile && restoredDraft && (<div className="mb-4 text-[13px] font-semibold text-[#8A7464]">{t.upload.draftRestored}</div>)}
                <input id="file-up" type="file" accept=".jpg,.jpeg,.png,.webp" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" disabled={controlsLocked} />
                {!photoFile ? (
                  <label htmlFor="file-up" className={`block rounded-[18px] border-2 border-dashed p-5 transition-all ${controlsLocked ? "cursor-not-allowed border-[#cdb9a7] bg-[#faf4ec] opacity-70" : "cursor-pointer border-[#cdb9a7] bg-[#faf4ec] hover:border-[#6B8E7B] hover:bg-[#f0f5f2]"}`}>
                    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-start sm:text-left">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#8A7464] shadow-sm"><Icons.Upload /></div>
                      <div className="flex-1">
                        <div className="text-[15px] font-bold text-[#6B5345]">{t.upload.clickToUpload}</div>
                        <div className="mt-1 text-[13px] text-[#8A7464]">{t.upload.fileTypes}</div>
                      </div>
                      <span className="inline-flex rounded-xl bg-[#6B8E7B] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm">{t.upload.browse}</span>
                    </div>
                  </label>
                ) : (
                  <div className="rounded-[18px] border-2 border-[#6B8E7B] bg-[#f0f5f2] p-5">
                    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:text-left">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#166534]"><Icons.Check /></div>
                        <div>
                          <div className="text-[15px] font-bold text-[#166534]">{t.upload.uploaded}</div>
                          <div className="mt-1 max-w-[200px] truncate text-[13px] text-[#4E6A45] sm:max-w-[240px]" dir="ltr">{photoFile.name}</div>
                        </div>
                      </div>
                      {!controlsLocked && (
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 rounded-[12px] border border-[#b5c7bc] bg-white px-4 py-2 text-[13px] font-bold text-[#6B8E7B] shadow-sm transition-colors hover:bg-[#eaf1ec]"><Icons.Replace /> {t.upload.replace}</button>
                          <button type="button" onClick={handleRemovePhoto} className="flex items-center gap-1.5 rounded-[12px] border border-red-200 bg-white px-3 py-2 text-[13px] font-bold text-red-600 shadow-sm transition-colors hover:bg-red-50"><Icons.Trash /> {t.upload.remove}</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {uploadError && (<InlineNotice tone="red" className="mt-4">{uploadError}</InlineNotice>)}
                {!photoFile && editedTabs.size > 0 && (<div aria-live="polite" className="mt-3 text-center text-[12px] font-medium text-[#8A7464]">{t.upload.draftSaved}</div>)}
              </div>
            )}

            {photoPreviewUrl && !isFinalized && (
              <div className="rounded-[24px] border border-[#dacdbf] bg-white p-6 shadow-sm transition-opacity duration-500">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#eadfd2] pb-4">
                  <h3 className="flex items-center gap-2 text-[18px] font-black capitalize text-[#4B3427]">
                    <StepBadge number="2" /> {t.customize.step2} {t.plans[activeTab]}
                  </h3>
                  {activeTab === "keepsake" && !isFinalized && (
                    <button type="button" onClick={resetCertificateLayout} disabled={controlsLocked} className="inline-flex items-center gap-2 rounded-full border border-[#d7c9bb] bg-[#fcf9f5] px-4 py-2 text-[12px] font-bold text-[#6B5345] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md disabled:pointer-events-none disabled:opacity-50">
                      <Icons.Reset /> {t.customize.resetLayout}
                    </button>
                  )}
                </div>

                {activeTab === "coloring" && (
                  <div className="space-y-6 transition-opacity duration-300">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-[13px] font-bold text-[#6B5345]">{t.customize.orientation}</label>
                        <div className="flex gap-2">
                          <VisualSwatch label={t.customize.portrait} isActive={coloringOrientation === "portrait"} onClick={() => setColoringOrientation("portrait")} disabled={controlsLocked} />
                          <VisualSwatch label={t.customize.landscape} isActive={coloringOrientation === "landscape"} onClick={() => setColoringOrientation("landscape")} disabled={controlsLocked} />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-[13px] font-bold text-[#6B5345]">{t.customize.paperSize}</label>
                        <div className="flex gap-2">
                          <VisualSwatch label={t.customize.a4} isActive={coloringPaperSize === "a4"} onClick={() => setColoringPaperSize("a4")} disabled={controlsLocked} />
                          <VisualSwatch label={t.customize.letter} isActive={coloringPaperSize === "letter"} onClick={() => setColoringPaperSize("letter")} disabled={controlsLocked} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="block text-[13px] font-bold text-[#6B5345]">{t.customize.borderStyle}</label>
                        <span className="rounded bg-[#fcf9f5] px-2 py-0.5 text-[11px] font-semibold text-[#8A7464]">{t.customize.printerFriendly}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <FrameStyleSwatch label={t.customize.none} frameStyle="none" isActive={coloringFrameStyle === "none"} onClick={() => setColoringFrameStyle("none")} disabled={controlsLocked} />
                        <FrameStyleSwatch label={t.customize.thinLine} frameStyle="thinLine" isActive={coloringFrameStyle === "thinLine"} onClick={() => setColoringFrameStyle("thinLine")} disabled={controlsLocked} />
                        <FrameStyleSwatch label={t.customize.doubleLine} frameStyle="doubleLine" isActive={coloringFrameStyle === "doubleLine"} onClick={() => setColoringFrameStyle("doubleLine")} disabled={controlsLocked} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "keepsake" && (
                  <div className="space-y-6 transition-opacity duration-300">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-[13px] font-bold text-[#6B5345]">{t.customize.orientation}</label>
                        <div className="flex gap-2">
                          <VisualSwatch label={t.customize.portrait} isActive={certificateOrientation === "portrait"} onClick={() => setCertificateOrientation("portrait")} disabled={controlsLocked} />
                          <VisualSwatch label={t.customize.landscape} isActive={certificateOrientation === "landscape"} onClick={() => setCertificateOrientation("landscape")} disabled={controlsLocked} />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-[13px] font-bold text-[#6B5345]">{t.customize.paperSize}</label>
                        <div className="flex gap-2">
                          <VisualSwatch label={t.customize.a4} isActive={certificatePaperSize === "a4"} onClick={() => setCertificatePaperSize("a4")} disabled={controlsLocked} />
                          <VisualSwatch label={t.customize.letter} isActive={certificatePaperSize === "letter"} onClick={() => setCertificatePaperSize("letter")} disabled={controlsLocked} />
                        </div>
                      </div>
                    </div>

                    {/* ── Template selector — dynamic thumbnails matching current orientation + paper size ── */}
                    <div>
                      <label className="mb-3 block text-[13px] font-bold text-[#6B5345]">Template</label>
                      <div className="grid grid-cols-2 gap-3">
                        {/* ── 4 real templates: thumbnail src changes with orientation+paperSize ── */}
                        {(Object.keys(TEMPLATE_IMAGE_MAP) as TemplateBaseName[]).map((key) => {
                          const sizeKey: TemplateSizeKey = `${certificatePaperSize}_${certificateOrientation}`;
                          const thumbSrc = TEMPLATE_IMAGE_MAP[key][sizeKey];
                          return (
                            <button
                              key={key}
                              type="button"
                              disabled={controlsLocked}
                              onClick={() => setCertificateTemplate(key)}
                              className={`overflow-hidden rounded-[14px] border-2 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${certificateTemplate === key ? "border-[#6B8E7B] shadow-md ring-2 ring-[#6B8E7B]/30" : "border-[#eadfd2] hover:border-[#b5c7bc] hover:shadow-sm"}`}
                            >
                              <div className="w-full overflow-hidden" style={{ aspectRatio: templateCardAr }}>
                                <img
                                  src={thumbSrc}
                                  alt={TEMPLATE_LABELS[key]}
                                  className="h-full w-full object-cover"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                />
                              </div>
                              <div className="px-3 py-2 text-center text-[12px] font-bold text-[#6B5345]">
                                {TEMPLATE_LABELS[key]}
                              </div>
                            </button>
                          );
                        })}

                        {/* ── No Template option ── */}
                        <button
                          type="button"
                          disabled={controlsLocked}
                          onClick={() => setCertificateTemplate("none")}
                          className={`overflow-hidden rounded-[14px] border-2 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${certificateTemplate === "none" ? "border-[#6B8E7B] shadow-md ring-2 ring-[#6B8E7B]/30" : "border-[#eadfd2] hover:border-[#b5c7bc] hover:shadow-sm"}`}
                        >
                          <div className="flex items-center justify-center bg-[#f7f3ea]" style={{ aspectRatio: templateCardAr }}>
                            <span className="text-[28px]">🟫</span>
                          </div>
                          <div className="px-3 py-2 text-center text-[12px] font-bold text-[#6B5345]">{TEMPLATE_LABELS["none"]}</div>
                        </button>

                        {/* ── Custom Design option ── */}
                        <button
                          type="button"
                          disabled={controlsLocked}
                          onClick={() => setCertificateTemplate("customDesign")}
                          className={`overflow-hidden rounded-[14px] border-2 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${certificateTemplate === "customDesign" ? "border-[#6B8E7B] shadow-md ring-2 ring-[#6B8E7B]/30" : "border-[#eadfd2] hover:border-[#b5c7bc] hover:shadow-sm"}`}
                        >
                          <div className="flex items-center justify-center bg-[#fdfbf9]" style={{ aspectRatio: templateCardAr }}>
                            <span className="text-[28px]">🎨</span>
                          </div>
                          <div className="px-3 py-2 text-center text-[12px] font-bold text-[#6B5345]">{TEMPLATE_LABELS["customDesign"]}</div>
                        </button>
                      </div>
                    </div>

                    {/* ── Custom Design mode options ── */}
                    {isCustomMode && (
                      <>
                        <div>
                          <label className="mb-3 block text-[13px] font-bold text-[#6B5345]">{t.customize.bgColor}</label>
                          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                            {Object.entries(CERTIFICATE_BG_OPTIONS).map(([key, value]) => (
                              <button key={key} type="button" disabled={controlsLocked} onClick={() => setCertificateBg(key as CertificateBg)} title={value.label}
                                className={`flex flex-col items-center gap-1.5 rounded-[12px] border-2 p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${certificateBg === key ? "border-[#6B8E7B] shadow-md ring-2 ring-[#6B8E7B]/30" : "border-[#eadfd2] hover:border-[#b5c7bc] hover:shadow-sm disabled:hover:border-[#eadfd2]"}`}>
                                <div className="h-8 w-full rounded-[8px] border border-[#d9cbbc]/60" style={{ backgroundColor: key === "custom" ? customBgColor : value.bg }} />
                                <span className="text-[10px] font-bold leading-tight text-center text-[#8A7464]">{(t.customize as CustomizeTranslation).bgLabels?.[key] ?? value.label}</span>
                              </button>
                            ))}
                          </div>
                          {certificateBg === "custom" && (
                            <div className="mt-3 flex items-center gap-3">
                              <label className="text-[13px] font-bold text-[#6B5345]">Color</label>
                              <input type="color" value={customBgColor} onChange={(e) => setCustomBgColor(e.target.value)} disabled={controlsLocked} className="h-10 w-12 cursor-pointer rounded-[8px] border border-[#d9cbbc] disabled:cursor-not-allowed disabled:opacity-50" />
                              <span className="text-[12px] font-mono text-[#8A7464]">{customBgColor}</span>
                            </div>
                          )}
                          <div className="mt-4">
                            <div className="mb-1 text-[12px] font-bold text-[#6B5345]">Background Image <span className="font-normal text-[#8A7464]">(optional)</span></div>
                            <p className="mb-2 text-[11px] text-[#8A7464]">💡 Best results: high-resolution, light background image</p>
                            <input id="cert-bg-img" type="file" accept=".jpg,.jpeg,.png,.webp" ref={customBgImageInputRef} onChange={handleCustomBgImageChange} className="hidden" disabled={controlsLocked} />
                            {!customBgImageUrl ? (
                              <label htmlFor="cert-bg-img" className={`flex cursor-pointer items-center gap-3 rounded-[14px] border-2 border-dashed border-[#d9cbbc] bg-[#faf4ec] px-4 py-3 transition-all ${controlsLocked ? "pointer-events-none opacity-50" : "hover:border-[#6B8E7B] hover:bg-[#f0f5f2]"}`}>
                                <span className="text-[20px]">🖼️</span>
                                <span className="text-[13px] font-bold text-[#6B5345]">Upload background image</span>
                              </label>
                            ) : (
                              <div className="flex items-center gap-3 rounded-[14px] border border-[#b5c7bc] bg-[#f0f5f2] px-4 py-3">
                                <img src={customBgImageUrl} alt="BG" className="h-10 w-10 rounded-[8px] object-cover border border-[#d9cbbc]" />
                                <span className="flex-1 text-[13px] font-bold text-[#166534]">Background set</span>
                                {!controlsLocked && (<button type="button" onClick={() => setCustomBgImageUrl("")} className="text-[12px] font-bold text-red-500 hover:text-red-700">Remove</button>)}
                              </div>
                            )}
                            {customBgImageError && (<p className="mt-2 text-[12px] font-semibold text-red-600">{customBgImageError}</p>)}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <label className="block text-[13px] font-bold text-[#6B5345]">{t.customize.borderStyle}</label>
                            <span className="rounded bg-[#fcf9f5] px-2 py-0.5 text-[11px] font-semibold text-[#8A7464]">{t.customize.printerFriendly}</span>
                          </div>
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <FrameStyleSwatch label={t.customize.none} frameStyle="none" isActive={certificateFrameStyle === "none"} onClick={() => setCertificateFrameStyle("none")} disabled={controlsLocked} />
                            <FrameStyleSwatch label={t.customize.thinLine} frameStyle="thinLine" isActive={certificateFrameStyle === "thinLine"} onClick={() => setCertificateFrameStyle("thinLine")} disabled={controlsLocked} />
                            <FrameStyleSwatch label={t.customize.doubleLine} frameStyle="doubleLine" isActive={certificateFrameStyle === "doubleLine"} onClick={() => setCertificateFrameStyle("doubleLine")} disabled={controlsLocked} />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="my-6 h-px w-full bg-[#eadfd2]" />

                    <div className="space-y-5">
                      <div>
                        <label className="mb-3 block text-[13px] font-bold text-[#6B5345]">{t.customize.fontStyle}</label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {Object.entries(FONT_OPTIONS).map(([key, value]) => {
                            const isActive = certificateFont === key;
                            return (
                              <button key={key} type="button" disabled={controlsLocked} onClick={() => setCertificateFont(key as FontKey)}
                                className={`flex flex-col items-center gap-1 rounded-[12px] border-2 px-3 py-3 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${isActive ? "border-[#6B8E7B] bg-[#f0f5f2] shadow-sm" : "border-[#eadfd2] bg-white hover:border-[#b5c7bc] hover:bg-[#fdfbf9]"}`}>
                                <span className="text-[18px] leading-tight text-[#4B3427]" style={{ fontFamily: value.family }}>Aa</span>
                                <span className="text-[10px] font-bold text-[#8A7464] leading-tight text-center">{(t.customize as CustomizeTranslation).fontLabels?.[key] ?? value.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-[16px] border border-[#eadfd2] bg-[#fdfbf9] p-4 transition-colors focus-within:border-[#b5c7bc]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] font-bold text-[#6B5345]">{t.customize.petNameHeading}</span>
                          <button type="button" disabled={controlsLocked} onClick={() => { setCertMainPos(DEFAULT_CERT_MAIN_POS); setCertMainSize(38); setCertMainRotate(0); }} className="text-[11px] font-semibold text-[#6B8E7B] hover:text-[#4a6b58] disabled:opacity-40 disabled:cursor-not-allowed">↺ {t.customize.resetPos}</button>
                        </div>
                        <TextInput label="" value={certificateMainHeading} onChange={setCertificateMainHeading} placeholder={(t.customize as CustomizeTranslation).placeholders?.petName ?? "e.g. Charlie🐾"} disabled={controlsLocked} />
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" dir="ltr">
                          <SliderField label={t.customize.textSize} value={certMainSize} min={28} max={84} onChange={setCertMainSize} disabled={controlsLocked} />
                          <SliderField label={t.customize.rotation} value={certMainRotate} min={-20} max={20} onChange={setCertMainRotate} disabled={controlsLocked} />
                          <SliderField label={t.customize.xPos} value={certMainPos.x} min={SAFE_MIN_POS} max={SAFE_MAX_POS} onChange={(val) => setCertMainPos((prev) => ({ ...prev, x: val }))} disabled={controlsLocked} />
                          <SliderField label={t.customize.yPos} value={certMainPos.y} min={SAFE_MIN_POS} max={SAFE_MAX_POS} onChange={(val) => setCertMainPos((prev) => ({ ...prev, y: val }))} disabled={controlsLocked} />
                        </div>
                      </div>

                      <div className="rounded-[16px] border border-[#eadfd2] bg-[#fdfbf9] p-4 transition-colors focus-within:border-[#b5c7bc]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] font-bold text-[#6B5345]">{t.customize.subtitle}</span>
                          <button type="button" disabled={controlsLocked} onClick={() => { setCertSubtitlePos(DEFAULT_CERT_SUB_POS); setCertSubtitleSize(28); setCertSubtitleRotate(0); }} className="text-[11px] font-semibold text-[#6B8E7B] hover:text-[#4a6b58] disabled:opacity-40 disabled:cursor-not-allowed">↺ {t.customize.resetPos}</button>
                        </div>
                        <TextInput label="" value={certificateSubtitle} onChange={setCertificateSubtitle} placeholder={(t.customize as CustomizeTranslation).placeholders?.subtitle ?? "e.g. Forever in our hearts💛"} disabled={controlsLocked} />
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" dir="ltr">
                          <SliderField label={t.customize.textSize} value={certSubtitleSize} min={18} max={48} onChange={setCertSubtitleSize} disabled={controlsLocked} />
                          <SliderField label={t.customize.rotation} value={certSubtitleRotate} min={-20} max={20} onChange={setCertSubtitleRotate} disabled={controlsLocked} />
                          <SliderField label={t.customize.xPos} value={certSubtitlePos.x} min={SAFE_MIN_POS} max={SAFE_MAX_POS} onChange={(val) => setCertSubtitlePos((prev) => ({ ...prev, x: val }))} disabled={controlsLocked} />
                          <SliderField label={t.customize.yPos} value={certSubtitlePos.y} min={SAFE_MIN_POS} max={SAFE_MAX_POS} onChange={(val) => setCertSubtitlePos((prev) => ({ ...prev, y: val }))} disabled={controlsLocked} />
                        </div>
                      </div>

                      <div className="rounded-[16px] border border-[#eadfd2] bg-[#fdfbf9] p-4 transition-colors focus-within:border-[#b5c7bc]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] font-bold text-[#6B5345]">{t.customize.bottomText}</span>
                          <button type="button" disabled={controlsLocked} onClick={() => { setCertBottomPos(DEFAULT_CERT_BOTTOM_POS); setCertBottomSize(24); setCertBottomRotate(0); }} className="text-[11px] font-semibold text-[#6B8E7B] hover:text-[#4a6b58] disabled:opacity-40 disabled:cursor-not-allowed">↺ {t.customize.resetPos}</button>
                        </div>
                        <TextInput label="" value={certificateBottomText} onChange={setCertificateBottomText} placeholder={(t.customize as CustomizeTranslation).placeholders?.bottomText ?? "e.g. 2010 - 2026 · Always loved"} disabled={controlsLocked} />
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" dir="ltr">
                          <SliderField label={t.customize.textSize} value={certBottomSize} min={16} max={42} onChange={setCertBottomSize} disabled={controlsLocked} />
                          <SliderField label={t.customize.rotation} value={certBottomRotate} min={-20} max={20} onChange={setCertBottomRotate} disabled={controlsLocked} />
                          <SliderField label={t.customize.xPos} value={certBottomPos.x} min={SAFE_MIN_POS} max={SAFE_MAX_POS} onChange={(val) => setCertBottomPos((prev) => ({ ...prev, x: val }))} disabled={controlsLocked} />
                          <SliderField label={t.customize.yPos} value={certBottomPos.y} min={SAFE_MIN_POS} max={86} onChange={(val) => setCertBottomPos((prev) => ({ ...prev, y: val }))} disabled={controlsLocked} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "avatar" && (
                  <div className="space-y-6 transition-opacity duration-300">
                    <div className="rounded-[16px] border border-[#eadfd2] bg-[#fcf9f5] p-5 text-[14px] leading-relaxed text-[#6B5345] shadow-sm">
                      {t.avatar.autoGenMsg1} <strong className="text-[#4B3427]">{t.avatar.autoGenMsg2}</strong> {t.avatar.autoGenMsg3}
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] font-bold text-[#6B5345]">{t.avatar.avatarStyle}</label>
                      <div className="grid grid-cols-4 gap-3">
                        <VisualSwatch label={t.avatar.clean} desc={t.avatar.cleanDesc} isActive={avatarStyle === "clean"} onClick={() => setAvatarStyle("clean")} disabled={controlsLocked} />
                        <VisualSwatch label={t.avatar.cute} desc={t.avatar.cuteDesc} isActive={avatarStyle === "cute"} onClick={() => setAvatarStyle("cute")} disabled={controlsLocked} />
                        <VisualSwatch label={t.avatar.bold} desc={t.avatar.boldDesc} isActive={avatarStyle === "bold"} onClick={() => setAvatarStyle("bold")} disabled={controlsLocked} />
                        <VisualSwatch label={t.avatar.happy} desc={t.avatar.happyDesc} isActive={avatarStyle === "happy"} onClick={() => setAvatarStyle("happy")} disabled={controlsLocked} />
                        <VisualSwatch label={t.avatar.sleepy} desc={t.avatar.sleepyDesc} isActive={avatarStyle === "sleepy"} onClick={() => setAvatarStyle("sleepy")} disabled={controlsLocked} />
                        <VisualSwatch label={t.avatar.cool} desc={t.avatar.coolDesc} isActive={avatarStyle === "cool"} onClick={() => setAvatarStyle("cool")} disabled={controlsLocked} />
                        <VisualSwatch label={t.avatar.party} desc={t.avatar.partyDesc} isActive={avatarStyle === "party"} onClick={() => setAvatarStyle("party")} disabled={controlsLocked} />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] font-bold text-[#6B5345]">{t.avatar.shapeStyle}</label>
                      <div className="grid grid-cols-3 gap-3">
                        <VisualSwatch label={t.avatar.mixed} desc={t.avatar.mixedDesc} isActive={avatarShapeMode === "mixed"} onClick={() => setAvatarShapeMode("mixed")} disabled={controlsLocked} />
                        <VisualSwatch label={t.avatar.rounded} desc={t.avatar.roundedDesc} isActive={avatarShapeMode === "rounded"} onClick={() => setAvatarShapeMode("rounded")} disabled={controlsLocked} />
                        <VisualSwatch label={t.avatar.circle} desc={t.avatar.circleDesc} isActive={avatarShapeMode === "circle"} onClick={() => setAvatarShapeMode("circle")} disabled={controlsLocked} />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] font-bold text-[#6B5345]">{t.avatar.previewBg}</label>
                      <div className="flex flex-wrap gap-3">
                        <ColorDotButton label={t.avatar.cream} color="#FFF7EC" isActive={avatarBgTone === "cream"} onClick={() => setAvatarBgTone("cream")} disabled={controlsLocked} />
                        <ColorDotButton label={t.avatar.mint} color="#EEF9F0" isActive={avatarBgTone === "mint"} onClick={() => setAvatarBgTone("mint")} disabled={controlsLocked} />
                        <ColorDotButton label={t.avatar.blush} color="#FFF0F4" isActive={avatarBgTone === "blush"} onClick={() => setAvatarBgTone("blush")} disabled={controlsLocked} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-[13px] font-semibold text-[#6B5345]">
                      {t.avatar.features.map((feat: string, i: number) => (<FeatureChip key={i}>{feat}</FeatureChip>))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {(photoPreviewUrl || isFinalized) && (
              <div className="mb-20 rounded-[28px] border border-[#dacdbf] bg-white p-6 shadow-lg transition-opacity duration-700 sm:p-8">
                <h3 className="mb-6 flex items-center gap-2 text-[20px] font-black text-[#4B3427]">
                  {!isFinalized && <StepBadge number="3" />}
                  {isFinalized ? t.finalize.downloadsTitle : t.finalize.step3}
                </h3>

                {isFinalized ? (
                  <div className="py-6 text-center transition-opacity duration-500">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-[32px] shadow-sm">🎉</div>
                    <div className="mb-3 text-[22px] font-black text-[#166534]">{t.finalize.readyTitle}</div>
                    <p className="mb-6 text-[14px] text-[#6B5345]">{t.finalize.readySub}</p>
                    <div className="mb-6 rounded-[16px] border border-[#eadfd2] bg-[#fcf9f5] px-4 py-3 text-[14px] font-semibold text-[#4B3427]">
                      {t.finalize.sentTo} <span className="font-black" dir="ltr">{stripeEmailDisplay}</span>
                    </div>
                    <div className="flex flex-col gap-4">
                      {downloadFiles.coloring && (<DownloadButton href={downloadFiles.coloring} planId="coloring" locale={locale} name={t.plans.coloring} t={t} />)}
                      {downloadFiles.keepsake && (<DownloadButton href={downloadFiles.keepsake} planId="keepsake" locale={locale} name={t.plans.keepsake} t={t} />)}
                      {downloadFiles.avatar && (<DownloadButton href={downloadFiles.avatar} planId="avatar" locale={locale} name={t.plans.avatar} t={t} />)}
                    </div>
                    <p className="mt-6 text-[12px] text-stone-500">{t.finalize.blockedMsg}</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 rounded-[18px] border border-[#eadfd2] bg-[#fcf9f5] p-5">
                      <ul className="space-y-3 text-[14px] font-semibold text-[#5B4334]">
                        {isBundle ? (
                          <>
                            <li className="flex items-center justify-between"><span className="flex items-center gap-2"><Dot /> {t.plans.coloring}</span><span className="text-[#8A7464]">× 1</span></li>
                            <li className="flex items-center justify-between"><span className="flex items-center gap-2"><Dot /> {t.plans.keepsake}</span><span className="text-[#8A7464]">× 1</span></li>
                            <li className="flex items-center justify-between"><span className="flex items-center gap-2"><Dot /> {t.plans.avatar}</span><span className="text-[#8A7464]">× 1</span></li>
                          </>
                        ) : (
                          <li className="flex items-center justify-between"><span className="flex items-center gap-2"><Dot /> {t.plans[plan]}</span><span className="text-[#8A7464]">× 1</span></li>
                        )}
                      </ul>
                      <div className="mt-5 border-t border-[#eadfd2] pt-5">
                        {isBundle && (
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-[14px] font-bold text-[#8A7464]">{t.finalize.bundleValue}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-bold text-stone-400 line-through decoration-2 decoration-stone-300" dir="ltr">USD ${BUNDLE_VALUE_USD.toFixed(2)}</span>
                              <span className="rounded-md bg-red-100 px-2 py-0.5 text-[11px] font-black tracking-wider text-red-600 shadow-sm">{t.finalize.save23}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-[18px] font-black text-[#4B3427]">{t.finalize.totalPaid}</span>
                          <div className="flex items-baseline gap-1.5" dir="ltr">
                            <span className="text-[14px] font-bold text-[#8A7464]">USD</span>
                            <span className="text-[28px] font-black leading-none text-[#4B3427]">${totalUsd.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2 block text-[13px] font-bold text-[#6B5345]">{t.finalize.deliveryEmail}</label>
                      <div className={`w-full rounded-[14px] border px-4 py-3.5 text-[14px] font-semibold ${hasStripeEmail ? "border-[#d9cbbc] bg-white text-[#4B3427] shadow-inner" : "border-amber-300 bg-amber-50 text-amber-800"}`} dir="ltr">
                        {stripeEmailDisplay}
                      </div>
                    </div>

                    <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-[16px] border border-[#eadfd2] bg-white p-4 shadow-sm transition-colors hover:bg-[#fcf9f5]">
                      <div className="relative mt-0.5 flex items-center">
                        <input type="checkbox" checked={isConfirmedFinal} onChange={(e) => setIsConfirmedFinal(e.target.checked)} disabled={controlsLocked} className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-[#d9cbbc] bg-white transition-all checked:border-[#6B8E7B] checked:bg-[#6B8E7B] disabled:cursor-not-allowed disabled:opacity-50" />
                        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"><Icons.Check /></div>
                      </div>
                      <span className="text-[13px] font-medium leading-relaxed text-[#5B4334]">{t.finalize.confirm}</span>
                    </label>

                    {!!finalizeBlockedReason && (<InlineNotice tone="amber" className="mb-4">{finalizeBlockedReason}</InlineNotice>)}
                    {submitError && (<InlineNotice tone="red" className="mb-4">{submitError}</InlineNotice>)}

                    {isPreparingDownloads && (() => {
                      const steps: string[] = t.finalize.prepareSteps ?? [];
                      const totalSteps = steps.length || 5;
                      const progressPct = Math.round(((prepareStep + 1) / totalSteps) * 100);
                      const stepMsg = steps[prepareStep] ?? t.finalize.processing;
                      return (
                        <div className="mb-3 w-full overflow-hidden rounded-[14px] border border-[#c8ddd5] bg-[#f0f7f3] px-4 py-3">
                          <div className="mb-2 flex items-center gap-2">
                            <Icons.Spinner />
                            <span className="text-[14px] font-semibold text-[#3d6b57] transition-all duration-500">{stepMsg}</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#d8ece4]">
                            <div className="h-full rounded-full bg-[#6B8E7B] transition-all duration-[1600ms] ease-out" style={{ width: `${progressPct}%` }} />
                          </div>
                        </div>
                      );
                    })()}

                    <button type="button" aria-busy={isPreparingDownloads} onClick={handleFinalize} disabled={!canFinalize}
                      className="group relative flex min-h-[60px] w-full items-center justify-center gap-2 overflow-hidden rounded-[16px] bg-[#6B8E7B] px-5 py-4 text-[18px] font-black text-white shadow-md transition-all hover:-translate-y-1 hover:bg-[#5a7a68] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md">
                      {isPreparingDownloads ? (
                        <span className="opacity-80">{t.finalize.processing}</span>
                      ) : (
                        <><span>{t.finalize.generateBtn}</span><span className={`transition-transform ${isRtl ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`}>→</span></>
                      )}
                    </button>

                    {/* Preview note — localized */}
                    <p className="mt-3 text-center text-[11px] text-[#8A7464]">
                      {locale === "zh-hk" && "🖨️ 預覽僅供版面參考，最終輸出為高解析度"}
                      {locale === "zh-cn" && "🖨️ 预览仅供排版参考，最终输出为高分辨率"}
                      {locale === "ja" && "🖨️ プレビューはレイアウト確認用です。最終出力は高解像度になります。"}
                      {locale === "ko" && "🖨️ 미리보기는 레이아웃 확인용입니다. 최종 출력은 고해상도입니다."}
                      {locale === "es" && "🖨️ La vista previa es solo para diseño. El archivo final será de alta resolución."}
                      {locale === "de" && "🖨️ Vorschau dient nur zur Layout-Kontrolle. Die finale Datei wird hochauflösend sein."}
                      {locale === "ar" && "🖨️ المعاينة للتخطيط فقط. الملف النهائي سيكون بدقة عالية."}
                      {locale === "en" && "🖨️ Preview is for layout only. Final export will be high-resolution."}
                    </p>

                    {/* Trust signals — localized */}
                    <div className="mt-2 flex items-center justify-center gap-3 text-[12px] font-semibold text-[#6B8E7B]">
                      <span>
                        {locale === "zh-hk" && "⚡ 少於 2 分鐘完成"}
                        {locale === "zh-cn" && "⚡ 少于 2 分钟完成"}
                        {locale === "ja" && "⚡ 2分以内に完了"}
                        {locale === "ko" && "⚡ 2분 이내 완료"}
                        {locale === "es" && "⚡ Menos de 2 minutos"}
                        {locale === "de" && "⚡ In weniger als 2 Minuten fertig"}
                        {locale === "ar" && "⚡ أقل من دقيقتين"}
                        {locale === "en" && "⚡ Takes less than 2 minutes"}
                      </span>
                      <span className="text-[#dacdbf]">·</span>
                      <span>
                        {locale === "zh-hk" && "✅ 即時下載，無水印"}
                        {locale === "zh-cn" && "✅ 即时下载，无水印"}
                        {locale === "ja" && "✅ 即時ダウンロード、透かしなし"}
                        {locale === "ko" && "✅ 즉시 다운로드, 워터마크 없음"}
                        {locale === "es" && "✅ Descarga inmediata, sin marca de agua"}
                        {locale === "de" && "✅ Sofort-Download, kein Wasserzeichen"}
                        {locale === "ar" && "✅ تنزيل فوري، بدون علامة مائية"}
                        {locale === "en" && "✅ Instant download, no watermark"}
                      </span>
                    </div>

                    {/* Pet description — localized */}
                    <div className="mt-3 mb-2 flex items-center justify-center gap-1.5 text-[13px] text-[#8A7464]">
                      <span>
                        {locale === "zh-hk" && "個人化、生日或紀念款"}
                        {locale === "zh-cn" && "个性化、生日或纪念款"}
                        {locale === "ja" && "パーソナライズ・誕生日・記念品向け"}
                        {locale === "ko" && "개인화, 생일 또는 기념 에디션"}
                        {locale === "es" && "Personalizado, cumpleaños o conmemoración"}
                        {locale === "de" && "Personalisiert, Geburtstag oder Erinnerung"}
                        {locale === "ar" && "شخصي، عيد ميلاد أو تذكاري"}
                        {locale === "en" && "Personalized, Birthday or Memorial"}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-bold text-[#8A7464]">
                      {t.finalize.guarantees.map((g: string, i: number) => (
                        <div key={i} className="flex items-center gap-1.5"><span className="text-[16px]">{["🛡️", "🔒", "✨"][i]}</span> {g}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}




// ----------------- Helper Components -----------------
function StepBadge({ number }: { number: string }) {
  return (<span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0f5f2] text-[14px] font-black text-[#6B8E7B]">{number}</span>);
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-[#6B8E7B]" />;
}

function FeatureChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-[14px] border border-[#eadfd2] bg-white p-3 shadow-sm">
      <span className="text-green-600"><Icons.Check /></span>
      <span>{children}</span>
    </div>
  );
}

function InlineNotice({ children, tone, className = "" }: { children: React.ReactNode; tone: "red" | "amber" | "green"; className?: string; }) {
  const toneClass = tone === "red" ? "border-red-200 bg-red-50 text-red-700" : tone === "amber" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-green-200 bg-green-50 text-green-800";
  return (<div aria-live="polite" className={`rounded-[12px] border px-4 py-3 text-[13px] font-semibold transition-opacity duration-300 ${toneClass} ${className}`}><span className="mr-2">{tone === "green" ? "✅" : "⚠️"}</span>{children}</div>);
}

function Banner({ children, tone }: { children: React.ReactNode; tone: "green" | "red" | "amber"; }) {
  const toneClass = tone === "green" ? "border-green-200 bg-green-50 text-green-800" : tone === "red" ? "border-red-200 bg-red-50 text-red-800" : "border-amber-200 bg-amber-50 text-amber-800";
  return (
    <div className={`mb-6 flex items-start gap-3 rounded-[16px] border px-5 py-4 text-[14px] font-semibold shadow-sm ${toneClass}`}>
      <span className="text-[18px]">{tone === "green" ? "✅" : tone === "red" ? "🛑" : "⚠️"}</span>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

function BundleProgressCard({ id, title, subtitle, previewSrc, status, isActive, onClick, disabled, t }: { id: PlanId; title: string; subtitle: string; previewSrc?: string; status: BundleStatus; isActive: boolean; onClick: () => void; disabled?: boolean; t: any; }) {
  const statusStyle = status === "ready" ? "bg-[#E8F1E4] text-[#4E6A45] border-[#C7D7BE]" : status === "editing" ? "bg-[#C86C43] text-white border-[#C86C43]" : "bg-[#fcf9f5] text-[#8A5A3D] border-[#E2D2C2]";
  const statusText = status === "ready" ? t.bundle.statusReady : status === "editing" ? t.bundle.statusEditing : t.bundle.statusNotStarted;
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`group flex flex-col rounded-[20px] border bg-white text-left transition-all ${isActive ? "-translate-y-1 border-[#6B8E7B] shadow-md ring-4 ring-[#f0f5f2]" : "border-[#E5D8CA] shadow-sm hover:-translate-y-0.5 hover:border-[#b5c7bc] hover:shadow-md"} ${disabled ? "cursor-not-allowed opacity-60 hover:translate-y-0" : ""}`}>
      <div className="w-full overflow-hidden rounded-t-[18px]">
        <div className="relative aspect-[1.35/0.9] w-full bg-[#fcf9f5]">
          {previewSrc ? (
            <img src={previewSrc} alt={title} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${disabled ? "" : "group-hover:scale-110"} ${id === "coloring" ? "grayscale contrast-125 brightness-105" : ""}`} draggable={false} />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[28px] text-[#dacdbf]">🖼️</div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="mb-3">
          <div className="min-h-[2.5em] max-w-full text-[14px] sm:text-[15px] font-black leading-[1.15] text-[#4B3427] break-words" style={{ overflowWrap: "anywhere", hyphens: "auto" }}>{title}</div>
          <div className="mt-1 text-[12px] font-medium leading-tight text-[#8A7464]">{subtitle}</div>
        </div>
        <div className={`inline-flex self-start rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${statusStyle}`}>{statusText}</div>
      </div>
    </button>
  );
}

function VisualSwatch({ label, desc, isActive, onClick, disabled }: { label: string; desc?: string; isActive: boolean; onClick: () => void; disabled: boolean; }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`flex flex-col items-center justify-center gap-0.5 rounded-[14px] border-2 px-2 py-2.5 text-[13px] font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${isActive ? "border-[#6B8E7B] bg-[#f0f5f2] text-[#4a6b58] shadow-sm" : "border-[#e6d8ca] bg-[#fcf9f5] text-[#7B6658] hover:border-[#b5c7bc] hover:bg-white"} ${desc ? "min-h-[56px]" : "h-12 flex-1"}`}>
      <span>{label}</span>
      {desc && (<span className="text-[10px] font-medium leading-tight text-center opacity-70">{desc}</span>)}
    </button>
  );
}

function ColorDotButton({ label, color, isActive, onClick, disabled }: { label: string; color: string; isActive: boolean; onClick: () => void; disabled: boolean; }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={label}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${isActive ? "border-[#6B8E7B] bg-[#f0f5f2] text-[#4a6b58] shadow-sm" : "border-[#e6d8ca] bg-white text-[#7B6658] hover:border-[#b5c7bc]"}`}>
      <span className="h-4 w-4 rounded-full border border-[#d7c9bb]" style={{ backgroundColor: color }} />
      {label}
    </button>
  );
}

function FrameStyleSwatch({ label, frameStyle, isActive, onClick, disabled }: { label: string; frameStyle: SimpleFrameStyle; isActive: boolean; onClick: () => void; disabled: boolean; }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`overflow-hidden rounded-[16px] border-2 bg-white text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${isActive ? "border-[#6B8E7B] shadow-md ring-4 ring-[#f0f5f2]" : "border-[#e6d8ca] shadow-sm hover:border-[#b5c7bc] hover:shadow-md"}`}>
      <div className="aspect-[1.15/0.82] bg-[#fcf9f5] p-2">
        <div className="relative h-full w-full overflow-hidden rounded-[10px] border border-[#eadfd2] bg-white shadow-sm">
          <SimpleFrameOverlay frameStyle={frameStyle} />
        </div>
      </div>
      <div className={`px-3 py-2.5 text-center text-[13px] font-bold transition-colors ${isActive ? "text-[#4a6b58]" : "text-[#6B5345]"}`}>{label}</div>
    </button>
  );
}

function TextInput({ label, value, onChange, placeholder, disabled }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean; }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-bold text-[#6B5345]">{label}</label>
      <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value.slice(0, 60))} placeholder={placeholder} disabled={disabled}
        className="w-full rounded-[14px] border-2 border-[#d9cbbc] bg-white px-4 py-3.5 text-[14px] font-medium text-[#4B3427] outline-none transition-colors placeholder:text-stone-400 focus:border-[#6B8E7B] disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
  );
}

function SliderField({ label, value, min, max, onChange, disabled }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; disabled?: boolean; }) {
  const id = useId();
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-[13px] font-bold text-[#6B5345]">{label}</label>
        <span className="min-w-[40px] rounded-md bg-[#f0f5f2] px-2 py-1 text-center text-[12px] font-black text-[#6B8E7B] shadow-sm" dir="ltr">{value}</span>
      </div>
      <input id={id} type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} disabled={disabled}
        className="w-full cursor-grab accent-[#6B8E7B] active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
  );
}

function DownloadButton({ href, planId, locale, name, t }: { href: string; planId: DownloadablePlanId; locale: LocaleKey; name: string; t: any; }) {
  const fileName = DOWNLOAD_FILE_NAMES[locale]?.[planId] ?? DOWNLOAD_FILE_NAMES.en[planId];
  return (
    <a href={href} download={fileName} className="group flex items-center justify-center gap-4 rounded-[16px] border-2 border-[#6B8E7B] bg-white px-5 py-4 text-[16px] font-bold text-[#6B8E7B] shadow-sm transition-all hover:bg-[#6B8E7B] hover:text-white hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F7F5] group-hover:bg-white/20"><Icons.Download /></div>
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[11px] font-medium uppercase tracking-wider opacity-70">{t.finalize.download || "Download"}</span>
        <span className="text-[15px]">{name}</span>
      </div>
    </a>
  );
}

function SimpleFrameOverlay({ frameStyle }: { frameStyle: SimpleFrameStyle; }) {
  if (frameStyle === "none") return (<div className="pointer-events-none absolute inset-[6.3%] z-20 rounded-[10px] bg-transparent shadow-[inset_0_0_0_1px_rgba(184,144,115,0.08)]" />);
  if (frameStyle === "thinLine") return (<div className="pointer-events-none absolute inset-[5.7%] z-20 rounded-[10px] border border-[#B89073]" />);
  return (
    <>
      <div className="pointer-events-none absolute inset-[6%] z-20 rounded-[10px] border border-[#B89073]" />
      <div className="pointer-events-none absolute inset-[8.2%] z-20 rounded-[8px] border border-[#D5B395]" />
    </>
  );
}

function WatermarkOverlay() {
  return (<div className="pointer-events-none absolute inset-0 z-[30]" style={{ opacity: 0.1, backgroundRepeat: "repeat", backgroundImage: `url("${COMPANY_LOGO_PATH}")`, backgroundSize: "120px" }} />);
}

function ColorPreview({ url, paperSize, orientation, frameStyle, isFinalized }: { url: string; paperSize: PaperSize; orientation: Orientation; frameStyle: SimpleFrameStyle; isFinalized: boolean; }) {
  return (
    <div className="mx-auto w-full max-w-[600px] transition-all duration-300" style={{ aspectRatio: getPaperAspectRatio(paperSize, orientation) }}>
      <div className="relative h-full w-full overflow-hidden rounded-[18px] border border-[#eadfd2] bg-white shadow-[0_10px_28px_rgba(91,67,52,0.08)]">
        <div className="absolute inset-[10.6%] z-10 flex items-center justify-center overflow-hidden rounded-[14px] bg-white">
          <img src={url} alt="Preview" className="h-full w-full object-contain brightness-[1.18] contrast-[1.8] grayscale mix-blend-multiply" draggable={false} />
        </div>
        <SimpleFrameOverlay frameStyle={frameStyle} />
        {!isFinalized && <WatermarkOverlay />}
      </div>
    </div>
  );
}

function CertificatePreview({ canvasRef, paperSize, orientation, bg, frameStyle, templateSrc, isCustomMode, customBgImageUrl, photoUrl, font, mainHeading, subtitle, bottomText, mainPos, subtitlePos, bottomPos, mainSize, subtitleSize, bottomSize, mainRotate, subtitleRotate, bottomRotate, onMainPointerDown, onSubtitlePointerDown, onBottomPointerDown, isFinalized, isLocked }: { canvasRef: React.RefObject<HTMLDivElement | null>; paperSize: PaperSize; orientation: Orientation; bg: { label: string; bg: string; accentLight: string; accent: string }; frameStyle: SimpleFrameStyle; templateSrc: string; isCustomMode: boolean; customBgImageUrl: string; photoUrl: string; font: string; mainHeading: string; subtitle: string; bottomText: string; mainPos: Position; subtitlePos: Position; bottomPos: Position; mainSize: number; subtitleSize: number; bottomSize: number; mainRotate: number; subtitleRotate: number; bottomRotate: number; onMainPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void; onSubtitlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void; onBottomPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void; isFinalized: boolean; isLocked: boolean; }) {
  return (
    <div ref={canvasRef} className="relative mx-auto w-full max-w-[700px] overflow-hidden rounded-[18px] border border-[#eadfd2] shadow-[0_10px_28px_rgba(91,67,52,0.08)] transition-all duration-300"
      style={{ aspectRatio: getPaperAspectRatio(paperSize, orientation), backgroundColor: bg.bg }}>
      {/* Layer 1: Background (custom color blobs OR custom uploaded image) */}
      {isCustomMode && (
        <div className="absolute inset-0 z-[1] overflow-hidden">
          {customBgImageUrl ? (
            <>
              <img src={customBgImageUrl} className="absolute inset-0 h-full w-full object-cover pointer-events-none" aria-hidden="true" />
              <div className="absolute inset-0 bg-white/30 pointer-events-none" />
            </>
          ) : (
            <>
              <div className="absolute -left-8 top-8 h-56 w-56 rounded-full blur-3xl" style={{ backgroundColor: bg.accentLight, opacity: 0.52 }} />
              <div className="absolute right-2 top-20 h-44 w-44 rounded-full blur-3xl" style={{ backgroundColor: bg.accent, opacity: 0.14 }} />
              <div className="absolute bottom-8 left-10 h-52 w-52 rounded-full blur-3xl" style={{ backgroundColor: bg.accentLight, opacity: 0.36 }} />
              <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: `radial-gradient(circle at 12% 18%, ${bg.accent} 0 4px, transparent 5px), radial-gradient(circle at 82% 16%, ${bg.accentLight} 0 8px, transparent 9px), radial-gradient(circle at 14% 85%, ${bg.accentLight} 0 9px, transparent 10px), radial-gradient(circle at 88% 84%, ${bg.accent} 0 5px, transparent 6px)` }} />
            </>
          )}
        </div>
      )}
      {/* Layer 1: Fixed template image — object-cover fills canvas without scaling gaps */}
      {!isCustomMode && templateSrc && (
        <img src={templateSrc} className="absolute inset-0 z-[1] h-full w-full object-cover pointer-events-none" aria-hidden="true"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      )}
      <div className="absolute left-1/2 top-[55%] z-[2] w-[42%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative aspect-[4/5] w-full">
          <img src={photoUrl} alt="Preview" className="h-full w-full object-cover" draggable={false}
            style={{ WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 56%, rgba(0,0,0,0.82) 72%, rgba(0,0,0,0.38) 88%, rgba(0,0,0,0) 100%)", maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 56%, rgba(0,0,0,0.82) 72%, rgba(0,0,0,0.38) 88%, rgba(0,0,0,0) 100%)" }} />
        </div>
      </div>
      <DraggableText text={mainHeading} pos={mainPos} font={font} size={mainSize} rotate={mainRotate} onPointerDown={onMainPointerDown} isLocked={isLocked} className="z-[3] max-w-[78%] font-black leading-[1.02] text-[#3B261C]" />
      <DraggableText text={subtitle} pos={subtitlePos} font={font} size={subtitleSize} rotate={subtitleRotate} onPointerDown={onSubtitlePointerDown} isLocked={isLocked} className="z-[3] max-w-[72%] italic leading-tight text-[#6A5448]" />
      <DraggableText text={bottomText} pos={bottomPos} font={font} size={bottomSize} rotate={bottomRotate} onPointerDown={onBottomPointerDown} isLocked={isLocked} className="z-[3] max-w-[75%] italic leading-tight text-[#6A5448]" />
      <SimpleFrameOverlay frameStyle={frameStyle} />
      {!isFinalized && <WatermarkOverlay />}
    </div>
  );
}

function DraggableText({ text, pos, font, size, rotate, onPointerDown, className, isLocked }: { text: string; pos: Position; font: string; size: number; rotate: number; onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void; className: string; isLocked: boolean; }) {
  return (
    <div onPointerDown={onPointerDown}
      className={`absolute text-center transition-shadow ${isLocked ? "pointer-events-none" : "cursor-grab active:cursor-grabbing hover:outline-dashed hover:outline-2 hover:outline-black/20"} ${className}`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: `translate(-50%, -50%) rotate(${rotate}deg)`, fontFamily: font, fontSize: `${size}px`, touchAction: "none", textShadow: "0 1px 0 rgba(255,255,255,0.82), 0 0 16px rgba(255,255,255,0.45)" }}>
      {text}
    </div>
  );
}

function AvatarPreview({ url, styleMode, shapeMode, bgTone, isFinalized, t }: { url: string; styleMode: AvatarStyle; shapeMode: AvatarShapeMode; bgTone: AvatarBgTone; isFinalized: boolean; t: any; }) {
  return (
    <div className="relative w-full max-w-[560px] overflow-hidden rounded-[18px] border border-[#eadfd2] bg-[#fffaf4] px-4 py-6 shadow-md transition-opacity duration-300">
      <div className="mb-5 text-center text-[13px] font-black uppercase tracking-[0.15em] text-[#8A7464]">{t.avatar.previewTitle}</div>
      <div className="grid grid-cols-4 gap-x-3 gap-y-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-2 inline-flex min-h-[24px] items-center rounded-full border border-[#e3d4c6] bg-white px-2 py-0.5 text-[11px] font-black tracking-wide text-[#5B4334] shadow-sm">{index + 1}</div>
            <div className={`relative aspect-square w-full overflow-hidden border border-[#E7D8CA] shadow-sm ${getAvatarShapeClass(shapeMode, index)}`} style={getAvatarBgStyle(bgTone, index)}>
              <img src={url} alt={`Avatar ${index + 1}`} className={getAvatarTileClasses(styleMode, index)} draggable={false} />
            </div>
          </div>
        ))}
      </div>
      {!isFinalized && <WatermarkOverlay />}
    </div>
  );
}
