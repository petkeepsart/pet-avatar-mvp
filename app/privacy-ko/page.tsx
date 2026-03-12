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
  site: "/ko",
  updatedAt: "2026년 3월 11일",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. 개요",
    body: "본 개인정보처리방침은 귀하가 당사 웹사이트를 방문하거나, 사진을 업로드하거나, 주문을 하거나, 당사에 문의할 때 Pet Keepsake Studio가 귀하의 개인정보를 어떻게 수집, 사용, 저장 및 보호하는지 설명합니다.",
  },
  {
    icon: Cookie,
    title: "2. 수집하는 정보",
    body: "당사는 귀하가 직접 제공하는 정보(이름, 이메일 주소, 업로드한 사진, 주문 정보, 당사에 보내는 메시지 등)를 수집할 수 있습니다. 또한 웹사이트 운영, 보안 및 개선에 필요한 범위에서 브라우저 종류, 기기 종류, IP 주소, 기본 사용 데이터와 같은 제한적인 기술 정보도 수집할 수 있습니다. 해당되는 경우, 당사는 필수 사이트 기능, 성능 측정 및 분석을 위해 쿠키 또는 유사한 기술을 사용할 수 있습니다.",
  },
  {
    icon: CreditCard,
    title: "3. 결제",
    body: "결제는 제3자 결제 서비스 제공업체를 통해 처리됩니다. 당사는 귀하의 전체 신용카드 번호를 당사 서버에 저장하지 않습니다. 결제 정보가 어떻게 처리되는지에 대해서는 귀하의 결제 제공업체의 개인정보처리방침을 검토해 주시기 바랍니다.",
  },
  {
    icon: Cpu,
    title: "4. AI 처리 및 제3자 도구",
    body: "당사의 디지털 상품을 생성하고 제공하기 위해, 귀하가 업로드한 사진과 관련 주문 데이터는 제3자 AI 도구, 클라우드 서비스, 저장 서비스 제공업체 및 관련 기술 인프라를 통해 처리될 수 있습니다. 귀하는 당사 서비스를 이용하고 사진을 업로드함으로써 주문 생성, 이행 및 지원을 위한 이러한 처리에 대해 이해하고 동의하는 것으로 간주됩니다.",
  },
  {
    icon: Server,
    title: "5. 귀하의 정보를 사용하는 방법",
    body: "당사는 서비스 제공, 주문 처리, 디지털 상품 생성, 파일 전달, 고객 지원 응답, 웹사이트 개선, 성능 모니터링, 오용 또는 사기 방지 및 법적 의무 준수를 위해 귀하의 정보를 사용합니다.",
  },
  {
    icon: Globe,
    title: "6. 데이터 공유 및 국제 이전",
    body: "당사는 귀하의 개인정보를 판매하지 않습니다. 당사는 웹사이트 운영, 결제 처리, 파일 저장, 상품 생성, 디지털 상품 전달, 이메일 서비스 제공 또는 기술 인프라 유지에 도움을 주는 신뢰할 수 있는 서비스 제공업체와 제한된 데이터를 공유할 수 있습니다. 이러한 제공업체는 전 세계적으로 운영될 수 있으므로, 귀하의 정보는 귀하의 거주 국가 외의 국가에서 처리되거나 저장될 수 있습니다.",
  },
  {
    icon: ImageIcon,
    title: "7. 업로드된 사진 및 생성된 파일",
    body: "업로드된 사진과 생성된 파일은 귀하의 주문을 생성, 전달 및 지원하기 위해 사용됩니다. 귀하는 법적으로 사용할 권리가 있는 사진만 업로드해야 합니다. 당사는 귀하의 허가 없이 업로드된 사진을 무관한 공개 마케팅에 사용하지 않습니다.",
  },
  {
    icon: Trash2,
    title: "8. 데이터 보관",
    body: "당사는 서비스 운영, 주문 완료, 지원 제공, 기술 문제 해결, 적절한 기록 유지 및 법적 또는 사업상 의무 이행에 합리적으로 필요한 기간 동안만 개인정보와 업로드된 콘텐츠를 보관합니다. 파일 및 업로드된 콘텐츠는 해당 보관 기간이 지난 후 활성 시스템에서 주기적으로 삭제될 수 있습니다.",
  },
  {
    icon: Baby,
    title: "9. 아동 개인정보 보호",
    body: "당사 웹사이트와 서비스는 아동을 대상으로 하지 않습니다. 당사는 관련 법률에서 요구하는 연령 미만의 아동으로부터 개인정보를 고의로 수집하지 않습니다. 아동이 당사에 개인정보를 제공했다고 생각되는 경우, 당사가 검토하고 적절한 조치를 취할 수 있도록 당사에 연락해 주시기 바랍니다.",
  },
  {
    icon: ShieldCheck,
    title: "10. 보안",
    body: "당사는 귀하의 정보를 보호하기 위해 합리적인 기술적 및 조직적 조치를 취합니다. 그러나 어떤 웹사이트, 저장 시스템 또는 인터넷 전송도 완전히 안전하다고 보장될 수 없으며, 귀하는 자신의 책임 하에 서비스를 이용합니다.",
  },
  {
    icon: Mail,
    title: "11. 귀하의 개인정보 권리",
    body: `귀하의 위치 및 적용 법률에 따라, 귀하는 특정 개인정보에 대한 접근, 정정, 삭제 또는 처리 제한을 요청할 권리가 있을 수 있습니다. 개인정보 관련 요청을 하거나 본 개인정보처리방침에 대해 질문이 있는 경우 ${BRAND.email} 로 문의해 주시기 바랍니다.`,
  },
];

export default function PrivacyKoPage() {
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
                개인정보처리방침
              </h1>

              <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#7b6658] md:text-[17px]">
                당사가 귀하의 정보를 어떻게 수집, 사용, 저장 및 보호하는지 이해할 수 있도록 본 개인정보처리방침을 주의 깊게 읽어 주시기 바랍니다.
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
                본 개인정보처리방침의 번역본 간 내용이 상충하는 경우, 적용 법률이 허용하는 최대 범위 내에서 영어 버전이 우선합니다.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  개인정보 관련 문의가 있으신가요?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  본 개인정보처리방침 또는 귀하의 개인정보에 대해 질문이 있는 경우, 저희 팀이 도와드리겠습니다.{" "}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}