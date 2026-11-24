import React from "react";
import { Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative text-white pt-16 pb-28 md:pt-24 md:pb-36 overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.webp')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-900/45 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] tracking-tight drop-shadow-sm">
            Pendampingan & Asuhan Keperawatan Lansia Terpadu.
          </h1>

          <p className="text-slate-100 text-base md:text-lg max-w-xl leading-relaxed font-normal drop-shadow-sm">
            Tingkatkan kualitas hidup lanjut usia melalui pengkajian geriatri
            paripurna, deteksi dini sindrom geriatri, serta perencanaan
            intervensi berbasis bukti.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#pengkajian"
              className="px-6 py-3.5 bg-white text-blue-700 font-semibold text-sm rounded-lg shadow-md hover:bg-blue-50 transition"
            >
              Mulai Pengkajian
            </a>
            <a
              href="#kontak"
              className="px-6 py-3.5 border border-white/60 bg-blue-950/30 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-sm rounded-lg transition inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Konsultasi Perawat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}