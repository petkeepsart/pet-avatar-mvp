import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Download,
  Image as ImageIcon,
  RefreshCw,
  Mail,
  UserX,
  Scale,
} from "lucide-react";

const BRAND = {
  name: "Pet Keeps Art",
  email: "info@petkeepsart.com",
  site: "/",
  updatedAt: "March 11, 2026",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. Use of Service",
    body: "By using this website, you agree to these Terms of Service and confirm that you are at least the age of majority in your jurisdiction, or are using this service with the permission of a parent or legal guardian.",
  },
  {
    icon: Download,
    title: "2. Digital Products Only",
    body: "All products sold on this site are digital downloads only. No physical products are shipped. You are responsible for downloading and saving your files after purchase.",
  },
  {
    icon: ImageIcon,
    title: "3. Photo Uploads and Ownership",
    body: "You confirm that you have the legal right to upload and use any photo submitted. You must not upload content that infringes another person's copyright, trademark, privacy, publicity, image, likeness, or other proprietary rights.",
  },
  {
    icon: UserX,
    title: "4. No Celebrity or Copyrighted Character Uploads",
    body: "You may not upload photos of celebrities, public figures, or copyrighted characters (e.g., movie, cartoon, or video game characters) unless you own all necessary rights. We reserve the right to cancel orders involving such content.",
  },
  {
    icon: ImageIcon,
    title: "5. AI-Generated Results",
    body: "Our products are created using AI-assisted tools. You acknowledge that results are artistic interpretations; they may vary in style and may not provide a 100% exact likeness or anatomical perfection of the original subject.",
  },
  {
    icon: ShieldCheck,
    title: "6. Personal Use License",
    body: "Your purchase grants a personal, non-commercial license for personal display, gifting, and printing. Commercial resale, redistribution, or sublicensing of the files is strictly prohibited without prior written permission.",
  },
  {
    icon: RefreshCw,
    title: "7. Refunds",
    body: "Because our products are digital and delivered electronically, refunds are handled according to our Refund Policy. Where required by applicable law, any cancellation or refund rights will be governed by that policy and applicable consumer law.",
  },
  {
    icon: Scale,
    title: "8. Limitation of Liability",
    body: "To the maximum extent permitted by law, Pet Keeps Art shall not be liable for any indirect or consequential damages. Our total liability for any claim shall not exceed the amount paid for the specific order.",
  },
  {
    icon: Scale,
    title: "9. Mandatory Consumer Rights",
    body: "Nothing in these Terms excludes, limits, or overrides any consumer rights or remedies that cannot be lawfully excluded under applicable law.",
  },
  {
    icon: ShieldCheck,
    title: "10. Order Refusal or Cancellation",
    body: "We reserve the right to refuse, suspend, remove, or cancel any order that violates these Terms, infringes third-party rights, contains prohibited content, or cannot reasonably be processed by our systems.",
  },
  {
    icon: ShieldCheck,
    title: "11. Service Availability",
    body: "We may update, modify, or discontinue any part of the service at any time without notice. We are not liable for temporary interruptions or technical issues beyond our reasonable control.",
  },
  {
    icon: Mail,
    title: "12. Contact",
    body: `For questions about these Terms, please contact us at ${BRAND.email}.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe6_0%,#fbf7f1_100%)] text-[#3b281d]">
      <div className="mx-auto max-w-[1480px] px-4 py-6 md:px-6 md:py-10">
        <div className="overflow-hidden rounded-[28px] border border-[#ded1c3] bg-[#fbf7f1] shadow-[0_24px_60px_rgba(77,52,35,0.10)]">
          {/* Header Navigation */}
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
                Terms of Service
              </h1>

              {/* Updated Introductory Paragraph - Forced single line on large screens */}
              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px] lg:whitespace-nowrap">
                Please read these Terms carefully before using our website or purchasing any digital product from {BRAND.name}.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                Last updated: {BRAND.updatedAt}
              </div>

              {/* Sections Grid */}
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

              {/* Multi-language Conflict Clause */}
              <p className="mt-8 text-[14px] leading-7 text-[#7b6658] md:text-[15px]">
                If translated versions of these Terms conflict, the English version prevails to the maximum extent permitted by applicable law.
              </p>

              {/* Contact Footer Card */}
              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  Need clarification?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  If you have any questions about these Terms or your specific order,
                  our team is here to help. Contact us at{" "}
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
                    href="/refund-policy"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    View Refund Policy
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