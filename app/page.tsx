"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, X, Upload, PawPrint, Sparkles } from "lucide-react";

const BRAND = {
  name: "Pet Keeps Art",
  year: 2026,
  email: "info@petkeepsart.com",
};

type LocaleKey = "en" | "zh-hk" | "zh-cn" | "ja" | "ko" | "es" | "de" | "ar";

const CURRENT_LOCALE: LocaleKey = "en";

const LANGUAGE_HOME_LINKS: { key: LocaleKey; label: string; href: string }[] = [
  { key: "en", label: "ENG", href: "/" },
  { key: "zh-hk", label: "繁中", href: "/zh-hk" },
  { key: "zh-cn", label: "简中", href: "/zh-cn" },
  { key: "ja", label: "日本語", href: "/ja" },
  { key: "ko", label: "한국어", href: "/ko" },
  { key: "es", label: "Español", href: "/es" },
  { key: "de", label: "Deutsch", href: "/de" },
  { key: "ar", label: "العربية", href: "/ar" },
];

const LEGAL_LINKS: Record<LocaleKey, { terms: string; privacy: string; refunds: string }> = {
  en: { terms: "/terms", privacy: "/privacy", refunds: "/refund-policy" },
  "zh-hk": { terms: "/terms-zh-hk", privacy: "/privacy-zh-hk", refunds: "/refund-policy-zh-hk" },
  "zh-cn": { terms: "/terms-zh-cn", privacy: "/privacy-zh-cn", refunds: "/refund-policy-zh-cn" },
  ja: { terms: "/terms-ja", privacy: "/privacy-ja", refunds: "/refund-policy-ja" },
  ko: { terms: "/terms-ko", privacy: "/privacy-ko", refunds: "/refund-policy-ko" },
  es: { terms: "/terms-es", privacy: "/privacy-es", refunds: "/refund-policy-es" },
  de: { terms: "/terms-de", privacy: "/privacy-de", refunds: "/refund-policy-de" },
  ar: { terms: "/terms-ar", privacy: "/privacy-ar", refunds: "/refund-policy-ar" },
};

const LEGAL_TEXT: Record<LocaleKey, { terms: string; privacy: string; refunds: string; contact: string }> = {
  en: { terms: "Terms", privacy: "Privacy", refunds: "Refund Policy", contact: "Contact Us" },
  "zh-hk": { terms: "條款", privacy: "私隱政策", refunds: "退款政策", contact: "聯絡我們" },
  "zh-cn": { terms: "条款", privacy: "隐私政策", refunds: "退款政策", contact: "联系我们" },
  ja: { terms: "利用規約", privacy: "プライバシー", refunds: "返金ポリシー", contact: "お問い合わせ" },
  ko: { terms: "이용약관", privacy: "개인정보처리방침", refunds: "환불정책", contact: "문의하기" },
  es: { terms: "Términos", privacy: "Privacidad", refunds: "Reembolsos", contact: "Contacto" },
  de: { terms: "AGB", privacy: "Datenschutz", refunds: "Rückerstattung", contact: "Kontakt" },
  ar: { terms: "الشروط", privacy: "الخصوصية", refunds: "الاسترداد", contact: "اتصل بنا" },
};

const AVATAR_VARIATION_TEXT: Record<LocaleKey, { line1: string; line2: string }> = {
  en: { line1: "Unique AI variations", line2: "in every avatar pack" },
  "zh-hk": { line1: "每個貼圖包都有獨特的", line2: "AI 生成變化款式" },
  "zh-cn": { line1: "每个贴图包都有独特的", line2: "AI 生成变化款式" },
  ja: { line1: "各アバターパックに", line2: "AI生成のユニークな変化を収録" },
  ko: { line1: "각 아바타 팩에는", line2: "AI 생성 고유 변형이 포함됩니다" },
  es: { line1: "Cada pack incluye", line2: "variaciones únicas generadas por IA" },
  de: { line1: "Jedes Paket enthält", line2: "einzigartige KI-Varianten" },
  ar: { line1: "تتضمن كل حزمة", line2: "تنويعات فريدة تم إنشاؤها بالذكاء الاصطناعي" },
};

