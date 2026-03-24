"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, X, PawPrint, Sparkles, ShoppingBag } from "lucide-react";

type PlanId = "bundle" | "coloring" | "keepsake" | "avatar";
type LocaleKey = "en" | "zh-hk" | "zh-cn" | "ja" | "ko" | "es" | "de" | "ar";
type LegalLinks = { terms: string; privacy: string; refunds: string; };
type LegalText = { terms: string; privacy: string; refunds: string; contact: string; };
type AvatarVariationText = { line1: string; line2: string; };
type PricingTextSet = { bundleTitle: string; bundleSub: string; bundleBadge: string; bundleSave: string; coloringTitle: string; keepsakeTitle: string; avatarTitle: string; singleSub: string; };
type FooterText = { footerDisclaimer: string; footerDisclaimer2: string; footerDisclaimer3: string; };

const BRAND = { name: "Pet Keeps Art", year: 2026, email: "info@petkeepsart.com" };
const CURRENT_LOCALE: LocaleKey = "zh-cn";

const LANGUAGE_HOME_LINKS: { key: LocaleKey; label: string; href: string }[] = [
  { key: "en", label: "ENG", href: "/" }, { key: "zh-hk", label: "繁中", href: "/zh-hk" }, { key: "zh-cn", label: "简中", href: "/zh-cn" },
  { key: "ja", label: "日本語", href: "/ja" }, { key: "ko", label: "한국어", href: "/ko" }, { key: "es", label: "Español", href: "/es" },
  { key: "de", label: "Deutsch", href: "/de" }, { key: "ar", label: "العربية", href: "/ar" },
];

const LEGAL_LINKS: Record<LocaleKey, LegalLinks> = {
  en: { terms: "/terms", privacy: "/privacy", refunds: "/refund-policy" },
  "zh-hk": { terms: "/terms-zh-hk", privacy: "/privacy-zh-hk", refunds: "/refund-policy-zh-hk" },
  "zh-cn": { terms: "/terms-zh-cn", privacy: "/privacy-zh-cn", refunds: "/refund-policy-zh-cn" },
  ja: { terms: "/terms-ja", privacy: "/privacy-ja", refunds: "/refund-policy-ja" },
  ko: { terms: "/terms-ko", privacy: "/privacy-ko", refunds: "/refund-policy-ko" },
  es: { terms: "/terms-es", privacy: "/privacy-es", refunds: "/refund-policy-es" },
  de: { terms: "/terms-de", privacy: "/privacy-de", refunds: "/refund-policy-de" },
  ar: { terms: "/terms-ar", privacy: "/privacy-ar", refunds: "/refund-policy-ar" },
};

const LEGAL_TEXT: Record<LocaleKey, LegalText> = {
  en: { terms: "Terms", privacy: "Privacy", refunds: "Refund Policy", contact: "Contact Us" },
  "zh-hk": { terms: "條款", privacy: "私隱政策", refunds: "退款政策", contact: "聯絡我們" },
  "zh-cn": { terms: "条款", privacy: "隐私政策", refunds: "退款政策", contact: "联系我们" },
  ja: { terms: "利用規約", privacy: "プライバシー", refunds: "返金ポリシー", contact: "お問い合わせ" },
  ko: { terms: "이용약관", privacy: "개인정보처리방침", refunds: "환불정책", contact: "문의하기" },
  es: { terms: "Términos", privacy: "Privacidad", refunds: "Reembolsos", contact: "Contacto" },
  de: { terms: "AGB", privacy: "Datenschutz", refunds: "Rückerstattung", contact: "Kontakt" },
  ar: { terms: "الشروط", privacy: "الخصوصية", refunds: "الاسترداد", contact: "اتصل بنا" },
};

const AVATAR_VARIATION_TEXT: Record<LocaleKey, AvatarVariationText> = {
  en: { line1: "Unique AI variations", line2: "in every avatar pack" },
  "zh-hk": { line1: "每個貼圖包都有獨特的", line2: "AI 生成變化款式" },
  "zh-cn": { line1: "每个贴图包都有独特的", line2: "AI 生成变化款式" },
  ja: { line1: "各アバターパックに", line2: "AI生成のユニークな変化を収録" },
  ko: { line1: "각 아바타 팩에는", line2: "AI 생성 고유 변형이 포함됩니다" },
  es: { line1: "Cada pack incluye", line2: "variaciones únicas generadas por IA" },
  de: { line1: "Jedes Paket enthält", line2: "einzigartige KI-Varianten" },
  ar: { line1: "تتضمن كل حزمة", line2: "تنويعات فريدة تم إنشاؤها بالذكاء الاصطناعي" },
};

