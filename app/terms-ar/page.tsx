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
  site: "/ar",
  updatedAt: "11 مارس 2026",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. استخدام الخدمة",
    body: "من خلال استخدام هذا الموقع، فإنك توافق على شروط الخدمة هذه وتؤكد أنك بلغت سن الرشد القانوني في ولايتك القضائية، أو أنك تستخدم هذه الخدمة بإذن من أحد الوالدين أو الوصي القانوني.",
  },
  {
    icon: Download,
    title: "2. منتجات رقمية فقط",
    body: "جميع المنتجات المباعة على هذا الموقع هي تنزيلات رقمية فقط. لا يتم شحن أي منتجات مادية. أنت مسؤول عن تنزيل ملفاتك وحفظها بعد الشراء.",
  },
  {
    icon: ImageIcon,
    title: "3. تحميل الصور وحقوق الملكية",
    body: "أنت تؤكد أن لديك الحق القانوني في تحميل واستخدام أي صورة يتم إرسالها. يجب عليك عدم تحميل أي محتوى ينتهك حقوق الطبع والنشر أو العلامات التجارية أو الخصوصية أو حقوق الدعاية أو حقوق الصورة أو أي حقوق ملكية أخرى تخص الغير.",
  },
  {
    icon: UserX,
    title: "4. عدم السماح بتحميل صور المشاهير أو الشخصيات المحمية بحقوق الطبع والنشر",
    body: "لا يجوز لك تحميل صور المشاهير أو الشخصيات العامة أو الشخصيات المحمية بحقوق الطبع والنشر (مثل شخصيات الأفلام أو الرسوم المتحركة أو ألعاب الفيديو) ما لم تكن تملك جميع الحقوق اللازمة. نحتفظ بالحق في إلغاء الطلبات التي تتضمن مثل هذا المحتوى.",
  },
  {
    icon: ImageIcon,
    title: "5. النتائج المُنشأة بالذكاء الاصطناعي",
    body: "يتم إنشاء منتجاتنا باستخدام أدوات مدعومة بالذكاء الاصطناعي. أنت تقر بأن النتائج تُعد تفسيرات فنية؛ وقد تختلف في الأسلوب، وقد لا توفر تشابهًا مطابقًا بنسبة 100% أو دقة تشريحية كاملة للموضوع الأصلي.",
  },
  {
    icon: ShieldCheck,
    title: "6. ترخيص الاستخدام الشخصي",
    body: "يمنحك شراؤك ترخيصًا شخصيًا وغير تجاري للاستخدام في العرض الشخصي والهدايا والطباعة. يُحظر تمامًا إعادة بيع الملفات تجاريًا أو إعادة توزيعها أو ترخيصها من الباطن دون إذن كتابي مسبق.",
  },
  {
    icon: RefreshCw,
    title: "7. المبالغ المستردة",
    body: "نظرًا لأن منتجاتنا رقمية ويتم تسليمها إلكترونيًا، تتم معالجة المبالغ المستردة وفقًا لسياسة الاسترداد الخاصة بنا. وعندما يتطلب القانون المعمول به ذلك، فإن أي حقوق للإلغاء أو الاسترداد تخضع لتلك السياسة وللقانون الاستهلاكي المعمول به.",
  },
  {
    icon: Scale,
    title: "8. تحديد المسؤولية",
    body: "إلى أقصى حد يسمح به القانون، لا تتحمل Pet Keeps Art المسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية. ولن تتجاوز مسؤوليتنا الإجمالية عن أي مطالبة المبلغ المدفوع للطلب المحدد.",
  },
  {
    icon: Scale,
    title: "9. حقوق المستهلك الإلزامية",
    body: "لا يوجد في هذه الشروط ما يستبعد أو يحد أو يلغي أي حقوق أو وسائل انتصاف للمستهلك لا يمكن استبعادها قانونًا بموجب القانون المعمول به.",
  },
  {
    icon: ShieldCheck,
    title: "10. رفض أو إلغاء الطلبات",
    body: "نحتفظ بالحق في رفض أو تعليق أو إزالة أو إلغاء أي طلب ينتهك هذه الشروط، أو ينتهك حقوق الغير، أو يحتوي على محتوى محظور، أو لا يمكن معالجته بشكل معقول بواسطة أنظمتنا.",
  },
  {
    icon: ShieldCheck,
    title: "11. توفر الخدمة",
    body: "يجوز لنا تحديث أو تعديل أو إيقاف أي جزء من الخدمة في أي وقت دون إشعار مسبق. ونحن غير مسؤولين عن الانقطاعات المؤقتة أو التأخيرات أو المشكلات التقنية الخارجة عن نطاق سيطرتنا المعقولة.",
  },
  {
    icon: Mail,
    title: "12. التواصل معنا",
    body: `إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا عبر ${BRAND.email}.`,
  },
];

export default function TermsArPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[linear-gradient(180deg,#f6efe6_0%,#fbf7f1_100%)] text-[#3b281d]"
    >
      <div className="mx-auto max-w-[1480px] px-4 py-6 md:px-6 md:py-10">
        <div className="overflow-hidden rounded-[28px] border border-[#ded1c3] bg-[#fbf7f1] shadow-[0_24px_60px_rgba(77,52,35,0.10)]">
          <div className="border-b border-[#eadfd3] bg-white/70 px-5 py-4 backdrop-blur md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href={BRAND.site}
                className="inline-flex items-center gap-2 rounded-full border border-[#d7c8b9] bg-white px-4 py-2 text-sm font-bold text-[#5a4335] shadow-sm transition hover:bg-[#faf3eb]"
              >
                <ArrowLeft className="h-4 w-4" />
                العودة إلى الرئيسية
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
                شروط الخدمة
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                يرجى قراءة شروط الخدمة هذه بعناية قبل استخدام موقعنا الإلكتروني أو شراء أي منتج رقمي من Pet Keeps Art.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                آخر تحديث: {BRAND.updatedAt}
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
                إذا كان هناك تعارض بين النسخ المترجمة من هذه الشروط والنسخة الإنجليزية، فإن النسخة الإنجليزية هي التي تسود إلى أقصى حد يسمح به القانون المعمول به.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  هل تحتاج إلى توضيح؟
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  إذا كانت لديك أي أسئلة حول هذه الشروط أو حول طلبك المحدد، فنحن هنا للمساعدة. تواصل معنا عبر{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#8c5b3f] underline underline-offset-4 transition hover:text-[#c86c43]"
                  >
                    {BRAND.email}
                  </a>
                  .
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={BRAND.site}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#D98962_0%,#C86C43_100%)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_20px_rgba(157,97,65,0.22)] transition hover:brightness-105 active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    العودة إلى الرئيسية
                  </Link>

                  <Link
                    href="/refund-policy-ar"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    عرض سياسة الاسترداد
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