const PRICING_TEXT: Record<LocaleKey, any> = {
  en: {
    bundleTitle: "Bundle Deal",
    bundleSub: "All 3 keepsakes",
    bundleBadge: "Best Value",
    bundleSave: "Save 49%",
    coloringTitle: "Coloring Page",
    keepsakeTitle: "Keepsake Certificate",
    avatarTitle: "12 pcs Avatar Pack",
    singleSub: "Single purchase",
  },
  "zh-hk": {
    bundleTitle: "超值套裝",
    bundleSub: "包含全部 3 款",
    bundleBadge: "最抵買",
    bundleSave: "現省 49%",
    coloringTitle: "填色畫",
    keepsakeTitle: "寵物紀念證書",
    avatarTitle: "12 款頭像包",
    singleSub: "單獨購買",
  },
  "zh-cn": {
    bundleTitle: "超值套餐",
    bundleSub: "包含全部 3 款",
    bundleBadge: "超值首选",
    bundleSave: "立省 49%",
    coloringTitle: "填色画",
    keepsakeTitle: "宠物纪念证书",
    avatarTitle: "12 款头像包",
    singleSub: "单独购买",
  },
  ja: {
    bundleTitle: "バンドルセット",
    bundleSub: "3点すべて込み",
    bundleBadge: "いちばんお得",
    bundleSave: "49% OFF",
    coloringTitle: "塗り絵",
    keepsakeTitle: "記念証書",
    avatarTitle: "アバター12種パック",
    singleSub: "単品購入",
  },
  ko: {
    bundleTitle: "번들 특가",
    bundleSub: "3가지 기념품 모두 포함",
    bundleBadge: "가장 인기",
    bundleSave: "49% 절약",
    coloringTitle: "컬러リング 페이지",
    keepsakeTitle: "기념 증서",
    avatarTitle: "12종 아바타 팩",
    singleSub: "단품 구매",
  },
  es: {
    bundleTitle: "Oferta de Paquete",
    bundleSub: "Los 3 recuerdos",
    bundleBadge: "Mejor valor",
    bundleSave: "Ahorra 49%",
    coloringTitle: "Página para Colorear",
    keepsakeTitle: "Certificado Conmemorativo",
    avatarTitle: "Pack de 12 Avatares",
    singleSub: "Compra individual",
  },
  de: {
    bundleTitle: "Paketangebot",
    bundleSub: "Alle 3 Andenken",
    bundleBadge: "Bestes Angebot",
    bundleSave: "49% sparen",
    coloringTitle: "Ausmalbild",
    keepsakeTitle: "Erinnerungszertifikat",
    avatarTitle: "12er Avatar-Paket",
    singleSub: "Einzelkauf",
  },
  ar: {
    bundleTitle: "عرض الحزمة",
    bundleSub: "جميع التذكارات الثلاثة",
    bundleBadge: "أفضل قيمة",
    bundleSave: "وفّر 49٪",
    coloringTitle: "صفحة تلوين",
    keepsakeTitle: "شهادة تذكارية",
    avatarTitle: "حزمة ١٢ صورة رمزية",
    singleSub: "شراء فردي",
  },
};

