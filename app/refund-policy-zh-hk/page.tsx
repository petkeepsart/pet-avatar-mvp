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
  site: "/zh-hk",
  updatedAt: "2026年3月11日",
};

const SECTIONS = [
  {
    icon: Receipt,
    title: "1. 概述",
    body: "在 Pet Keeps Art，我們只提供個人化數碼產品。由於你的訂單會以電子方式交付，並且可能在購買後透過自動圖像處理流程生成，因此一旦處理或交付開始，退款、退貨、更換及取消一般都會受到限制。",
  },
  {
    icon: Download,
    title: "2. 數碼產品及最終銷售政策",
    body: "當你在我們的網站購買時，即表示你確認所購買的是數碼產品，而不是實體商品。基於數碼下載產品的性質，在訂單提交且處理或交付已開始後，我們一般不提供退款、退貨、更換或取消，除非適用法律另有要求，或本退款政策中另有列明。",
  },
  {
    icon: ShieldCheck,
    title: "3. 如果你未收到檔案",
    body: "如果你沒有收到下載連結、無法存取檔案，或我們這邊出現技術性交付問題，請聯絡我們。我們會先嘗試重新發送檔案、恢復存取權限，或以其他方式完成交付，然後才考慮進一步的處理方案。",
  },
  {
    icon: AlertCircle,
    title: "4. 損壞、錯誤或重複訂單",
    body: "如果同一訂單被重複收費、你收到錯誤的檔案，或因我們造成的技術問題而導致已交付的檔案明顯不完整、無法存取或無法使用，請在交付後合理時間內聯絡我們。如果我們無法修復問題，我們可按自身酌情決定，或在適用法律要求下，提供替換、商店積分、價格調整或退款。",
  },
  {
    icon: AlertCircle,
    title: "5. 客戶照片問題",
    body: "對於因客戶提交的照片所導致的問題，我們沒有義務提供退款，包括但不限於照片模糊、上載品質低、面部被裁切、光線不足、特徵被遮擋，或照片不符合我們的照片指引。請在下單前查看我們的範例頁面及照片指引頁面。",
  },
  {
    icon: PencilRuler,
    title: "6. 不提供人手修改",
    body: "除非我們明確另有說明，否則我們的服務屬自動化處理，不提供免費人手修圖、自訂設計修改、基於個人喜好的主觀風格調整，或無限次重做。輕微的藝術差異、版面變化或 AI 生成的演繹，本身並不構成退款、更換或人手修改的理由。",
  },
  {
    icon: RefreshCw,
    title: "7. 個人化及 AI 輔助結果",
    body: "我們的產品屬個人化產品，並可能涉及 AI 輔助生成或編輯。藝術演繹、構圖、線條細節、姿勢、表情或風格上的輕微差異，均屬服務的正常部分，本身並不構成退款理由。",
  },
  {
    icon: AlertTriangle,
    title: "8. 請先聯絡我們再提出拒付",
    body: "如果你認為訂單存在帳單問題、交付失敗、重複收費或技術問題，請在可行情況下，先聯絡我們，再向銀行或信用卡機構提出拒付。在很多情況下，我們可以透過恢復存取權限、重新發送檔案或直接檢查訂單，更快地解決問題。",
  },
  {
    icon: Scale,
    title: "9. 法定權利",
    body: "本退款政策中的任何內容，均不會限制或排除你根據適用消費者保障法律所享有的強制性權利。如當地法律要求退款、取消權、維修、更換、減價或其他補救措施，我們將尊重並履行這些權利。",
  },
  {
    icon: Mail,
    title: "10. 聯絡我們",
    body: `如果你認為你的訂單存在帳單問題、交付問題、重複收費或技術錯誤，請透過 ${BRAND.email} 與我們聯絡，並附上你的訂單詳情，以便我們檢查相關問題。`,
  },
];

export default function RefundPolicyZhHkPage() {
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
                返回首頁
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
                在購買 {BRAND.name} 的任何數碼產品之前，請仔細閱讀本退款政策。
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                最後更新：{BRAND.updatedAt}
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
                如果本退款政策的翻譯版本與英文版本有任何衝突，則在適用法律允許的最大範圍內，以英文版本為準。
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  需要訂單協助嗎？
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  如果你有帳單問題、交付問題、重複收費或技術問題，請透過{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  聯絡我們。
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={BRAND.site}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_20px_rgba(157,97,65,0.22)] transition hover:brightness-105 active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    返回首頁
                  </Link>

                  <Link
                    href="/terms-zh-hk"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    查看服務條款
                  </Link>

                  <Link
                    href="/privacy-zh-hk"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    查看私隱政策
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