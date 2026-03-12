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
  site: "/de",
  updatedAt: "11. März 2026",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. Überblick",
    body: "Diese Datenschutzrichtlinie erläutert, wie Pet Keepsake Studio deine personenbezogenen Daten erhebt, verwendet, speichert und schützt, wenn du unsere Website besuchst, Fotos hochlädst, eine Bestellung aufgibst oder uns kontaktierst.",
  },
  {
    icon: Cookie,
    title: "2. Welche Informationen wir erfassen",
    body: "Wir können Informationen erfassen, die du uns direkt bereitstellst, einschließlich deines Namens, deiner E-Mail-Adresse, hochgeladener Fotos, Bestelldaten und aller Nachrichten, die du uns sendest. Außerdem können wir begrenzte technische Informationen erfassen, wie Browsertyp, Gerätetyp, IP-Adresse und grundlegende Nutzungsdaten, die für den Betrieb, die Sicherheit und die Verbesserung der Website erforderlich sind. Soweit anwendbar, können wir Cookies oder ähnliche Technologien für wesentliche Website-Funktionen, Leistungsmessung und Analysen verwenden.",
  },
  {
    icon: CreditCard,
    title: "3. Zahlungen",
    body: "Zahlungen werden über Drittanbieter von Zahlungsdiensten verarbeitet. Wir speichern deine vollständige Kreditkartennummer nicht auf unseren Servern. Bitte lies die Datenschutzrichtlinie deines Zahlungsanbieters, um zu erfahren, wie Zahlungsinformationen verarbeitet werden.",
  },
  {
    icon: Cpu,
    title: "4. KI-Verarbeitung und Tools von Drittanbietern",
    body: "Um unsere digitalen Produkte zu erstellen und bereitzustellen, können deine hochgeladenen Fotos und zugehörigen Bestelldaten durch KI-Tools von Drittanbietern, Cloud-Dienste, Speicheranbieter und zugehörige technische Infrastruktur verarbeitet werden. Durch die Nutzung unseres Dienstes und das Hochladen eines Fotos verstehst du diese Verarbeitung und stimmst ihr für die Erstellung, Abwicklung und Unterstützung deiner Bestellung zu.",
  },
  {
    icon: Server,
    title: "5. Wie wir deine Informationen verwenden",
    body: "Wir verwenden deine Informationen, um unsere Dienste bereitzustellen, Bestellungen zu verarbeiten, digitale Produkte zu erstellen, Dateien zu liefern, Support-Anfragen zu beantworten, die Website zu verbessern, die Leistung zu überwachen, Missbrauch oder Betrug zu verhindern und rechtlichen Verpflichtungen nachzukommen.",
  },
  {
    icon: Globe,
    title: "6. Datenweitergabe und internationale Übermittlungen",
    body: "Wir verkaufen deine personenbezogenen Daten nicht. Wir können begrenzte Daten an vertrauenswürdige Dienstleister weitergeben, die uns beim Betrieb der Website, bei der Zahlungsabwicklung, Dateispeicherung, Produkterstellung, Lieferung digitaler Güter, Bereitstellung von E-Mail-Diensten oder der technischen Infrastruktur unterstützen. Da diese Anbieter weltweit tätig sein können, können deine Informationen in Ländern außerhalb deines Wohnsitzes verarbeitet oder gespeichert werden.",
  },
  {
    icon: ImageIcon,
    title: "7. Hochgeladene Fotos und erstellte Dateien",
    body: "Hochgeladene Fotos und erstellte Dateien werden verwendet, um deine Bestellung zu erstellen, bereitzustellen und zu unterstützen. Du solltest nur Fotos hochladen, für deren Nutzung du das gesetzliche Recht hast. Wir verwenden deine hochgeladenen Fotos nicht ohne deine Zustimmung für nicht damit zusammenhängendes öffentliches Marketing.",
  },
  {
    icon: Trash2,
    title: "8. Datenspeicherung",
    body: "Wir bewahren personenbezogene Daten und hochgeladene Inhalte nur so lange auf, wie es vernünftigerweise erforderlich ist, um den Dienst zu betreiben, deine Bestellung abzuschließen, Support bereitzustellen, technische Probleme zu lösen, angemessene Aufzeichnungen zu führen und rechtliche oder geschäftliche Verpflichtungen zu erfüllen. Dateien und hochgeladene Inhalte können nach Ablauf der geltenden Aufbewahrungsfrist regelmäßig aus aktiven Systemen gelöscht werden.",
  },
  {
    icon: Baby,
    title: "9. Datenschutz von Kindern",
    body: "Unsere Website und unsere Dienste richten sich nicht an Kinder. Wir erfassen wissentlich keine personenbezogenen Daten von Kindern unter dem nach geltendem Recht vorgeschriebenen Mindestalter. Wenn du glaubst, dass uns ein Kind personenbezogene Daten bereitgestellt hat, kontaktiere uns bitte, damit wir den Sachverhalt prüfen und geeignete Maßnahmen ergreifen können.",
  },
  {
    icon: ShieldCheck,
    title: "10. Sicherheit",
    body: "Wir ergreifen angemessene technische und organisatorische Maßnahmen, um deine Informationen zu schützen. Allerdings kann keine Website, kein Speichersystem und keine Internetübertragung vollständig sicher garantiert werden, und du nutzt den Dienst auf eigenes Risiko.",
  },
  {
    icon: Mail,
    title: "11. Deine Datenschutzrechte",
    body: `Abhängig von deinem Standort und dem anwendbaren Recht hast du möglicherweise das Recht, Zugang zu bestimmten personenbezogenen Daten zu verlangen, diese zu berichtigen, zu löschen oder ihre Verarbeitung einzuschränken. Wenn du eine datenschutzbezogene Anfrage stellen möchtest oder Fragen zu dieser Datenschutzrichtlinie hast, kontaktiere uns bitte unter ${BRAND.email}.`,
  },
];

export default function PrivacyDePage() {
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
                Zurück zur Startseite
              </Link>

              <div className="text-sm font-semibold text-[#8a6c58]">
                {BRAND.name}
              </div>
            </div>
          </div>

          <div className="px-5 py-8 md:px-10 md:py-12">
            <div className="mx-auto max-w-[1080px]">
              <div className="inline-flex rounded-full border border-[#e4d4c4] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b6c59] shadow-sm">
                Rechtliches
              </div>

              <h1 className="mt-4 font-serif text-[38px] font-black leading-[1.1] tracking-[-0.04em] text-[#24150f] md:text-[56px]">
                Datenschutzrichtlinie
              </h1>

              <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#7b6658] md:text-[17px]">
                Bitte lies diese Datenschutzrichtlinie sorgfältig durch, um zu verstehen, wie wir deine Informationen erfassen, verwenden, speichern und schützen.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f3e8dc] px-4 py-2 text-[13px] font-semibold text-[#7a5f4d]">
                Zuletzt aktualisiert: {BRAND.updatedAt}
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
                Falls übersetzte Versionen dieser Datenschutzrichtlinie im Widerspruch stehen, ist die englische Version im größtmöglichen, nach geltendem Recht zulässigen Umfang maßgeblich.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  Fragen zum Datenschutz?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  Wenn du Fragen zu dieser Datenschutzrichtlinie oder zu deinen personenbezogenen Daten hast, hilft dir unser Team gerne weiter. Kontaktiere uns unter{" "}
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
                    Zurück zur Startseite
                  </Link>

                  <Link
                    href="/terms-de"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    Nutzungsbedingungen ansehen
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