export default function PetKeepsakeLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const [name, setName] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [message, setMessage] = useState("");
  const [uploadRightsConfirmed, setUploadRightsConfirmed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1800);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const objectUrl = URL.createObjectURL(file);
    setSelectedImage(file);
    setPreviewUrl(objectUrl);
  };

  const handleStartGenerator = () => {
    if (!uploadRightsConfirmed) return;
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const t = {
    footerDisclaimer: "Digital files only. No physical products are shipped.",
    footerDisclaimer2: "Available worldwide. Excludes Québec, Canada.",
    footerDisclaimer3: "Prices in USD.",
  };

  return (
    <main className="min-h-screen bg-[#F5EFE6] text-[#422B1E] selection:bg-orange-100">
      <div className="mx-auto max-w-[1600px] px-2 py-2 md:px-3 md:py-3">
        <div className="overflow-hidden rounded-[28px] border border-[#d8cdbf] bg-[#FAF6F0] shadow-[0_24px_60px_rgba(72,51,36,0.14)]">
          <Header currentLocale={CURRENT_LOCALE} />
          <HeroBundleSection
            uploadRightsConfirmed={uploadRightsConfirmed}
            setUploadRightsConfirmed={setUploadRightsConfirmed}
            selectedImage={selectedImage}
            previewUrl={previewUrl}
            handleStartGenerator={handleStartGenerator}
            handleImageChange={handleImageChange}
            fileInputRef={fileInputRef}
          />
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
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-3 px-3 py-2.5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/petkeepsart_logo.png"
            alt="Pet Keeps Art"
            width={120}
            height={120}
            className="h-auto w-[105px] md:w-[120px]"
            priority
          />
          <span className="text-[20px] font-extrabold text-[#4A3428]">Pet Keeps Art</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex -ml-1">
          <a href="#upload" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">
            Upload
          </a>
          <a href="#pricing" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">
            Pricing
          </a>
          <a href="#guide" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">
            FAQ
          </a>
          <a href="#examples" className="whitespace-nowrap text-[16px] font-bold text-[#4A3428] hover:opacity-70">
            View Examples
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex mr-10">
          {LANGUAGE_HOME_LINKS.map((lang) => (
            <LangButton key={lang.key} href={lang.href} active={lang.key === currentLocale}>
              {lang.label}
            </LangButton>
          ))}
        </div>
      </div>
    </nav>
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
      className={`inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-[16px] border px-3 py-1.5 text-[12px] font-bold transition ${
        active
          ? "border-[#3A2418] bg-[#3A2418] text-white"
          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
      }`}
    >
      {children}
    </Link>
  );
}

