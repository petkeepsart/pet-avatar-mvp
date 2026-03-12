/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Upload, X } from "lucide-react";

const BRAND = {
  name: "Pet Keepsake Studio",
  year: 2026,
  email: "support@petkeepsake.com",
};

const TABS = ["Portrait Posters", "Sticker Packs", "Outline Posters", "Avatars"] as const;
type TabType = (typeof TABS)[number];

export default function PetKeepsakeLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("Portrait Posters");

  const [name, setName] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [message, setMessage] = useState("");
  const [hasClickedSend, setHasClickedSend] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1800);
  };

  const t = {
    footerDisclaimer: "Digital files only. No physical products are shipped.",
    footerDisclaimer2: "Currently available for residents of Canada.",
    footerDisclaimer3: "Prices in USD.",
  };

  return (
    <main className="min-h-screen bg-[#d9d6d2] text-[#422B1E] selection:bg-orange-100">
      <div className="mx-auto max-w-[1520px] px-2 py-2 md:px-4 md:py-4">
        <div className="overflow-hidden rounded-[24px] border border-[#d8cdbf] bg-[#f6f1ea] shadow-[0_20px_50px_rgba(72,51,36,0.14)]">
          <Header />
          <HeroSection />
          <PricingSection />
          <ReviewsSection />
          <ExamplesSection activeTab={activeTab} setActiveTab={setActiveTab} />
          <GuideSection />
          <BottomCta />
          <Footer
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
          hasClickedSend={hasClickedSend}
          setHasClickedSend={setHasClickedSend}
          msgCopied={msgCopied}
          setMsgCopied={setMsgCopied}
          close={() => setIsContactOpen(false)}
        />
      )}
    </main>
  );
}

