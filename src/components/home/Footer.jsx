import React from "react";
import { MapPin, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="kontak"
      className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="space-y-4 lg:col-span-5 pr-0 lg:pr-8">
            <div className="flex items-center gap-3 font-bold text-lg">
              <img
                src="/logo.png"
                alt="Askep Gerontik Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="text-white tracking-tight">
                Askep<span className="text-[#238B8E]"> Gerontik</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Modul panduan dan sistem informasi asuhan keperawatan lanjut
              usia. Dilengkapi dengan format pengkajian holistik 11 Pola Gordon,
              8 instrumen skrining geriatri, SOP tindakan keperawatan, serta
              dokumentasi intervensi dan evaluasi.
            </p>
          </div>

          {/* Kolom 2: Navigasi Utama */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-[#238B8E] transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#pengkajian"
                  className="hover:text-[#238B8E] transition-colors"
                >
                  Cari Pengkajian
                </a>
              </li>
              <li>
                <a
                  href="#alur"
                  className="hover:text-[#238B8E] transition-colors"
                >
                  Alur Askep
                </a>
              </li>
              <li>
                <a
                  href="#struktur"
                  className="hover:text-[#238B8E] transition-colors"
                >
                  Struktur Pengkajian
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Modul Klinis (Section Baru) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Modul Klinis
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#layanan"
                  className="hover:text-[#238B8E] transition-colors"
                >
                  Fokus Klinis
                </a>
              </li>
              <li>
                <a
                  href="#instrumen"
                  className="hover:text-[#238B8E] transition-colors"
                >
                  8 Instrumen Skrining
                </a>
              </li>
              <li>
                <a
                  href="#tindakan"
                  className="hover:text-[#238B8E] transition-colors"
                >
                  SOP & Penkes
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#238B8E] mt-0.5 shrink-0" />
                <span>Kampus B : JL.Alternatif Cibubur KM.1</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#238B8E] shrink-0" />
                <span>021-845290</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#238B8E] shrink-0" />
                <span>www.akperberkala.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p>© 2026 Askep Gerontik. Hak Cipta Dilindungi.</p>
            <span className="hidden md:block text-slate-700">|</span>
            <p className="text-slate-500 font-medium">AKPER BWH 2026</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#238B8E] transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-[#238B8E] transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}