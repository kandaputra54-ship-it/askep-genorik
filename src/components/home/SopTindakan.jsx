import React from "react";
import { BookOpenCheck, Activity, Sparkles } from "lucide-react";

const procedures = [
  {
    badge: "Edukasi Pasca-Operasi",
    title: "Penkes Post-TURP",
    desc: "Panduan edukasi perawatan klien pasca-operasi prostat untuk mencegah perdarahan dan sumbatan aliran urin.",
    icon: BookOpenCheck,
    points: [
      "Fungsi 3 jalur three-way catheter (pengunci, irigator, saluran urin) & fiksasi paha",
      "Pengaturan kecepatan aliran irigator berdasarkan warna urin hingga 24 jam pasca-lepas fiksasi",
      "Mobilisasi bertahap (mika-miki saat terfiksasi), diet tinggi protein, & intake cairan ± 3.000 ml/hari",
    ],
  },
  {
    badge: "Terapi Fisik & Sendi",
    title: "Latihan Rentang Gerak (ROM)",
    desc: "Prosedur latihan gerak aktif maupun pasif untuk mempertahankan fleksibilitas sendi dan mencegah kontraktur.",
    icon: Activity,
    points: [
      "Pengkajian toleransi gerakan & penentuan teknik ROM (aktif atau pasif)",
      "Gerakan sendi bahu (fleksi, ekstensi, abduksi, adduksi, rotasi) & siku (fleksi, ekstensi, pronasi, supinasi)",
      "Gerakan pergelangan tangan (fleksi ulnar & radial) serta jari tangan (hiperekstensi & oposisi)",
    ],
  },
  {
    badge: "Stimulasi Kognitif",
    title: "Senam Otak Lansia (Brain Gym)",
    desc: "Rangkaian gerakan koordinasi ringan untuk menjaga kebugaran otak, keseimbangan, dan konsentrasi lansia.",
    icon: Sparkles,
    points: [
      "Alternating: Gerakan bergantian tangan ke atas samping & kaki berlawanan ke samping",
      "Crossing the Midline: Lutut diangkat menyentuh siku tangan yang berlawanan di tengah tubuh",
      "Eye Movement Rainbow (gerakan mata mengikuti ibu jari) & Stretching otot bahu 4 penjuru",
    ],
  },
];

export default function SopTindakan() {
  return (
    <section
      id="tindakan"
      className="bg-white py-20 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#238B8E] font-semibold text-xs uppercase tracking-wider">
            Lampiran Tindakan Keperawatan
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Panduan SOP Intervensi & Penkes Gerontik
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
            Terstruktur sistematis mulai dari Fase Orientasi, Fase Kerja, Fase
            Terminasi, hingga aspek komunikasi terapeutik & keselamatan pasien.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {procedures.map((proc, index) => {
            const Icon = proc.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7 flex flex-col justify-between hover:border-[#238B8E]/50 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#238B8E]/10 text-[#238B8E]">
                      {proc.badge}
                    </span>
                    <Icon className="w-6 h-6 text-[#1E3E62]" strokeWidth={1.6} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {proc.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {proc.desc}
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200/70 pt-4">
                    {proc.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#238B8E] font-bold">•</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Fase Orientasi • Kerja • Terminasi</span>
                  <span className="text-[#1E3E62] font-semibold">Checklist SOP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}