function Header() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e3d8cb] bg-white/70 px-5 py-4 backdrop-blur-md md:px-8 xl:px-10">
      <div className="flex items-center gap-3">
        <div className="text-[22px]">🐾</div>
        <span className="text-[18px] font-extrabold tracking-tight text-[#3A2418] md:text-[19px]">
          Pet Keepsake Studio
        </span>
      </div>

      <div className="hidden items-center gap-8 text-[15px] font-bold text-stone-600 lg:flex">
        <a href="#upload" className="hover:text-[#422B1E]">
          Upload
        </a>
        <a href="#pricing" className="hover:text-[#422B1E]">
          Pricing
        </a>
        <a href="#faq" className="hover:text-[#422B1E]">
          FAQ
        </a>
        <a href="#examples" className="hover:text-[#422B1E]">
          Examples
        </a>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <LangButton>EN</LangButton>
        <LangButton>繁中</LangButton>
        <LangButton className="hidden sm:inline-flex">ES</LangButton>
        <LangButton className="hidden sm:inline-flex">DE</LangButton>
        <LangButton className="hidden md:inline-flex">🇭🇰</LangButton>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="upload" className="mx-auto max-w-[1480px] px-6 pb-8 pt-10 md:px-10 md:pt-12 xl:px-12">
      <div className="grid items-center gap-8 lg:grid-cols-[0.84fr_1.16fr] xl:gap-10">
        <div className="max-w-[520px]">
          <h1 className="font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-[#2A180F] sm:text-[48px] md:text-[54px] xl:text-[60px]">
            Turn Your Pet Photo
            <br />
            Into a Keepsake Bundle
          </h1>

          <p className="mt-7 max-w-[430px] text-[18px] font-medium leading-[1.45] text-stone-600 md:text-[20px]">
            One photo upload, three custom keepsakes ready to cherish.
          </p>

          <button className="mt-8 inline-flex items-center gap-3 rounded-[16px] bg-[#422B1E] px-10 py-4 text-[18px] font-extrabold text-white shadow-[0_14px_24px_rgba(66,43,30,0.18)] transition hover:scale-[1.02]">
            <Upload size={22} />
            Upload Your Photo
          </button>

          <p className="mt-4 text-[13px] font-semibold text-stone-500">
            Supports .JPG, .PNG (5MB)
          </p>
        </div>

        <div className="relative min-h-[440px] lg:min-h-[520px]">
          <span className="absolute left-[12%] top-[16%] hidden text-[#dfc7a5] lg:block">✦</span>
          <span className="absolute right-[7%] top-[26%] hidden text-[#dfc7a5] lg:block">✦</span>

          <div className="absolute left-[4%] top-[56%] z-0 rotate-[-14deg] rounded-[14px] border border-[#eadfce] bg-white p-2 shadow-[0_10px_22px_rgba(60,40,20,0.10)]">
            <img
              src="/images/avatar_example_2.jpg"
              alt="sticker strip"
              className="h-auto w-[60px] rounded-[8px] object-cover md:w-[70px]"
            />
          </div>

          <div className="absolute left-[10%] top-[44%] z-10 rotate-[-10deg] rounded-[14px] border border-[#eadfce] bg-white p-2 shadow-[0_12px_26px_rgba(60,40,20,0.14)]">
            <img
              src="/images/avatar_example.jpg"
              alt="small pet preview"
              className="h-auto w-[76px] rounded-[8px] object-cover md:w-[88px]"
            />
          </div>

          <div className="absolute left-[23%] top-[8%] z-20 rotate-[2deg] rounded-[18px] border border-[#eadfce] bg-white p-3 shadow-[0_22px_36px_rgba(60,40,20,0.15)]">
            <img
              src="/images/portrait_example.jpg"
              alt="portrait hero"
              className="h-auto w-[260px] rounded-[14px] object-cover md:w-[320px] lg:w-[360px]"
            />
          </div>

          <div className="absolute right-[6%] top-[22%] z-30 rotate-[-8deg] rounded-[16px] border border-[#eadfce] bg-white p-2.5 shadow-[0_16px_30px_rgba(60,40,20,0.14)]">
            <img
              src="/images/coloring_example.jpg"
              alt="outline poster preview"
              className="h-auto w-[145px] rounded-[12px] object-cover md:w-[180px] lg:w-[205px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-[1480px] px-6 pb-6 md:px-10 xl:px-12">
      <div
        className="rounded-[34px] border border-[#e7ddd2] p-5 shadow-[0_12px_24px_rgba(80,55,35,0.07)] md:p-8"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.55), transparent 18%), radial-gradient(circle at 84% 22%, rgba(255,255,255,0.35), transparent 16%), linear-gradient(180deg, #fbf8f4 0%, #f8f3ed 100%)",
        }}
      >
        <h2 className="mb-8 text-center font-serif text-[28px] font-black tracking-[-0.03em] text-[#322018] md:text-[34px]">
          3-in-1 Keepsake Bundle
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <BundleCard title="Outline Coloring Page" price="$6.99" img="/images/coloring_example.jpg" />
          <BundleCard title="Portrait Poster" price="$12.99" img="/images/portrait_example.jpg" />
          <BundleCard title="Avatar Pack (9+ styles)" price="$9.99" img="/images/avatar_example.jpg" />
          <DealCard />
        </div>
      </div>
    </section>
  );
}

function BundleCard({ title, price, img }: { title: string; price: string; img: string }) {
  return (
    <div className="flex flex-col items-center rounded-[28px] border border-[#ddd1c4] bg-white p-5 text-center shadow-sm">
      <h4 className="min-h-[44px] text-[18px] font-extrabold leading-tight text-[#3A2418]">
        {title}
      </h4>
      <p className="mt-2 text-[22px] font-black text-[#2d1a11]">{price}</p>

      <div className="mt-4 aspect-[0.92/1] w-full overflow-hidden rounded-[18px] border border-stone-100 bg-stone-50">
        <img src={img} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="mt-4 w-full rounded-xl bg-stone-50 py-2 text-[11px] font-black uppercase text-stone-300">
        {price}
      </div>
    </div>
  );
}

