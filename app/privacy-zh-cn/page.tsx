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
  name: "Pet Keepsake Studio",
  email: "support@petkeepsake.com",
  site: "/zh-cn",
  updatedAt: "2026年3月11日",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. 概述",
    body: "本隐私政策说明，当你访问我们的网站、上传照片、下订单或联系我们时，Pet Keepsake Studio 如何收集、使用、存储和保护你的个人信息。",
  },
  {
    icon: Cookie,
    title: "2. 我们收集的信息",
    body: "我们可能会收集你直接提供给我们的信息，包括你的姓名、电子邮箱地址、上传的照片、订单详情，以及你发送给我们的任何讯息。我们也可能收集有限的技术信息，例如浏览器类型、设备类型、IP 地址，以及为运营、保护和改进网站所需的基本使用数据。在适用情况下，我们可能会使用 Cookie 或类似技术，用于网站基本功能、性能衡量和分析。",
  },
  {
    icon: CreditCard,
    title: "3. 付款",
    body: "付款通过第三方支付服务提供商处理。我们不会在自己的服务器上存储你的完整信用卡号码。有关付款信息如何被处理，请查阅你的支付服务提供商的隐私政策。",
  },
  {
    icon: Cpu,
    title: "4. AI 处理与第三方工具",
    body: "为了创建并交付我们的数字产品，你上传的照片及相关订单数据可能会通过第三方 AI 工具、云服务、存储服务商及相关技术基础设施进行处理。通过使用我们的服务并上传照片，即表示你理解并同意出于订单生成、履行和支持之目的进行此类处理。",
  },
  {
    icon: Server,
    title: "5. 我们如何使用你的信息",
    body: "我们使用你的信息来提供服务、处理订单、生成数字产品、交付文件、回应支持请求、改进网站、监测性能、防止滥用或欺诈，以及履行法律义务。",
  },
  {
    icon: Globe,
    title: "6. 数据共享与国际传输",
    body: "我们不会出售你的个人信息。我们可能会与可信赖的服务提供商共享有限数据，这些服务提供商协助我们运营网站、处理付款、存储文件、生成产品、交付数字商品、提供电子邮件服务或维护技术基础设施。由于这些服务提供商可能在全球范围内运营，你的信息可能会在你居住地以外的国家被处理或存储。",
  },
  {
    icon: ImageIcon,
    title: "7. 上传的照片与生成的文件",
    body: "上传的照片和生成的文件会被用于创建、交付和支持你的订单。你应只上传你有合法使用权的照片。未经你的许可，我们不会将你上传的照片用于与本服务无关的公开营销。",
  },
  {
    icon: Trash2,
    title: "8. 数据保留",
    body: "我们仅在合理必要的期限内保留个人数据和上传内容，以便运营服务、完成订单、提供支持、解决技术问题、保留适当记录，以及履行法律或业务义务。在适用的保留期限届满后，文件和上传内容可能会定期从活动系统中删除。",
  },
  {
    icon: Baby,
    title: "9. 儿童隐私",
    body: "我们的网站和服务并非面向儿童。我们不会在知情情况下收集未达到适用法律要求年龄的儿童的个人信息。如果你认为有儿童向我们提供了个人信息，请联系我们，以便我们审查并采取适当措施。",
  },
  {
    icon: ShieldCheck,
    title: "10. 安全性",
    body: "我们会采取合理的技术和组织措施来保护你的信息。然而，任何网站、存储系统或互联网传输都无法保证绝对安全，你需自行承担使用本服务的相关风险。",
  },
  {
    icon: Mail,
    title: "11. 你的隐私权利",
    body: `根据你的所在地和适用法律，你可能有权请求访问、更正、删除或限制处理某些个人信息。如果你希望提出与隐私相关的请求，或对本隐私政策有任何疑问，请通过 ${BRAND.email} 与我们联系。`,
  },
];

export default function PrivacyZhCnPage() {
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
                返回首页
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
                隐私政策
              </h1>

              <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#7b6658] md:text-[17px]">
                请仔细阅读本隐私政策，以了解我们如何收集、使用、存储和保护你的信息。
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                最后更新：{BRAND.updatedAt}
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
                如果本隐私政策的翻译版本与英文版本存在冲突，则在适用法律允许的最大范围内，以英文版本为准。
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  对隐私有疑问吗？
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  如果你对本隐私政策或你的个人信息有任何疑问，我们的团队乐意提供帮助。请通过{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  与我们联系。
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={BRAND.site}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_20px_rgba(157,97,65,0.22)] transition hover:brightness-105 active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    返回首页
                  </Link>

                  <Link
                    href="/terms-zh-cn"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    查看服务条款
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