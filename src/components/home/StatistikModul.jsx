import React from "react";

const stats = [
  {
    value: "11",
    label: "Pola Fungsional Gordon",
    sub: "Pengkajian Holistik Dasar",
  },
  {
    value: "8",
    label: "Instrumen Skrining",
    sub: "SPMSQ, MMSE, Katz, GDS, dll",
  },
  {
    value: "5",
    label: "Tahap Dokumentasi",
    sub: "Pengkajian hingga SOAP",
  },
  {
    value: "3",
    label: "Panduan SOP & Penkes",
    sub: "Post-TURP, ROM, Senam Otak",
  },
];

export default function StatistikModul() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-12 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center"
          >
            <div className="text-3xl font-bold text-[#1E3E62]">{item.value}</div>
            <div className="text-xs font-bold text-[#238B8E] uppercase tracking-wider mt-1">
              {item.label}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}