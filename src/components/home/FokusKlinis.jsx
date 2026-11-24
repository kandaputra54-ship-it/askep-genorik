import React from "react";
import {
  Accessibility,
  Brain,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function FokusKlinis() {
  return (
    <section
      id="layanan"
      className="bg-white py-20 border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
              Fokus Klinis Gerontik
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Instrumen & Manajemen Sindrom Geriatri
            </h2>
          </div>
          <a
            href="#pengkajian"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
          >
            <span>Lihat Semua Instrumen</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Mobilitas & Risiko Jatuh */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition space-y-4">
            <Accessibility
              className="w-8 h-8 text-blue-600"
              strokeWidth={1.5}
            />
            <h3 className="text-xl font-bold text-slate-900">
              Mobilitas & Pencegahan Jatuh
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Skrining keseimbangan tubuh dan mobilitas lansia untuk mendeteksi
              dini faktor risiko jatuh akibat penurunan fungsi muskuloskeletal.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/70">
              <li>• The Timed Up and Go (TUG) Test</li>
              <li>• Screening Faal Functional Reach (FR) Test</li>
            </ul>
          </div>

          {/* Card 2: Kognitif & Psikososial */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition space-y-4">
            <Brain className="w-8 h-8 text-indigo-600" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-slate-900">
              Kesehatan Kognitif & Mental
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Deteksi dini penurunan fungsi kognitif, demensia, tingkat depresi,
              serta evaluasi dukungan dan keharmonisan fungsi keluarga.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/70">
              <li>• Fungsi Intelektual (SPMSQ & MMSE)</li>
              <li>• Skala Depresi (GDS) & Fungsi Keluarga (APGAR)</li>
            </ul>
          </div>

          {/* Card 3: Integumen & Penyakit Kronis */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition space-y-4">
            <Activity className="w-8 h-8 text-sky-600" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-slate-900">
              Penyakit Kronis & Perawatan Diri
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pemantauan kemandirian aktivitas harian (ADL), risiko luka tekan
              (dekubitus), serta edukasi perawatan pasca-operasi pada lansia.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/70">
              <li>• Kemandirian Fungsional (Indeks Katz)</li>
              <li>• Risiko Dekubitus (Skala Norton) & Penkes Post TURP</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}