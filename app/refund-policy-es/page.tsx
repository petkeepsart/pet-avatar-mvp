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
  site: "/es",
  updatedAt: "11 de marzo de 2026",
};

const SECTIONS = [
  {
    icon: Receipt,
    title: "1. Resumen general",
    body: "En Pet Keepsake Studio, vendemos únicamente productos digitales personalizados. Dado que tu pedido se entrega de forma electrónica y puede crearse mediante flujos automatizados de procesamiento de imágenes después de la compra, los reembolsos, devoluciones, cambios y cancelaciones suelen estar limitados una vez que el procesamiento o la entrega han comenzado.",
  },
  {
    icon: Download,
    title: "2. Productos digitales y política de venta final",
    body: "Al comprar en nuestro sitio web, reconoces que estás adquiriendo un producto digital y no un artículo físico. Debido a la naturaleza de las descargas digitales, normalmente no ofrecemos reembolsos, devoluciones, cambios ni cancelaciones una vez que se ha realizado un pedido y ha comenzado el procesamiento o la entrega, salvo cuando lo exija la legislación aplicable o cuando se indique en esta Política de Reembolsos.",
  },
  {
    icon: ShieldCheck,
    title: "3. Si no recibiste tus archivos",
    body: "Si no recibes tu enlace de descarga, no puedes acceder a tus archivos o existe un problema técnico de entrega por nuestra parte, contáctanos. Primero trabajaremos para reenviar los archivos, restablecer el acceso o completar la entrega de otra manera antes de considerar cualquier otra solución.",
  },
  {
    icon: AlertCircle,
    title: "4. Pedidos dañados, incorrectos o duplicados",
    body: "Si se te cobró más de una vez por el mismo pedido, recibiste el archivo equivocado o los archivos entregados están claramente incompletos, inaccesibles o inutilizables debido a un problema técnico causado por nosotros, contáctanos dentro de un plazo razonable después de la entrega. Si no podemos solucionar el problema, podremos ofrecer un reemplazo, crédito en la tienda, ajuste de precio o reembolso, a nuestra discreción o cuando lo exija la legislación aplicable.",
  },
  {
    icon: AlertCircle,
    title: "5. Problemas con las fotos enviadas por el cliente",
    body: "No estamos obligados a ofrecer reembolsos por problemas causados por fotos enviadas por el cliente, incluyendo imágenes borrosas, cargas de baja calidad, rostros recortados, mala iluminación, rasgos obstruidos o fotos que no cumplan con nuestras pautas fotográficas. Revisa nuestras páginas de ejemplos y guía fotográfica antes de realizar tu pedido.",
  },
  {
    icon: PencilRuler,
    title: "6. Sin revisiones manuales",
    body: "Salvo que indiquemos expresamente lo contrario, nuestro servicio es automatizado y no ofrecemos retoques manuales gratuitos, ediciones de diseño personalizadas, cambios subjetivos de estilo ni rehacer ilimitadamente en función de preferencias personales. Las pequeñas diferencias artísticas, variaciones de diseño o interpretaciones generadas por IA no califican por sí solas para un reembolso, reemplazo o revisión manual.",
  },
  {
    icon: RefreshCw,
    title: "7. Resultados personalizados y asistidos por IA",
    body: "Nuestros productos son personalizados y pueden implicar generación o edición asistida por IA. Las pequeñas diferencias en la interpretación artística, composición, detalle de líneas, pose, expresión o estilo son una parte normal del servicio y, por sí solas, no califican para un reembolso.",
  },
  {
    icon: AlertTriangle,
    title: "8. Contáctanos antes de iniciar un contracargo",
    body: "Si crees que ha habido un problema de facturación, fallo de entrega, cargo duplicado o problema técnico con tu pedido, contáctanos antes de iniciar un contracargo bancario o de tarjeta siempre que sea posible. En muchos casos, podemos resolver el problema más rápidamente restableciendo el acceso, reenviando los archivos o revisando directamente el pedido.",
  },
  {
    icon: Scale,
    title: "9. Derechos legales",
    body: "Nada de lo dispuesto en esta Política de Reembolsos limita o excluye cualquier derecho obligatorio que puedas tener en virtud de la legislación aplicable de protección al consumidor. Cuando la ley local exija un reembolso, derecho de cancelación, reparación, reemplazo, reducción de precio u otra compensación, respetaremos esos derechos.",
  },
  {
    icon: Mail,
    title: "10. Contáctanos",
    body: `Si crees que ha habido un problema de facturación, un problema de entrega, un cargo duplicado o un error técnico con tu pedido, contáctanos en ${BRAND.email} e incluye los detalles de tu pedido para que podamos revisar el caso.`,
  },
];

export default function RefundPolicyEsPage() {
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
                Volver al inicio
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
                Política de Reembolsos
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                Revisa cuidadosamente esta Política de Reembolsos antes de comprar cualquier producto digital de {BRAND.name}.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                Última actualización: {BRAND.updatedAt}
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
                Si las versiones traducidas de esta Política de Reembolsos entran en conflicto, prevalecerá la versión en inglés en la máxima medida permitida por la legislación aplicable.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  ¿Necesitas ayuda con un pedido?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  Si tienes un problema de facturación, un problema de entrega, un cargo duplicado o una pregunta técnica,
                  contáctanos en{" "}
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
                    Volver al inicio
                  </Link>

                  <Link
                    href="/terms-es"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    Ver Términos de Servicio
                  </Link>

                  <Link
                    href="/privacy-es"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    Ver Política de Privacidad
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