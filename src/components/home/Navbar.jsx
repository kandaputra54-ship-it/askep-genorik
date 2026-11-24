import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Askep Gerontik Logo"
            className="h-11 w-auto object-contain"
          />
          <div className="flex flex-col justify-center">
            <span className="text-xl font-bold tracking-tight text-[#1E3E62] leading-none">
              Askep<span className="text-[#238B8E]"> Gerontik</span>
            </span>
            <span className="text-[9px] text-slate-500 font-semibold tracking-tight mt-1 leading-none">
              Pendampingan & Asuhan Keperawatan Lansia Terpadu
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <a href="#" className="text-blue-600 font-semibold">
            Beranda
          </a>
          <a href="#pengkajian" className="hover:text-blue-600 transition">
            Pengkajian Lansia
          </a>
          <a href="#layanan" className="hover:text-blue-600 transition">
            Fokus Asuhan
          </a>
          <a href="#alur" className="hover:text-blue-600 transition">
            Alur Askep
          </a>
          <a href="#kontak" className="hover:text-blue-600 transition">
            Kontak Unit
          </a>
        </nav>

        {/* CTA Button */}
        <div>
          <a
            href="#pengkajian"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition inline-flex items-center gap-2"
          >
            <span>Mulai Pengkajian</span>
          </a>
        </div>
      </div>
    </header>
  );
}