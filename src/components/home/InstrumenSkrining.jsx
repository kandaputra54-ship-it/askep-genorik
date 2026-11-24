import React from "react";
import {
  Brain,
  FileCheck2,
  Accessibility,
  Users,
  Smile,
  Footprints,
  Timer,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

const instruments = [
  {
    code: "SPMSQ",
    name: "Short Portable Mental Status Questionnaire",
    category: "Fungsi Kognitif",
    detail: "10 item evaluasi orientasi waktu, tempat, & memori dasar lansia",
    icon: Brain,
  },
  {
    code: "MMSE",
    name: "Mini-Mental State Examination",
    category: "Fungsi Kognitif",
    detail: "30 poin penilaian orientasi, registrasi, perhatian, kalkulasi, & bahasa",
    icon: FileCheck2,
  },
  {
    code: "Indeks Katz",
    name: "Indeks Kemandirian Aktivitas Harian",
    category: "Status Fungsional",
    detail: "Evaluasi 6 ADL dasar: mandi, berpakaian, ke kamar kecil, berpindah, kontinen, & makan",
    icon: Accessibility,
  },
  {
    code: "APGAR",
    name: "APGAR Keluarga Lansia",
    category: "Fungsi Keluarga",
    detail: "5 aspek dukungan keluarga: Adaptation, Partnership, Growth, Affection, & Resolve",
    icon: Users,
  },
  {
    code: "GDS-15",
    name: "Geriatric Depression Scale",
    category: "Psikologis",
    detail: "15 pertanyaan skrining kesejahteraan emosional dan suasana hati lansia",
    icon: Smile,
  },
  {
    code: "FR Test",
    name: "Functional Reach Test",
    category: "Risiko Jatuh",
    detail: "Pengukuran jangkauan keseimbangan tubuh saat condong ke depan tanpa melangkah",
    icon: Footprints,
  },
  {
    code: "TUG Test",
    name: "The Timed Up and Go Test",
    category: "Risiko Jatuh",
    detail: "Pengukuran waktu mobilitas berdiri dari kursi, berjalan 3 meter, dan kembali duduk",
    icon: Timer,
  },
  {
    code: "Skala Norton",
    name: "Penilaian Integritas Kulit & Dekubitus",
    category: "Integritas Kulit",
    detail: "Evaluasi 5 parameter: kondisi fisik, kesadaran, aktivitas, mobilitas, & inkontinensia",
    icon: ShieldAlert,
  },
];

export default function InstrumenSkrining() {
  return (
    <section
      id="instrumen"
      className="bg-slate-50 py-20 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
            Pengkajian Khusus Terlampir
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            8 Instrumen Skrining Geriatri
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
            Instrumen pengkajian geriatri komprehensif untuk membantu perawat
            mengevaluasi fungsi kognitif, kemandirian, psikologis, hingga
            mobilitas lansia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instruments.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.code}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {item.code}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href="#pengkajian"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <span>Gunakan Instrumen</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}