function DealCard() {
  return (
    <div
      className="relative rounded-[28px] border border-[#d7c5ae] p-4 shadow-[0_12px_26px_rgba(60,40,20,0.10)]"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45), transparent 22%), radial-gradient(circle at 80% 25%, rgba(255,255,255,0.35), transparent 18%), linear-gradient(180deg, #f3e7d6 0%, #efe1cf 100%)",
      }}
    >
      <div
        className="rounded-[22px] border border-[#e4d5c3] px-5 pb-6 pt-7 text-center"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.35), transparent 18%), radial-gradient(circle at 84% 20%, rgba(255,255,255,0.25), transparent 16%), linear-gradient(180deg, #f7ecdd 0%, #f1e5d5 100%)",
        }}
      >
        <p className="text-[16px] font-extrabold text-[#4f382a] md:text-[18px]">Bundle Deal:</p>

        <div className="mt-1 text-[58px] font-black leading-none tracking-[-0.055em] text-[#321d12] md:text-[68px]">
          $19.99
        </div>

        <p className="mt-2 text-[14px] font-bold text-[#5b4638] md:text-[15px]">
          Total Value: $29.97
        </p>

        <div className="relative my-7 flex justify-center">
          <div className="relative w-[250px] md:w-[285px]">
            <span className="absolute -left-6 top-[26px] h-0 w-0 border-b-[16px] border-l-[22px] border-t-[16px] border-b-transparent border-l-[#2b6f92] border-t-transparent" />
            <span className="absolute -right-6 top-[26px] h-0 w-0 border-b-[16px] border-r-[22px] border-t-[16px] border-b-transparent border-r-[#2b6f92] border-t-transparent" />

            <div className="rotate-[-5deg] rounded-[10px] border border-[#2d78a2] bg-[linear-gradient(180deg,#3f95be_0%,#2e7ca8_100%)] px-6 py-3 shadow-[0_10px_18px_rgba(40,95,130,0.22)]">
              <span className="text-[22px] font-black tracking-[-0.02em] text-white md:text-[24px]">
                Best Deal!
              </span>
            </div>
          </div>
        </div>

        <button className="mx-auto mt-1 flex rounded-full bg-[#9D7345] px-6 py-3 text-[13px] font-bold text-white shadow-md hover:brightness-95 md:text-[14px]">
          Get Keepsake Bundle
        </button>

        <div className="mt-6 text-[18px] font-black text-[#2d1a11] md:text-[22px]">
          Save $9.98
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="mx-auto max-w-[1480px] px-6 py-8 md:px-10 xl:px-12">
      <h3 className="mb-5 text-center text-[20px] font-extrabold tracking-[-0.02em] text-[#3A2418] md:text-[24px]">
        Loved by Pet Parents
      </h3>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <ReviewCard
          name="Sarah & Max"
          text="Cute, polished, and ready to print right away."
          img="/images/review_1.jpg"
        />
        <ReviewCard
          name="David T."
          text="The portrait looked premium and the sticker pack was fun."
          img="/images/review_2.jpg"
        />
        <ReviewCard
          name="Emily (Gifted)"
          text="Perfect gift idea. Instant files made it super easy."
          img="/images/review_3.jpg"
        />
      </div>
    </section>
  );
}

function ReviewCard({ name, text, img }: { name: string; text: string; img: string }) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-stone-200 bg-white shadow-sm">
      <div className="aspect-[1.5/1] overflow-hidden bg-stone-100">
        <img src={img} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="px-5 py-4 text-center">
        <div className="text-[18px] font-extrabold text-[#3A2418]">{name}</div>
        <div className="mt-1 text-[15px] tracking-[0.2em] text-[#D0A146]">★★★★★</div>
        <p className="mt-3 text-[14px] leading-[1.5] text-stone-600">{text}</p>
      </div>
    </div>
  );
}

