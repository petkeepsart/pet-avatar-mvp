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
  name: "Pet Keepsake Studio",
  email: "support@petkeepsake.com",
  site: "/ja",
  updatedAt: "2026年3月11日",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. サービスの利用",
    body: "本ウェブサイトを利用することにより、あなたは本利用規約に同意したものとみなされます。また、あなたが居住地の法定成年年齢に達していること、または親もしくは法定保護者の許可を得て本サービスを利用していることを確認するものとします。",
  },
  {
    icon: Download,
    title: "2. デジタル商品のみ",
    body: "本サイトで販売されるすべての商品はデジタルダウンロード商品です。物理的な商品は発送されません。購入後、ファイルをダウンロードし、適切に保存する責任はあなたにあります。",
  },
  {
    icon: ImageIcon,
    title: "3. 写真のアップロードと権利",
    body: "あなたは、提出するすべての写真について、合法的にアップロードおよび使用する権利を有していることを確認するものとします。他者の著作権、商標権、プライバシー権、パブリシティ権、肖像権、画像に関する権利、またはその他の財産的権利を侵害する内容をアップロードしてはなりません。",
  },
  {
    icon: UserX,
    title: "4. 有名人または著作権で保護されたキャラクターのアップロード禁止",
    body: "必要なすべての権利を保有していない限り、有名人、公人、または著作権で保護されたキャラクター（映画、アニメ、ゲームのキャラクターなど）の写真をアップロードすることはできません。当社は、そのような内容を含む注文をキャンセルする権利を留保します。",
  },
  {
    icon: ImageIcon,
    title: "5. AI生成結果",
    body: "当社の商品はAI支援ツールを用いて作成されます。結果は芸術的な解釈を含むため、スタイルに差異が生じる場合があり、元の対象と100％完全に一致すること、または完全に解剖学的に正確であることを保証するものではありません。",
  },
  {
    icon: ShieldCheck,
    title: "6. 個人使用ライセンス",
    body: "購入により、あなたには個人的かつ非商用目的での使用権のみが付与されます。個人での表示、贈り物、印刷に利用できます。事前の書面による許可なく、ファイルを商業目的で再販売、再配布、再許諾、またはその他の商用利用を行うことは禁止されています。",
  },
  {
    icon: RefreshCw,
    title: "7. 返金",
    body: "当社の商品はデジタル商品であり電子的に提供されるため、返金は当社の返金ポリシーに従って処理されます。適用法令により必要とされる場合、キャンセルまたは返金に関する権利は、その返金ポリシーおよび適用される消費者保護法に従うものとします。",
  },
  {
    icon: Scale,
    title: "8. 責任の制限",
    body: "適用法令で認められる最大限の範囲において、Pet Keepsake Studioは、間接的、付随的、または結果的な損害について責任を負いません。いかなる請求に対しても、当社の責任総額は当該注文についてあなたが実際に支払った金額を超えないものとします。",
  },
  {
    icon: Scale,
    title: "9. 強行法規上の消費者の権利",
    body: "本規約のいかなる内容も、適用法令上、合法的に排除できない消費者の権利または救済を排除、制限、または変更するものではありません。",
  },
  {
    icon: ShieldCheck,
    title: "10. 注文の拒否またはキャンセル",
    body: "注文が本規約に違反する場合、第三者の権利を侵害する場合、禁止された内容を含む場合、または当社のシステムで合理的に処理できない場合、当社は当該注文を拒否、保留、削除、またはキャンセルする権利を留保します。",
  },
  {
    icon: ShieldCheck,
    title: "11. サービス提供状況",
    body: "当社は、事前の通知なく、いつでも本サービスの一部を更新、変更、または中止することがあります。当社の合理的な支配を超える一時的な中断、遅延、または技術的問題について、当社は責任を負いません。",
  },
  {
    icon: Mail,
    title: "12. お問い合わせ",
    body: `本規約に関するご質問は、${BRAND.email} までご連絡ください。`,
  },
];

export default function TermsJaPage() {
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
                ホームに戻る
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
                利用規約
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                本ウェブサイトを利用する前、または Pet Keepsake Studio のデジタル商品を購入する前に、本利用規約をよくお読みください。
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                最終更新日：{BRAND.updatedAt}
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
                本規約の翻訳版と英語版の間に相違または矛盾がある場合、適用法令で認められる最大限の範囲において、英語版が優先されます。
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  ご不明な点がありますか？
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  本規約または特定のご注文についてご不明な点がございましたら、いつでもお気軽にお問い合わせください。
                  {" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  までご連絡ください。
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={BRAND.site}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_20px_rgba(157,97,65,0.22)] transition hover:brightness-105 active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    ホームに戻る
                  </Link>

                  <Link
                    href="/refund-policy-ja"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    返金ポリシーを見る
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