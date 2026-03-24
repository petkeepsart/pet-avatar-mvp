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
  site: "/ar",
  updatedAt: "11 مارس 2026",
};

const SECTIONS = [
  {
    icon: Receipt,
    title: "1. نظرة عامة",
    body: "في Pet Keeps Art، نحن نبيع منتجات رقمية مخصصة فقط. وبما أن طلبك يتم تسليمه إلكترونيًا وقد يتم إنشاؤه من خلال سير عمل آلي لمعالجة الصور بعد الشراء، فإن المبالغ المستردة والإرجاع والاستبدال والإلغاء تكون محدودة بشكل عام بعد بدء المعالجة أو التسليم.",
  },
  {
    icon: Download,
    title: "2. المنتجات الرقمية وسياسة البيع النهائي",
    body: "من خلال الشراء من موقعنا، فإنك تقر بأنك تشتري منتجًا رقميًا وليس عنصرًا ماديًا. ونظرًا لطبيعة التنزيلات الرقمية، فإننا لا نقدم عادةً مبالغ مستردة أو إرجاعًا أو استبدالًا أو إلغاءً بعد تقديم الطلب وبدء المعالجة أو التسليم، إلا إذا كان ذلك مطلوبًا بموجب القانون المعمول به أو منصوصًا عليه في سياسة الاسترداد هذه.",
  },
  {
    icon: ShieldCheck,
    title: "3. إذا لم تستلم ملفاتك",
    body: "إذا لم تستلم رابط التنزيل الخاص بك، أو تعذر الوصول إلى ملفاتك، أو كانت هناك مشكلة تقنية في التسليم من جانبنا، فيرجى التواصل معنا. سنعمل أولًا على إعادة إرسال الملفات، أو استعادة الوصول، أو إكمال التسليم بأي طريقة مناسبة قبل النظر في أي حل آخر.",
  },
  {
    icon: AlertCircle,
    title: "4. الطلبات التالفة أو غير الصحيحة أو المكررة",
    body: "إذا تم تحصيل الرسوم منك أكثر من مرة لنفس الطلب، أو استلمت ملفًا خاطئًا، أو كانت الملفات التي تم تسليمها غير مكتملة بشكل واضح أو غير قابلة للوصول أو غير قابلة للاستخدام بسبب مشكلة تقنية ناتجة عنا، فيرجى التواصل معنا خلال فترة معقولة بعد التسليم. وإذا لم نتمكن من إصلاح المشكلة، فقد نقدم بديلًا أو رصيدًا في المتجر أو تعديلًا في السعر أو استردادًا للمبلغ وفقًا لتقديرنا أو حيثما يقتضي القانون المعمول به.",
  },
  {
    icon: AlertCircle,
    title: "5. المشكلات المتعلقة بالصور التي يرسلها العميل",
    body: "لسنا ملزمين بتقديم مبالغ مستردة للمشكلات الناتجة عن الصور التي يرسلها العميل، بما في ذلك الصور الضبابية، أو ذات الجودة المنخفضة، أو الوجوه المقتطعة، أو الإضاءة الضعيفة، أو الملامح المحجوبة، أو الصور التي لا تتوافق مع إرشادات الصور الخاصة بنا. يرجى مراجعة صفحات الأمثلة وإرشادات الصور قبل الطلب.",
  },
  {
    icon: PencilRuler,
    title: "6. لا توجد تعديلات يدوية",
    body: "ما لم نذكر خلاف ذلك صراحةً، فإن خدمتنا مؤتمتة ولا نقدم تنقيحًا يدويًا مجانيًا، أو تعديلات تصميم مخصصة، أو تغييرات أسلوبية تعتمد على التفضيل الشخصي، أو إعادة عمل غير محدودة. إن الفروقات الفنية البسيطة أو اختلافات التخطيط أو التفسير الناتج عن الذكاء الاصطناعي لا تؤهل بمفردها لاسترداد المبلغ أو الاستبدال أو المراجعة اليدوية.",
  },
  {
    icon: RefreshCw,
    title: "7. النتائج المخصصة والمدعومة بالذكاء الاصطناعي",
    body: "منتجاتنا مخصصة وقد تتضمن إنشاءً أو تحريرًا بمساعدة الذكاء الاصطناعي. والاختلافات البسيطة في التفسير الفني أو التكوين أو تفاصيل الخط أو الوضعية أو التعبير أو الأسلوب تُعد جزءًا طبيعيًا من الخدمة ولا تؤهل بمفردها لاسترداد المبلغ.",
  },
  {
    icon: AlertTriangle,
    title: "8. تواصل معنا قبل تقديم اعتراض على الدفع",
    body: "إذا كنت تعتقد أن هناك مشكلة في الفوترة، أو فشلًا في التسليم، أو رسومًا مكررة، أو مشكلة تقنية في طلبك، فيرجى التواصل معنا قبل بدء اعتراض بنكي أو اعتراض على البطاقة إن أمكن. ففي كثير من الحالات، يمكننا حل المشكلة بشكل أسرع من خلال استعادة الوصول أو إعادة إرسال الملفات أو مراجعة الطلب مباشرةً.",
  },
  {
    icon: Scale,
    title: "9. الحقوق القانونية",
    body: "لا يوجد في سياسة الاسترداد هذه ما يحد من أو يستبعد أي حقوق إلزامية قد تكون لك بموجب قوانين حماية المستهلك المعمول بها. وحيثما يتطلب القانون المحلي استردادًا أو حق إلغاء أو إصلاحًا أو استبدالًا أو تخفيضًا في السعر أو أي تعويض آخر، فإننا سنحترم تلك الحقوق.",
  },
  {
    icon: Mail,
    title: "10. التواصل معنا",
    body: `إذا كنت تعتقد أن هناك مشكلة في الفوترة، أو مشكلة في التسليم، أو رسومًا مكررة، أو خطأً تقنيًا في طلبك، فيرجى التواصل معنا على ${BRAND.email} مع تضمين تفاصيل طلبك حتى نتمكن من مراجعة المشكلة.`,
  },
];

export default function RefundPolicyArPage() {
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
                سياسة الاسترداد
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                يرجى مراجعة سياسة الاسترداد هذه بعناية قبل شراء أي منتج رقمي من {BRAND.name}.
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
                إذا كان هناك تعارض بين النسخ المترجمة من سياسة الاسترداد هذه والنسخة الإنجليزية، فإن النسخة الإنجليزية هي التي تسود إلى أقصى حد يسمح به القانون المعمول به.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  هل تحتاج إلى مساعدة بشأن طلبك؟
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  إذا كانت لديك مشكلة في الفوترة، أو مشكلة في التسليم، أو رسوم مكررة، أو سؤال تقني،
                  فتواصل معنا عبر{" "}
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
                    href="/terms-ar"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    عرض شروط الخدمة
                  </Link>

                  <Link
                    href="/privacy-ar"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    عرض سياسة الخصوصية
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