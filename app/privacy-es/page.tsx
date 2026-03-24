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
  site: "/es",
  updatedAt: "11 de marzo de 2026",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. Resumen general",
    body: "Esta Política de Privacidad explica cómo Pet Keeps Art recopila, utiliza, almacena y protege tu información personal cuando visitas nuestro sitio web, subes fotos, realizas un pedido o te pones en contacto con nosotros.",
  },
  {
    icon: Cookie,
    title: "2. Información que recopilamos",
    body: "Podemos recopilar la información que nos proporcionas directamente, incluyendo tu nombre, dirección de correo electrónico, fotos subidas, detalles del pedido y cualquier mensaje que nos envíes. También podemos recopilar información técnica limitada, como el tipo de navegador, tipo de dispositivo, dirección IP y datos básicos de uso necesarios para operar, proteger y mejorar el sitio web. Cuando corresponda, podemos usar cookies o tecnologías similares para funciones esenciales del sitio, medición del rendimiento y análisis.",
  },
  {
    icon: CreditCard,
    title: "3. Pagos",
    body: "Los pagos se procesan a través de proveedores de pago externos. No almacenamos el número completo de tu tarjeta de crédito en nuestros servidores. Revisa la política de privacidad de tu proveedor de pago para conocer cómo se gestiona la información de pago.",
  },
  {
    icon: Cpu,
    title: "4. Procesamiento con IA y herramientas de terceros",
    body: "Para crear y entregar nuestros productos digitales, las fotos que subes y los datos relacionados con tu pedido pueden procesarse a través de herramientas de inteligencia artificial de terceros, servicios en la nube, proveedores de almacenamiento e infraestructura técnica relacionada. Al utilizar nuestro servicio y subir una foto, entiendes y aceptas este procesamiento para la generación, cumplimiento y soporte de tu pedido.",
  },
  {
    icon: Server,
    title: "5. Cómo usamos tu información",
    body: "Usamos tu información para prestar nuestros servicios, procesar pedidos, generar productos digitales, entregar archivos, responder a solicitudes de soporte, mejorar el sitio web, supervisar el rendimiento, prevenir usos indebidos o fraude y cumplir con obligaciones legales.",
  },
  {
    icon: Globe,
    title: "6. Intercambio de datos y transferencias internacionales",
    body: "No vendemos tu información personal. Podemos compartir datos limitados con proveedores de servicios de confianza que nos ayudan a operar el sitio web, procesar pagos, almacenar archivos, generar productos, entregar bienes digitales, proporcionar servicios de correo electrónico o mantener la infraestructura técnica. Dado que estos proveedores pueden operar a nivel mundial, tu información puede procesarse o almacenarse en países fuera de tu lugar de residencia.",
  },
  {
    icon: ImageIcon,
    title: "7. Fotos subidas y archivos generados",
    body: "Las fotos subidas y los archivos generados se utilizan para crear, entregar y dar soporte a tu pedido. Solo debes subir fotos que tengas el derecho legal de utilizar. No usamos tus fotos subidas para marketing público no relacionado sin tu permiso.",
  },
  {
    icon: Trash2,
    title: "8. Conservación de datos",
    body: "Conservamos los datos personales y el contenido subido solo durante el tiempo razonablemente necesario para operar el servicio, completar tu pedido, proporcionar soporte, resolver problemas técnicos, mantener registros adecuados y cumplir con obligaciones legales o comerciales. Los archivos y el contenido subido pueden eliminarse periódicamente de los sistemas activos una vez finalizado el período de conservación aplicable.",
  },
  {
    icon: Baby,
    title: "9. Privacidad de los menores",
    body: "Nuestro sitio web y nuestros servicios no están dirigidos a menores. No recopilamos conscientemente información personal de menores de la edad exigida por la ley aplicable. Si crees que un menor nos ha proporcionado información personal, contáctanos para que podamos revisar la situación y tomar las medidas adecuadas.",
  },
  {
    icon: ShieldCheck,
    title: "10. Seguridad",
    body: "Adoptamos medidas técnicas y organizativas razonables para proteger tu información. Sin embargo, ningún sitio web, sistema de almacenamiento o transmisión por internet puede garantizarse como completamente seguro, y utilizas el servicio bajo tu propio riesgo.",
  },
  {
    icon: Mail,
    title: "11. Tus derechos de privacidad",
    body: `Dependiendo de tu ubicación y de la legislación aplicable, puedes tener derecho a solicitar acceso, corrección, eliminación o restricción del tratamiento de cierta información personal. Si deseas realizar una solicitud relacionada con la privacidad o tienes preguntas sobre esta Política de Privacidad, contáctanos en ${BRAND.email}.`,
  },
];

export default function PrivacyEsPage() {
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
                Política de Privacidad
              </h1>

              <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#7b6658] md:text-[17px]">
                Lee atentamente esta Política de Privacidad para comprender cómo recopilamos, usamos, almacenamos y protegemos tu información.
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
                Si las versiones traducidas de esta Política de Privacidad entran en conflicto, prevalecerá la versión en inglés en la máxima medida permitida por la ley aplicable.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  ¿Preguntas sobre privacidad?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  Si tienes alguna pregunta sobre esta Política de Privacidad o sobre tu información personal, nuestro equipo está aquí para ayudarte. Contáctanos en{" "}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}