const PRICING_TEXT: Record<LocaleKey, PricingTextSet> = {
  en: { bundleTitle: "Bundle Deal", bundleSub: "All 3 keepsakes", bundleBadge: "Best Value", bundleSave: "Save 49%", coloringTitle: "Coloring Page", keepsakeTitle: "Keepsake Certificate", avatarTitle: "12 Avatar Pack", singleSub: "Single purchase" },
  "zh-hk": { bundleTitle: "超值套裝", bundleSub: "包含全部 3 款", bundleBadge: "最抵買", bundleSave: "現省 49%", coloringTitle: "填色畫", keepsakeTitle: "寵物紀念證書", avatarTitle: "12 款頭像包", singleSub: "單獨購買" },
  "zh-cn": { bundleTitle: "超值套餐", bundleSub: "包含全部 3 款", bundleBadge: "超值首选", bundleSave: "立省 49%", coloringTitle: "填色画", keepsakeTitle: "宠物纪念证书", avatarTitle: "12 款头像包", singleSub: "单独购买" },
  ja: { bundleTitle: "バンドルセット", bundleSub: "3点すべて込み", bundleBadge: "いちばんお得", bundleSave: "49% OFF", coloringTitle: "塗り絵", keepsakeTitle: "記念証書", avatarTitle: "アバター12種パック", singleSub: "単品購入" },
  ko: { bundleTitle: "번들 특가", bundleSub: "3가지 기념품 모두 포함", bundleBadge: "가장 인기", bundleSave: "49% 할인", coloringTitle: "컬러링 페이지", keepsakeTitle: "기념 증서", avatarTitle: "12종 아바타 팩", singleSub: "단품 구매" },
  es: { bundleTitle: "Oferta de Paquete", bundleSub: "Los 3 recuerdos", bundleBadge: "Mejor valor", bundleSave: "Ahorra 49%", coloringTitle: "Página para Colorear", keepsakeTitle: "Certificado Conmemorativo", avatarTitle: "Pack de 12 Avatares", singleSub: "Compra individual" },
  de: { bundleTitle: "Paketangebot", bundleSub: "Alle 3 Andenken", bundleBadge: "Bestes Angebot", bundleSave: "49% sparen", coloringTitle: "Ausmalbild", keepsakeTitle: "Erinnerungszertifikat", avatarTitle: "12er Avatar-Paket", singleSub: "Einzelkauf" },
  ar: { bundleTitle: "عرض الحزمة", bundleSub: "جميع التذكارات الثلاثة", bundleBadge: "أفضل قيمة", bundleSave: "وفّر 49٪", coloringTitle: "صفحة تلوين", keepsakeTitle: "شهادة تذكارية", avatarTitle: "حزمة ١٢ صورة رمزية", singleSub: "شراء فردي" },
};

const CANADIAN_PROVINCES = [
  { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" }, { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" }, { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
  { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" }, { value: "QC", label: "Québec" },
  { value: "SK", label: "Saskatchewan" }, { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" }, { value: "YT", label: "Yukon" },
];

const GUARANTEES = [
  { icon: "🔒", title: "安全 Stripe 结账", text: "付款由 Stripe 安全处理 — 同为 Amazon 及 Apple 所使用的支付系统。我们从不查看您的卡片信息。" },
  { icon: "⚡", title: "即时数码交付", text: "上传照片后数分钟内生成文件并发送至您的邮箱。无需配送，无需等待数日。" },
  { icon: "🎨", title: "一切由您个性化", text: "付款后，您可在最终文件生成前选择文字、字体、颜色及版面 — 满意后才确认。" },
  { icon: "📧", title: "文件发送至您的邮箱", text: "您的个性化 PDF 及 ZIP 文件直接发送至您在结账时所用的电子邮箱，随时可下载。" },
  { icon: "🐾", title: "任何宠物、任何场合", text: "狗、猫、兔子、鸟儿 — 任何心爱的宠物均可。设计适合生日、纪念、送礼及日常趣味。" },
  { icon: "💬", title: "快速交付・放心购买", text: "即时数码交付，无需等待。如有问题，我们随时为您提供支持。" },
];

export default function PetKeepsakeLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [name, setName] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [customerCountry, setCustomerCountry] = useState("United States");
  const [customerProvince, setCustomerProvince] = useState("");
  const isCanada = customerCountry === "Canada";
  const normalizedProvince = customerProvince.trim().toLowerCase();
  const missingProvince = isCanada && !customerProvince.trim();
  const isQuebecBlocked = isCanada && ["qc", "quebec", "québec"].includes(normalizedProvince);

  const startCheckout = async (plan: PlanId) => {
    try {
      setLoadingPlan(plan);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("petkeepsart_selected_plan", plan);
        window.sessionStorage.setItem("petkeepsart_customer_country", customerCountry);
        window.sessionStorage.setItem("petkeepsart_customer_province", customerProvince);
      }
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, customerCountry, customerProvince }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403) { window.location.assign(`/customize?plan=${plan}&blocked=qc`); return; }
        if (res.status === 400) { window.location.assign(`/customize?plan=${plan}&missing_province=1`); return; }
        throw new Error(data?.error || "Checkout failed. Please try again.");
      }
      if (!data?.url) throw new Error("No checkout URL returned.");
      window.location.assign(data.url);
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoadingPlan(null);
    }
  };

  const copyLink = async () => {
    try {
      if (typeof window === "undefined") return;
      if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(window.location.href); }
      else {
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href; textArea.style.position = "fixed"; textArea.style.opacity = "0";
        document.body.appendChild(textArea); textArea.focus(); textArea.select(); document.execCommand("copy"); document.body.removeChild(textArea);
      }
      setLinkCopied(true); setTimeout(() => setLinkCopied(false), 1800);
    } catch (error) { console.error("Copy link failed:", error); alert("Unable to copy the link. Please try again."); }
  };

  const t: FooterText = { footerDisclaimer: "仅限数码文件。不寄送实体产品。", footerDisclaimer2: "全球可用。魁北克（加拿大）除外。", footerDisclaimer3: "价格以美元计算。" };

  return (
    <main className="min-h-screen bg-[#F5EFE6] text-[#422B1E] selection:bg-orange-100">
      <div className="mx-auto max-w-[1600px] px-2 py-2 md:px-3 md:py-3">
        <div className="overflow-hidden rounded-[28px] border border-[#d8cdbf] bg-[#FAF6F0] shadow-[0_24px_60px_rgba(72,51,36,0.14)]">
          <Header currentLocale={CURRENT_LOCALE} />
          <HeroBundleSection startCheckout={startCheckout} loadingPlan={loadingPlan} customerCountry={customerCountry} setCustomerCountry={setCustomerCountry} customerProvince={customerProvince} setCustomerProvince={setCustomerProvince} isCanada={isCanada} missingProvince={missingProvince} isQuebecBlocked={isQuebecBlocked} />
          <HowItWorksSection />
          <ExamplesGallerySection />
          <ReviewsSection />
          <PhotoGuideSection />
          <FinalCTASection />
          <Footer currentLocale={CURRENT_LOCALE} linkCopied={linkCopied} copyLink={copyLink} openContact={() => setIsContactOpen(true)} t={t} />
        </div>
      </div>
      {isContactOpen && <ContactModal name={name} setName={setName} supportSubject={supportSubject} setSupportSubject={setSupportSubject} message={message} setMessage={setMessage} close={() => setIsContactOpen(false)} />}
    </main>
  );
}

