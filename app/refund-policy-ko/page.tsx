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
  site: "/ko",
  updatedAt: "2026년 3월 11일",
};

const SECTIONS = [
  {
    icon: Receipt,
    title: "1. 개요",
    body: "Pet Keepsake Studio에서는 맞춤형 디지털 상품만 판매합니다. 주문은 전자적으로 전달되며, 구매 후 자동 이미지 처리 워크플로를 통해 생성될 수 있으므로, 처리 또는 전달이 시작된 이후에는 환불, 반품, 교환 및 취소가 일반적으로 제한됩니다.",
  },
  {
    icon: Download,
    title: "2. 디지털 상품 및 최종 판매 정책",
    body: "당사 웹사이트에서 구매함으로써, 귀하는 물리적인 상품이 아닌 디지털 상품을 구매하고 있음을 인정합니다. 디지털 다운로드의 특성상, 주문이 접수되고 처리 또는 전달이 시작된 이후에는 관련 법률에서 요구하거나 본 환불 정책에 명시된 경우를 제외하고 일반적으로 환불, 반품, 교환 또는 취소를 제공하지 않습니다.",
  },
  {
    icon: ShieldCheck,
    title: "3. 파일을 받지 못한 경우",
    body: "다운로드 링크를 받지 못했거나, 파일에 접근할 수 없거나, 당사 측의 기술적인 전달 문제가 있는 경우에는 당사에 문의해 주세요. 당사는 다른 해결책을 고려하기 전에 먼저 파일을 재전송하거나, 접근을 복구하거나, 또는 다른 방식으로 전달을 완료하기 위해 노력합니다.",
  },
  {
    icon: AlertCircle,
    title: "4. 손상되었거나 잘못되었거나 중복된 주문",
    body: "동일한 주문에 대해 두 번 이상 청구된 경우, 잘못된 파일을 받은 경우, 또는 당사 측의 기술적 문제로 인해 전달된 파일이 명백히 불완전하거나 접근할 수 없거나 사용할 수 없는 경우, 전달 후 합리적인 기간 내에 당사에 문의해 주세요. 당사가 문제를 해결할 수 없는 경우, 당사의 재량에 따라 또는 관련 법률에서 요구하는 경우 대체 제공, 스토어 크레딧, 가격 조정 또는 환불을 제공할 수 있습니다.",
  },
  {
    icon: AlertCircle,
    title: "5. 고객이 제출한 사진 관련 문제",
    body: "흐릿한 이미지, 저화질 업로드, 잘린 얼굴, 불량한 조명, 가려진 특징, 또는 당사의 사진 가이드라인을 충족하지 않는 사진 등 고객이 제출한 사진으로 인해 발생한 문제에 대해서는 환불을 제공할 의무가 없습니다. 주문 전에 예시 페이지와 사진 가이드 페이지를 검토해 주세요.",
  },
  {
    icon: PencilRuler,
    title: "6. 수동 수정 없음",
    body: "당사가 명시적으로 별도로 밝히지 않는 한, 당사의 서비스는 자동화되어 있으며 무료 수동 보정, 맞춤형 디자인 수정, 주관적인 스타일 변경 또는 개인 취향에 따른 무제한 재작업을 제공하지 않습니다. 경미한 예술적 차이, 레이아웃 차이 또는 AI 생성 해석만으로는 환불, 교체 또는 수동 수정을 받을 자격이 되지 않습니다.",
  },
  {
    icon: RefreshCw,
    title: "7. 맞춤형 및 AI 지원 결과물",
    body: "당사의 상품은 맞춤형이며 AI 지원 생성 또는 편집이 포함될 수 있습니다. 예술적 해석, 구성, 선 디테일, 자세, 표정 또는 스타일의 경미한 차이는 서비스의 정상적인 일부이며, 그 자체만으로 환불 사유가 되지 않습니다.",
  },
  {
    icon: AlertTriangle,
    title: "8. 차지백 신청 전 먼저 문의해 주세요",
    body: "청구 문제, 전달 실패, 중복 청구 또는 주문 관련 기술적 문제가 있다고 생각되는 경우, 가능하다면 은행 또는 카드 차지백을 시작하기 전에 먼저 당사에 문의해 주세요. 많은 경우, 접근 복구, 파일 재전송 또는 주문 직접 검토를 통해 더 빠르게 문제를 해결할 수 있습니다.",
  },
  {
    icon: Scale,
    title: "9. 법적 권리",
    body: "본 환불 정책의 어떤 내용도 관련 소비자 보호법에 따라 귀하가 가질 수 있는 강행적 권리를 제한하거나 배제하지 않습니다. 현지 법률이 환불, 취소권, 수리, 교체, 가격 인하 또는 기타 구제를 요구하는 경우, 당사는 그러한 권리를 존중합니다.",
  },
  {
    icon: Mail,
    title: "10. 문의하기",
    body: `청구 문제, 전달 문제, 중복 청구 또는 주문 관련 기술적 오류가 있다고 생각되는 경우, 주문 정보를 포함하여 ${BRAND.email} 로 문의해 주세요. 당사가 해당 문제를 검토하겠습니다.`,
  },
];

export default function RefundPolicyKoPage() {
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
                환불 정책
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                {BRAND.name} 의 디지털 상품을 구매하기 전에 본 환불 정책을 주의 깊게 검토해 주세요.
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
                본 환불 정책의 번역본 간 내용이 상충하는 경우, 적용 법률이 허용하는 최대 범위 내에서 영어 버전이 우선합니다.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  주문 관련 도움이 필요하신가요?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  청구 문제, 전달 문제, 중복 청구 또는 기술적인 질문이 있는 경우{" "}
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
                    href="/terms-ko"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    이용약관 보기
                  </Link>

                  <Link
                    href="/privacy-ko"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    개인정보처리방침 보기
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