function ExamplesSection({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}) {
  return (
    <section id="examples" className="border-y border-stone-100 bg-white px-6 py-20 md:px-10 xl:px-12">
      <div className="relative mx-auto max-w-[1480px]">
        <div className="pointer-events-none absolute right-[150px] top-[8px] z-20 hidden rotate-[-8deg] rounded-[10px] bg-white p-2 shadow-[0_16px_28px_rgba(60,40,20,0.16)] md:block">
          <img
            src="/images/avatar_example.jpg"
            alt="Floating dog"
            className="h-auto w-[120px] rounded-[8px] object-cover"
          />
        </div>

        <div className="pointer-events-none absolute right-[10px] top-[-6px] z-30 hidden rotate-[6deg] rounded-[10px] bg-white p-2 shadow-[0_18px_34px_rgba(60,40,20,0.18)] md:block">
          <img
            src="/images/portrait_example.jpg"
            alt="Floating owner and dog"
            className="h-auto w-[170px] rounded-[8px] object-cover"
          />
        </div>

        <div className="mb-10 pr-0 md:pr-[250px]">
          <h2 className="font-serif text-[42px] font-black leading-[1.04] tracking-[-0.04em] text-[#2B180F] md:text-[52px]">
            Examples & Photo Guide
          </h2>
          <p className="mt-3 max-w-[650px] text-[18px] font-medium leading-[1.45] text-stone-600 md:text-[20px]">
            See what&apos;s possible and upload the best photo for your keepsakes.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-6 py-3 text-sm font-extrabold transition-all ${
                  activeTab === tab
                    ? "bg-[#C8A064] text-white shadow-md"
                    : "bg-stone-50 text-stone-500 hover:bg-stone-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          <ExampleBox label="Original" img="/images/avatar_example.jpg" />
          <ExampleBox label="Before" img="/images/review_2.jpg" />
          <ExampleBox label="After" img="/images/portrait_example.jpg" />
          <ExampleBox label="After" img="/images/review_3.jpg" />
          <ExampleBox label="After" img="/images/avatar_example.jpg" />
        </div>
      </div>
    </section>
  );
}

function ExampleBox({ label, img }: { label: string; img: string }) {
  return (
    <div>
      <div className="aspect-[4/5] overflow-hidden rounded-[20px] border-2 border-white bg-stone-100 shadow-sm">
        <img src={img} alt={label} className="h-full w-full object-cover" />
      </div>
      <span className="mt-3 block text-center text-[12px] font-bold text-stone-500">{label}</span>
    </div>
  );
}

function GuideSection() {
  return (
    <section id="guide" className="border-b border-stone-100 bg-white px-6 pb-20 pt-0 md:px-10 xl:px-12">
      <div className="mx-auto max-w-[1200px] border-t border-stone-200 pt-14">
        <h3 className="text-center font-serif text-[26px] font-extrabold tracking-[-0.03em] text-[#2B180F] md:text-[36px]">
          How to Get the Best Photo
        </h3>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
          <QualityItem type="Clear" isGood img="/images/guide_good.jpg" />
          <QualityItem type="Sharp" isGood img="/images/guide_good_2.jpg" />
          <QualityItem type="Bad" img="/images/guide_bad.jpg" />
        </div>
      </div>
    </section>
  );
}

function QualityItem({ type, isGood, img }: { type: string; isGood?: boolean; img: string }) {
  return (
    <div className="space-y-6 text-center">
      <div
        className={`flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest ${
          isGood ? "text-green-600" : "text-red-500"
        }`}
      >
        {isGood ? <Check size={20} /> : <X size={20} />}
        <span>{type}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          className={`aspect-square overflow-hidden rounded-2xl bg-white p-1 shadow-md ${
            !isGood ? "grayscale opacity-50" : ""
          }`}
        >
          <img src={img} alt={type} className="h-full w-full rounded-xl object-cover" />
        </div>
        <div
          className={`aspect-square overflow-hidden rounded-2xl bg-white p-1 shadow-md ${
            !isGood ? "grayscale opacity-50" : ""
          }`}
        >
          <img src={img} alt={type} className="h-full w-full rounded-xl object-cover" />
        </div>
      </div>
    </div>
  );
}

function BottomCta() {
  return (
    <section className="bg-white px-6 py-20 text-center md:px-10 xl:px-12">
      <h3 className="font-serif text-[28px] font-extrabold tracking-[-0.03em] text-[#2B180F] md:text-[42px]">
        Upload Your Photo & Create Yours!
      </h3>

      <button className="mt-6 rounded-[16px] bg-[#422B1E] px-12 py-4 text-[19px] font-extrabold text-white shadow-xl hover:brightness-95">
        Upload Your Photo
      </button>

      <p className="mx-auto mt-5 max-w-[760px] text-[13px] font-medium leading-[1.5] text-stone-500 md:text-[14px]">
        Digital files only. No physical products are shipped. Currently not available for residents of Québec, Canada.
      </p>
    </section>
  );
}

function Footer({
  linkCopied,
  copyLink,
  openContact,
  t,
}: {
  linkCopied: boolean;
  copyLink: () => void;
  openContact: () => void;
  t: { footerDisclaimer: string; footerDisclaimer2: string; footerDisclaimer3: string };
}) {
  return (
    <footer className="border-t border-black/5 bg-[#f3eee8]">
      <div className="mx-auto grid max-w-[1440px] items-end gap-8 px-5 py-8 md:grid-cols-[1fr_2fr_1fr] sm:px-8 lg:px-12">
        <div className="text-center text-[11px] font-bold text-[#141414] md:text-left">
          © {BRAND.year} {BRAND.name}
          <br />
          <span className="text-[rgba(0,0,0,0.5)]">{BRAND.email}</span>
          <br />
          <span className="text-[rgba(0,0,0,0.5)]">For support or business inquiries, contact us.</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-5">
            {["email", "facebook", "instagram", "tiktok", "pinterest", "link"].map((p) => (
              <button key={p} onClick={p === "link" ? copyLink : undefined} className="relative transition hover:opacity-70">
                <img src={`/social/${p}.png`} alt={p} className="h-5 w-auto" />
                {p === "link" && linkCopied && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold text-[#b38a3d]">
                    COPIED
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-bold text-[#141414]">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/refund-policy" className="hover:underline">
              Refunds
            </Link>
            <button onClick={openContact} className="font-bold hover:underline">
              Contact
            </button>
          </div>

          <div className="text-center text-[10px] leading-relaxed text-[rgba(0,0,0,0.5)] md:whitespace-nowrap">
            <span>{t.footerDisclaimer}</span>
            <span className="mx-2 hidden md:inline">|</span>
            <span className="block md:inline">{t.footerDisclaimer2}</span>
            <span className="mx-2 hidden md:inline">|</span>
            <span className="block md:inline">{t.footerDisclaimer3}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <div className="text-[10px] font-bold uppercase tracking-[0.03em] text-[rgba(0,0,0,0.4)]">
            Payments by Stripe
          </div>
          <div className="flex items-center gap-3">
            {["visa", "mastercard", "amex", "applepay", "googlepay"].map((p) => (
              <img key={p} src={`/payments/${p}.png`} alt={p} className="h-5 w-auto" />
            ))}
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
  hasClickedSend,
  setHasClickedSend,
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
  hasClickedSend: boolean;
  setHasClickedSend: (v: boolean) => void;
  msgCopied: boolean;
  setMsgCopied: (v: boolean) => void;
  close: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4" onClick={close}>
      <div
        className="relative w-full max-w-[560px] rounded-[24px] bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-neutral-50"
          onClick={close}
        >
          ✕
        </button>

        <h3 className="pr-10 text-[28px] font-semibold tracking-[-0.03em] text-neutral-900">
          Support Request
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          This opens your email app with a pre-filled message.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">Your Name</label>
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/25"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">
              Subject / Inquiry Type
            </label>
            <select
              value={supportSubject}
              onChange={(e) => setSupportSubject(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/25"
            >
              <option value="" disabled>
                Select an inquiry type...
              </option>
              <option value="Order Support">Order Support</option>
              <option value="File Access">File Access</option>
              <option value="Photo Upload Issue">Photo Upload Issue</option>
              <option value="General Question">General Question</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-800">Message</label>
            <textarea
              rows={4}
              placeholder="How can we help you today?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black/25"
            />
          </div>

          <button
            className="w-full rounded-full bg-[#171717] px-6 py-4 text-base font-semibold text-white transition hover:bg-black"
            onClick={() => {
              setHasClickedSend(true);

              const finalSubject = `[PET KEEPSAKE STUDIO] ${supportSubject || "Inquiry"}`;
              const bodyLines = [
                `Customer Name: ${name || "Not provided"}`,
                `Message: ${message}`,
              ].join("\n");

              window.location.href =
                `mailto:${BRAND.email}` +
                `?subject=${encodeURIComponent(finalSubject)}` +
                `&body=${encodeURIComponent(bodyLines)}`;
            }}
          >
            Open Email App
          </button>

          <button
            onClick={async () => {
              const textToCopy = `Subject: [PET KEEPSAKE] ${supportSubject}\n\nMessage: ${message}`;
              await navigator.clipboard.writeText(textToCopy);
              setMsgCopied(true);
              setTimeout(() => setMsgCopied(false), 1500);
            }}
            className="w-full rounded-xl border border-dashed border-black/20 px-4 py-3 text-[11px] font-extrabold text-neutral-500 hover:bg-neutral-50"
          >
            {msgCopied ? "Copied to Clipboard! ✓" : "Alternative: Copy Message Text"}
          </button>

          {hasClickedSend && (
            <div className="text-center text-[11.5px] font-extrabold text-red-600">
              Email app didn&apos;t open? Please use the copy button below.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LangButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-bold text-stone-700 ${className}`}
    >
      {children}
    </button>
  );
}