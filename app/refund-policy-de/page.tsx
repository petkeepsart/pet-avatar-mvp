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
  site: "/de",
  updatedAt: "11. März 2026",
};

const SECTIONS = [
  {
    icon: Receipt,
    title: "1. Überblick",
    body: "Bei Pet Keepsake Studio verkaufen wir ausschließlich personalisierte digitale Produkte. Da deine Bestellung elektronisch geliefert wird und nach dem Kauf durch automatisierte Bildverarbeitungsabläufe erstellt werden kann, sind Rückerstattungen, Rückgaben, Umtausch und Stornierungen im Allgemeinen eingeschränkt, sobald die Bearbeitung oder Lieferung begonnen hat.",
  },
  {
    icon: Download,
    title: "2. Digitale Produkte und endgültige Verkaufsrichtlinie",
    body: "Mit dem Kauf über unsere Website bestätigst du, dass du ein digitales Produkt und keinen physischen Artikel kaufst. Aufgrund der Natur digitaler Downloads bieten wir normalerweise keine Rückerstattungen, Rückgaben, Umtausch oder Stornierungen an, nachdem eine Bestellung aufgegeben wurde und die Bearbeitung oder Lieferung begonnen hat, außer wenn dies nach geltendem Recht erforderlich ist oder in dieser Rückerstattungsrichtlinie ausdrücklich angegeben wird.",
  },
  {
    icon: ShieldCheck,
    title: "3. Wenn du deine Dateien nicht erhalten hast",
    body: "Wenn du deinen Download-Link nicht erhältst, auf deine Dateien nicht zugegriffen werden kann oder auf unserer Seite ein technisches Lieferproblem besteht, kontaktiere uns bitte. Wir werden zunächst versuchen, die Dateien erneut zu senden, den Zugriff wiederherzustellen oder die Lieferung anderweitig abzuschließen, bevor wir eine weitere Lösung in Betracht ziehen.",
  },
  {
    icon: AlertCircle,
    title: "4. Beschädigte, falsche oder doppelte Bestellungen",
    body: "Wenn dir für dieselbe Bestellung mehr als einmal etwas berechnet wurde, du die falsche Datei erhalten hast oder deine gelieferten Dateien aufgrund eines von uns verursachten technischen Problems eindeutig unvollständig, unzugänglich oder unbrauchbar sind, kontaktiere uns bitte innerhalb einer angemessenen Zeit nach der Lieferung. Wenn wir das Problem nicht beheben können, können wir nach eigenem Ermessen oder soweit gesetzlich vorgeschrieben einen Ersatz, Store-Guthaben, eine Preisanpassung oder eine Rückerstattung anbieten.",
  },
  {
    icon: AlertCircle,
    title: "5. Probleme mit vom Kunden eingereichten Fotos",
    body: "Wir sind nicht verpflichtet, Rückerstattungen für Probleme zu gewähren, die durch vom Kunden eingereichte Fotos verursacht werden, einschließlich unscharfer Bilder, Uploads mit niedriger Qualität, abgeschnittener Gesichter, schlechter Beleuchtung, verdeckter Merkmale oder Fotos, die nicht unseren Foto-Richtlinien entsprechen. Bitte sieh dir vor der Bestellung unsere Beispiel- und Fotoanleitungsseiten an.",
  },
  {
    icon: PencilRuler,
    title: "6. Keine manuellen Überarbeitungen",
    body: "Sofern wir nicht ausdrücklich etwas anderes angeben, ist unser Service automatisiert und wir bieten keine kostenlosen manuellen Retuschen, individuellen Designanpassungen, subjektiven Stiländerungen oder unbegrenzten Überarbeitungen auf Grundlage persönlicher Vorlieben an. Geringfügige künstlerische Unterschiede, Layout-Abweichungen oder KI-generierte Interpretationen berechtigen für sich genommen nicht zu einer Rückerstattung, einem Ersatz oder einer manuellen Überarbeitung.",
  },
  {
    icon: RefreshCw,
    title: "7. Personalisierte und KI-gestützte Ergebnisse",
    body: "Unsere Produkte sind personalisiert und können KI-gestützte Generierung oder Bearbeitung beinhalten. Geringfügige Unterschiede in künstlerischer Interpretation, Komposition, Linienführung, Pose, Ausdruck oder Stil sind ein normaler Teil des Services und berechtigen für sich genommen nicht zu einer Rückerstattung.",
  },
  {
    icon: AlertTriangle,
    title: "8. Kontaktiere uns vor einer Rückbuchung",
    body: "Wenn du glaubst, dass es ein Abrechnungsproblem, einen Lieferfehler, eine doppelte Belastung oder ein technisches Problem mit deiner Bestellung gibt, kontaktiere uns bitte möglichst vor der Einleitung einer Bank- oder Kartenrückbuchung. In vielen Fällen können wir das Problem schneller lösen, indem wir den Zugriff wiederherstellen, Dateien erneut senden oder die Bestellung direkt prüfen.",
  },
  {
    icon: Scale,
    title: "9. Gesetzliche Rechte",
    body: "Nichts in dieser Rückerstattungsrichtlinie beschränkt oder schließt zwingende Rechte aus, die du möglicherweise nach geltendem Verbraucherschutzrecht hast. Soweit örtliches Recht eine Rückerstattung, ein Widerrufsrecht, eine Reparatur, einen Ersatz, eine Preisreduzierung oder einen anderen Rechtsbehelf verlangt, werden wir diese Rechte respektieren.",
  },
  {
    icon: Mail,
    title: "10. Kontaktiere uns",
    body: `Wenn du glaubst, dass es ein Abrechnungsproblem, ein Lieferproblem, eine doppelte Belastung oder einen technischen Fehler bei deiner Bestellung gegeben hat, kontaktiere uns bitte unter ${BRAND.email} und füge deine Bestelldaten bei, damit wir den Fall prüfen können.`,
  },
];

export default function RefundPolicyDePage() {
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
                Rückerstattungsrichtlinie
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                Bitte lies diese Rückerstattungsrichtlinie sorgfältig durch, bevor du ein digitales Produkt von {BRAND.name} kaufst.
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
                Falls übersetzte Versionen dieser Rückerstattungsrichtlinie im Widerspruch stehen, ist die englische Version im größtmöglichen, nach geltendem Recht zulässigen Umfang maßgeblich.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  Brauchst du Hilfe mit einer Bestellung?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  Wenn du ein Abrechnungsproblem, ein Lieferproblem, eine doppelte Belastung oder eine technische Frage hast,
                  kontaktiere uns unter{" "}
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

                  <Link
                    href="/privacy-de"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    Datenschutzrichtlinie ansehen
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