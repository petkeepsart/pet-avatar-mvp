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
const CURRENT_LOCALE: LocaleKey = "ar";

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
  { icon: "🔒", title: "دفع آمن عبر Stripe", text: "تتم معالجة المدفوعات بأمان عبر Stripe — نفس النظام الذي يستخدمه Amazon وApple. نحن لا نرى بيانات بطاقتك أبدًا." },
  { icon: "⚡", title: "تسليم رقمي فوري", text: "يتم إنشاء الملفات وإرسالها بالبريد الإلكتروني في غضون دقائق من رفع صورتك. لا شحن، لا انتظار أيام." },
  { icon: "🎨", title: "أنت تخصص كل شيء", text: "بعد الدفع، اختر النص والخط والألوان والتصميم قبل إنشاء الملفات النهائية — لا شيء يتأكد حتى تكون راضيًا." },
  { icon: "📧", title: "الملفات تُرسل إلى بريدك", text: "تُسلَّم ملفات PDF وZIP المخصصة مباشرةً إلى البريد الإلكتروني المستخدم عند الدفع، وجاهزة للتنزيل في أي وقت." },
  { icon: "🐾", title: "أي حيوان أليف، أي مناسبة", text: "كلاب، قطط، أرانب، طيور — أي حيوان أليف عزيز. تصاميم مناسبة لأعياد الميلاد والذكريات والهدايا والمتعة اليومية." },
  { icon: "💬", title: "تسليم سريع · شراء مطمئن", text: "تسليم رقمي فوري — بدون انتظار. إذا كان لديك أي سؤال، نحن هنا دائماً للمساعدة." },
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

  const footerT: FooterText = { footerDisclaimer: "ملفات رقمية فقط. لا يتم شحن منتجات مادية.", footerDisclaimer2: "متاح في جميع أنحاء العالم. باستثناء كيبيك، كندا.", footerDisclaimer3: "الأسعار بالدولار الأمريكي." };

  return (
    <main className="min-h-screen bg-[#F5EFE6] text-[#422B1E] selection:bg-orange-100" dir="rtl">
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
        <Link href="/ar" className="flex shrink-0 items-center gap-2">
          <Image src="/images/petkeepsart_logo.png" alt="Pet Keeps Art" width={120} height={120} className="h-auto w-[105px] md:w-[120px]" priority />
          <span className="text-[20px] font-extrabold text-[#4A3428]">Pet Keeps Art</span>
        </Link>
        <div className="pointer-events-none absolute left-1/2 hidden -translate-x-[-5%] lg:flex">
          <div className="pointer-events-auto flex items-center gap-5">
            <a href="#pricing" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">الحزمة</a>
            <a href="#pricing" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">الأسعار</a>
            <a href="#guide" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">الأسئلة الشائعة</a>
            <a href="#examples" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">الأمثلة</a>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex ml-[25px]">
          {LANGUAGE_HOME_LINKS.map((lang) => (
            <LangButton key={lang.key} href={lang.href} active={lang.key === currentLocale}>
              {lang.label}
            </LangButton>
          ))}
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
            <div className="inline-flex rounded-full border border-[#d8c7b6] bg-white/90 px-7 py-3 text-[16px] font-extrabold uppercase tracking-[0.12em] text-[#7B5B47] shadow-sm">تذكارات رقمية مخصصة من صورة حيوانك الأليف أو الحيوان الأليف + المالك</div>
            <h1 className="mx-auto mt-6 max-w-[1200px] text-center font-serif font-black leading-[1.02] tracking-[-0.04em] text-[#23150F] text-[clamp(2rem,3.6vw,4rem)]">صورة واحدة ← ٣ تذكارات مخصصة</h1>
            <p className="mx-auto mt-5 max-w-[1080px] px-2 text-[clamp(1rem,1.2vw,1.3rem)] leading-[1.55] text-stone-700">حوّل صورة حيوانك الأليف أو الحيوان الأليف + المالك إلى صفحة تلوين قابلة للطباعة وشهادة تذكارية وحزمة من ١٢ صورة رمزية — جاهزة للتنزيل والطباعة والإهداء والاحتفاظ.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <HeroPill>مصنوع من صورتك الخاصة</HeroPill>
              <HeroPill>حيوان أليف فقط أو مع المالك</HeroPill>
              <HeroPill>مخصص، عيد ميلاد أو ذكرى</HeroPill>
              <HeroPill>تنزيل رقمي فقط</HeroPill>
            </div>
          </div>
          <div className="mt-8 grid w-full gap-6 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[420px] rounded-[30px] border border-[#d9cbbc] bg-white p-7 shadow-[0_18px_34px_rgba(84,58,39,0.10)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#F7EBDD] px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D]">صورة نموذجية</span>
                  <span className="text-[14px] font-semibold text-[#7B6658]">للعرض فقط</span>
                </div>
                <div className="overflow-hidden rounded-[26px] border border-[#e3d9cd] bg-[#edf4fb] p-3">
                  <img src="/images/hero-original-demo.png" alt="Sample original photo" className="h-auto w-full rounded-[20px] bg-white object-contain" />
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <a href="#pricing" className="w-full rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-5 py-4 text-center text-[20px] font-extrabold text-white shadow-[0_12px_22px_rgba(157,97,65,0.22)] transition hover:brightness-95">اختر حزمتك</a>
                  <a href="#examples" className="w-full rounded-full border border-[#baa692] px-5 py-4 text-center text-[20px] font-bold text-[#5b4334] transition hover:bg-[#faf3eb]">عرض أمثلة حقيقية</a>
                  <div className="mt-2 rounded-[18px] border border-[#eadfd2] bg-[#fffaf4] px-4 py-4 text-center text-[16px] leading-7 text-[#7B6658]">
                    <div>ستقوم برفع صورتك بعد الدفع.</div>
                    <div className="mt-2 font-semibold text-[#6E5546]">سيتم إرسال الملفات إلى البريد الإلكتروني المُدخَل عند الدفع عبر Stripe.</div>
                    <div className="mt-1 font-semibold text-[#6E5546]">لا يمكن تغيير بريد التسليم لاحقًا في صفحة التخصيص.</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full max-w-[420px] rounded-[28px] border border-[#e1d3c5] bg-white p-6 shadow-[0_10px_22px_rgba(84,58,39,0.06)]">
                <div className="text-[24px] font-black text-[#4B3427]">موقع الفوترة</div>
                <div className="mt-3 rounded-[16px] border border-[#e6d8ca] bg-[#fffaf4] px-4 py-3 text-[14px] leading-6 text-[#7B6658]">يجب على عملاء كندا اختيار مقاطعة أو إقليم. لا تُقبل طلبات كيبيك.</div>
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-[14px] font-bold text-[#6B5345]">الدولة</label>
                    <select value={customerCountry} onChange={(e) => { setCustomerCountry(e.target.value); if (e.target.value !== "Canada") setCustomerProvince(""); }} className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none">
                      <option value="United States">الولايات المتحدة</option><option value="Canada">كندا</option><option value="United Kingdom">المملكة المتحدة</option><option value="Australia">أستراليا</option><option value="Other">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[14px] font-bold text-[#6B5345]">{isCanada ? "المقاطعة / الإقليم" : "الولاية / المقاطعة"}</label>
                    {isCanada ? (
                      <select value={customerProvince} onChange={(e) => setCustomerProvince(e.target.value)} className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none">
                        <option value="">اختر مقاطعة...</option>
                        {CANADIAN_PROVINCES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                    ) : (
                      <input type="text" value={customerProvince} onChange={(e) => setCustomerProvince(e.target.value)} placeholder="اختياري" className="w-full rounded-[16px] border border-[#d9cbbc] bg-white px-4 py-3 text-[16px] font-medium text-[#422B1E] outline-none" />
                    )}
                  </div>
                  {missingProvince && <div className="rounded-[16px] border border-amber-200 bg-amber-50 px-4 py-3 text-[15px] font-semibold text-amber-700">يرجى اختيار مقاطعة للمتابعة.</div>}
                  {isQuebecBlocked && <div className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-semibold text-red-700">عذرًا، هذه الخدمة غير متاحة حاليًا للعملاء في كيبيك.</div>}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center xl:items-start">
              <div className="w-full max-w-[980px] rounded-[32px] border border-[#e1d3c5] bg-[linear-gradient(180deg,#fffaf3_0%,#f8efe5_100%)] p-5 shadow-[0_16px_28px_rgba(84,58,39,0.06)]">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-2">
                  <span className="rounded-full bg-white px-5 py-2 text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D] shadow-sm">معاينة مباشرة</span>
                  <span className="text-[16px] font-semibold text-[#7B6658]">رفع واحد • ٣ منتجات</span>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pt.coloringTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">معاينة AI</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/coloringpage.png" alt="Coloring Default" className="h-full w-full scale-[1.06] object-contain" />
                    </div>
                    <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">رسم خطي يُنشأ بعد الدفع</div>
                  </div>
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pt.keepsakeTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">معاينة AI</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/keepsake-certificate.png" alt="Certificate Default" className="h-full w-full scale-[1.04] object-contain" />
                    </div>
                    <div className="px-2 flex flex-col items-center text-center">
                      <div className="whitespace-nowrap text-[12px] font-bold leading-none text-[#8A5A3D]">تصميم مخصص يُنشأ بعد الدفع</div>
                      <div className="mt-1 text-[12px] font-semibold leading-tight text-[#8A5A3D]">مخصص، عيد ميلاد أو ذكرى</div>
                    </div>
                  </div>
                  <div className="relative flex min-h-[440px] flex-col items-center gap-3 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">{pt.avatarTitle}</div>
                    <div className="rounded-full bg-[#5b5551] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">معاينة AI</div>
                    <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      <img src="/images/avatarpack.png" alt="Avatar Pack Default" className="h-full w-full scale-[1.04] object-contain" />
                    </div>
                    <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">١٢ نمط صورة رمزية فريد يُنشأ بعد الدفع</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex w-full max-w-[980px] flex-wrap items-center justify-center gap-3">
                <HeroSubPill>عيد الميلاد</HeroSubPill><HeroSubPill>الذكرى</HeroSubPill><HeroSubPill>قابل للطباعة</HeroSubPill><HeroSubPill>قابل للمشاركة</HeroSubPill>
                <HeroSubPill>{avatarText.line1} {avatarText.line2}</HeroSubPill>
              </div>
              <div id="pricing" className="mt-8 grid w-full max-w-[980px] gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <button type="button" onClick={() => startCheckout("bundle")} disabled={disabled} className="relative flex min-h-[280px] scale-[1.02] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-[#cfb39b] bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-5 py-7 text-center text-white shadow-[0_20px_30px_rgba(151,90,59,0.26)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70">
                  <div className="absolute left-4 top-4 rounded-full bg-white/18 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em]">{pt.bundleBadge}</div>
                  <div className="mt-6 text-[20px] font-black uppercase tracking-[0.04em]">{pt.bundleTitle}</div>
                  <PriceCurrencyBadge bundle>USD دولار</PriceCurrencyBadge>
                  <div className="mt-3 text-[40px] font-black">$19.99</div>
                  <div className="mt-1 text-[18px] font-bold opacity-95">{pt.bundleSub}</div>
                  <div className="mt-4 rounded-full bg-white/15 px-4 py-1.5 text-[14px] font-bold">{loadingPlan === "bundle" ? "جارٍ التحويل..." : pt.bundleSave}</div>
                  <div className="mt-4 text-[13px] font-semibold leading-5 text-white/90">إلى بريد Stripe نفسه</div>
                </button>
                <PricingCard title={pt.coloringTitle} price="$12.99" subtitle={pt.singleSub} onClick={() => startCheckout("coloring")} isLoading={loadingPlan === "coloring"} isDisabled={disabled} />
                <PricingCard title={pt.keepsakeTitle} price="$12.99" subtitle={pt.singleSub} onClick={() => startCheckout("keepsake")} isLoading={loadingPlan === "keepsake"} isDisabled={disabled}
                  extra={<div className="mt-2 text-[15px] leading-[1.35] text-[#8D6A50]"><div>مخصص /</div><div>عيد ميلاد سعيد أو</div><div>في ذكرى عزيزة</div></div>}
                />
                <PricingCard title={pt.avatarTitle} price="$12.99" subtitle={pt.singleSub} onClick={() => startCheckout("avatar")} isLoading={loadingPlan === "avatar"} isDisabled={disabled} />
              </div>
              <div className="mt-6 flex w-full max-w-[980px] flex-wrap items-center justify-center gap-3">
                <TrustPill>دفع آمن</TrustPill><TrustPill>ملفات رقمية فقط</TrustPill><TrustPill>لا شحن</TrustPill><TrustPill>نفس بريد الدفع</TrustPill><TrustPill>لا يمكن تغييره لاحقًا</TrustPill>
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
      <div className="text-[19px] leading-tight font-black text-[#4B3427]">{isLoading ? "جارٍ التحويل..." : title}</div>
      {!isLoading && extra}
      <PriceCurrencyBadge>USD دولار</PriceCurrencyBadge>
      <div className="mt-3 text-[40px] font-black text-[#2E1D16]">{price}</div>
      <div className="mt-1 text-[17px] font-medium text-stone-600">{subtitle}</div>
      <div className="mt-3 text-[13px] font-semibold leading-5 text-[#8D6A50]">يُرسل إلى بريد الدفع فقط</div>
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
        <h2 className="text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">كيف يعمل</h2>
        <p className="mx-auto mt-4 max-w-[980px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">صورة واحدة واضحة لحيوانك الأليف أو مع المالك تصبح حزمة تذكارات قابلة للطباعة في خطوات بسيطة.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <HowCard number="1" icon={<ShoppingBag className="h-10 w-10" strokeWidth={2.4} />} title="اختر تذكارك" text="اختر الحزمة أو التذكار الفردي الذي تريده وأتمم الدفع أولاً." />
          <HowCard number="2" icon={<PawPrint className="h-10 w-10" strokeWidth={2.4} />} title="ارفع الصورة بعد الدفع" text="بعد إتمام الدفع، ارفع صورة واضحة لحيوانك الأليف أو مع المالك وأضف التفاصيل عند الحاجة." />
          <HowCard number="3" icon={<Sparkles className="h-10 w-10" strokeWidth={2.4} />} title="استلم ملفاتك" text="نقوم بإنشاء تذكاراتك الرقمية المخصصة وإرسالها إلى بريد الدفع الإلكتروني." />
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
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">معاينة نمط المنتج الحقيقي</h2>
          <p className="mx-auto mt-4 max-w-[1040px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
            <span className="block">شاهد كيف تتحول صورة حيوانك الأليف أو مع المالك إلى صفحة تلوين قابلة للطباعة،</span>
            <span className="block">وشهادة تذكارية مخصصة، وحزمة مرحة من ١٢ صورة رمزية.</span>
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-[1450px] rounded-[36px] border border-[#e8ddd1] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,251,246,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(84,58,39,0.08)] md:p-8 xl:p-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <EFC img="/images/avatar_example.jpg" title="الصورة الأصلية" badge="أصلية" description="صورة حيوانك الأليف التي ترفعها" />
            <EFC img="/images/coloring_result.jpg" title="صفحة التلوين" badge="معاينة AI" description="رسم خطي أبيض وأسود قابل للطباعة" />
            <EFC img="/images/keepsake-certificate.png" title="الشهادة التذكارية" badge="معاينة AI" description="تصميم مخصص، عيد ميلاد أو ذكرى" />
            <EFC img="/images/avatar_pack_preview.png" title="حزمة الصور الرمزية" badge="معاينة AI" description="١٢ نمط صورة رمزية فريد قابل للمشاركة" contain />
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
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">لماذا تختارنا عائلات الحيوانات الأليفة</h2>
          <p className="mx-auto mt-4 max-w-[780px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">كل شيء مصمم لجعل تجربتك بسيطة وآمنة ومميزة.</p>
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
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">كيفية اختيار أفضل صورة</h2>
          <p className="mx-auto mt-4 max-w-[980px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">الصورة الواضحة والمضيئة تعطي أفضل نتائج التذكارات.</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <GuidePanel good title="✓ مثالي" bullets={["إضاءة طبيعية على وجه الحيوان الأليف", "الوجه واضح ومرئي في المنتصف", "الحيوان الأليف يملأ حيزًا كافيًا من الإطار"]} images={["/images/good_1_bird_girl.png", "/images/good_2_rabbit.png", "/images/good_3_hedgehog_girl.png"]} />
          <GuidePanel title="✕ تجنب" bullets={["صورة ضبابية أو غير مركزة", "مظلمة جدًا أو ظلال قوية", "الوجه مقطوع أو ملتفت بعيدًا"]} images={["/images/avoid_1_blurry_cat.png", "/images/avoid_2_dark_cat.png", "/images/avoid_3_turned_away_bird.png"]} />
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
        <h2 className="mx-auto max-w-[1180px] text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">هل أنت مستعد لتحويل صورة حيوانك الأليف أو مع المالك إلى شيء يستحق الاحتفاظ به؟</h2>
        <p className="mx-auto mt-4 max-w-[1280px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">اختر حزمتك أولاً. ستقوم برفع صورتك بعد الدفع.</p>
        <p className="mx-auto mt-2 max-w-[980px] text-center text-[17px] leading-8 text-[#7B6658]">سيتم تسليم الملفات النهائية إلى نفس البريد الإلكتروني المُدخَل عند الدفع. لا يمكن اختيار بريد تسليم مختلف لاحقًا.</p>
        <div className="mt-8"><a href="#pricing" className="inline-flex rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-10 py-4 text-[20px] font-extrabold text-white shadow-[0_14px_24px_rgba(157,97,65,0.24)] transition hover:brightness-95">اختر حزمتك</a></div>
        <div className="mt-4 text-[18px] font-medium leading-8 text-[#7B6658]">تسليم رقمي • بلا شحن • مثالي للهدايا والذكريات</div>
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
              {item.key === "link" && linkCopied && <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-bold text-[#b38a3d] shadow">تم النسخ</span>}
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
        <h3 className="pr-10 font-serif text-[28px] font-black text-[#24140D]">طلب دعم</h3>
        <div className="mt-6 space-y-4">
          <input type="text" placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none" />
          <select value={supportSubject} onChange={(e) => setSupportSubject(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none">
            <option value="" disabled>اختر نوع الاستفسار...</option>
            <option value="Order Support">دعم الطلب</option>
            <option value="General Question">سؤال عام</option>
          </select>
          <textarea rows={4} placeholder="كيف يمكننا مساعدتك؟" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none" />
          <button type="button" className="w-full rounded-[12px] bg-[#3D2B1F] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-[#2A1D15]" onClick={() => { window.location.href = buildMailto(); }}>فتح تطبيق البريد</button>
        </div>
      </div>
    </div>
  );
}
