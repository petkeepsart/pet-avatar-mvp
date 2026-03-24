import Link from "next/link";
import {
  ArrowLeft,
  Receipt,
  Download,
  ShieldCheck,
  AlertCircle,
  Mail,
  RefreshCw,
  Scale,
  PencilRuler,
  AlertTriangle,
} from "lucide-react";

const BRAND = {
  name: "Pet Keeps Art",
  email: "info@petkeepsart.com",
  site: "/",
  updatedAt: "March 11, 2026",
};

const SECTIONS = [
  {
    icon: Receipt,
    title: "1. Overview",
    body: "At Pet Keeps Art, we sell personalized digital products only. Because your order is delivered electronically and may be created through automated image-processing workflows after purchase, refunds, returns, exchanges, and cancellations are generally limited once processing or delivery has begun.",
  },
  {
    icon: Download,
    title: "2. Digital Products and Final Sale Policy",
    body: "By purchasing from our website, you acknowledge that you are buying a digital product and not a physical item. Due to the nature of digital downloads, we do not normally offer refunds, returns, exchanges, or cancellations after an order has been placed and processing or delivery has begun, except where required by applicable law or where stated in this Refund Policy.",
  },
  {
    icon: ShieldCheck,
    title: "3. If You Did Not Receive Your Files",
    body: "If you do not receive your download link, your files cannot be accessed, or there is a technical delivery issue on our side, please contact us. We will first work to re-send the files, restore access, or otherwise complete delivery before considering any further resolution.",
  },
  {
    icon: AlertCircle,
    title: "4. Damaged, Incorrect, or Duplicate Orders",
    body: "If you were charged more than once for the same order, received the wrong file, or your delivered files are clearly incomplete, inaccessible, or unusable due to a technical issue caused by us, please contact us within a reasonable time after delivery. If we cannot fix the problem, we may offer a replacement, store credit, price adjustment, or refund at our discretion or where required by applicable law.",
  },
  {
    icon: AlertCircle,
    title: "5. Customer Photo Issues",
    body: "We are not required to provide refunds for issues caused by customer-submitted photos, including blurry images, low-quality uploads, cropped faces, poor lighting, blocked features, or photos that do not meet our photo guidelines. Please review our example and photo guidance pages before ordering.",
  },
  {
    icon: PencilRuler,
    title: "6. No Manual Revisions",
    body: "Unless we expressly state otherwise, our service is automated and we do not provide free manual retouching, custom design edits, subjective style changes, or unlimited reworks based on personal preference. Minor artistic differences, layout variations, or AI-generated interpretation do not by themselves qualify for a refund, replacement, or manual revision.",
  },
  {
    icon: RefreshCw,
    title: "7. Personalized and AI-Assisted Results",
    body: "Our products are personalized and may involve AI-assisted generation or editing. Minor differences in artistic interpretation, composition, line detail, pose, expression, or style are a normal part of the service and do not by themselves qualify for a refund.",
  },
  {
    icon: AlertTriangle,
    title: "8. Contact Us Before Chargebacks",
    body: "If you believe there has been a billing problem, delivery failure, duplicate charge, or technical issue with your order, please contact us before initiating a bank or card chargeback where possible. In many cases, we can resolve the issue faster by restoring access, re-sending files, or reviewing the order directly.",
  },
  {
    icon: Scale,
    title: "9. EU Consumers — Right of Withdrawal",
    body: "If you are an EU consumer, you have the right to withdraw from this contract within 14 days without giving any reason. However, by placing your order and confirming payment, you expressly consent to the immediate commencement of delivery of digital content and acknowledge that you thereby lose your right of withdrawal once delivery of your digital files has begun, in accordance with Article 16(m) of EU Directive 2011/83/EU. Because our digital files are generated and made available for download immediately after your order is processed, the right of withdrawal is waived from the moment delivery begins. If you have questions about your rights before purchasing, please contact us at info@petkeepsart.com.",
  },
  {
    icon: Scale,
    title: "10. Legal Rights",
    body: "Nothing in this Refund Policy limits or excludes any mandatory rights you may have under applicable consumer protection laws. Where local law requires a refund, cancellation right, repair, replacement, price reduction, or other remedy, we will honor those rights.",
  },
  {
    icon: Mail,
    title: "11. Contact Us",
    body: `If you believe there has been a billing issue, delivery problem, duplicate charge, or technical error with your order, please contact us at ${BRAND.email} and include your order details so we can review the issue.`,
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe6_0%,#fbf7f1_100%)] text-[#3b281d]">
      <div className="mx-auto max-w-[1480px] px-4 py-6 md:px-6 md:py-10">
        <div className="overflow-hidden rounded-[28px] border border-[#ded1c3] bg-[#fbf7f1] shadow-[0_24px_60px_rgba(77,52,35,0.10)]">
          <div className="border-b border-[#eadfd3] bg-white/70 px-5 py-4 backdrop-blur md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href={BRAND.site}
                className="inline-flex items-center gap-2 rounded-full border border-[#d7c8b9] bg-white px-4 py-2 text-sm font-bold text-[#5a4335] shadow-sm transition hover:bg-[#faf3eb]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>

              <div className="text-sm font-semibold text-[#8a6c58]">
                {BRAND.name}
              </div>
            </div>
          </div>

          <div className="px-5 py-8 md:px-10 md:py-12">
            <div className="mx-auto max-w-[1080px]">
              <div className="inline-flex rounded-full border border-[#e4d4c4] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b6c59] shadow-sm">
                Legal
              </div>

              <h1 className="mt-4 font-serif text-[38px] font-black leading-[1.1] tracking-[-0.04em] text-[#24150f] md:text-[56px]">
                Refund Policy
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px] lg:whitespace-nowrap">
                Please review this Refund Policy carefully before purchasing any digital product from {BRAND.name}.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                Last updated: {BRAND.updatedAt}
              </div>

              <div className="mt-10 grid gap-4">
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  return (
                    <section
                      key={section.title}
                      className="rounded-[24px] border border-[#eadfd3] bg-white px-5 py-6 shadow-[0_10px_24px_rgba(84,58,39,0.05)] transition-all hover:shadow-[0_10px_30px_rgba(84,58,39,0.08)] md:px-8 md:py-7"
                    >
                      <div className="flex items-start gap-5">
                        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#f4e5d7_0%,#efddce_100%)] text-[#8b6a53]">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <h2 className="text-[20px] font-black tracking-[-0.02em] text-[#2f1c13] md:text-[22px]">
                            {section.title}
                          </h2>
                          <p className="mt-2 text-[15px] leading-7 text-[#5f4b3f] md:text-[16px] md:leading-8">
                            {section.body}
                          </p>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>

              <p className="mt-8 text-[14px] leading-7 text-[#7b6658] md:text-[15px]">
                If translated versions of this Refund Policy conflict, the English version prevails to the maximum extent permitted by applicable law.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  Need help with an order?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  If you have a billing issue, delivery problem, duplicate charge, or technical question,
                  contact us at{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  .
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={BRAND.site}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_20px_rgba(157,97,65,0.22)] transition hover:brightness-105 active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Return to Home
                  </Link>

                  <Link
                    href="/terms"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    View Terms of Service
                  </Link>

                  <Link
                    href="/privacy"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    View Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}