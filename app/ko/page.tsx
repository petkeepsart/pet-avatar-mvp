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
const CURRENT_LOCALE: LocaleKey = "ko";

const LANGUAGE_HOME_LINKS: { key: LocaleKey; label: string; href: string }[] = [
  { key: "en", label: "ENG", href: "/" }, { key: "zh-hk", label: "繁中", href: "/zh-hk" },
  { key: "zh-cn", label: "简中", href: "/zh-cn" }, { key: "ja", label: "日本語", href: "/ja" },
  { key: "ko", label: "한국어", href: "/ko" }, { key: "es", label: "Español", href: "/es" },
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
  { icon: "🔒", title: "안전한 Stripe 결제", text: "결제는 Amazon과 Apple도 사용하는 동일한 결제 시스템인 Stripe에 의해 안전하게 처리됩니다. 카드 정보는 절대 볼 수 없습니다." },
  { icon: "⚡", title: "즉시 디지털 배달", text: "사진 업로드 후 몇 분 내에 파일이 생성되어 이메일로 전송됩니다. 배송 없음, 며칠을 기다릴 필요 없음." },
  { icon: "🎨", title: "모든 것을 직접 맞춤 설정", text: "결제 후, 최종 파일이 생성되기 전에 텍스트, 글꼴, 색상, 레이아웃을 선택합니다 — 만족할 때까지 확정되지 않습니다." },
  { icon: "📧", title: "파일을 이메일로 전송", text: "맞춤화된 PDF 및 ZIP 파일이 결제 시 사용한 이메일 주소로 직접 전달되어 언제든지 다운로드할 수 있습니다." },
  { icon: "🐾", title: "모든 반려동물, 모든 행사", text: "개, 고양이, 토끼, 새 — 사랑하는 모든 반려동물. 생일, 추모, 선물, 일상적인 즐거움에 어울리는 디자인." },
  { icon: "💬", title: "빠른 배송・안심 구매", text: "즉시 디지털 배송 — 기다림 없음. 궁금한 점이 있으시면 언제든지 도와드립니다." },
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
        const t = document.createElement("textarea"); t.value = window.location.href; t.style.position = "fixed"; t.style.opacity = "0";
        document.body.appendChild(t); t.focus(); t.select(); document.execCommand("copy"); document.body.removeChild(t);
      }
      setLinkCopied(true); setTimeout(() => setLinkCopied(false), 1800);
    } catch (e) { alert("Unable to copy the link. Please try again."); }
  };

  const footerT: FooterText = { footerDisclaimer: "디지털 파일만. 실물 제품은 배송되지 않습니다.", footerDisclaimer2: "전 세계 이용 가능. 캐나다 퀘벡 제외.", footerDisclaimer3: "가격은 USD 기준입니다." };

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
          <Footer currentLocale={CURRENT_LOCALE} linkCopied={linkCopied} copyLink={copyLink} openContact={() => setIsContactOpen(true)} t={footerT} />
        </div>
      </div>
      {isContactOpen && <ContactModal name={name} setName={setName} supportSubject={supportSubject} setSupportSubject={setSupportSubject} message={message} setMessage={setMessage} close={() => setIsContactOpen(false)} />}
    </main>
  );
}