function Header({ currentLocale }: { currentLocale: LocaleKey }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const currentLangLabel = LANGUAGE_HOME_LINKS.find((l) => l.key === currentLocale)?.label ?? "ENG";
  return (
    <nav className="sticky top-0 z-50 border-b border-[#e3d8cb] bg-white/82 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[1680px] items-center justify-between gap-3 px-3 py-2.5">
        <Link href="/zh-cn" className="flex shrink-0 items-center gap-2">
          <Image src="/images/petkeepsart_logo.png" alt="Pet Keeps Art" width={120} height={120} className="h-auto w-[105px] md:w-[120px]" priority />
          <span className="text-[20px] font-extrabold text-[#4A3428]">Pet Keeps Art</span>
        </Link>
        <div className="pointer-events-none absolute left-1/2 hidden -translate-x-[112%] lg:flex">
          <div className="pointer-events-auto flex items-center gap-5">
            <a href="#pricing" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">套餐</a>
            <a href="#pricing" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">定价</a>
            <a href="#guide" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">常见问题</a>
            <a href="#examples" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">查看示例</a>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex mr-12">
          {LANGUAGE_HOME_LINKS.map((lang) => <LangButton key={lang.key} href={lang.href} active={lang.key === currentLocale}>{lang.label}</LangButton>)}
        </div>
        <div className="relative md:hidden mr-3">
          <button type="button" onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 rounded-full border border-[#d9cbbc] bg-white px-3 py-1.5 text-[12px] font-bold text-[#4A3428] shadow-sm">
            🌐 {currentLangLabel} ▾
          </button>
          {isLangOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 min-w-[140px] rounded-[16px] border border-[#e3d8cb] bg-white py-2 shadow-xl">
                {LANGUAGE_HOME_LINKS.map((lang) => (
                  <Link key={lang.key} href={lang.href} onClick={() => setIsLangOpen(false)} className={`block px-4 py-2 text-[14px] font-semibold transition hover:bg-[#faf3eb] ${lang.key === currentLocale ? "text-[#D98962]" : "text-[#4A3428]"}`}>{lang.label}</Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function LangButton({ children, href, active = false }: { children: React.ReactNode; href: string; active?: boolean }) {
  return <Link href={href} className={`inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-[16px] border px-3 py-1.5 text-[12px] font-bold transition ${active ? "border-[#3A2418] bg-[#3A2418] text-white" : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"}`}>{children}</Link>;
}

function HeroBundleSection({ startCheckout, loadingPlan, customerCountry, setCustomerCountry, customerProvince, setCustomerProvince, isCanada, missingProvince, isQuebecBlocked }: { startCheckout: (plan: PlanId) => void; loadingPlan: PlanId | null; customerCountry: string; setCustomerCountry: React.Dispatch<React.SetStateAction<string>>; customerProvince: string; setCustomerProvince: React.Dispatch<React.SetStateAction<string>>; isCanada: boolean; missingProvince: boolean; isQuebecBlocked: boolean; }) {
  const avatarVariationText = AVATAR_VARIATION_TEXT[CURRENT_LOCALE];
  const pricingText = PRICING_TEXT[CURRENT_LOCALE];
  const checkoutDisabled = loadingPlan !== null || missingProvince || isQuebecBlocked;
  return (
    <section className="bg-[linear-gradient(180deg,#f7efe5_0%,#f9f2e9_100%)] px-5 pb-14 pt-12 md:px-8 xl:px-10">
      <div className="mx-auto max-w-[1560px]">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[1480px] text-center">
            <div className="inline-flex rounded-full border border-[#d8c7b6] bg-white/90 px-7 py-3 text-[16px] font-extrabold uppercase tracking-[0.12em] text-[#7B5B47] shadow-sm">以您的宠物或宠物＋主人照片制作的个性化数码纪念品</div>
            <h1 className="mx-auto mt-6 max-w-[1200px] text-center font-serif font-black leading-[1.02] tracking-[-0.04em] text-[#23150F] text-[clamp(2rem,3.6vw,4rem)]">1 张照片 → 3 份个性化纪念品</h1>
            <p className="mx-auto mt-5 max-w-[1080px] px-2 text-[clamp(1rem,1.2vw,1.3rem)] leading-[1.55] text-stone-700">将您的宠物或宠物＋主人照片，变成可打印填色画、纪念证书及 12 款头像包 — 可下载、打印、送礼及珍藏。</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <HeroPill>以您的照片制作</HeroPill><HeroPill>纯宠物或宠物＋主人照片</HeroPill><HeroPill>个性化、生日或纪念款</HeroPill><HeroPill>纯数码下载</HeroPill>
            </div>
          </div>
          <div className="mt-8 grid w-full gap-6 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[420px] rounded-[30px] border border-[#d9cbbc] bg-white p-7 shadow-[0_18px_34px_rgba(84,58,39,0.10)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#F7EBDD] px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D]">样本照片</span>
                  <span className="text-[14px] font-semibold text-[#7B6658]">仅供演示</span>
                </div>
                <div className="overflow-hidden rounded-[26px] border border-[#e3d9cd] bg-[#edf4fb] p-3">
                  <img src="/images/hero-original-demo.png" alt="Sample original photo" className="h-auto w-full rounded-[20px] bg-white object-contain" />
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <a href="#pricing" className="w-full rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-5 py-4 text-center text-[20px] font-extrabold text-white shadow-[0_12px_22px_rgba(157,97,65,0.22)] transition hover:brightness-95">选择您的套餐</a>
                  <a href="#examples" className="w-full rounded-full border border-[#baa692] px-5 py-4 text-center text-[20px] font-bold text-[#5b4334] transition hover:bg-[#faf3eb]">查看真实示例</a>
                  <div className="mt-2 rounded-[18px] border border-[#eadfd2] bg-[#fffaf4] px-4 py-4 text-center text-[16px] leading-7 text-[#7B6658]">
                    <div>付款后上传照片。</div>
                    <div className="mt-2 font-semibold text-[#6E5546]">文件将发送至 Stripe 结账时填写的电子邮箱。</div>
                    <div className="mt-1 font-semibold text-[#6E5546]">结账后无法在个性化页面更改电子邮箱。</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full max-w-[420px] rounded-[28px] border border-[#e1d3c5] bg-white p-6 shadow-[0_10px_22px_rgba(84,58,39,0.06)]">
                <div className="text-[24px] font-black text-[#4B3427]">账单地区</div>
                <div className="mt-3 rounded-[16px] border border-[#e6d8ca] bg-[#fffaf4] px-4 py-3 text-[14px] leading-6 text-[#7B6658]">加拿大客户必须选择省份或地区。魁北克订单不受理。</div>
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-[14px] font-bold text-[#6B5345]">国家</label>
                    <select value={customerCountry} onChange={(e) => { setCustomerCountry(e.target.value); if (e.target.value !== "Canada") setCustomerProvince(""); }} className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none">
                      <option value="United States">美国</option><option value="Canada">加拿大</option><option value="United Kingdom">英国</option><option value="Australia">澳大利亚</option><option value="Other">其他</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[14px] font-bold text-[#6B5345]">{isCanada ? "省份 / 地区" : "州 / 省份"}</label>
                    {isCanada ? (
                      <select value={customerProvince} onChange={(e) => setCustomerProvince(e.target.value)} className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none">
                        <option value="">请选择省份...</option>
                        {CANADIAN_PROVINCES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                    ) : (
                      <input type="text" value={customerProvince} onChange={(e) => setCustomerProvince(e.target.value)} placeholder="可选" className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none" />
                    )}
                  </div>
                  {missingProvince && <div className="rounded-[16px] border border-amber-200 bg-amber-50 px-4 py-3 text-[15px] font-semibold text-amber-700">请选择省份以继续。</div>}
                  {isQuebecBlocked && <div className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-semibold text-red-700">抱歉，本服务目前不接受魁北克的客户。</div>}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center xl:items-start">
              <div className="w-full max-w-[980px] rounded-[32px] border border-[#e1d3c5] bg-[linear-gradient(180deg,#fffaf3_0%,#f8efe5_100%)] p-5 shadow-[0_16px_28px_rgba(84,58,39,0.06)]">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-2">
                  <span className="rounded-full bg-white px-5 py-2 text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D] shadow-sm">实时预览</span>
                  <span className="text-[16px] font-semibold text-[#7B6658]">1 次上传 • 3 种产品</span>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pricingText.coloringTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">AI 预览</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/coloringpage.png" alt="Coloring Default" className="h-full w-full scale-[1.06] object-contain" />
                    </div>
                    <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">付款后生成线稿</div>
                  </div>
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pricingText.keepsakeTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">AI 预览</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/keepsake-certificate.png" alt="Certificate Default" className="h-full w-full scale-[1.04] object-contain" />
                    </div>
                    <div className="px-2 flex flex-col items-center text-center">
                      <div className="whitespace-nowrap text-[12px] font-bold leading-none text-[#8A5A3D]">付款后制作个性化版面</div>
                      <div className="mt-1 text-[12px] font-semibold leading-tight text-[#8A5A3D]">个性化、生日或纪念款</div>
                    </div>
                  </div>
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pricingText.avatarTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">AI 预览</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/avatarpack.png" alt="Avatar Pack Default" className="h-full w-full scale-[1.04] object-contain" />
                    </div>
                    <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">付款后生成 12 款独特头像</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex w-full max-w-[980px] flex-wrap items-center justify-center gap-3">
                <HeroSubPill>生日</HeroSubPill><HeroSubPill>纪念款</HeroSubPill><HeroSubPill>可打印</HeroSubPill><HeroSubPill>可分享</HeroSubPill>
                <HeroSubPill>{avatarVariationText.line1} {avatarVariationText.line2}</HeroSubPill>
              </div>
              <div id="pricing" className="mt-8 grid w-full max-w-[980px] gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <button type="button" onClick={() => startCheckout("bundle")} disabled={checkoutDisabled} className="relative flex min-h-[280px] scale-[1.02] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-[#cfb39b] bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-5 py-7 text-center text-white shadow-[0_20px_30px_rgba(151,90,59,0.26)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70">
                  <div className="absolute left-4 top-4 rounded-full bg-white/18 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em]">{pricingText.bundleBadge}</div>
                  <div className="mt-6 text-[20px] font-black uppercase tracking-[0.04em]">{pricingText.bundleTitle}</div>
                  <PriceCurrencyBadge bundle>USD 美元</PriceCurrencyBadge>
                  <div className="mt-3 text-[40px] font-black">$19.99</div>
                  <div className="mt-1 text-[18px] font-bold opacity-95">{pricingText.bundleSub}</div>
                  <div className="mt-4 rounded-full bg-white/15 px-4 py-1.5 text-[14px] font-bold">{loadingPlan === "bundle" ? "正在跳转..." : pricingText.bundleSave}</div>
                  <div className="mt-4 text-[13px] font-semibold leading-5 text-white/90">与 Stripe 结账邮箱相同</div>
                </button>
                <PricingCard title={pricingText.coloringTitle} price="$12.99" subtitle={pricingText.singleSub} onClick={() => startCheckout("coloring")} isLoading={loadingPlan === "coloring"} isDisabled={checkoutDisabled} />
                <PricingCard title={pricingText.keepsakeTitle} price="$12.99" subtitle={pricingText.singleSub} onClick={() => startCheckout("keepsake")} isLoading={loadingPlan === "keepsake"} isDisabled={checkoutDisabled}
                  extra={<div className="mt-2 text-[15px] leading-[1.35] text-[#8D6A50]"><div>个性化 /</div><div>生日快乐 或</div><div>纪念款</div></div>}
                />
                <PricingCard title={pricingText.avatarTitle} price="$12.99" subtitle={pricingText.singleSub} onClick={() => startCheckout("avatar")} isLoading={loadingPlan === "avatar"} isDisabled={checkoutDisabled} />
              </div>
              <div className="mt-6 flex w-full max-w-[980px] flex-wrap items-center justify-center gap-3">
                <TrustPill>安全结账</TrustPill><TrustPill>纯数码文件</TrustPill><TrustPill>无需配送</TrustPill><TrustPill>与结账邮箱相同</TrustPill><TrustPill>日后无法更改</TrustPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceCurrencyBadge({ children, bundle = false }: { children: React.ReactNode; bundle?: boolean }) {
  return <div className={`mt-4 rounded-full px-5 py-2 text-[15px] font-extrabold uppercase tracking-[0.14em] shadow-sm ${bundle ? "bg-white/20 text-white" : "bg-[#F5E7D9] text-[#8A5A3D]"}`}>{children}</div>;
}
function PricingCard({ title, price, subtitle, extra, onClick, isLoading, isDisabled }: { title: string; price: string; subtitle: string; extra?: React.ReactNode; onClick?: () => void; isLoading?: boolean; isDisabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={isDisabled} className="flex min-h-[280px] flex-col items-center justify-center rounded-[32px] border border-[#c8b9ab] bg-white px-5 py-6 text-center shadow-[0_10px_22px_rgba(84,58,39,0.08)] transition hover:bg-[#faf3eb] disabled:cursor-not-allowed disabled:opacity-70">
      <div className="text-[19px] leading-tight font-black text-[#4B3427]">{isLoading ? "正在跳转..." : title}</div>
      {!isLoading && extra}
      <PriceCurrencyBadge>USD 美元</PriceCurrencyBadge>
      <div className="mt-3 text-[40px] font-black text-[#2E1D16]">{price}</div>
      <div className="mt-1 text-[17px] font-medium text-stone-600">{subtitle}</div>
      <div className="mt-3 text-[13px] font-semibold leading-5 text-[#8D6A50]">只发送至结账邮箱</div>
    </button>
  );
}
function HeroPill({ children }: { children: React.ReactNode }) { return <div className="rounded-full border border-[#decfbe] bg-white/85 px-5 py-2.5 text-[17px] font-semibold text-[#6B5345] shadow-sm">{children}</div>; }
function HeroSubPill({ children }: { children: React.ReactNode }) { return <div className="rounded-full bg-[#fff8ef] px-5 py-2.5 text-[17px] font-semibold text-[#7A5B47] shadow-sm ring-1 ring-[#eadacd]">{children}</div>; }
function TrustPill({ children }: { children: React.ReactNode }) { return <span className="rounded-full border border-[#dfd0c1] bg-white/70 px-4 py-2 text-[16px] font-medium text-[#7B6658]">{children}</span>; }

function HowItWorksSection() {
  return (
    <section className="border-t border-[#eadfd2] bg-[#fbf8f2] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto max-w-[1380px]">
        <h2 className="text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">如何使用</h2>
        <p className="mx-auto mt-4 max-w-[980px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">一张清晰的宠物或宠物＋主人照片，轻松几步，即可变成可打印纪念品套餐。</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <HowCard number="1" icon={<ShoppingBag className="h-10 w-10" strokeWidth={2.4} />} title="选择您的纪念品" text="先选择套餐或单品纪念品并完成付款。" />
          <HowCard number="2" icon={<PawPrint className="h-10 w-10" strokeWidth={2.4} />} title="付款后上传" text="结账后，上传一张清晰的宠物或宠物＋主人照片，并根据需要填写详细信息。" />
          <HowCard number="3" icon={<Sparkles className="h-10 w-10" strokeWidth={2.4} />} title="接收您的文件" text="我们将生成您的个性化数码纪念品，可供下载，并发送至您的结账邮箱。" />
        </div>
      </div>
    </section>
  );
}
function HowCard({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-[28px] border border-[#eadfd2] bg-white/85 px-6 py-10 text-center shadow-[0_12px_22px_rgba(84,58,39,0.05)]">
      <div className="flex items-end justify-center gap-3"><span className="text-[82px] leading-none font-black text-[#A6825D]">{number}</span><span className="mb-2 text-[#A6825D]">{icon}</span></div>
      <div className="mt-5 text-[25px] font-black text-[#35241A]">{title}</div>
      <p className="mx-auto mt-3 max-w-[330px] text-[18px] leading-8 text-stone-600">{text}</p>
    </div>
  );
}

function ExamplesGallerySection() {
  return (
    <section id="examples" className="border-t border-[#eadfd2] bg-[linear-gradient(180deg,#fffdfa_0%,#fff7ef_100%)] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">真实产品风格预览</h2>
          <p className="mx-auto mt-4 max-w-[1040px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
            <span className="block">看看一张宠物或宠物＋主人照片，如何变成可打印填色画、</span>
            <span className="block">个性化纪念证书及有趣的 12 款头像包。</span>
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-[1450px] rounded-[36px] border border-[#e8ddd1] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,251,246,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(84,58,39,0.08)] md:p-8 xl:p-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ExampleFlowCard img="/images/avatar_example.jpg" title="原始照片" badge="原图" description="您上传的宠物照片" badgeTone="gold" />
            <ExampleFlowCard img="/images/coloring_result.jpg" title="填色画" badge="AI 预览" description="可打印黑白线稿" badgeTone="gold" />
            <ExampleFlowCard img="/images/keepsake-certificate.png" title="纪念证书" badge="AI 预览" description="个性化、生日或纪念款" badgeTone="gold" />
            <ExampleFlowCard img="/images/avatar_pack_preview.png" title="头像包" badge="AI 预览" description="12 款可分享头像风格" badgeTone="gold" contain />
          </div>
        </div>
      </div>
    </section>
  );
}
function ExampleFlowCard({ img, title, badge, description, contain = false, badgeTone = "gold" }: { img: string; title: string; badge: string; description: string; contain?: boolean; badgeTone?: "gold" | "orange" }) {
  const badgeClass = badgeTone === "orange" ? "bg-[linear-gradient(180deg,#D8A483_0%,#C98560_100%)] text-white" : "bg-[#E5D394] text-[#6B5328]";
  return (
    <div className="rounded-[26px] border border-[#e4d7ca] bg-white p-4 shadow-[0_12px_24px_rgba(84,58,39,0.07)]">
      <div className="relative overflow-hidden rounded-[20px] border border-[#ece0d4] bg-[#fffdfa]">
        <span className={`absolute right-3 top-3 z-10 rounded-full px-4 py-1.5 text-[12px] font-extrabold shadow-sm ${badgeClass}`}>{badge}</span>
        <img src={img} alt={title} className={`h-[360px] w-full bg-white object-contain ${contain ? "p-4" : "p-3"}`} />
      </div>
      <div className="pt-5 text-center">
        <div className="font-serif text-[28px] font-black text-[#2F1C13]">{title}</div>
        <div className="mt-2 text-[18px] leading-8 text-stone-600">{description}</div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="border-t border-[#eadfd2] bg-[#fffaf5] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">为何宠物家庭选择我们</h2>
          <p className="mx-auto mt-4 max-w-[780px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">一切设计均旨在让您的体验简单、安全且特别。</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {GUARANTEES.map((g) => (
            <div key={g.title} className="flex flex-col gap-3 rounded-[26px] border border-[#e8ddd1] bg-white p-7 shadow-[0_8px_20px_rgba(84,58,39,0.06)]">
              <div className="text-[36px] leading-none">{g.icon}</div>
              <div className="text-[19px] font-black text-[#35241A]">{g.title}</div>
              <p className="text-[16px] leading-[1.65] text-[#5e4a3c]">{g.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoGuideSection() {
  return (
    <section id="guide" className="border-t border-[#eadfd2] bg-[#fffaf4] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">如何选择最佳照片</h2>
          <p className="mx-auto mt-4 max-w-[980px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">清晰明亮的照片带来最佳纪念品效果。</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <GuidePanel good title="✓ 适合" bullets={["宠物面部光线自然", "面部清晰可见且居中", "宠物占画面比例足够"]} images={["/images/good_1_bird_girl.png", "/images/good_2_rabbit.png", "/images/good_3_hedgehog_girl.png"]} />
          <GuidePanel title="✕ 避免" bullets={["照片模糊或失焦", "画面太暗或阴影过重", "面部被裁切或转开镜头"]} images={["/images/avoid_1_blurry_cat.png", "/images/avoid_2_dark_cat.png", "/images/avoid_3_turned_away_bird.png"]} />
        </div>
      </div>
    </section>
  );
}
function GuidePanel({ title, bullets, images, good = false }: { title: string; bullets: string[]; images: string[]; good?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#eadfd4] bg-white shadow-[0_12px_24px_rgba(70,45,25,0.06)]">
      <div className={`px-6 py-5 text-center text-[24px] font-black ${good ? "bg-[#edf5e6] text-[#2f6c39]" : "bg-[#fde9e2] text-[#b33a3a]"}`}>{title}</div>
      <div className="px-7 py-7">
        <div className="space-y-3 text-[19px] font-medium text-[#5f4c40]">
          {bullets.map((item) => (<div key={item} className="flex items-center gap-3">{good ? <Check className="h-6 w-6 text-[#4f9b5d]" strokeWidth={2.6} /> : <X className="h-6 w-6 text-[#d64545]" strokeWidth={2.6} />}<span>{item}</span></div>))}
        </div>
        <div className="mt-7 grid grid-cols-3 gap-4">
          {images.map((img) => (<div key={img} className={`overflow-hidden rounded-[12px] bg-white p-2 shadow-sm ${good ? "border border-[#e9ddd1]" : "border border-[#f2d4d4]"}`}><img src={img} alt={title} className="aspect-[4/5] h-full w-full rounded-[8px] bg-white object-contain" /></div>))}
        </div>
      </div>
    </div>
  );
}

function FinalCTASection() {
  return (
    <section className="border-t border-[#eadfd2] bg-[linear-gradient(180deg,#fff8f0_0%,#f8eee3_100%)] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center text-center">
        <h2 className="mx-auto max-w-[1180px] text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">准备好将您的宠物或宠物＋主人照片，变成值得珍藏的东西了吗？</h2>
        <p className="mx-auto mt-4 max-w-[1280px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">先选择您的套餐。付款后上传照片。</p>
        <p className="mx-auto mt-2 max-w-[980px] text-center text-[17px] leading-8 text-[#7B6658]">最终文件将发送至结账时填写的电子邮箱。日后无法选择其他电子邮箱。</p>
        <div className="mt-8"><a href="#pricing" className="inline-flex rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-10 py-4 text-[20px] font-extrabold text-white shadow-[0_14px_24px_rgba(157,97,65,0.24)] transition hover:brightness-95">选择您的套餐</a></div>
        <div className="mt-4 text-[18px] font-medium leading-8 text-[#7B6658]">数码交付 • 无需配送 • 适合送礼及珍藏</div>
      </div>
    </section>
  );
}

function Footer({ currentLocale, linkCopied, copyLink, openContact, t }: { currentLocale: LocaleKey; linkCopied: boolean; copyLink: () => void; openContact: () => void; t: FooterText }) {
  const legalLinks = LEGAL_LINKS[currentLocale]; const legalText = LEGAL_TEXT[currentLocale];
  const socialItems = [{ key: "facebook", alt: "Facebook" }, { key: "instagram", alt: "Instagram" }, { key: "tiktok", alt: "TikTok" }, { key: "pinterest", alt: "Pinterest" }, { key: "link", alt: "Copy link" }];
  return (
    <footer className="border-t border-black/5 bg-[#efe5d8]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialItems.map((item) => (
            <button key={item.key} type="button" onClick={item.key === "link" ? copyLink : undefined} aria-label={item.alt} className="relative transition hover:opacity-75">
              <img src={`/social/${item.key}.png`} alt={item.alt} className="h-10 w-10 object-contain" />
              {item.key === "link" && linkCopied && <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-bold text-[#b38a3d] shadow">已复制</span>}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[17px] font-medium text-[#1f1a16]">
          <Link href={legalLinks.terms} className="hover:underline">{legalText.terms}</Link>
          <Link href={legalLinks.privacy} className="hover:underline">{legalText.privacy}</Link>
          <Link href={legalLinks.refunds} className="hover:underline">{legalText.refunds}</Link>
          <button type="button" onClick={openContact} className="hover:underline">{legalText.contact}</button>
        </div>
        <div className="mt-5 text-[17px] font-medium text-[#1f1a16]">© {BRAND.year} {BRAND.name}</div>
        <div className="mt-5 flex items-center gap-2">{["visa", "mastercard", "amex", "applepay", "googlepay"].map((p) => <img key={p} src={`/payments/${p}.png`} alt={p} className="h-7 w-auto object-contain" />)}</div>
        <div className="mt-8 text-center text-[17px] font-medium leading-8 text-[rgba(0,0,0,0.62)]">
          <span>{t.footerDisclaimer}</span><span className="mx-2 hidden md:inline">|</span>
          <span className="block md:inline">{t.footerDisclaimer2}</span><span className="mx-2 hidden md:inline">|</span>
          <span className="block md:inline">{t.footerDisclaimer3}</span>
        </div>
      </div>
    </footer>
  );
}

function ContactModal({ name, setName, supportSubject, setSupportSubject, message, setMessage, close }: { name: string; setName: React.Dispatch<React.SetStateAction<string>>; supportSubject: string; setSupportSubject: React.Dispatch<React.SetStateAction<string>>; message: string; setMessage: React.Dispatch<React.SetStateAction<string>>; close: () => void }) {
  const buildMailto = () => {
    const finalSubject = supportSubject || "客户支持";
    const bodyLines = [name ? `姓名: ${name}` : "", "", message || "请问有什么需要帮助？"].filter(Boolean);
    return `mailto:${BRAND.email}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm" onClick={close}>
      <div className="relative w-full max-w-[560px] rounded-[24px] border border-[#e3d8cb] bg-[#FAF6F0] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:bg-neutral-50" onClick={close} aria-label="Close support modal">✕</button>
        <h3 className="pr-10 font-serif text-[28px] font-black text-[#24140D]">客户支持</h3>
        <div className="mt-6 space-y-4">
          <input type="text" placeholder="姓名" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none" />
          <select value={supportSubject} onChange={(e) => setSupportSubject(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none">
            <option value="" disabled>请选择查询类型...</option>
            <option value="订单支持">订单支持</option>
            <option value="一般查询">一般查询</option>
          </select>
          <textarea rows={4} placeholder="请问有什么需要帮助？" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none" />
          <button type="button" className="w-full rounded-[12px] bg-[#3D2B1F] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-[#2A1D15]" onClick={() => { window.location.href = buildMailto(); }}>打开邮件应用</button>
        </div>
      </div>
    </div>
  );
}
