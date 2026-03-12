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
  site: "/ko",
  updatedAt: "2026년 3월 11일",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. 서비스 이용",
    body: "본 웹사이트를 이용함으로써 귀하는 본 서비스 약관에 동의하며, 귀하가 거주하는 지역에서 성년 연령에 도달했음을 확인합니다. 성년이 아닌 경우에는 부모 또는 법적 보호자의 허락을 받아 본 서비스를 이용함을 의미합니다.",
  },
  {
    icon: Download,
    title: "2. 디지털 상품 전용",
    body: "본 사이트에서 판매되는 모든 상품은 디지털 다운로드 상품이며, 실물 상품은 배송되지 않습니다. 구매 후 파일을 다운로드하고 안전하게 보관하는 책임은 귀하에게 있습니다.",
  },
  {
    icon: ImageIcon,
    title: "3. 사진 업로드 및 권리",
    body: "귀하는 제출한 모든 사진을 합법적으로 업로드하고 사용할 권리가 있음을 확인합니다. 타인의 저작권, 상표권, 개인정보권, 퍼블리시티권, 초상권, 이미지권 또는 기타 소유권을 침해하는 콘텐츠를 업로드해서는 안 됩니다.",
  },
  {
    icon: UserX,
    title: "4. 유명인 또는 저작권 보호 캐릭터 업로드 금지",
    body: "필요한 모든 권리를 보유하지 않은 한, 유명인, 공인 또는 저작권으로 보호되는 캐릭터(예: 영화, 만화, 비디오게임 캐릭터)의 사진을 업로드할 수 없습니다. 당사는 이러한 콘텐츠가 포함된 주문을 취소할 권리를 보유합니다.",
  },
  {
    icon: ImageIcon,
    title: "5. AI 생성 결과",
    body: "당사의 상품은 AI 보조 도구를 사용하여 제작됩니다. 결과물은 예술적 해석에 해당하므로 스타일에 차이가 있을 수 있으며, 원본 대상과 100% 동일한 유사성 또는 완전한 해부학적 정확성을 제공하지 않을 수 있음을 이해하고 동의합니다.",
  },
  {
    icon: ShieldCheck,
    title: "6. 개인 사용 라이선스",
    body: "귀하의 구매에는 개인적이고 비상업적인 용도의 사용 권한만 부여됩니다. 개인 전시, 선물 및 인쇄 용도로 사용할 수 있습니다. 사전 서면 허가 없이 파일을 상업적으로 재판매, 재배포, 재허가 또는 기타 상업적 목적으로 사용하는 것은 엄격히 금지됩니다.",
  },
  {
    icon: RefreshCw,
    title: "7. 환불",
    body: "당사 상품은 디지털 상품이며 전자적으로 제공되므로, 환불은 당사의 환불 정책에 따라 처리됩니다. 관련 법률에서 요구하는 경우, 취소 또는 환불 권리는 해당 환불 정책 및 적용되는 소비자 보호법에 따라 결정됩니다.",
  },
  {
    icon: Scale,
    title: "8. 책임의 제한",
    body: "관련 법률이 허용하는 최대 범위 내에서, Pet Keepsake Studio는 간접적, 부수적 또는 결과적 손해에 대해 책임을 지지 않습니다. 어떠한 청구에 대해서도 당사의 총 책임 한도는 해당 주문에 대해 귀하가 실제로 지불한 금액을 초과하지 않습니다.",
  },
  {
    icon: Scale,
    title: "9. 강행적 소비자 권리",
    body: "본 약관의 어떠한 내용도 적용 법률상 합법적으로 배제할 수 없는 소비자 권리 또는 구제수단을 배제, 제한 또는 대체하지 않습니다.",
  },
  {
    icon: ShieldCheck,
    title: "10. 주문 거절 또는 취소",
    body: "주문이 본 약관을 위반하거나, 제3자의 권리를 침해하거나, 금지된 콘텐츠를 포함하거나, 당사의 시스템으로 합리적으로 처리할 수 없는 경우, 당사는 해당 주문을 거절, 보류, 삭제 또는 취소할 권리를 보유합니다.",
  },
  {
    icon: ShieldCheck,
    title: "11. 서비스 이용 가능성",
    body: "당사는 사전 통지 없이 언제든지 서비스의 일부를 업데이트, 수정 또는 중단할 수 있습니다. 당사의 합리적인 통제 범위를 벗어난 일시적 중단, 지연 또는 기술적 문제에 대해서는 책임을 지지 않습니다.",
  },
  {
    icon: Mail,
    title: "12. 문의하기",
    body: `본 약관에 관한 문의사항이 있으시면 ${BRAND.email} 로 연락해 주세요.`,
  },
];

export default function TermsKoPage() {
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
                홈으로 돌아가기
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
                서비스 약관
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                본 웹사이트를 이용하거나 Pet Keepsake Studio의 디지털 상품을 구매하기 전에 본 서비스 약관을 주의 깊게 읽어 주세요.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                최종 업데이트: {BRAND.updatedAt}
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
                본 약관의 번역본과 영어본 사이에 충돌이 있는 경우, 적용 법률이 허용하는 최대 범위 내에서 영어본이 우선합니다.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  추가 설명이 필요하신가요?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  본 약관 또는 특정 주문에 대해 궁금한 점이 있으시면 언제든지 도와드리겠습니다.
                  {" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  로 문의해 주세요.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={BRAND.site}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_20px_rgba(157,97,65,0.22)] transition hover:brightness-105 active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    홈으로 돌아가기
                  </Link>

                  <Link
                    href="/refund-policy-ko"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    환불 정책 보기
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