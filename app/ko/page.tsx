"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, Upload, PawPrint, Sparkles, Globe } from "lucide-react";

const BRAND = {
  name: "Pet Keepsake Studio",
  year: 2026,
  email: "support@petkeepsake.com",
};

type LocaleKey =
  | "en"
  | "zh-hk"
  | "zh-cn"
  | "ja"
  | "ko"
  | "es"
  | "de"
  | "ar";

const CURRENT_LOCALE: LocaleKey = "ko";

const LANGUAGE_HOME_LINKS: { key: LocaleKey; label: string; href: string }[] = [
  { key: "en", label: "ENG", href: "/" },
  { key: "zh-hk", label: "繁體中文", href: "/zh-hk" },
  { key: "zh-cn", label: "简中", href: "/zh-cn" },
  { key: "ja", label: "日本語", href: "/ja" },
  { key: "ko", label: "한국어", href: "/ko" },
  { key: "es", label: "Español", href: "/es" },
  { key: "de", label: "Deutsch", href: "/de" },
  { key: "ar", label: "العربية", href: "/ar" },
];

const LEGAL_LINKS: Record<
  LocaleKey,
  { terms: string; privacy: string; refunds: string }
> = {
  en: { terms: "/terms", privacy: "/privacy", refunds: "/refund-policy" },
  "zh-hk": {
    terms: "/terms-zh-hk",
    privacy: "/privacy-zh-hk",
    refunds: "/refund-policy-zh-hk",
  },
  "zh-cn": {
    terms: "/terms-zh-cn",
    privacy: "/privacy-zh-cn",
    refunds: "/refund-policy-zh-cn",
  },
  ja: { terms: "/terms-ja", privacy: "/privacy-ja", refunds: "/refund-policy-ja" },
  ko: { terms: "/terms-ko", privacy: "/privacy-ko", refunds: "/refund-policy-ko" },
  es: { terms: "/terms-es", privacy: "/privacy-es", refunds: "/refund-policy-es" },
  de: { terms: "/terms-de", privacy: "/privacy-de", refunds: "/refund-policy-de" },
  ar: { terms: "/terms-ar", privacy: "/privacy-ar", refunds: "/refund-policy-ar" },
};

const LEGAL_TEXT: Record<
  LocaleKey,
  { terms: string; privacy: string; refunds: string; contact: string }
> = {
  en: {
    terms: "Terms",
    privacy: "Privacy",
    refunds: "Refund Policy",
    contact: "Contact Us",
  },
  "zh-hk": {
    terms: "條款",
    privacy: "私隱政策",
    refunds: "退款政策",
    contact: "聯絡我們",
  },
  "zh-cn": {
    terms: "条款",
    privacy: "隐私政策",
    refunds: "退款政策",
    contact: "联系我们",
  },
  ja: {
    terms: "利用規約",
    privacy: "プライバシー",
    refunds: "返金ポリシー",
    contact: "お問い合わせ",
  },
  ko: {
    terms: "이용약관",
    privacy: "개인정보처리방침",
    refunds: "환불정책",
    contact: "문의하기",
  },
  es: {
    terms: "Términos",
    privacy: "Privacidad",
    refunds: "Reembolsos",
    contact: "Contacto",
  },
  de: {
    terms: "AGB",
    privacy: "Datenschutz",
    refunds: "Rückerstattung",
    contact: "Kontakt",
  },
  ar: {
    terms: "الشروط",
    privacy: "الخصوصية",
    refunds: "الاسترداد",
    contact: "اتصل بنا",
  },
};

const AVATAR_VARIATION_TEXT: Record<
  LocaleKey,
  { line1: string; line2: string }
> = {
  en: {
    line1: "Unique AI variations",
    line2: "in every avatar pack",
  },
  "zh-hk": {
    line1: "每個貼圖包都有獨特的",
    line2: "AI 生成變化款式",
  },
  "zh-cn": {
    line1: "每个贴图包都有独特的",
    line2: "AI 生成变化款式",
  },
  ja: {
    line1: "各アバターパックに",
    line2: "AI生成のユニークな変化を収録",
  },
  ko: {
    line1: "각 아바타 팩마다",
    line2: "AI 생성 고유 변형이 포함됩니다",
  },
  es: {
    line1: "Cada pack incluye",
    line2: "variaciones únicas generadas por IA",
  },
  de: {
    line1: "Jedes Paket enthält",
    line2: "einzigartige KI-Varianten",
  },
  ar: {
    line1: "تتضمن كل حزمة",
    line2: "تنويعات فريدة تم إنشاؤها بالذكاء الاصطناعي",
  },
};

const PRICING_TEXT: Record<
  LocaleKey,
  {
    bundleTitle: string;
    bundleSub: string;
    bundleBadge: string;
    bundleSave: string;
    coloringTitle: string;
    keepsakeTitle: string;
    avatarTitle: string;
    singleSub: string;
  }
