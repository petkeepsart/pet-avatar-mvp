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
  site: "/ja",
  updatedAt: "2026年3月11日",
};

const SECTIONS = [
  {
    icon: Receipt,
    title: "1. 概要",
    body: "Pet Keeps Art では、パーソナライズされたデジタル商品のみを販売しています。ご注文は電子的に配信され、購入後に自動画像処理ワークフローを通じて作成される場合があるため、処理または配信が開始された後の返金、返品、交換、キャンセルは通常制限されます。",
  },
  {
    icon: Download,
    title: "2. デジタル商品と最終販売ポリシー",
    body: "当サイトで購入することにより、お客様は物理的な商品ではなくデジタル商品を購入していることを認めるものとします。デジタルダウンロードという性質上、ご注文が行われ、処理または配信が開始された後は、適用法で義務付けられる場合または本返金ポリシーに定める場合を除き、通常、返金、返品、交換、キャンセルは行っておりません。",
  },
  {
    icon: ShieldCheck,
    title: "3. ファイルを受け取れなかった場合",
    body: "ダウンロードリンクを受け取れない場合、ファイルにアクセスできない場合、または当社側に技術的な配信上の問題がある場合は、当社までご連絡ください。当社は、他の解決策を検討する前に、まずファイルの再送、アクセスの復旧、またはその他の方法による配信完了に努めます。",
  },
  {
    icon: AlertCircle,
    title: "4. 破損、不正確、または重複した注文",
    body: "同一注文に対して複数回請求された場合、誤ったファイルを受け取った場合、または当社に起因する技術的問題により、配信されたファイルが明らかに不完全、アクセス不能、または使用不能である場合は、配信後合理的な期間内にご連絡ください。当社が問題を修正できない場合、当社の裁量または適用法で義務付けられる範囲において、代替品、ストアクレジット、価格調整、または返金を提供する場合があります。",
  },
  {
    icon: AlertCircle,
    title: "5. お客様が提出した写真に関する問題",
    body: "ぼやけた画像、低品質のアップロード、顔の一部が切れている写真、照明不足、特徴が隠れている写真、または当社の写真ガイドラインに適合しない写真など、お客様が提出した写真に起因する問題について、当社は返金を行う義務を負いません。ご注文前に、サンプルページおよび写真ガイドページをご確認ください。",
  },
  {
    icon: PencilRuler,
    title: "6. 手動修正は行いません",
    body: "当社が明示的に別途定めない限り、当社のサービスは自動化されており、無料の手動レタッチ、カスタムデザイン編集、主観的なスタイル変更、または個人的な好みに基づく無制限の再作業は提供していません。軽微な芸術的差異、レイアウトの違い、または AI による解釈だけでは、返金、交換、または手動修正の対象にはなりません。",
  },
  {
    icon: RefreshCw,
    title: "7. パーソナライズされた AI 補助結果",
    body: "当社の商品はパーソナライズされており、AI を用いた生成または編集を含む場合があります。芸術的解釈、構図、線の細部、ポーズ、表情、またはスタイルにおける軽微な差異は、本サービスの通常の一部であり、それ自体では返金の対象にはなりません。",
  },
  {
    icon: AlertTriangle,
    title: "8. チャージバックの前にご連絡ください",
    body: "請求上の問題、配信失敗、重複請求、またはご注文に関する技術的問題があると思われる場合は、可能であれば銀行またはカードのチャージバックを開始する前に、まず当社へご連絡ください。多くの場合、アクセスの復旧、ファイルの再送、またはご注文内容の直接確認により、より迅速に問題を解決できます。",
  },
  {
    icon: Scale,
    title: "9. 法的権利",
    body: "本返金ポリシーのいかなる内容も、適用される消費者保護法に基づきお客様が有する強行的な権利を制限または排除するものではありません。地域の法律により返金、取消権、修理、交換、値引き、またはその他の救済が必要とされる場合、当社はそれらの権利を尊重します。",
  },
  {
    icon: Mail,
    title: "10. お問い合わせ",
    body: `請求上の問題、配信上の問題、重複請求、またはご注文に関する技術的エラーがあると思われる場合は、注文情報を添えて ${BRAND.email} までご連絡ください。内容を確認いたします。`,
  },
];

export default function RefundPolicyJaPage() {
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
                返金ポリシー
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                {BRAND.name} のデジタル商品をご購入いただく前に、本返金ポリシーをよくお読みください。
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                最終更新日: {BRAND.updatedAt}
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
                本返金ポリシーの翻訳版と英語版に相違がある場合、適用法で認められる最大限の範囲で英語版が優先されます。
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  ご注文に関してお困りですか？
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  請求上の問題、配信上の問題、重複請求、または技術的なご質問がある場合は、{" "}
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
                    href="/terms-ja"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    利用規約を見る
                  </Link>

                  <Link
                    href="/privacy-ja"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    プライバシーポリシーを見る
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