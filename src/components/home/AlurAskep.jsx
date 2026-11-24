import React from "react";
import {
  ClipboardCheck,
  Search,
  Stethoscope,
  Users,
  FileSpreadsheet,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Pengkajian",
    desc: "Anamnesis riwayat kesehatan, pola fungsional (11 pola), pemeriksaan fisik, serta skrining khusus (MMSE, Katz, APGAR, GDS, dll).",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "Analisa Data",
    desc: "Mengelompokkan data subjektif dan objektif yang ditemukan untuk merumuskan masalah keperawatan yang muncul.",
    icon: Search,
  },
  {
    step: "03",
    title: "Diagnosa",
    desc: "Penetapan diagnosa keperawatan berdasarkan prioritas masalah yang ditemukan dari hasil analisa data.",
    icon: Stethoscope,
  },
  {
    step: "04",
    title: "Intervensi",
    desc: "Menyusun rencana tindakan keperawatan beserta tujuan dan kriteria hasil yang ingin dicapai.",
    icon: Users,
  },
  {
    step: "05",
    title: "Implementasi & Evaluasi",
    desc: "Melaksanakan tindakan keperawatan dan mencatat evaluasi (SOAP) untuk memantau perkembangan kondisi lansia.",
    icon: FileSpreadsheet,
  },
];

export default function AlurAskep() {
  return (
    <section id="alur" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Alur Asuhan Keperawatan
        </h2>
        <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
          Pendekatan sistematis dan holistik untuk memastikan setiap lansia
          mendapatkan perawatan yang aman, bermartabat, dan optimal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition relative group"
            >
              <div className="flex items-start justify-between mb-6">
                <Icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                <span className="text-3xl font-bold text-slate-100 font-mono tracking-tighter">
                  {item.step}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}