> = {
  en: {
    bundleTitle: "Bundle Deal",
    bundleSub: "All 3 keepsakes",
    bundleBadge: "Best Value",
    bundleSave: "Save 49%",
    coloringTitle: "Coloring Page",
    keepsakeTitle: "Keepsake Certificate",
    avatarTitle: "Avatar Pack (12 Designs)",
    singleSub: "Single purchase",
  },
  "zh-hk": {
    bundleTitle: "超值套裝",
    bundleSub: "包含全部 3 款",
    bundleBadge: "最抵買",
    bundleSave: "現省 49%",
    coloringTitle: "填色畫",
    keepsakeTitle: "寵物紀念證書",
    avatarTitle: "頭像包（12款設計）",
    singleSub: "單獨購買",
  },
  "zh-cn": {
    bundleTitle: "超值套装",
    bundleSub: "包含全部 3 款纪念品",
    bundleBadge: "超值首选",
    bundleSave: "立省 49%",
    coloringTitle: "填色画",
    keepsakeTitle: "纪念证书",
    avatarTitle: "头像包（12款设计）",
    singleSub: "单独购买",
  },
  ja: {
    bundleTitle: "バンドルセット",
    bundleSub: "3点すべて込み",
    bundleBadge: "いちばんお得",
    bundleSave: "49% OFF",
    coloringTitle: "塗り絵",
    keepsakeTitle: "記念証書",
    avatarTitle: "アバターパック（全12種）",
    singleSub: "単品購入",
  },
  ko: {
    bundleTitle: "번들 특가",
    bundleSub: "3가지 기념품 모두 포함",
    bundleBadge: "가장 인기",
    bundleSave: "49% 절약",
    coloringTitle: "컬러링 페이지",
    keepsakeTitle: "기념 증서",
    avatarTitle: "아바타 팩 (12종 디자인)",
    singleSub: "단품 구매",
  },
  es: {
    bundleTitle: "Oferta de Paquete",
    bundleSub: "Los 3 recuerdos",
    bundleBadge: "Mejor valor",
    bundleSave: "Ahorra 49%",
    coloringTitle: "Página para Colorear",
    keepsakeTitle: "Certificado Conmemorativo",
    avatarTitle: "Pack de Avatares (12 Diseños)",
    singleSub: "Compra individual",
  },
  de: {
    bundleTitle: "Paketangebot",
    bundleSub: "Alle 3 Andenken",
    bundleBadge: "Bestes Angebot",
    bundleSave: "49% sparen",
    coloringTitle: "Ausmalbild",
    keepsakeTitle: "Erinnerungszertifikat",
    avatarTitle: "Avatar-Paket (12 Designs)",
    singleSub: "Einzelkauf",
  },
  ar: {
    bundleTitle: "عرض الحزمة",
    bundleSub: "جميع التذكارات الثلاثة",
    bundleBadge: "أفضل قيمة",
    bundleSave: "وفّر 49٪",
    coloringTitle: "صفحة تلوين",
    keepsakeTitle: "شهادة تذكارية",
    avatarTitle: "حزمة الصور الرمزية (12 تصميماً)",
    singleSub: "شراء فردي",
  },
};

const MACHINE_TRANSLATE_OPTIONS = [
  { label: "Français", tl: "fr" },
  { label: "Italiano", tl: "it" },
  { label: "Português", tl: "pt" },
  { label: "Nederlands", tl: "nl" },
  { label: "Русский", tl: "ru" },
  { label: "ไทย", tl: "th" },
];

export default function PetKeepsakeLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);

  const [name, setName] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [message, setMessage] = useState("");

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1800);
  };

  const t = {
    footerDisclaimer: "디지털 파일만 제공됩니다. 실물 상품은 배송되지 않습니다.",
    footerDisclaimer2: "전 세계 이용 가능. 캐나다 퀘벡주는 제외됩니다.",
    footerDisclaimer3: "가격은 미국 달러(USD)입니다.",
  };

  return (
    <main className="min-h-screen bg-[#F5EFE6] text-[#422B1E] selection:bg-orange-100">
      <div className="mx-auto max-w-[1600px] px-2 py-2 md:px-3 md:py-3">
        <div className="overflow-hidden rounded-[28px] border border-[#d8cdbf] bg-[#FAF6F0] shadow-[0_24px_60px_rgba(72,51,36,0.14)]">
          <Header currentLocale={CURRENT_LOCALE} />

          <HeroBundleSection />

          <HowItWorksSection />

          <ExamplesGallerySection />

          <PhotoGuideSection />

          <FinalCTASection />

          <Footer
            currentLocale={CURRENT_LOCALE}
            linkCopied={linkCopied}
            copyLink={copyLink}
            openContact={() => setIsContactOpen(true)}
            t={t}
          />
        </div>
      </div>

      {isContactOpen && (
        <ContactModal
          name={name}
          setName={setName}
          supportSubject={supportSubject}
          setSupportSubject={setSupportSubject}
          message={message}
          setMessage={setMessage}
          msgCopied={msgCopied}
          setMsgCopied={setMsgCopied}
          close={() => setIsContactOpen(false)}
        />
      )}
    </main>
  );
}

