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
  site: "/de",
  updatedAt: "11. März 2026",
};

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "1. Nutzung des Dienstes",
    body: "Durch die Nutzung dieser Website stimmst du diesen Nutzungsbedingungen zu und bestätigst, dass du in deiner Rechtsordnung volljährig bist oder diesen Dienst mit der Erlaubnis eines Elternteils oder gesetzlichen Vormunds nutzt.",
  },
  {
    icon: Download,
    title: "2. Nur digitale Produkte",
    body: "Alle auf dieser Website verkauften Produkte sind ausschließlich digitale Downloads. Es werden keine physischen Produkte versendet. Du bist dafür verantwortlich, deine Dateien nach dem Kauf herunterzuladen und sicher zu speichern.",
  },
  {
    icon: ImageIcon,
    title: "3. Foto-Uploads und Rechteinhaberschaft",
    body: "Du bestätigst, dass du das rechtliche Recht hast, jedes eingereichte Foto hochzuladen und zu verwenden. Du darfst keine Inhalte hochladen, die Urheberrechte, Markenrechte, Datenschutzrechte, Persönlichkeitsrechte, Bildrechte oder sonstige Eigentumsrechte Dritter verletzen.",
  },
  {
    icon: UserX,
    title: "4. Keine Uploads von Prominenten oder urheberrechtlich geschützten Figuren",
    body: "Du darfst keine Fotos von Prominenten, öffentlichen Personen oder urheberrechtlich geschützten Figuren (z. B. Film-, Zeichentrick- oder Videospielcharakteren) hochladen, sofern du nicht über alle erforderlichen Rechte verfügst. Wir behalten uns das Recht vor, Bestellungen mit solchen Inhalten zu stornieren.",
  },
  {
    icon: ImageIcon,
    title: "5. KI-generierte Ergebnisse",
    body: "Unsere Produkte werden mit KI-gestützten Tools erstellt. Du erkennst an, dass die Ergebnisse künstlerische Interpretationen sind; sie können im Stil variieren und möglicherweise keine 100% exakte Ähnlichkeit oder anatomische Perfektion des ursprünglichen Motivs bieten.",
  },
  {
    icon: ShieldCheck,
    title: "6. Lizenz zur persönlichen Nutzung",
    body: "Dein Kauf gewährt dir eine persönliche, nicht kommerzielle Lizenz zur privaten Anzeige, zum Verschenken und zum Drucken. Der kommerzielle Weiterverkauf, die Weiterverbreitung oder Unterlizenzierung der Dateien ist ohne vorherige schriftliche Genehmigung strengstens untersagt.",
  },
  {
    icon: RefreshCw,
    title: "7. Rückerstattungen",
    body: "Da unsere Produkte digital sind und elektronisch geliefert werden, erfolgen Rückerstattungen gemäß unserer Rückerstattungsrichtlinie. Soweit gesetzlich vorgeschrieben, richten sich etwaige Widerrufs- oder Rückerstattungsrechte nach dieser Richtlinie und dem anwendbaren Verbraucherschutzrecht.",
  },
  {
    icon: Scale,
    title: "8. Haftungsbeschränkung",
    body: "Soweit gesetzlich zulässig, haftet Pet Keeps Art nicht für indirekte, beiläufig entstandene oder Folgeschäden. Unsere Gesamthaftung für jegliche Ansprüche ist auf den Betrag beschränkt, der für die betreffende Bestellung tatsächlich bezahlt wurde.",
  },
  {
    icon: Scale,
    title: "9. Zwingende Verbraucherrechte",
    body: "Nichts in diesen Bedingungen schließt Verbraucherrechte oder Rechtsbehelfe aus, beschränkt sie oder ersetzt sie, soweit diese nach geltendem Recht nicht rechtmäßig ausgeschlossen werden können.",
  },
  {
    icon: ShieldCheck,
    title: "10. Ablehnung oder Stornierung von Bestellungen",
    body: "Wir behalten uns das Recht vor, jede Bestellung abzulehnen, auszusetzen, zu entfernen oder zu stornieren, die gegen diese Bedingungen verstößt, Rechte Dritter verletzt, verbotene Inhalte enthält oder von unseren Systemen nicht angemessen verarbeitet werden kann.",
  },
  {
    icon: ShieldCheck,
    title: "11. Verfügbarkeit des Dienstes",
    body: "Wir können jederzeit und ohne vorherige Ankündigung Teile des Dienstes aktualisieren, ändern oder einstellen. Für vorübergehende Unterbrechungen, Verzögerungen oder technische Probleme außerhalb unserer angemessenen Kontrolle übernehmen wir keine Haftung.",
  },
  {
    icon: Mail,
    title: "12. Kontakt",
    body: `Wenn du Fragen zu diesen Bedingungen hast, kontaktiere uns bitte unter ${BRAND.email}.`,
  },
];

export default function TermsDePage() {
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
                Zur Startseite
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
                Nutzungsbedingungen
              </h1>

              <p className="mt-4 max-w-[1280px] text-[14px] leading-7 text-[#7b6658] md:text-[16px]">
                Bitte lies diese Nutzungsbedingungen sorgfältig durch, bevor du unsere Website nutzt oder ein digitales Produkt von Pet Keeps Art kaufst.
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
                Falls eine übersetzte Version dieser Bedingungen mit der englischen Version in Konflikt steht, gilt im gesetzlich zulässigen Umfang die englische Version.
              </p>

              <div className="mt-10 rounded-[24px] border border-[#e8daca] bg-[linear-gradient(180deg,#fff8f0_0%,#f7ecdf_100%)] px-6 py-8 shadow-[0_10px_24px_rgba(84,58,39,0.05)] md:px-10">
                <h3 className="text-[22px] font-black text-[#2d1b12]">
                  Brauchst du eine Klarstellung?
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6a5548] md:text-[16px]">
                  Wenn du Fragen zu diesen Bedingungen oder zu deiner konkreten Bestellung hast, helfen wir dir gerne weiter. Kontaktiere uns unter{" "}
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
                    Zur Startseite
                  </Link>

                  <Link
                    href="/refund-policy-de"
                    className="inline-flex items-center rounded-full border border-[#d3c2b1] bg-white px-6 py-3.5 text-sm font-bold text-[#5d4638] transition hover:bg-[#faf3eb] active:scale-[0.98]"
                  >
                    Rückerstattungsrichtlinie ansehen
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