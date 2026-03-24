import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Image as ImageIcon,
  CreditCard,
  Server,
  Mail,
  Trash2,
  Cpu,
  Cookie,
  Baby,
  Globe,
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
    title: "1. Overview",
    body: "This Privacy Policy explains how Pet Keeps Art collects, uses, stores, and protects your personal information when you visit our website, upload photos, place an order, or contact us.",
  },
  {
    icon: Cookie,
    title: "2. Information We Collect",
    body: "We may collect information you provide directly, including your name, email address, uploaded photos, order details, and any message you send to us. We may also collect limited technical information such as browser type, device type, IP address, and basic usage data needed to operate, secure, and improve the website. Where applicable, we may use cookies or similar technologies for essential site functions, performance measurement, and analytics.",
  },
  {
    icon: CreditCard,
    title: "3. Payments",
    body: "Payments are processed through third-party payment providers. We do not store your full credit card number on our servers. Please review the privacy policy of your payment provider for details on how payment information is handled.",
  },
  {
    icon: Cpu,
    title: "4. AI Processing and Third-Party Tools",
    body: "To create and deliver our digital products, your uploaded photos and related order data may be processed through third-party AI tools, cloud services, storage providers, and related technical infrastructure. By using our service and uploading a photo, you understand and consent to this processing for order generation, fulfillment, and support.",
  },
  {
    icon: Server,
    title: "5. How We Use Your Information",
    body: "We use your information to provide our services, process orders, generate digital products, deliver files, respond to support requests, improve the website, monitor performance, prevent misuse or fraud, and comply with legal obligations.",
  },
  {
    icon: Globe,
    title: "6. Data Sharing and International Transfers",
    body: "We do not sell your personal information. We may share limited data with trusted service providers that help us operate the website, process payments, store files, generate products, deliver digital goods, provide email services, or maintain technical infrastructure. Because these providers may operate globally, your information may be processed or stored in countries outside your place of residence.",
  },
  {
    icon: ImageIcon,
    title: "7. Uploaded Photos and Generated Files",
    body: "Uploaded photos and generated files are used to create, deliver, and support your order. You should only upload photos that you have the legal right to use. We do not use your uploaded photos for unrelated public marketing without your permission.",
  },
  {
    icon: Trash2,
    title: "8. Data Retention",
    body: "We keep personal data and uploaded content only for as long as reasonably necessary to operate the service, complete your order, provide support, resolve technical issues, maintain appropriate records, and meet legal or business obligations. Files and uploaded content may be periodically deleted from active systems after the applicable retention period.",
  },
  {
    icon: Baby,
    title: "9. Children's Privacy",
    body: "Our website and services are not directed to children. We do not knowingly collect personal information from children under the age required by applicable law. If you believe a child has provided personal information to us, please contact us so that we can review and take appropriate action.",
  },
  {
    icon: ShieldCheck,
    title: "10. Security",
    body: "We take reasonable technical and organizational steps to protect your information. However, no website, storage system, or internet transmission can be guaranteed to be completely secure, and you use the service at your own risk.",
  },
  {
    icon: Mail,
    title: "11. Your Privacy Rights",
    body: `Depending on your location and applicable law, you may have rights to request access to, correction of, deletion of, or restriction of certain personal information. If you would like to make a privacy-related request or have questions about this Privacy Policy, please contact us at ${BRAND.email}.`,
  },
];

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>

              <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#7b6658] md:text-[17px]">
                Please read this Privacy Policy carefully to understand how we collect, use, store, and protect your information.
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
                If translated versions of this Privacy Policy conflict, the English version prevails to the maximum extent permitted by applicable law.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  Questions about privacy?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  If you have any questions about this Privacy Policy or your personal
                  information, our team is here to help. Contact us at{" "}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}