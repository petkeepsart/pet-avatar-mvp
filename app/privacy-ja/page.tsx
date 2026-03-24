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
  site: "/ja",
  updatedAt: "2026年3月11日",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. 概要",
    body: "本プライバシーポリシーは、Pet Keeps Art が、当サイトの閲覧、写真のアップロード、注文の実行、または当社へのお問い合わせの際に、お客様の個人情報をどのように収集、使用、保存、保護するかを説明するものです。",
  },
  {
    icon: Cookie,
    title: "2. 収集する情報",
    body: "当社は、お客様が直接提供する情報（氏名、メールアドレス、アップロードした写真、注文情報、お問い合わせ内容など）を収集する場合があります。また、サイトの運営、保護、改善のために必要な範囲で、ブラウザの種類、デバイスの種類、IP アドレス、基本的な利用データなどの限定的な技術情報を収集する場合があります。必要に応じて、当社はサイトの基本機能、パフォーマンス測定、分析のために Cookie または類似技術を使用することがあります。",
  },
  {
    icon: CreditCard,
    title: "3. 支払い",
    body: "お支払いは第三者の決済サービス提供者を通じて処理されます。当社は、お客様のクレジットカード番号全体を自社サーバーに保存しません。支払い情報の取り扱いについては、ご利用の決済提供者のプライバシーポリシーをご確認ください。",
  },
  {
    icon: Cpu,
    title: "4. AI 処理および第三者ツール",
    body: "当社のデジタル商品を作成・提供するために、お客様がアップロードした写真および関連する注文データは、第三者の AI ツール、クラウドサービス、ストレージ提供者、その他関連する技術基盤を通じて処理される場合があります。お客様は、本サービスを利用し写真をアップロードすることにより、注文の生成、提供、サポートのためのこの処理を理解し、同意したものとみなされます。",
  },
  {
    icon: Server,
    title: "5. お客様情報の利用方法",
    body: "当社は、お客様情報を、サービスの提供、注文処理、デジタル商品の生成、ファイルの提供、サポート対応、サイト改善、パフォーマンスの監視、不正利用や詐欺の防止、法的義務の遵守のために使用します。",
  },
  {
    icon: Globe,
    title: "6. データ共有および国際移転",
    body: "当社は、お客様の個人情報を販売しません。当社は、サイト運営、決済処理、ファイル保存、商品生成、デジタル商品の提供、メールサービスの提供、技術基盤の維持を支援する信頼できるサービス提供者と、必要最小限のデータを共有する場合があります。これらの提供者は世界各地で事業を行っている可能性があるため、お客様の情報はお住まいの地域外の国で処理または保存される場合があります。",
  },
  {
    icon: ImageIcon,
    title: "7. アップロードされた写真と生成ファイル",
    body: "アップロードされた写真および生成されたファイルは、お客様の注文を作成、提供、サポートするために使用されます。お客様は、法的に使用する権利を有する写真のみをアップロードしてください。当社は、お客様の許可なく、アップロードされた写真を無関係な公開マーケティングに使用しません。",
  },
  {
    icon: Trash2,
    title: "8. データ保持",
    body: "当社は、サービス運営、注文完了、サポート提供、技術的問題の解決、適切な記録保持、法的または事業上の義務の履行に合理的に必要な期間に限り、個人データおよびアップロードされたコンテンツを保持します。ファイルおよびアップロードコンテンツは、適用される保持期間の経過後、稼働中のシステムから定期的に削除される場合があります。",
  },
  {
    icon: Baby,
    title: "9. 子どものプライバシー",
    body: "当社のウェブサイトおよびサービスは、子どもを対象としていません。当社は、適用法で定められた年齢未満の子どもから、故意に個人情報を収集しません。子どもが当社に個人情報を提供したと思われる場合は、当社までご連絡ください。確認のうえ、適切な対応を行います。",
  },
  {
    icon: ShieldCheck,
    title: "10. セキュリティ",
    body: "当社は、お客様情報を保護するために、合理的な技術的および組織的措置を講じます。ただし、いかなるウェブサイト、保存システム、またはインターネット通信も完全な安全性を保証することはできず、お客様は自己の責任において本サービスを利用するものとします。",
  },
  {
    icon: Mail,
    title: "11. お客様のプライバシーに関する権利",
    body: `お客様の所在地および適用法により、特定の個人情報へのアクセス、訂正、削除、または処理制限を求める権利を有する場合があります。プライバシーに関するご請求、または本プライバシーポリシーについてご質問がある場合は、${BRAND.email} までご連絡ください。`,
  },
];

export default function PrivacyJaPage() {
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
                プライバシーポリシー
              </h1>

              <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#7b6658] md:text-[17px]">
                当社がお客様の情報をどのように収集、使用、保存、保護するかをご理解いただくために、本プライバシーポリシーをよくお読みください。
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
                本プライバシーポリシーの翻訳版と英語版に相違がある場合、適用法で認められる最大限の範囲で英語版が優先されます。
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  プライバシーに関するご質問はありますか？
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  本プライバシーポリシーまたはお客様の個人情報についてご質問がある場合は、当社チームまでご連絡ください。{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}