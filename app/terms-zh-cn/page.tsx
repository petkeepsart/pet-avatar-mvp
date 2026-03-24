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
  site: "/zh-cn",
  updatedAt: "2026年3月11日",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. 服务使用",
    body: "当你使用本网站，即表示你同意本服务条款，并确认你已达到你所在地区的法定成年年龄；如未达到法定成年年龄，则表示你是在父母或合法监护人同意下使用本服务。",
  },
  {
    icon: Download,
    title: "2. 仅提供数字产品",
    body: "本网站出售的所有产品均为数字下载产品，不会寄送任何实体商品。购买后，你有责任自行下载并妥善保存你的文件。",
  },
  {
    icon: ImageIcon,
    title: "3. 照片上传与权利",
    body: "你确认你对所提交的任何照片拥有合法上传及使用权。你不得上传任何侵犯他人版权、商标、隐私权、公开权、肖像权、形象权或其他专有权利的内容。",
  },
  {
    icon: UserX,
    title: "4. 不可上传名人或受版权保护角色",
    body: "除非你已拥有所有必要权利，否则不得上传名人、公众人物，或受版权保护的角色（例如电影、卡通或电子游戏角色）照片。我们保留取消涉及此类内容订单的权利。",
  },
  {
    icon: ImageIcon,
    title: "5. AI 生成结果",
    body: "我们的产品使用 AI 辅助工具制作。你明白生成结果属于艺术诠释，风格上可能会有所不同，也未必会与原始主体达到 100% 完全相似，或具备完全解剖学上的准确性。",
  },
  {
    icon: ShieldCheck,
    title: "6. 个人使用授权",
    body: "你的购买仅授予你个人、非商业用途的使用权，可用于个人展示、赠送及打印。未经事先书面许可，严禁将文件用于商业转售、重新分发、再授权或其他商业用途。",
  },
  {
    icon: RefreshCw,
    title: "7. 退款",
    body: "由于我们的产品属于数字产品并以电子方式交付，退款将按照我们的退款政策处理。如适用法律有所规定，任何取消或退款权利将受该退款政策及适用消费者法律约束。",
  },
  {
    icon: Scale,
    title: "8. 责任限制",
    body: "在适用法律允许的最大范围内，Pet Keeps Art 不对任何间接、附带或后果性损失承担责任。对于任何索赔，我们的总责任不会超过你就该特定订单实际支付的金额。",
  },
  {
    icon: Scale,
    title: "9. 强制性消费者权利",
    body: "本条款中的任何内容，均不会排除、限制或取代任何依据适用法律不得合法排除的消费者权利或补救措施。",
  },
  {
    icon: ShieldCheck,
    title: "10. 拒绝或取消订单",
    body: "如任何订单违反本条款、侵犯第三方权利、包含禁止内容，或我们的系统无法合理处理，我们保留拒绝、暂停、移除或取消该订单的权利。",
  },
  {
    icon: ShieldCheck,
    title: "11. 服务可用性",
    body: "我们可在任何时间更新、修改或停止本服务的任何部分，而无需另行通知。对于超出我们合理控制范围的暂时中断、延误或技术问题，我们不承担责任。",
  },
  {
    icon: Mail,
    title: "12. 联系我们",
    body: `如你对本条款有任何疑问，请通过 ${BRAND.email} 与我们联系。`,
  },
];

export default function TermsZhCnPage() {
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
                服务条款
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                请在使用本网站或购买 Pet Keeps Art 任何数字产品前，仔细阅读本服务条款。
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
                如本条款的翻译版本与英文版本有任何冲突，在适用法律允许的最大范围内，以英文版本为准。
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  需要进一步说明？
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  如果你对本条款或你的具体订单有任何疑问，我们乐意协助。
                  请联系{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  。
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
                    href="/refund-policy-zh-cn"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    查看退款政策
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