function Header({ currentLocale }: { currentLocale: LocaleKey }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#e3d8cb] bg-white/82 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-3 px-5 py-4">
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-[18px]">🐾</div>
          <span className="whitespace-nowrap text-[16px] font-extrabold tracking-tight text-[#3A2418] xl:text-[17px]">
            Pet Keepsake Studio
          </span>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="#upload"
            className="whitespace-nowrap text-[13px] font-bold text-[#4A3428] hover:opacity-70"
          >
            업로드
          </a>
          <a
            href="#pricing"
            className="whitespace-nowrap text-[13px] font-bold text-[#4A3428] hover:opacity-70"
          >
            가격
          </a>
          <a
            href="#guide"
            className="whitespace-nowrap text-[13px] font-bold text-[#4A3428] hover:opacity-70"
          >
            FAQ
          </a>
          <a
            href="#examples"
            className="whitespace-nowrap text-[13px] font-bold text-[#4A3428] hover:opacity-70"
          >
            예시 보기
          </a>
          <a
            href="#upload"
            className="whitespace-nowrap rounded-[14px] border border-[#9B7449] bg-[linear-gradient(180deg,#D28B62_0%,#C56F49_100%)] px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_8px_16px_rgba(139,92,61,0.22)] transition hover:brightness-95"
          >
            지금 만들기
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {LANGUAGE_HOME_LINKS.map((lang) => (
            <LangButton
              key={lang.key}
              href={lang.href}
              active={lang.key === currentLocale}
            >
              {lang.label}
            </LangButton>
          ))}
        </div>

        <div className="relative block md:hidden">
          <details className="group relative">
            <summary className="list-none cursor-pointer rounded-md border border-stone-300 bg-white px-2.5 py-1 text-xs font-bold text-stone-700 hover:bg-stone-50">
              🌐 언어
            </summary>

            <div className="absolute right-0 mt-2 flex w-[190px] flex-col gap-2 rounded-xl border border-stone-200 bg-white p-3 shadow-lg">
              {LANGUAGE_HOME_LINKS.map((lang) => (
                <LangButton
                  key={lang.key}
                  href={lang.href}
                  active={lang.key === currentLocale}
                >
                  {lang.label}
                </LangButton>
              ))}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

function HeroBundleSection() {
  const avatarVariationText = AVATAR_VARIATION_TEXT[CURRENT_LOCALE];
  const pricingText = PRICING_TEXT[CURRENT_LOCALE];
  const [uploadRightsConfirmed, setUploadRightsConfirmed] = useState(false);

  return (
    <section
      id="upload"
      className="bg-[linear-gradient(180deg,#f7efe5_0%,#f9f2e9_100%)] px-5 pb-14 pt-12 md:px-8 xl:px-10"
    >
      <div className="mx-auto max-w-[1560px]">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[1480px] text-center">
            <div className="inline-flex rounded-full border border-[#d8c7b6] bg-white/90 px-7 py-3 text-[16px] font-extrabold tracking-[0.02em] text-[#7B5B47] shadow-sm">
              내 반려동물 사진으로 만드는 맞춤 디지털 기념품
            </div>

            <h1 className="mx-auto mt-6 max-w-[1500px] text-center font-serif font-black leading-[0.96] tracking-[-0.05em] text-[#23150F] text-[clamp(2.35rem,4.15vw,4.45rem)] xl:whitespace-nowrap">
              사진 1장 → 맞춤 반려동물 기념품 3종
            </h1>

            <p className="mx-auto mt-5 max-w-[1500px] whitespace-nowrap text-[clamp(1.08rem,1.32vw,1.52rem)] leading-[1.45] text-stone-700">
              반려동물 사진 한 장을 인쇄 가능한 컬러링 페이지, 기념 증서, 12종 아바타 팩으로 만들어 바로 다운로드하고, 인쇄하고, 선물하고, 오래 간직하세요.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <HeroPill>내 사진으로 제작</HeroPill>
              <HeroPill>생일 선물 또는 추억 보관용</HeroPill>
              <HeroPill>디지털 다운로드 전용</HeroPill>
            </div>
          </div>

          <div className="mt-10 grid w-full gap-8 xl:grid-cols-[470px_minmax(0,1fr)] xl:items-start">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[470px] rounded-[34px] border border-[#d9cbbc] bg-white p-7 shadow-[0_18px_34px_rgba(84,58,39,0.10)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#F7EBDD] px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D]">
                    업로드 시작
                  </span>
                  <span className="text-[14px] font-semibold text-[#7B6658]">
                    JPG 또는 PNG
                  </span>
                </div>

                <div className="overflow-hidden rounded-[26px] border border-[#e3d9cd] bg-[#edf4fb] p-3">
                  <img
                    src="/images/hero-original-demo.png"
                    alt="업로드 미리보기"
                    className="h-auto w-full rounded-[20px] bg-white object-contain"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    disabled={!uploadRightsConfirmed}
                    className={`w-full rounded-full px-5 py-4 text-[20px] font-extrabold text-white transition ${
                      uploadRightsConfirmed
                        ? "bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] shadow-[0_12px_22px_rgba(157,97,65,0.22)] hover:brightness-95"
                        : "cursor-not-allowed bg-[#d8c8ba] text-white/90 shadow-none"
                    }`}
                  >
                    사진 업로드하기
                  </button>

                  <a
                    href="#examples"
                    className="w-full rounded-full border border-[#baa692] px-5 py-4 text-center text-[20px] font-bold text-[#5b4334] transition hover:bg-[#faf3eb]"
                  >
                    실제 예시 보기
                  </a>
                </div>

                <div className="mt-5 rounded-[22px] border border-[#e8d8c7] bg-[#fffaf4] px-4 py-4 text-left shadow-[0_8px_18px_rgba(84,58,39,0.04)]">
                  <div className="mb-3 text-[18px] font-extrabold text-[#4A3428]">
                    사진 사용 권한 확인
                  </div>

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={uploadRightsConfirmed}
                      onChange={(e) => setUploadRightsConfirmed(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[#C86C43]"
                    />
                    <span className="text-[15px] leading-7 text-[#5b4334]">
                      이 사진을 내가 소유하고 있거나 사용할 권한이 있음을 확인합니다.
                      유명인, 공인, 가상 캐릭터, 인터넷에서 내려받은 이미지는 업로드하지 마세요.
                    </span>
                  </label>

                  <p className="mt-3 text-[15px] leading-7 text-[#8a6a55]">
                    이 규정을 위반하는 주문은 거절되거나 취소될 수 있습니다.
                  </p>
                </div>

                <div className="mt-5 text-center text-[17px] font-medium leading-8 text-[#7B6658]">
                  디자인 기술이 필요 없습니다. 한 번 업로드하면 바로 다운로드 가능한 파일을 받을 수 있습니다.
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center xl:items-start">
              <div className="w-full max-w-[1000px] rounded-[36px] border border-[#e1d3c5] bg-[linear-gradient(180deg,#fffaf3_0%,#f8efe5_100%)] p-5 shadow-[0_16px_28px_rgba(84,58,39,0.06)] md:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-white px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D] shadow-sm">
                    번들 미리보기
                  </span>
                  <span className="text-[15px] font-semibold text-[#7B6658]">
                    1회 업로드 • 3가지 기념품
                  </span>
                </div>

                <div className="relative">
                  <img
                    src="/images/hero-keepsake-3-products.png"
                    alt="컬러링 페이지, 기념 증서, 아바타 팩 미리보기"
                    className="h-auto w-full object-contain drop-shadow-[0_20px_28px_rgba(76,48,30,0.08)]"
                  />
                </div>
              </div>

              <div className="mt-5 flex w-full max-w-[1180px] flex-wrap items-center justify-center gap-3">
                <HeroSubPill>생일</HeroSubPill>
                <HeroSubPill>추억 보관</HeroSubPill>
                <HeroSubPill>인쇄 가능</HeroSubPill>
                <HeroSubPill>공유 가능</HeroSubPill>
                <HeroSubPill>
                  {avatarVariationText.line1} {avatarVariationText.line2}
                </HeroSubPill>
              </div>

              <div
                id="pricing"
                className="mt-8 grid w-full max-w-[1000px] gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                <button className="relative flex min-h-[258px] scale-[1.02] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-[#cfb39b] bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-5 py-7 text-center text-white shadow-[0_20px_30px_rgba(151,90,59,0.26)] transition hover:brightness-95">
                  <div className="absolute left-4 top-4 rounded-full bg-white/18 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em]">
                    {pricingText.bundleBadge}
                  </div>

                  <div className="mt-6 text-[18px] font-extrabold uppercase tracking-[0.04em]">
                    {pricingText.bundleTitle}
                  </div>

                  <PriceCurrencyBadge bundle>미국 달러 (USD)</PriceCurrencyBadge>

                  <div className="mt-3 text-[46px] font-black">$19.99</div>
                  <div className="mt-2 text-[18px] opacity-95">
                    {pricingText.bundleSub}
                  </div>
                  <div className="mt-4 rounded-full bg-white/15 px-4 py-1.5 text-[14px] font-bold">
                    개별 구매 대비 {pricingText.bundleSave}
                  </div>
                </button>

                <PricingCard
                  title={pricingText.coloringTitle}
                  price="$12.99"
                  subtitle={pricingText.singleSub}
                />

                <PricingCard
                  title={pricingText.keepsakeTitle}
                  price="$12.99"
                  subtitle={pricingText.singleSub}
                  extra={
                    <div className="mt-2 text-[15px] leading-[1.35] text-[#8D6A50]">
                      <div>Happy Birthday /</div>
                      <div>In Loving Memory</div>
                    </div>
                  }
                />

                <PricingCard
                  title={pricingText.avatarTitle}
                  price="$12.99"
                  subtitle={pricingText.singleSub}
                />
              </div>

              <div className="mt-5 flex w-full max-w-[1000px] flex-wrap items-center justify-center gap-3">
                <TrustPill>안전한 결제</TrustPill>
                <TrustPill>디지털 파일 전용</TrustPill>
                <TrustPill>배송 불필요</TrustPill>
              </div>

              <div className="mt-6 w-full max-w-[1000px] rounded-[28px] border border-[#e5d7c9] bg-white/85 shadow-[0_10px_20px_rgba(84,58,39,0.05)]">
                <div className="grid divide-y divide-[#ead9c8] md:grid-cols-3 md:divide-x md:divide-y-0">
                  <TrustMiniItem
                    title="맞춤 제작"
                    text="내 반려동물 사진으로 제작"
                  />
                  <TrustMiniItem
                    title="디지털"
                    text="바로 다운로드 가능한 형식"
                  />
                  <TrustMiniItem
                    title="선물용"
                    text="생일과 추억 보관용으로 좋습니다"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceCurrencyBadge({
  children,
  bundle = false,
}: {
  children: React.ReactNode;
  bundle?: boolean;
}) {
  return (
    <div
      className={`mt-4 rounded-full px-5 py-2 text-[15px] font-extrabold tracking-[0.02em] shadow-sm ${
        bundle ? "bg-white/20 text-white" : "bg-[#F5E7D9] text-[#8A5A3D]"
      }`}
    >
      {children}
    </div>
  );
}

function PricingCard({
  title,
  price,
  subtitle,
  extra,
}: {
  title: string;
  price: string;
  subtitle: string;
  extra?: React.ReactNode;
}) {
  return (
    <button className="flex min-h-[258px] flex-col items-center justify-center rounded-[28px] border border-[#c8b9ab] bg-white px-5 py-6 text-center shadow-[0_10px_22px_rgba(84,58,39,0.08)] transition hover:bg-[#faf3eb]">
      <div className="text-[18px] font-extrabold text-[#4B3427]">{title}</div>
      {extra}
      <PriceCurrencyBadge>미국 달러 (USD)</PriceCurrencyBadge>
      <div className="mt-3 text-[42px] font-black text-[#2E1D16]">{price}</div>
      <div className="mt-2 text-[18px] text-stone-600">{subtitle}</div>
    </button>
  );
}

function HeroPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-[#decfbe] bg-white/85 px-5 py-2.5 text-[17px] font-semibold text-[#6B5345] shadow-sm">
      {children}
    </div>
  );
}

function HeroSubPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-[#fff8ef] px-5 py-2.5 text-[17px] font-semibold text-[#7A5B47] shadow-sm ring-1 ring-[#eadacd]">
      {children}
    </div>
  );
}

function TrustPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#dfd0c1] bg-white/70 px-4 py-2 text-[16px] font-medium text-[#7B6658]">
      {children}
    </span>
  );
}

function TrustMiniItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex min-h-[128px] flex-col items-center justify-center px-6 py-5 text-center">
      <span className="text-[19px] font-extrabold text-[#3E2B1F]">{title}</span>
      <span className="mt-2 text-[17px] leading-7 text-[#7B6658]">{text}</span>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section className="border-t border-[#eadfd2] bg-[#fbf8f2] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto max-w-[1380px]">
        <h2 className="text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">
          이용 방법
        </h2>

        <p className="mx-auto mt-4 max-w-[980px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
          선명한 반려동물 사진 한 장이면, 인쇄 가능한 기념품 번들을 간단한 단계로 만들 수 있습니다.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <HowCard
            number="1"
            icon={<Upload className="h-10 w-10" strokeWidth={2.4} />}
            title="사진 업로드"
            text="반려동물의 얼굴이 잘 보이는 선명한 사진 한 장으로 시작하세요."
          />
          <HowCard
            number="2"
            icon={<PawPrint className="h-10 w-10" strokeWidth={2.4} />}
            title="번들 만들기"
            text="컬러링 페이지, 기념 증서, 12종 아바타 팩을 한 번에 받아보세요."
          />
          <HowCard
            number="3"
            icon={<Sparkles className="h-10 w-10" strokeWidth={2.4} />}
            title="다운로드하고 간직하기"
            text="인쇄, 저장, 공유, 선물까지 가능한 맞춤 디지털 파일입니다."
          />
        </div>
      </div>
    </section>
  );
}

function HowCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-[#eadfd2] bg-white/85 px-6 py-10 text-center shadow-[0_12px_22px_rgba(84,58,39,0.05)]">
      <div className="flex items-end justify-center gap-3">
        <span className="text-[82px] font-black leading-none text-[#A6825D]">
          {number}
        </span>
        <span className="mb-2 text-[#A6825D]">{icon}</span>
      </div>

      <div className="mt-5 text-[25px] font-black text-[#35241A]">{title}</div>
      <p className="mx-auto mt-3 max-w-[330px] text-[18px] leading-8 text-stone-600">
        {text}
      </p>
    </div>
  );
}

function ExamplesGallerySection() {
  return (
    <section
      id="examples"
      className="border-t border-[#eadfd2] bg-[linear-gradient(180deg,#fffdfa_0%,#fff7ef_100%)] px-6 py-16 md:px-10 xl:px-12"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">
            실제 상품 스타일 미리보기
          </h2>

          <p className="mx-auto mt-4 max-w-[1040px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
            <span className="block">
              업로드한 반려동물 사진 한 장이 인쇄 가능한 컬러링 페이지가 되고,
            </span>
            <span className="block">
              맞춤 기념 증서와 재미있는 12종 아바타 팩으로 완성됩니다.
            </span>
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[1450px] rounded-[36px] border border-[#e8ddd1] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,251,246,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(84,58,39,0.08)] md:p-8 xl:p-10">
          <div className="mb-7 hidden items-center justify-center gap-8 md:flex">
            <div className="h-px w-[24%] bg-[#dacdbf]" />
            <div className="text-[48px] leading-none text-[#c8b6a0]">→</div>
            <div className="h-px w-[24%] bg-[#dacdbf]" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ExampleFlowCard
              img="/images/avatar_example.jpg"
              title="원본 사진"
              badge="원본"
              description="고객이 업로드하는 반려동물 사진"
              badgeTone="gold"
            />

            <ExampleFlowCard
              img="/images/coloring_result.jpg"
              title="컬러링 페이지"
              badge="AI 미리보기"
              description="인쇄 가능한 흑백 라인 아트"
              badgeTone="gold"
            />

            <ExampleFlowCard
              img="/images/keepsake-certificate.png"
              title="기념 증서"
              badge="AI 미리보기"
              description="생일 또는 추억 보관용 기념 디자인"
              badgeTone="gold"
            />

            <ExampleFlowCard
              img="/images/avatar_pack_preview.png"
              title="아바타 팩"
              badge="AI 미리보기"
              description="공유하기 좋은 12가지 아바타 스타일"
              badgeTone="gold"
              contain
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExampleFlowCard({
  img,
  title,
  badge,
  description,
  contain = false,
  badgeTone = "gold",
}: {
  img: string;
  title: string;
  badge: string;
  description: string;
  contain?: boolean;
  badgeTone?: "gold" | "orange";
}) {
  const badgeClass =
    badgeTone === "orange"
      ? "bg-[linear-gradient(180deg,#D8A483_0%,#C98560_100%)] text-white"
      : "bg-[#E5D394] text-[#6B5328]";

  return (
    <div className="rounded-[26px] border border-[#e4d7ca] bg-white p-4 shadow-[0_12px_24px_rgba(84,58,39,0.07)]">
      <div className="relative overflow-hidden rounded-[20px] border border-[#ece0d4] bg-[#fffdfa]">
        <span
          className={`absolute right-3 top-3 z-10 rounded-full px-4 py-1.5 text-[12px] font-extrabold shadow-sm ${badgeClass}`}
        >
          {badge}
        </span>

        <img
          src={img}
          alt={title}
          className={`h-[360px] w-full bg-white object-contain ${
            contain ? "p-4" : "p-3"
          }`}
        />
      </div>

      <div className="pt-5 text-center">
        <div className="font-serif text-[28px] font-black leading-tight text-[#2F1C13]">
          {title}
        </div>
        <div className="mt-2 text-[18px] leading-8 text-stone-600">
          {description}
        </div>
      </div>
    </div>
  );
}

function PhotoGuideSection() {
  return (
    <section
      id="guide"
      className="border-t border-[#eadfd2] bg-[#fffaf4] px-6 py-16 md:px-10 xl:px-12"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">
            좋은 사진 고르는 방법
          </h2>
          <p className="mx-auto mt-4 max-w-[980px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
            밝고 선명한 사진일수록 더 좋은 결과를 얻을 수 있습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <GuidePanel
            good
            title="✓ 좋은 예"
            bullets={[
              "반려동물 얼굴에 자연스러운 조명이 있음",
              "얼굴이 또렷하고 중앙에 잘 보임",
              "반려동물이 프레임 안에서 충분히 크게 보임",
            ]}
            images={[
              "/images/good_1_bird_girl.png",
              "/images/good_2_rabbit.png",
              "/images/good_3_hedgehog_girl.png",
            ]}
          />

          <GuidePanel
            title="✕ 피해야 할 예"
            bullets={[
              "흐리거나 초점이 맞지 않는 사진",
              "너무 어둡거나 그림자가 심한 사진",
              "얼굴이 잘렸거나 옆을 보고 있는 사진",
            ]}
            images={[
              "/images/avoid_1_blurry_cat.png",
              "/images/avoid_2_dark_cat.png",
              "/images/avoid_3_turned_away_bird.png",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function GuidePanel({
  title,
  bullets,
  images,
  good = false,
}: {
  title: string;
  bullets: string[];
  images: string[];
  good?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#eadfd4] bg-white shadow-[0_12px_24px_rgba(70,45,25,0.06)]">
      <div
        className={`px-6 py-5 text-center text-[24px] font-black ${
          good ? "bg-[#edf5e6] text-[#2f6c39]" : "bg-[#fde9e2] text-[#b33a3a]"
        }`}
      >
        {title}
      </div>

      <div className="px-7 py-7">
        <div className="space-y-3 text-[19px] font-medium text-[#5f4c40]">
          {bullets.map((item) => (
            <div key={item} className="flex items-center gap-3">
              {good ? (
                <Check className="h-6 w-6 text-[#4f9b5d]" strokeWidth={2.6} />
              ) : (
                <X className="h-6 w-6 text-[#d64545]" strokeWidth={2.6} />
              )}
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img}
              className={`overflow-hidden rounded-[12px] bg-white p-2 shadow-sm ${
                good ? "border border-[#e9ddd1]" : "border border-[#f2d4d4]"
              }`}
            >
              <img
                src={img}
                alt={title}
                className="aspect-[4/5] h-full w-full rounded-[8px] bg-white object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinalCTASection() {
  return (
    <section className="border-t border-[#eadfd2] bg-[linear-gradient(180deg,#fff8f0_0%,#f8eee3_100%)] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center text-center">
        <h2 className="mx-auto max-w-[1180px] text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">
          반려동물 사진을 오래 간직하고 싶은 특별한 추억으로 바꿔보세요
        </h2>

        <p className="mx-auto mt-4 max-w-[1280px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px] lg:whitespace-nowrap">
          한 번 업로드하면 내 사진으로 만든 컬러링 페이지, 기념 증서, 아바타 팩을 받을 수 있습니다.
        </p>

        <div className="mt-8">
          <a
            href="#upload"
            className="inline-flex rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-10 py-4 text-[20px] font-extrabold text-white shadow-[0_14px_24px_rgba(157,97,65,0.24)] transition hover:brightness-95"
          >
            사진 업로드하기
          </a>
        </div>

        <div className="mt-4 text-[18px] font-medium leading-8 text-[#7B6658]">
          디지털 전달 • 배송 없음 • 선물과 추억 보관에 적합
        </div>
      </div>
    </section>
  );
}

function Footer({
  currentLocale,
  linkCopied,
  copyLink,
  openContact,
  t,
}: {
  currentLocale: LocaleKey;
  linkCopied: boolean;
  copyLink: () => void;
  openContact: () => void;
  t: {
    footerDisclaimer: string;
    footerDisclaimer2: string;
    footerDisclaimer3: string;
  };
}) {
  const legalLinks = LEGAL_LINKS[currentLocale];
  const legalText = LEGAL_TEXT[currentLocale];

  const openMachineTranslatedSite = (targetLang: string) => {
    const currentUrl = window.location.href;
    const hostname = window.location.hostname;

    const isLocal =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local");

    if (isLocal) {
      alert(
        "Google 웹사이트 번역은 보통 localhost에서는 작동하지 않습니다. 라이브 도메인에서 테스트하시거나 Chrome 번역 기능을 사용해 주세요."
      );
      return;
    }

    const translateUrl = `https://translate.google.com/translate?sl=auto&tl=${targetLang}&u=${encodeURIComponent(
      currentUrl
    )}`;

    window.location.href = translateUrl;
  };

  return (
    <footer className="border-t border-black/5 bg-[#efe5d8]">
      <div className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["email", "facebook", "instagram", "tiktok", "pinterest", "link"].map(
              (p) => (
                <button
                  key={p}
                  onClick={p === "link" ? copyLink : undefined}
                  className="relative transition hover:opacity-75"
                >
                  <img
                    src={`/social/${p}.png`}
                    alt={p}
                    className="h-10 w-10 object-contain"
                  />
                  {p === "link" && linkCopied && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-bold text-[#b38a3d] shadow">
                      복사됨
                    </span>
                  )}
                </button>
              )
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[17px] font-medium text-[#1f1a16]">
            <Link href={legalLinks.terms} className="hover:underline">
              {legalText.terms}
            </Link>
            <Link href={legalLinks.privacy} className="hover:underline">
              {legalText.privacy}
            </Link>
            <Link href={legalLinks.refunds} className="hover:underline">
              {legalText.refunds}
            </Link>
            <button onClick={openContact} className="hover:underline">
              {legalText.contact}
            </button>
          </div>

          <div className="mt-5 flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <div className="text-[17px] font-medium text-[#1f1a16]">
              © {BRAND.year} {BRAND.name}
            </div>

            <div className="flex items-center gap-2">
              {["visa", "mastercard", "amex", "applepay", "googlepay"].map((p) => (
                <img
                  key={p}
                  src={`/payments/${p}.png`}
                  alt={p}
                  className="h-7 w-auto object-contain"
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <div className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#5d4638]">
              <Globe className="h-4 w-4" />
              추가 언어 보기 (기계 번역)
            </div>

            <select
              defaultValue=""
              onChange={(e) => {
                const value = e.target.value;
                if (!value) return;
                openMachineTranslatedSite(value);
                e.target.value = "";
              }}
              className="min-w-[260px] rounded-full border border-[#d3c2b1] bg-white px-4 py-2.5 text-[14px] font-medium text-[#5d4638] shadow-sm outline-none transition hover:bg-[#faf3eb]"
            >
              <option value="" disabled>
                다른 언어 선택...
              </option>
              {MACHINE_TRANSLATE_OPTIONS.map((lang) => (
                <option key={lang.tl} value={lang.tl}>
                  {lang.label}
                </option>
              ))}
            </select>

            <p className="max-w-[760px] text-[13px] leading-6 text-[#7b6658]">
              기계 번역은 편의를 위한 기능입니다. 공식 버전은 이 사이트에 있는 언어별 페이지를 확인해 주세요.
            </p>
          </div>

          <div className="mt-5 text-center text-[17px] font-medium leading-8 text-[rgba(0,0,0,0.62)]">
            <span>{t.footerDisclaimer}</span>
            <span className="mx-2 hidden md:inline">|</span>
            <span className="block md:inline">{t.footerDisclaimer2}</span>
            <span className="mx-2 hidden md:inline">|</span>
            <span className="block md:inline">{t.footerDisclaimer3}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactModal({
  name,
  setName,
  supportSubject,
  setSupportSubject,
  message,
  setMessage,
  msgCopied,
  setMsgCopied,
  close,
}: {
  name: string;
  setName: (v: string) => void;
  supportSubject: string;
  setSupportSubject: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  msgCopied: boolean;
  setMsgCopied: (v: boolean) => void;
  close: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-[560px] rounded-[24px] border border-[#e3d8cb] bg-[#FAF6F0] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:bg-neutral-50"
          onClick={close}
        >
          ✕
        </button>

        <h3 className="pr-10 font-serif text-[28px] font-black tracking-[-0.03em] text-[#24140D]">
          고객 지원 문의
        </h3>
        <p className="mt-1 text-sm text-stone-600">
          이메일 앱이 열리며 내용이 자동으로 입력됩니다.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#3D2B1F]">
              이름
            </label>
            <input
              type="text"
              placeholder="이름 (선택 사항)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none focus:border-[#C8A064]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#3D2B1F]">
              문의 유형
            </label>
            <select
              value={supportSubject}
              onChange={(e) => setSupportSubject(e.target.value)}
              className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none focus:border-[#C8A064]"
            >
              <option value="" disabled>
                문의 유형을 선택하세요...
              </option>
              <option value="Order Support">주문 문의</option>
              <option value="File Access">파일 접근</option>
              <option value="Photo Upload Issue">사진 업로드 문제</option>
              <option value="General Question">일반 문의</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#3D2B1F]">
              메시지
            </label>
            <textarea
              rows={4}
              placeholder="무엇을 도와드릴까요?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none focus:border-[#C8A064]"
            />
          </div>

          <button
            className="w-full rounded-[12px] bg-[#3D2B1F] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-[#2A1D15]"
            onClick={() => {
              const finalSubject = `[PET KEEPSAKE STUDIO] ${
                supportSubject || "문의"
              }`;
              const bodyLines = [
                `Customer Name: ${name || "Not provided"}`,
                `Message: ${message}`,
              ].join("\n");

              window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
                finalSubject
              )}&body=${encodeURIComponent(bodyLines)}`;
            }}
          >
            이메일 앱 열기
          </button>

          <button
            onClick={async () => {
              const textToCopy = `Subject: [PET KEEPSAKE STUDIO] ${
                supportSubject || "문의"
              }\n\nCustomer Name: ${name || "Not provided"}\nMessage: ${message}`;

              await navigator.clipboard.writeText(textToCopy);
              setMsgCopied(true);
              setTimeout(() => setMsgCopied(false), 1500);
            }}
            className="w-full rounded-xl border border-dashed border-[#C8A064] px-4 py-3 text-[12px] font-bold text-[#C8A064] hover:bg-[#FDFBF7]"
          >
            {msgCopied ? "클립보드에 복사되었습니다 ✓" : "대체 방법: 메시지 내용 복사"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LangButton({
  children,
  href,
  active = false,
}: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-[12px] border px-3 py-1.5 text-[11px] font-bold leading-none transition ${
        active
          ? "border-[#3A2418] bg-[#3A2418] text-white"
          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
      }`}
    >
      {children}
    </Link>
  );
}