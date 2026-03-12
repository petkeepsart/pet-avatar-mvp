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
  site: "/es",
  updatedAt: "11 de marzo de 2026",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. Uso del servicio",
    body: "Al utilizar este sitio web, aceptas estos Términos de Servicio y confirmas que tienes la mayoría de edad legal en tu jurisdicción, o que utilizas este servicio con el permiso de un padre, madre o tutor legal.",
  },
  {
    icon: Download,
    title: "2. Solo productos digitales",
    body: "Todos los productos vendidos en este sitio son únicamente descargas digitales. No se envían productos físicos. Eres responsable de descargar y guardar tus archivos después de la compra.",
  },
  {
    icon: ImageIcon,
    title: "3. Subida de fotos y titularidad",
    body: "Confirmas que tienes el derecho legal de subir y utilizar cualquier foto enviada. No debes subir contenido que infrinja los derechos de autor, marcas registradas, privacidad, derechos de imagen, derechos de publicidad u otros derechos de propiedad de terceros.",
  },
  {
    icon: UserX,
    title: "4. No se permiten fotos de celebridades ni personajes protegidos por derechos de autor",
    body: "No puedes subir fotos de celebridades, figuras públicas ni personajes protegidos por derechos de autor (por ejemplo, personajes de películas, dibujos animados o videojuegos), salvo que poseas todos los derechos necesarios. Nos reservamos el derecho de cancelar pedidos que incluyan dicho contenido.",
  },
  {
    icon: ImageIcon,
    title: "5. Resultados generados por IA",
    body: "Nuestros productos se crean con herramientas asistidas por IA. Reconoces que los resultados son interpretaciones artísticas; pueden variar en estilo y no proporcionar una semejanza 100% exacta ni una perfección anatómica total respecto al sujeto original.",
  },
  {
    icon: ShieldCheck,
    title: "6. Licencia de uso personal",
    body: "Tu compra te concede una licencia personal y no comercial para exhibición personal, regalo e impresión. Queda estrictamente prohibida la reventa comercial, redistribución o sublicencia de los archivos sin autorización previa por escrito.",
  },
  {
    icon: RefreshCw,
    title: "7. Reembolsos",
    body: "Debido a que nuestros productos son digitales y se entregan electrónicamente, los reembolsos se gestionan conforme a nuestra Política de Reembolsos. Cuando lo exija la ley aplicable, cualquier derecho de cancelación o reembolso se regirá por dicha política y por la legislación de consumo aplicable.",
  },
  {
    icon: Scale,
    title: "8. Limitación de responsabilidad",
    body: "En la máxima medida permitida por la ley, Pet Keepsake Studio no será responsable de daños indirectos, incidentales o consecuentes. Nuestra responsabilidad total por cualquier reclamación no excederá el importe pagado por el pedido específico.",
  },
  {
    icon: Scale,
    title: "9. Derechos obligatorios del consumidor",
    body: "Nada de lo dispuesto en estos Términos excluye, limita o sustituye los derechos o recursos del consumidor que no puedan excluirse legalmente conforme a la ley aplicable.",
  },
  {
    icon: ShieldCheck,
    title: "10. Rechazo o cancelación de pedidos",
    body: "Nos reservamos el derecho de rechazar, suspender, eliminar o cancelar cualquier pedido que infrinja estos Términos, viole derechos de terceros, contenga contenido prohibido o no pueda ser procesado razonablemente por nuestros sistemas.",
  },
  {
    icon: ShieldCheck,
    title: "11. Disponibilidad del servicio",
    body: "Podemos actualizar, modificar o interrumpir cualquier parte del servicio en cualquier momento y sin previo aviso. No somos responsables de interrupciones temporales ni de problemas técnicos fuera de nuestro control razonable.",
  },
  {
    icon: Mail,
    title: "12. Contacto",
    body: `Si tienes preguntas sobre estos Términos, contáctanos en ${BRAND.email}.`,
  },
];

export default function TermsEsPage() {
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
                Términos de Servicio
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                Lee atentamente estos Términos antes de usar nuestro sitio web o comprar cualquier producto digital de Pet Keepsake Studio.
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
                Si una versión traducida de estos Términos entra en conflicto con la versión en inglés, prevalecerá la versión en inglés en la máxima medida permitida por la ley aplicable.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  ¿Necesitas aclaración?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  Si tienes alguna pregunta sobre estos Términos o sobre tu pedido específico, estaremos encantados de ayudarte. Contáctanos en{" "}
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
                    href="/refund-policy-es"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    Ver Política de Reembolsos
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