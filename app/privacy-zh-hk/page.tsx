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
  site: "/zh-hk",
  updatedAt: "2026年3月11日",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. 概述",
    body: "本私隱政策說明，當你瀏覽我們的網站、上載照片、提交訂單或聯絡我們時，Pet Keeps Art 如何收集、使用、儲存及保護你的個人資料。",
  },
  {
    icon: Cookie,
    title: "2. 我們收集的資料",
    body: "我們可能會收集你直接提供給我們的資料，包括你的姓名、電郵地址、上載的照片、訂單詳情，以及你發送給我們的任何訊息。我們亦可能收集有限的技術資料，例如瀏覽器類型、裝置類型、IP 位址，以及營運、保護及改進網站所需的基本使用數據。在適用情況下，我們可能會使用 Cookie 或類似技術，以提供網站基本功能、表現衡量及分析。",
  },
  {
    icon: CreditCard,
    title: "3. 付款",
    body: "付款會透過第三方支付服務供應商處理。我們不會在自己的伺服器上儲存你的完整信用卡號碼。有關付款資料如何被處理，請查閱你的支付服務供應商的私隱政策。",
  },
  {
    icon: Cpu,
    title: "4. AI 處理及第三方工具",
    body: "為了建立及交付我們的數碼產品，你上載的照片及相關訂單資料，可能會透過第三方 AI 工具、雲端服務、儲存服務供應商及相關技術基礎設施進行處理。當你使用我們的服務並上載照片，即表示你明白並同意為了訂單生成、履行及支援而進行此類處理。",
  },
  {
    icon: Server,
    title: "5. 我們如何使用你的資料",
    body: "我們會使用你的資料來提供服務、處理訂單、生成數碼產品、交付檔案、回覆支援查詢、改善網站、監察表現、防止濫用或詐騙，以及履行法律義務。",
  },
  {
    icon: Globe,
    title: "6. 資料共享及國際傳輸",
    body: "我們不會出售你的個人資料。我們可能會與可信賴的服務供應商分享有限資料，這些服務供應商協助我們營運網站、處理付款、儲存檔案、生成產品、交付數碼商品、提供電郵服務或維護技術基礎設施。由於這些服務供應商可能在全球不同地區營運，你的資料可能會在你居住地以外的國家或地區被處理或儲存。",
  },
  {
    icon: ImageIcon,
    title: "7. 上載的照片及生成的檔案",
    body: "上載的照片及生成的檔案只會用作建立、交付及支援你的訂單。你只應上載你有合法權利使用的照片。未經你的許可，我們不會將你上載的照片用於與本服務無關的公開市場推廣。",
  },
  {
    icon: Trash2,
    title: "8. 資料保留",
    body: "我們只會在合理所需的期間內保留個人資料及上載內容，以便營運服務、完成訂單、提供支援、解決技術問題、保存適當紀錄，以及履行法律或商業義務。在適用保留期限屆滿後，檔案及上載內容可能會定期從運作中的系統刪除。",
  },
  {
    icon: Baby,
    title: "9. 兒童私隱",
    body: "我們的網站及服務並非以兒童為對象。我們不會在知情情況下收集未達適用法律規定年齡的兒童的個人資料。如果你相信有兒童向我們提供了個人資料，請聯絡我們，以便我們檢視並採取適當行動。",
  },
  {
    icon: ShieldCheck,
    title: "10. 保安",
    body: "我們會採取合理的技術及組織措施來保護你的資料。然而，任何網站、儲存系統或互聯網傳輸都無法保證絕對安全，你需自行承擔使用本服務的相關風險。",
  },
  {
    icon: Mail,
    title: "11. 你的私隱權利",
    body: `視乎你的所在地及適用法律，你可能有權要求查閱、更正、刪除或限制處理某些個人資料。如果你希望提出與私隱有關的要求，或對本私隱政策有任何疑問，請透過 ${BRAND.email} 與我們聯絡。`,
  },
];

export default function PrivacyZhHkPage() {
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
                私隱政策
              </h1>

              <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#7b6658] md:text-[17px]">
                請仔細閱讀本私隱政策，以了解我們如何收集、使用、儲存及保護你的資料。
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
                如果本私隱政策的翻譯版本與英文版本有任何衝突，則在適用法律允許的最大範圍內，以英文版本為準。
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  對私隱有疑問嗎？
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  如果你對本私隱政策或你的個人資料有任何疑問，我們的團隊樂意提供協助。請透過{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  與我們聯絡。
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}