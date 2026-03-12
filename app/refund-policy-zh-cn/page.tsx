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
  name: "Pet Keepsake Studio",
  email: "support@petkeepsake.com",
  site: "/zh-cn",
  updatedAt: "2026年3月11日",
};

const SECTIONS = [
  {
    icon: Receipt,
    title: "1. 概述",
    body: "在 Pet Keepsake Studio，我们只销售个性化数字产品。由于你的订单会以电子方式交付，并且可能会在购买后通过自动图像处理流程生成，因此一旦处理或交付开始，退款、退货、换货和取消通常都会受到限制。",
  },
  {
    icon: Download,
    title: "2. 数字产品与最终销售政策",
    body: "当你在我们的网站上购买时，即表示你确认你购买的是数字产品，而非实物商品。鉴于数字下载产品的性质，在订单提交且处理或交付开始后，我们通常不提供退款、退货、换货或取消，除非适用法律另有要求，或本退款政策中另有说明。",
  },
  {
    icon: ShieldCheck,
    title: "3. 如果你没有收到文件",
    body: "如果你没有收到下载链接、无法访问文件，或我们这边出现技术性交付问题，请联系我们。我们会先尝试重新发送文件、恢复访问权限，或以其他方式完成交付，然后才会考虑进一步的解决方案。",
  },
  {
    icon: AlertCircle,
    title: "4. 损坏、错误或重复订单",
    body: "如果同一订单被重复收费、你收到了错误的文件，或由于我们造成的技术问题，导致交付的文件明显不完整、无法访问或无法使用，请在交付后的合理时间内联系我们。如果我们无法修复问题，我们可根据自身判断，或在适用法律要求的情况下，提供替换、商店积分、价格调整或退款。",
  },
  {
    icon: AlertCircle,
    title: "5. 客户照片问题",
    body: "对于因客户提交的照片所导致的问题，我们没有义务提供退款，包括但不限于照片模糊、上传质量低、脸部被裁切、光线不足、特征被遮挡，或照片不符合我们的照片指引。请在下单前查看我们的示例页面和照片指引页面。",
  },
  {
    icon: PencilRuler,
    title: "6. 不提供人工修改",
    body: "除非我们明确另行说明，否则我们的服务是自动化的，我们不提供免费的人工修图、定制设计修改、基于个人偏好的主观风格调整，或无限次重做。轻微的艺术差异、版面变化或 AI 生成解释，本身并不构成退款、替换或人工修改的理由。",
  },
  {
    icon: RefreshCw,
    title: "7. 个性化与 AI 辅助结果",
    body: "我们的产品为个性化产品，并可能涉及 AI 辅助生成或编辑。艺术诠释、构图、线条细节、姿势、表情或风格上的轻微差异，均属于服务的正常组成部分，本身并不构成退款理由。",
  },
  {
    icon: AlertTriangle,
    title: "8. 请先联系我们再发起拒付",
    body: "如果你认为订单存在账单问题、交付失败、重复收费或技术问题，请在可能的情况下，先联系我们，再向银行或信用卡机构发起拒付。在许多情况下，我们可以通过恢复访问权限、重新发送文件或直接审核订单，更快地解决问题。",
  },
  {
    icon: Scale,
    title: "9. 法定权利",
    body: "本退款政策中的任何内容均不会限制或排除你依据适用消费者保护法律所享有的强制性权利。如当地法律要求退款、取消权、维修、更换、降价或其他救济，我们将尊重这些权利。",
  },
  {
    icon: Mail,
    title: "10. 联系我们",
    body: `如果你认为你的订单存在账单问题、交付问题、重复收费或技术错误，请通过 ${BRAND.email} 联系我们，并附上订单详情，以便我们审核相关问题。`,
  },
];

export default function RefundPolicyZhCnPage() {
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
                退款政策
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                在购买 {BRAND.name} 的任何数字产品之前，请仔细阅读本退款政策。
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
                如果本退款政策的翻译版本与英文版本存在冲突，则在适用法律允许的最大范围内，以英文版本为准。
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  需要订单协助吗？
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  如果你有账单问题、交付问题、重复收费或技术问题，请通过{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  联系我们。
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

                  <Link
                    href="/privacy-zh-cn"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    查看隐私政策
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