function HeroBundleSection({
  uploadRightsConfirmed,
  setUploadRightsConfirmed,
  selectedImage,
  previewUrl,
  handleStartGenerator,
  handleImageChange,
  fileInputRef,
}: {
  uploadRightsConfirmed: boolean;
  setUploadRightsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: File | null;
  previewUrl: string | null;
  handleStartGenerator: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const avatarVariationText = AVATAR_VARIATION_TEXT[CURRENT_LOCALE];
  const pricingText = PRICING_TEXT[CURRENT_LOCALE];

  return (
    <section
      id="upload"
      className="bg-[linear-gradient(180deg,#f7efe5_0%,#f9f2e9_100%)] px-5 pb-14 pt-12 md:px-8 xl:px-10"
    >
      <div className="mx-auto max-w-[1560px]">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[1480px] text-center">
            <div className="inline-flex rounded-full border border-[#d8c7b6] bg-white/90 px-7 py-3 text-[16px] font-extrabold uppercase tracking-[0.12em] text-[#7B5B47] shadow-sm">
              Personalized digital keepsakes from your own pet photo
            </div>

            <h1 className="mx-auto mt-6 max-w-[1500px] text-center font-serif font-black leading-[0.96] tracking-[-0.05em] text-[#23150F] text-[clamp(2.35rem,4.15vw,4.45rem)] xl:whitespace-nowrap">
              1 Photo → 3 Personalized Pet Keepsakes
            </h1>

            <p className="mx-auto mt-5 max-w-[1500px] whitespace-nowrap text-[clamp(1.08rem,1.32vw,1.52rem)] leading-[1.45] text-stone-700">
              Turn your pet photo into a printable coloring page, a keepsake certificate, and a
              12-avatar pack — ready to download, print, gift, and treasure.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <HeroPill>Made from your own photo</HeroPill>
              <HeroPill>Birthday or memorial-ready</HeroPill>
              <HeroPill>Digital download only</HeroPill>
            </div>
          </div>

          <div className="mt-10 grid w-full gap-8 xl:grid-cols-[470px_minmax(0,1fr)] xl:items-start">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[470px] rounded-[34px] border border-[#d9cbbc] bg-white p-7 shadow-[0_18px_34px_rgba(84,58,39,0.10)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#F7EBDD] px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D]">
                    Upload start
                  </span>
                  <span className="text-[14px] font-semibold text-[#7B6658]">JPG or PNG</span>
                </div>

                <div className="overflow-hidden rounded-[26px] border border-[#e3d9cd] bg-[#edf4fb] p-3">
                  <img
                    src={previewUrl || "/images/hero-original-demo.png"}
                    alt="Upload preview"
                    className="h-auto w-full rounded-[20px] bg-white object-contain"
                  />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleStartGenerator}
                    disabled={!uploadRightsConfirmed}
                    className={`w-full rounded-full px-5 py-4 text-center text-[20px] font-extrabold text-white transition ${
                      uploadRightsConfirmed
                        ? "bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] shadow-[0_12px_22px_rgba(157,97,65,0.22)] hover:brightness-95"
                        : "cursor-not-allowed bg-[#d8c8ba] text-white/90 shadow-none"
                    }`}
                  >
                    {selectedImage ? "Change Photo" : "Start Generator"}
                  </button>

                  <a
                    href="#examples"
                    className="w-full rounded-full border border-[#baa692] px-5 py-4 text-center text-[20px] font-bold text-[#5b4334] transition hover:bg-[#faf3eb]"
                  >
                    View Real Examples
                  </a>
                </div>

                <div className="mt-5 rounded-[22px] border border-[#e8d8c7] bg-[#fffaf4] px-4 py-4 text-left shadow-[0_8px_18px_rgba(84,58,39,0.04)]">
                  <div className="mb-3 text-[18px] font-extrabold text-[#4A3428]">
                    Photo rights confirmation
                  </div>

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={uploadRightsConfirmed}
                      onChange={(e) => setUploadRightsConfirmed(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[#C86C43]"
                    />
                    <span className="text-[15px] leading-relaxed text-[#5b4334]">
                      I confirm that I own this photo or have permission to use it. Do not upload
                      celebrity, public figure, fictional character, or internet-downloaded images.
                    </span>
                  </label>

                  <p className="mt-3 text-[15px] leading-7 text-[#8a6a55]">
                    Orders that violate these rules may be refused or cancelled.
                  </p>
                </div>

                <div className="mt-5 text-center text-[17px] font-medium leading-8 text-[#7B6658]">
                  {selectedImage
                    ? `Selected photo: ${selectedImage.name}`
                    : "No design skills needed. Upload once and get ready-to-download files."}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center xl:items-start">
              <div className="w-full max-w-[1100px] rounded-[36px] border border-[#e1d3c5] bg-[linear-gradient(180deg,#fffaf3_0%,#f8efe5_100%)] p-6 shadow-[0_16px_28px_rgba(84,58,39,0.06)]">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-2">
                  <span className="rounded-full bg-white px-5 py-2 text-[14px] font-extrabold uppercase tracking-[0.12em] text-[#8A5A3D] shadow-sm">
                    Live preview mockup
                  </span>
                  <span className="text-[16px] font-semibold text-[#7B6658]">
                    1 upload • 3 product styles
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="relative flex min-h-[520px] flex-col items-center gap-4 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    {previewUrl && (
                      <div className="absolute left-6 top-6 z-10 rounded bg-black/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        Preview Mockup
                      </div>
                    )}

                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">
                      {pricingText.coloringTitle}
                    </div>

                    <div className="flex h-[432px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Coloring Preview"
                          className="h-full w-full scale-[1.2] object-contain grayscale contrast-125 mix-blend-multiply opacity-90"
                        />
                      ) : (
                        <img
                          src="/images/coloringpage.png"
                          alt="Coloring Default"
                          className="h-full w-full scale-[1.2] object-contain"
                        />
                      )}
                    </div>

                    {previewUrl && (
                      <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">
                        Final high-res line art generated after payment
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-h-[520px] flex-col items-center gap-4 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    {previewUrl && (
                      <div className="absolute left-6 top-6 z-10 rounded bg-black/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        Preview Mockup
                      </div>
                    )}

                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">
                      {pricingText.keepsakeTitle}
                    </div>

                    <div className="flex h-[432px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Certificate Preview"
                          className="h-full w-full scale-[1.2] object-contain"
                        />
                      ) : (
                        <img
                          src="/images/keepsake-certificate.png"
                          alt="Certificate Default"
                          className="h-full w-full scale-[1.2] object-contain"
                        />
                      )}
                    </div>

                    {previewUrl && (
                      <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">
                        Custom birthday/memorial layout ready after payment
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-h-[520px] flex-col items-center gap-4 rounded-[28px] border border-[#ead9c8] bg-white p-5 shadow-sm">
                    {previewUrl && (
                      <div className="absolute left-6 top-6 z-10 rounded bg-black/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        Preview Mockup
                      </div>
                    )}

                    <div className="mt-1 text-center text-[18px] font-black text-[#5b4334]">
                      {pricingText.avatarTitle}
                    </div>

                    <div className="flex h-[432px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-transparent p-0">
                      {previewUrl ? (
                        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-3 p-0">
                          {[1, 2, 3, 4].map((i) => (
                            <img
                              key={i}
                              src={previewUrl}
                              alt={`Avatar Preview ${i}`}
                              className="h-full w-full scale-[1.2] rounded-[15px] object-contain"
                            />
                          ))}
                        </div>
                      ) : (
                        <img
                          src="/images/avatarpack.png"
                          alt="Avatar Pack Default"
                          className="h-full w-full scale-[1.2] object-contain"
                        />
                      )}
                    </div>

                    {previewUrl && (
                      <div className="px-2 text-center text-[12px] font-bold leading-tight text-[#8A5A3D]">
                        12 unique AI variation styles generated after payment
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-3">
                <HeroSubPill>Birthday</HeroSubPill>
                <HeroSubPill>In Loving Memory</HeroSubPill>
                <HeroSubPill>Printable</HeroSubPill>
                <HeroSubPill>Shareable</HeroSubPill>
                <HeroSubPill>
                  {avatarVariationText.line1} {avatarVariationText.line2}
                </HeroSubPill>
              </div>

              <div
                id="pricing"
                className="mt-8 grid w-full max-w-[1100px] gap-5 sm:grid-cols-2 xl:grid-cols-4"
              >
                <button className="relative flex min-h-[280px] scale-[1.02] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-[#cfb39b] bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-5 py-7 text-center text-white shadow-[0_20px_30px_rgba(151,90,59,0.26)] transition hover:brightness-95">
                  <div className="absolute left-4 top-4 rounded-full bg-white/18 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em]">
                    {pricingText.bundleBadge}
                  </div>
                  <div className="mt-6 text-[20px] font-black uppercase tracking-[0.04em]">
                    {pricingText.bundleTitle}
                  </div>
                  <PriceCurrencyBadge bundle>USD</PriceCurrencyBadge>
                  <div className="mt-3 text-[50px] font-black">$19.99</div>
                  <div className="mt-1 text-[18px] font-bold opacity-95">{pricingText.bundleSub}</div>
                  <div className="mt-4 rounded-full bg-white/15 px-4 py-1.5 text-[14px] font-bold">
                    {pricingText.bundleSave} vs buying separately
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

              <div className="mt-6 flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-3">
                <TrustPill>Secure checkout</TrustPill>
                <TrustPill>Digital files only</TrustPill>
                <TrustPill>No shipping needed</TrustPill>
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
      className={`mt-4 rounded-full px-5 py-2 text-[15px] font-extrabold uppercase tracking-[0.14em] shadow-sm ${
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
    <button className="flex min-h-[280px] flex-col items-center justify-center rounded-[32px] border border-[#c8b9ab] bg-white px-5 py-6 text-center shadow-[0_10px_22px_rgba(84,58,39,0.08)] transition hover:bg-[#faf3eb]">
      <div className="text-[19px] leading-tight font-black text-[#4B3427]">{title}</div>
      {extra}
      <PriceCurrencyBadge>USD</PriceCurrencyBadge>
      <div className="mt-3 text-[44px] font-black text-[#2E1D16]">{price}</div>
      <div className="mt-1 text-[17px] font-medium text-stone-600">{subtitle}</div>
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

function HowItWorksSection() {
  return (
    <section className="border-t border-[#eadfd2] bg-[#fbf8f2] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto max-w-[1380px]">
        <h2 className="text-center font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">
          How It Works
        </h2>
        <p className="mx-auto mt-4 max-w-[980px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
          One clear pet photo becomes a printable keepsake bundle in a few simple steps.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <HowCard
            number="1"
            icon={<Upload className="h-10 w-10" strokeWidth={2.4} />}
            title="Upload your photo"
            text="Start with one clear photo of your pet with a visible face."
          />
          <HowCard
            number="2"
            icon={<PawPrint className="h-10 w-10" strokeWidth={2.4} />}
            title="Create your bundle"
            text="Get a coloring page, a keepsake certificate, and a 12-avatar pack."
          />
          <HowCard
            number="3"
            icon={<Sparkles className="h-10 w-10" strokeWidth={2.4} />}
            title="Download and keep"
            text="Print, save, share, or gift your personalized digital files."
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
        <span className="text-[82px] leading-none font-black text-[#A6825D]">{number}</span>
        <span className="mb-2 text-[#A6825D]">{icon}</span>
      </div>
      <div className="mt-5 text-[25px] font-black text-[#35241A]">{title}</div>
      <p className="mx-auto mt-3 max-w-[330px] text-[18px] leading-8 text-stone-600">{text}</p>
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
            Real Product Style Preview
          </h2>
          <p className="mx-auto mt-4 max-w-[1040px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
            <span className="block">
              See how one uploaded pet photo can become a printable coloring page,
            </span>
            <span className="block">
              a personalized keepsake certificate, and a fun 12-avatar pack.
            </span>
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[1450px] rounded-[36px] border border-[#e8ddd1] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,251,246,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(84,58,39,0.08)] md:p-8 xl:p-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ExampleFlowCard
              img="/images/avatar_example.jpg"
              title="Original Photo"
              badge="Original"
              description="The pet photo you upload"
              badgeTone="gold"
            />
            <ExampleFlowCard
              img="/images/coloring_result.jpg"
              title="Coloring Page"
              badge="AI Preview"
              description="Printable black-and-white line art"
              badgeTone="gold"
            />
            <ExampleFlowCard
              img="/images/keepsake-certificate.png"
              title="Keepsake Certificate"
              badge="AI Preview"
              description="Birthday or memorial-ready keepsake"
              badgeTone="gold"
            />
            <ExampleFlowCard
              img="/images/avatar_pack_preview.png"
              title="Avatar Pack"
              badge="AI Preview"
              description="12 unique shareable avatar styles"
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
          className={`h-[360px] w-full bg-white object-contain ${contain ? "p-4" : "p-3"}`}
        />
      </div>
      <div className="pt-5 text-center">
        <div className="font-serif text-[28px] font-black text-[#2F1C13]">{title}</div>
        <div className="mt-2 text-[18px] leading-8 text-stone-600">{description}</div>
      </div>
    </div>
  );
}

function PhotoGuideSection() {
  return (
    <section id="guide" className="border-t border-[#eadfd2] bg-[#fffaf4] px-6 py-16 md:px-10 xl:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <h2 className="font-serif text-[42px] font-black tracking-[-0.04em] text-[#24150F] md:text-[56px]">
            How to Choose the Best Photo
          </h2>
          <p className="mx-auto mt-4 max-w-[980px] text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
            A clear, bright photo gives the best keepsake results.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <GuidePanel
            good
            title="✓ Good"
            bullets={[
              "Realistic lighting on the pet face",
              "Face clearly visible and centered",
              "Pet fills enough of the frame",
            ]}
            images={[
              "/images/good_1_bird_girl.png",
              "/images/good_2_rabbit.png",
              "/images/good_3_hedgehog_girl.png",
            ]}
          />
          <GuidePanel
            title="✕ Avoid"
            bullets={[
              "Blurry or out of focus photo",
              "Too dark or heavy shadows",
              "Face cropped or turned away",
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
          Ready to turn your pet photo into something worth keeping?
        </h2>
        <p className="mx-auto mt-4 max-w-[1280px] text-center text-[20px] leading-[1.65] text-stone-600 md:text-[22px]">
          Upload once and get a personalized coloring page, keepsake certificate, and avatar pack
          made from your own photo.
        </p>
        <div className="mt-8">
          <a
            href="#upload"
            className="inline-flex rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-10 py-4 text-[20px] font-extrabold text-white shadow-[0_14px_24px_rgba(157,97,65,0.24)] transition hover:brightness-95"
          >
            Upload Your Photo
          </a>
        </div>
        <div className="mt-4 text-[18px] font-medium leading-8 text-[#7B6658]">
          Digital delivery • No shipping • Great for gifts and memory
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

  return (
    <footer className="border-t border-black/5 bg-[#efe5d8]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {["facebook", "instagram", "tiktok", "pinterest", "link"].map((p) => (
            <button
              key={p}
              onClick={p === "link" ? copyLink : undefined}
              className="relative transition hover:opacity-75"
            >
              <img src={`/social/${p}.png`} alt={p} className="h-10 w-10 object-contain" />
              {p === "link" && linkCopied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-bold text-[#b38a3d] shadow">
                  COPIED
                </span>
              )}
            </button>
          ))}
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

        <div className="mt-5 text-[17px] font-medium text-[#1f1a16]">
          © {BRAND.year} {BRAND.name}
        </div>

        <div className="mt-5 flex items-center gap-2">
          {["visa", "mastercard", "amex", "applepay", "googlepay"].map((p) => (
            <img key={p} src={`/payments/${p}.png`} alt={p} className="h-7 w-auto object-contain" />
          ))}
        </div>

        <div className="mt-8 text-center text-[17px] font-medium leading-8 text-[rgba(0,0,0,0.62)]">
          <span>{t.footerDisclaimer}</span>
          <span className="mx-2 hidden md:inline">|</span>
          <span className="block md:inline">{t.footerDisclaimer2}</span>
          <span className="mx-2 hidden md:inline">|</span>
          <span className="block md:inline">{t.footerDisclaimer3}</span>
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
  close,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  supportSubject: string;
  setSupportSubject: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  msgCopied: boolean;
  setMsgCopied: React.Dispatch<React.SetStateAction<boolean>>;
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

        <h3 className="pr-10 font-serif text-[28px] font-black text-[#24140D]">Support Request</h3>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none"
          />

          <select
            value={supportSubject}
            onChange={(e) => setSupportSubject(e.target.value)}
            className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none"
          >
            <option value="" disabled>
              Select an inquiry type...
            </option>
            <option value="Order Support">Order Support</option>
            <option value="General Question">General Question</option>
          </select>

          <textarea
            rows={4}
            placeholder="How can we help?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-[#d8cdbf] bg-white px-4 py-3 outline-none"
          />

          <button
            className="w-full rounded-[12px] bg-[#3D2B1F] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-[#2A1D15]"
            onClick={() =>
              (window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
                supportSubject
              )}&body=${encodeURIComponent(message)}`)
            }
          >
            Open Email App
          </button>
        </div>
      </div>
    </div>
  );
}