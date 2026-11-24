import React from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  ClipboardList,
  Search,
  Stethoscope,
  ListChecks,
  FileText,
  ChevronRight,
} from "lucide-react";

const groups = [
  {
    label: "Pengkajian",
    items: [
      {
        title: "Pengkajian dasar",
        desc: "Data pasien lansia dari anamnesis sampai pemeriksaan fisik.",
        tags: [
          "Identitas",
          "Riwayat kesehatan",
          "Lingkungan",
          "11 pola fungsional",
          "Head-to-toe",
        ],
        icon: ClipboardCheck,
        href: "/pengkajian",
      },
      {
        title: "Pengkajian khusus",
        desc: "Instrumen skrining yang dipakai khusus untuk lansia.",
        tags: [
          "APGAR Keluarga",
          "SPMSQ",
          "MMSE",
          "Indeks Katz",
          "Screening Fall",
          "GDS",
          "Skor Norton",
        ],
        icon: ClipboardList,
        href: "/pengkajian-khusus",
      },
    ],
  },
  {
    label: "Perumusan masalah",
    items: [
      {
        title: "Analisa data",
        desc: "Kelompokkan data subjektif dan objektif untuk merumuskan masalah keperawatan.",
        icon: Search,
        href: "/analisa-data",
      },
      {
        title: "Diagnosa",
        desc: "Tetapkan diagnosa keperawatan berdasarkan prioritas masalah.",
        icon: Stethoscope,
        href: "/diagnosa",
      },
    ],
  },
  {
    label: "Perencanaan dan pelaksanaan",
    items: [
      {
        title: "Intervensi",
        desc: "Susun rencana tindakan beserta tujuan dan kriteria hasil.",
        icon: ListChecks,
        href: "/intervensi",
      },
      {
        title: "Implementasi dan evaluasi",
        desc: "Catat tindakan, evaluasi, dan checklist SOP.",
        tags: ["Evaluasi SOAP", "ROM", "Senam Otak", "Penkes TURP"],
        icon: FileText,
        href: "/implementasi-evaluasi",
      },
    ],
  },
];

export default function AlurAskep() {
  let counter = 0;

  return (
    <section id="alur" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Alur asuhan keperawatan gerontik
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Isi formulir secara berurutan, dari pengkajian sampai evaluasi.
            Data di setiap tahap menjadi dasar untuk tahap berikutnya.
          </p>
        </header>

        <div className="mt-10 space-y-10 lg:mt-0">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="pb-3 text-sm font-medium text-slate-500">
                {group.label}
              </h3>

              <ol className="divide-y divide-slate-200 border-y border-slate-200">
                {group.items.map((item) => {
                  counter += 1;
                  const number = String(counter).padStart(2, "0");
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group grid grid-cols-[1.5rem_minmax(0,1fr)_1.25rem] items-start gap-x-4 px-2 py-5 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 sm:gap-x-5 sm:px-4"
                      >
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="mt-0.5 h-6 w-6 text-slate-400 transition-colors group-hover:text-blue-700"
                        />

                        <div>
                          <h4 className="flex items-baseline gap-2 text-base font-medium text-slate-900 group-hover:text-blue-700">
                            <span className="text-sm font-normal tabular-nums text-slate-400">
                              {number}
                            </span>
                            {item.title}
                          </h4>
                          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">
                            {item.desc}
                          </p>

                          {item.tags && (
                            <ul className="mt-3 flex flex-wrap gap-1.5">
                              {item.tags.map((tag) => (
                                <li
                                  key={tag}
                                  className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-600"
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <ChevronRight
                          aria-hidden="true"
                          className="mt-1 h-5 w-5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-700"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}