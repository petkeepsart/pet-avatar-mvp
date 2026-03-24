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
  site: "/ar",
  updatedAt: "11 مارس 2026",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. نظرة عامة",
    body: "توضح سياسة الخصوصية هذه كيف تقوم Pet Keeps Art بجمع معلوماتك الشخصية واستخدامها وتخزينها وحمايتها عند زيارتك لموقعنا الإلكتروني، أو تحميل الصور، أو تقديم طلب، أو التواصل معنا.",
  },
  {
    icon: Cookie,
    title: "2. المعلومات التي نجمعها",
    body: "قد نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك اسمك، وعنوان بريدك الإلكتروني، والصور التي تقوم بتحميلها، وتفاصيل الطلب، وأي رسالة ترسلها إلينا. وقد نجمع أيضًا معلومات تقنية محدودة مثل نوع المتصفح، ونوع الجهاز، وعنوان IP، وبيانات الاستخدام الأساسية اللازمة لتشغيل الموقع وتأمينه وتحسينه. وعند الاقتضاء، قد نستخدم ملفات تعريف الارتباط أو تقنيات مشابهة للوظائف الأساسية للموقع وقياس الأداء والتحليلات.",
  },
  {
    icon: CreditCard,
    title: "3. المدفوعات",
    body: "تتم معالجة المدفوعات من خلال مزودي خدمات دفع من أطراف ثالثة. نحن لا نخزن رقم بطاقتك الائتمانية الكامل على خوادمنا. يرجى مراجعة سياسة الخصوصية الخاصة بمزود خدمة الدفع لديك لمعرفة كيفية التعامل مع معلومات الدفع.",
  },
  {
    icon: Cpu,
    title: "4. معالجة الذكاء الاصطناعي وأدوات الطرف الثالث",
    body: "لإنشاء منتجاتنا الرقمية وتسليمها، قد تتم معالجة الصور التي تقوم بتحميلها وبيانات الطلب ذات الصلة من خلال أدوات ذكاء اصطناعي تابعة لجهات خارجية، وخدمات سحابية، ومزودي تخزين، وبنية تقنية ذات صلة. ومن خلال استخدام خدمتنا وتحميل صورة، فإنك تفهم وتوافق على هذه المعالجة لأغراض إنشاء الطلب وتنفيذه والدعم.",
  },
  {
    icon: Server,
    title: "5. كيف نستخدم معلوماتك",
    body: "نستخدم معلوماتك لتقديم خدماتنا، ومعالجة الطلبات، وإنشاء المنتجات الرقمية، وتسليم الملفات، والرد على طلبات الدعم، وتحسين الموقع، ومراقبة الأداء، ومنع إساءة الاستخدام أو الاحتيال، والامتثال للالتزامات القانونية.",
  },
  {
    icon: Globe,
    title: "6. مشاركة البيانات وعمليات النقل الدولية",
    body: "نحن لا نبيع معلوماتك الشخصية. وقد نشارك بيانات محدودة مع مزودي خدمات موثوقين يساعدوننا في تشغيل الموقع، ومعالجة المدفوعات، وتخزين الملفات، وإنشاء المنتجات، وتسليم السلع الرقمية، وتقديم خدمات البريد الإلكتروني، أو الحفاظ على البنية التحتية التقنية. ولأن هؤلاء المزودين قد يعملون عالميًا، فقد تتم معالجة معلوماتك أو تخزينها في دول خارج مكان إقامتك.",
  },
  {
    icon: ImageIcon,
    title: "7. الصور التي يتم تحميلها والملفات التي يتم إنشاؤها",
    body: "تُستخدم الصور التي يتم تحميلها والملفات التي يتم إنشاؤها لإنشاء طلبك وتسليمه ودعمه. يجب عليك تحميل الصور التي لديك الحق القانوني في استخدامها فقط. نحن لا نستخدم الصور التي تقوم بتحميلها في التسويق العام غير المرتبط بخدمتنا دون إذنك.",
  },
  {
    icon: Trash2,
    title: "8. الاحتفاظ بالبيانات",
    body: "نحتفظ بالبيانات الشخصية والمحتوى الذي يتم تحميله فقط طالما كان ذلك ضروريًا بشكل معقول لتشغيل الخدمة، وإكمال طلبك، وتقديم الدعم، وحل المشكلات التقنية، والاحتفاظ بالسجلات المناسبة، والوفاء بالالتزامات القانونية أو التجارية. وقد يتم حذف الملفات والمحتوى الذي يتم تحميله بشكل دوري من الأنظمة النشطة بعد انتهاء فترة الاحتفاظ المعمول بها.",
  },
  {
    icon: Baby,
    title: "9. خصوصية الأطفال",
    body: "موقعنا الإلكتروني وخدماتنا ليست موجهة إلى الأطفال. نحن لا نجمع عن علم معلومات شخصية من الأطفال دون السن المطلوب بموجب القانون المعمول به. وإذا كنت تعتقد أن طفلًا قد قدم لنا معلومات شخصية، يرجى التواصل معنا حتى نتمكن من مراجعة الأمر واتخاذ الإجراء المناسب.",
  },
  {
    icon: ShieldCheck,
    title: "10. الأمان",
    body: "نتخذ خطوات تقنية وتنظيمية معقولة لحماية معلوماتك. ومع ذلك، لا يمكن ضمان أن يكون أي موقع إلكتروني أو نظام تخزين أو نقل عبر الإنترنت آمنًا بالكامل، وأنت تستخدم الخدمة على مسؤوليتك الخاصة.",
  },
  {
    icon: Mail,
    title: "11. حقوق الخصوصية الخاصة بك",
    body: `اعتمادًا على موقعك والقانون المعمول به، قد تكون لديك حقوق لطلب الوصول إلى بعض المعلومات الشخصية أو تصحيحها أو حذفها أو تقييد معالجتها. وإذا كنت ترغب في تقديم طلب متعلق بالخصوصية أو كانت لديك أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر ${BRAND.email}.`,
  },
];

export default function PrivacyArPage() {
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
                سياسة الخصوصية
              </h1>

              <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#7b6658] md:text-[17px]">
                يرجى قراءة سياسة الخصوصية هذه بعناية لفهم كيفية جمع معلوماتك واستخدامها وتخزينها وحمايتها.
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
                إذا كان هناك تعارض بين النسخ المترجمة من سياسة الخصوصية هذه والنسخة الإنجليزية، فإن النسخة الإنجليزية هي التي تسود إلى أقصى حد يسمح به القانون المعمول به.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  هل لديك أسئلة حول الخصوصية؟
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه أو معلوماتك الشخصية،
                  فإن فريقنا هنا للمساعدة. تواصل معنا عبر{" "}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}