function Header({ currentLocale }: { currentLocale: LocaleKey }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-[#e3d8cb] bg-white/82 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[1680px] items-center justify-between gap-3 px-3 py-2.5">
        <Link href="/ko" className="flex shrink-0 items-center gap-2">
          <Image src="/images/petkeepsart_logo.png" alt="Pet Keeps Art" width={120} height={120} className="h-auto w-[105px] md:w-[120px]" priority />
          <span className="text-[20px] font-extrabold text-[#4A3428]">Pet Keeps Art</span>
        </Link>
        <div className="pointer-events-none absolute left-1/2 hidden -translate-x-[112%] lg:flex">
          <div className="pointer-events-auto flex items-center gap-5">
            <a href="#pricing" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">번들</a>
            <a href="#pricing" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">가격</a>
            <a href="#guide" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">자주묻는질문</a>
            <a href="#examples" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">예시보기</a>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex mr-12">
          {LANGUAGE_HOME_LINKS.map((lang) => <LangButton key={lang.key} href={lang.href} active={lang.key === currentLocale}>{lang.label}</LangButton>)}
        </div>
        <div className="relative md:hidden mr-3">
          <button type="button" onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 rounded-full border border-[#d9cbbc] bg-white px-3 py-1.5 text-[12px] font-bold text-[#4A3428] shadow-sm">
            🌐 {LANGUAGE_HOME_LINKS.find((l) => l.key === currentLocale)?.label ?? "ENG"} ▾
          </button>
          {isLangOpen && (<>
            <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
            <div className="absolute right-0 top-full z-50 mt-2 min-w-[140px] rounded-[16px] border border-[#e3d8cb] bg-white py-2 shadow-xl">
              {LANGUAGE_HOME_LINKS.map((lang) => <Link key={lang.key} href={lang.href} onClick={() => setIsLangOpen(false)} className={`block px-4 py-2 text-[14px] font-semibold transition hover:bg-[#faf3eb] ${lang.key === currentLocale ? "text-[#D98962]" : "text-[#4A3428]"}`}>{lang.label}</Link>)}
            </div>
          </>)}
        </div>
      </div>
    </nav>
  );
}

function LangButton({ children, href, active = false }: { children: React.ReactNode; href: string; active?: boolean }) {
  return <Link href={href} className={`inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-[16px] border px-3 py-1.5 text-[12px] font-bold transition ${active ? "border-[#3A2418] bg-[#3A2418] text-white" : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"}`}>{children}</Link>;
}

function HeroBundleSection({ startCheckout, loadingPlan, customerCountry, setCustomerCountry, customerProvince, setCustomerProvince, isCanada, missingProvince, isQuebecBlocked }: { startCheckout: (plan: PlanId) => void; loadingPlan: PlanId | null; customerCountry: string; setCustomerCountry: React.Dispatch<React.SetStateAction<string>>; customerProvince: string; setCustomerProvince: React.Dispatch<React.SetStateAction<string>>; isCanada: boolean; missingProvince: boolean; isQuebecBlocked: boolean; }) {
  const avatarText = AVATAR_VARIATION_TEXT[CURRENT_LOCALE];
  const pt = PRICING_TEXT[CURRENT_LOCALE];
  const disabled = loadingPlan !== null || missingProvince || isQuebecBlocked;
  return (
    <section className="bg-[linear-gradient(180deg,#f7efe5_0%,#f9f2e9_100%)] px-5 pb-14 pt-12 md:px-8 xl:px-10">
      <div className="mx-auto max-w-[1560px]">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[1480px] text-center">
            <div className="inline-flex rounded-full border border-[#d8c7b6] bg-white/90 px-7 py-3 text-[16px] font-extrabold uppercase tracking-[0.12em] text-[#7B5B47] shadow-sm">내 반려동물 또는 반려동물+주인 사진으로 만드는 맞춤형 디지털 기념품</div>
            <h1 className="mx-auto mt-6 max-w-[1200px] text-center font-serif font-black leading-[1.02] tracking-[-0.04em] text-[#23150F] text-[clamp(2rem,3.6vw,4rem)]">사진 1장 → 맞춤형 기념품 3가지</h1>
            <p className="mx-auto mt-5 max-w-[1080px] px-2 text-[clamp(1rem,1.2vw,1.3rem)] leading-[1.55] text-stone-700">반려동물 또는 반려동물+주인 사진을 프린트 가능한 컬러링 페이지, 기념 증서, 12종 아바타 팩으로 변환하세요 — 다운로드, 인쇄, 선물, 소중한 추억으로.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <HeroPill>내 사진으로 제작</HeroPill>
              <HeroPill>반려동물만 또는 반려동물+주인 사진</HeroPill>
              <HeroPill>맞춤형, 생일 또는 추모용</HeroPill>
              <HeroPill>디지털 다운로드만</HeroPill>
            </div>
          </div>
          <div className="mt-8 grid w-full gap-6 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[420px] rounded-[30px] border border-[#d9cbbc] bg-white p-7 shadow-[0_18px_34px_rgba(84,58,39,0.10)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#F7EBDD] px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D]">샘플 사진</span>
                  <span className="text-[14px] font-semibold text-[#7B6658]">데모용</span>
                </div>
                <div className="overflow-hidden rounded-[26px] border border-[#e3d9cd] bg-[#edf4fb] p-3">
                  <img src="/images/hero-original-demo.png" alt="Sample original photo" className="h-auto w-full rounded-[20px] bg-white object-contain" />
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <a href="#pricing" className="w-full rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-5 py-4 text-center text-[20px] font-extrabold text-white shadow-[0_12px_22px_rgba(157,97,65,0.22)] transition hover:brightness-95">번들 선택</a>
                  <a href="#examples" className="w-full rounded-full border border-[#baa692] px-5 py-4 text-center text-[20px] font-bold text-[#5b4334] transition hover:bg-[#faf3eb]">실제 예시 보기</a>
                  <div className="mt-2 rounded-[18px] border border-[#eadfd2] bg-[#fffaf4] px-4 py-4 text-center text-[16px] leading-7 text-[#7B6658]">
                    <div>결제 후 사진을 업로드합니다.</div>
                    <div className="mt-2 font-semibold text-[#6E5546]">파일은 Stripe 결제 시 입력한 이메일로 전송됩니다.</div>
                    <div className="mt-1 font-semibold text-[#6E5546]">해당 수신 이메일은 나중에 맞춤 설정 페이지에서 변경할 수 없습니다.</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full max-w-[420px] rounded-[28px] border border-[#e1d3c5] bg-white p-6 shadow-[0_10px_22px_rgba(84,58,39,0.06)]">
                <div className="text-[24px] font-black text-[#4B3427]">청구 위치</div>
                <div className="mt-3 rounded-[16px] border border-[#e6d8ca] bg-[#fffaf4] px-4 py-3 text-[14px] leading-6 text-[#7B6658]">캐나다 고객은 주 또는 준주를 선택해야 합니다. 퀘벡 주문은 접수되지 않습니다.</div>
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-[14px] font-bold text-[#6B5345]">국가</label>
                    <select value={customerCountry} onChange={(e) => { setCustomerCountry(e.target.value); if (e.target.value !== "Canada") setCustomerProvince(""); }} className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none">
                      <option value="United States">미국</option><option value="Canada">캐나다</option><option value="United Kingdom">영국</option><option value="Australia">호주</option><option value="Other">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[14px] font-bold text-[#6B5345]">{isCanada ? "주 / 준주" : "주 / 성"}</label>
                    {isCanada ? (
                      <select value={customerProvince} onChange={(e) => setCustomerProvince(e.target.value)} className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none">
                        <option value="">Select a province...</option>
                        {CANADIAN_PROVINCES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                    ) : (
                      <input type="text" value={customerProvince} onChange={(e) => setCustomerProvince(e.target.value)} placeholder="선택사항" className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none" />
                    )}
                  </div>
                  {missingProvince && <div className="rounded-[16px] border border-amber-200 bg-amber-50 px-4 py-3 text-[15px] font-semibold text-amber-700">계속하려면 주를 선택하세요.</div>}
                  {isQuebecBlocked && <div className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-semibold text-red-700">죄송합니다. 이 서비스는 현재 퀘벡에 위치한 고객에게는 제공되지 않습니다.</div>}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center xl:items-start">
              <div className="w-full max-w-[980px] rounded-[32px] border border-[#e1d3c5] bg-[linear-gradient(180deg,#fffaf3_0%,#f8efe5_100%)] p-5 shadow-[0_16px_28px_rgba(84,58,39,0.06)]">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-2">
                  <span className="rounded-full bg-white px-5 py-2 text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D] shadow-sm">라이브 미리보기</span>
                  <span className="text-[16px] font-semibold text-[#7B6658]">1번 업로드 • 3가지 제품</span>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pt.coloringTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">AI 미리보기</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/coloringpage.png" alt="Coloring Default" className="h-full w-full scale-[1.06] object-contain" />
                    </div>
                    <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">결제 후<br />생성되는 선 그림</div>
                  </div>
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pt.keepsakeTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">AI 미리보기</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/keepsake-certificate.png" alt="Certificate Default" className="h-full w-full scale-[1.04] object-contain" />
                    </div>
                    <div className="px-2 flex flex-col items-center text-center">
                      <div className="whitespace-nowrap text-[12px] font-bold leading-none text-[#8A5A3D]">결제 후 맞춤형 레이아웃 제작</div>
                      <div className="mt-1 text-[12px] font-semibold leading-tight text-[#8A5A3D]">맞춤형, 생일 또는 추모</div>
                    </div>
                  </div>
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pt.avatarTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">AI 미리보기</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/avatarpack.png" alt="Avatar Pack Default" className="h-full w-full scale-[1.04] object-contain" />
                    </div>
                    <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">결제 후 생성되는<br />12가지 고유 아바타 스타일</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex w-full max-w-[980px] flex-wrap items-center justify-center gap-3">
                <HeroSubPill>생일</HeroSubPill><HeroSubPill>추모</HeroSubPill><HeroSubPill>인쇄 가능</HeroSubPill><HeroSubPill>공유 가능</HeroSubPill>
                <HeroSubPill>{avatarText.line1} {avatarText.line2}</HeroSubPill>
              </div>
              <div id="pricing" className="mt-8 grid w-full max-w-[980px] gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <button type="button" onClick={() => startCheckout("bundle")} disabled={disabled} className="relative flex min-h-[280px] scale-[1.02] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-[#cfb39b] bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-5 py-7 text-center text-white shadow-[0_20px_30px_rgba(151,90,59,0.26)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70">
                  <div className="absolute left-4 top-4 rounded-full bg-white/18 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em]">{pt.bundleBadge}</div>
                  <div className="mt-6 text-[20px] font-black uppercase tracking-[0.04em]">{pt.bundleTitle}</div>
                  <PriceCurrencyBadge bundle>USD 달러</PriceCurrencyBadge>
                  <div className="mt-3 text-[40px] font-black">$19.99</div>
                  <div className="mt-1 text-[18px] font-bold opacity-95">{pt.bundleSub}</div>
                  <div className="mt-4 rounded-full bg-white/15 px-4 py-1.5 text-[14px] font-bold">{loadingPlan === "bundle" ? "이동 중..." : pt.bundleSave}</div>
                  <div className="mt-4 text-[13px] font-semibold leading-5 text-white/90">Stripe 결제 시 동일한 이메일</div>
                </button>
                <PricingCard title={pt.coloringTitle} price="$12.99" subtitle={pt.singleSub} onClick={() => startCheckout("coloring")} isLoading={loadingPlan === "coloring"} isDisabled={disabled} />
                <PricingCard title={pt.keepsakeTitle} price="$12.99" subtitle={pt.singleSub} onClick={() => startCheckout("keepsake")} isLoading={loadingPlan === "keepsake"} isDisabled={disabled}
                  extra={<div className="mt-2 text-[15px] leading-[1.35] text-[#8D6A50]"><div>맞춤형 /</div><div>생일 축하해요 또는</div><div>추모</div></div>}
                />
                <PricingCard title={pt.avatarTitle} price="$12.99" subtitle={pt.singleSub} onClick={() => startCheckout("avatar")} isLoading={loadingPlan === "avatar"} isDisabled={disabled} />
              </div>
              <div className="mt-6 flex w-full max-w-[980px] flex-wrap items-center justify-center gap-3">
                <TrustPill>안전한 결제</TrustPill><TrustPill>디지털 파일만</TrustPill><TrustPill>배송 불필요</TrustPill><TrustPill>결제 이메일과 동일</TrustPill><TrustPill>나중에 변경 불가</TrustPill>
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
      <div className="text-[19px] leading-tight font-black text-[#4B3427]">{isLoading ? "이동 중..." : title}</div>
      {!isLoading && extra}
      <PriceCurrencyBadge>USD 달러</PriceCurrencyBadge>
      <div className="mt-3 text-[40px] font-black text-[#2E1D16]">{price}</div>
      <div className="mt-1 text-[17px] font-medium text-stone-600">{subtitle}</div>
      <div className="mt-3 text-[13px] font-semibold leading-5 text-[#8D6A50]">결제 이메일로만 전송</div>
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
        <h2 className="text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">이용 방법</h2>
        <p className="mx-auto mt-4 max-w-[980px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">선명한 반려동물 또는 반려동물+주인 사진 한 장이 몇 가지 간단한 단계로 인쇄 가능한 기념품 묶음이 됩니다.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <HowCard number="1" icon={<ShoppingBag className="h-10 w-10" strokeWidth={2.4} />} title="기념품 선택" text="원하는 번들 또는 단품 기념품을 선택하고 먼저 결제를 완료하세요." />
          <HowCard number="2" icon={<PawPrint className="h-10 w-10" strokeWidth={2.4} />} title="결제 후 업로드" text="결제 후, 선명한 반려동물 또는 반려동물+주인 사진을 업로드하고 필요한 정보를 입력하세요." />
          <HowCard number="3" icon={<Sparkles className="h-10 w-10" strokeWidth={2.4} />} title="파일 수령" text="맞춤형 디지털 기념품을 생성하여 결제 이메일로 전송해 드립니다." />
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
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">실제 제품 스타일 미리보기</h2>
          <p className="mx-auto mt-4 max-w-[1040px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
            <span className="block">업로드된 반려동물 또는 반려동물+주인 사진 한 장이 인쇄 가능한 컬러링 페이지,</span>
            <span className="block">맞춤형 기념 증서, 재미있는 12종 아바타 팩이 되는 모습을 확인하세요.</span>
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-[1450px] rounded-[36px] border border-[#e8ddd1] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,251,246,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(84,58,39,0.08)] md:p-8 xl:p-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <EFC img="/images/avatar_example.jpg" title="원본 사진" badge="원본" description="고객이 업로드하는 반려동물 사진" />
            <EFC img="/images/coloring_result.jpg" title="컬러링 페이지" badge="AI 미리보기" description="인쇄 가능한 흑백 라인 아트" />
            <EFC img="/images/keepsake-certificate.png" title="기념 증서" badge="AI 미리보기" description="맞춤형, 생일 또는 추모용 기념 디자인" />
            <EFC img="/images/avatar_pack_preview.png" title="아바타 팩" badge="AI 미리보기" description="공유하기 좋은 12가지 아바타 스타일" contain />
          </div>
        </div>
      </div>
    </section>
  );
}
function EFC({ img, title, badge, description, contain = false }: { img: string; title: string; badge: string; description: string; contain?: boolean }) {
  return (
    <div className="rounded-[26px] border border-[#e4d7ca] bg-white p-4 shadow-[0_12px_24px_rgba(84,58,39,0.07)]">
      <div className="relative overflow-hidden rounded-[20px] border border-[#ece0d4] bg-[#fffdfa]">
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[#E5D394] px-4 py-1.5 text-[12px] font-extrabold text-[#6B5328] shadow-sm">{badge}</span>
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
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">반려동물 가족이 우리를 선택하는 이유</h2>
          <p className="mx-auto mt-4 max-w-[780px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">모든 것이 여러분의 경험을 간단하고 안전하며 특별하게 만들도록 설계되었습니다.</p>
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
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">최적의 사진 선택 방법</h2>
          <p className="mx-auto mt-4 max-w-[980px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">선명하고 밝은 사진이 최상의 기념품 결과를 제공합니다.</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <GuidePanel good title="✓ 좋은 예" bullets={["반려동물 얼굴에 자연스러운 조명이 있음", "얼굴이 또렷하고 중앙에 잘 보임", "반려동물이 프레임 안에서 충분히 크게 보임"]} images={["/images/good_1_bird_girl.png", "/images/good_2_rabbit.png", "/images/good_3_hedgehog_girl.png"]} />
          <GuidePanel title="✕ 피해야 할 예" bullets={["흐리거나 초점이 맞지 않는 사진", "너무 어둡거나 그림자가 심한 사진", "얼굴이 잘렸거나 옆을 보고 있는 사진"]} images={["/images/avoid_1_blurry_cat.png", "/images/avoid_2_dark_cat.png", "/images/avoid_3_turned_away_bird.png"]} />
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
        <h2 className="mx-auto max-w-[1180px] text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">반려동물 또는 반려동물+주인 사진을 간직할 가치 있는 것으로 만들 준비가 되셨나요?</h2>
        <p className="mx-auto mt-4 max-w-[1280px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">먼저 번들을 선택하세요. 결제 후 사진을 업로드합니다.</p>
        <p className="mx-auto mt-2 max-w-[980px] text-center text-[17px] leading-8 text-[#7B6658]">최종 파일은 결제 시 입력한 것과 동일한 이메일로 전달됩니다. 나중에 다른 수신 이메일을 선택할 수 없습니다.</p>
        <div className="mt-8"><a href="#pricing" className="inline-flex rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-10 py-4 text-[20px] font-extrabold text-white shadow-[0_14px_24px_rgba(157,97,65,0.24)] transition hover:brightness-95">번들 선택</a></div>
        <div className="mt-4 text-[18px] font-medium leading-8 text-[#7B6658]">디지털 배달 • 배송 없음 • 선물과 추억에 제격</div>
      </div>
    </section>
  );
}

function Footer({ currentLocale, linkCopied, copyLink, openContact, t }: { currentLocale: LocaleKey; linkCopied: boolean; copyLink: () => void; openContact: () => void; t: FooterText }) {
  const ll = LEGAL_LINKS[currentLocale]; const lt = LEGAL_TEXT[currentLocale];
  const si = [{ key: "facebook", alt: "Facebook" }, { key: "instagram", alt: "Instagram" }, { key: "tiktok", alt: "TikTok" }, { key: "pinterest", alt: "Pinterest" }, { key: "link", alt: "Copy link" }];
  return (
    <footer className="border-t border-black/5 bg-[#efe5d8]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {si.map((item) => (
            <button key={item.key} type="button" onClick={item.key === "link" ? copyLink : undefined} aria-label={item.alt} className="relative transition hover:opacity-75">
              <img src={`/social/${item.key}.png`} alt={item.alt} className="h-10 w-10 object-contain" />
              {item.key === "link" && linkCopied && <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-bold text-[#b38a3d] shadow">복사됨</span>}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[17px] font-medium text-[#1f1a16]">
          <Link href={ll.terms} className="hover:underline">{lt.terms}</Link>
          <Link href={ll.privacy} className="hover:underline">{lt.privacy}</Link>
          <Link href={ll.refunds} className="hover:underline">{lt.refunds}</Link>
          <button type="button" onClick={openContact} className="hover:underline">{lt.contact}</button>
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
    const s = supportSubject || "Support Request";
    const b = [name ? `Name: ${name}` : "", "", message || "How can we help?"].filter(Boolean);
    return `mailto:${BRAND.email}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b.join("\n"))}`;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm" onClick={close}>
      <div className="relative w-full max-w-[560px] rounded-[24px] border border-[#e3d8cb] bg-[#FAF6F0] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:bg-neutral-50" onClick={close}>✕</button>
        <h3 className="pr-10 font-serif text-[28px] font-black text-[#24140D]">지원 요청</h3>
        <div className="mt-6 space-y-4">
          <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none" />
          <select value={supportSubject} onChange={(e) => setSupportSubject(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none">
            <option value="" disabled>문의 유형 선택...</option>
            <option value="Order Support">주문 지원</option>
            <option value="General Question">일반 질문</option>
          </select>
          <textarea rows={4} placeholder="어떻게 도와드릴까요?" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none" />
          <button type="button" className="w-full rounded-[12px] bg-[#3D2B1F] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-[#2A1D15]" onClick={() => { window.location.href = buildMailto(); }}>이메일 앱 열기</button>
        </div>
      </div>
    </div>
  );
}
