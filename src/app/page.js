import React from "react";
import {
  HeartHandshake,
  Phone,
  Search,
  Calendar,
  Activity,
  Brain,
  Accessibility,
  MapPin,
  Mail,
  ClipboardCheck,
  Users,
  Stethoscope,
  ArrowRight,
  FileSpreadsheet,
  ArrowUpRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Main Navbar */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2.5">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Askep<span className="text-blue-600"> Gerontik</span>
            </span>
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

      {/* Hero Section (Background Image + Light Gradient Overlay) */}
      <section className="relative text-white pt-16 pb-28 md:pt-24 md:pb-36 overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.webp')", // Sesuaikan nama file gambar di folder public/
          }}
        />

        {/* Gradient Overlay Tipis (Pekat di kiri untuk teks, transparan di kanan untuk gambar) */}
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

      {/* Floating Search / Quick Filter Bar (Matching Reference Style) */}
      <section
        id="pengkajian"
        className="max-w-5xl mx-auto px-6 -mt-12 relative z-20"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-4">
              <select
                aria-label="Pilih Bagian Pengkajian"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="">Pilih Bagian Form Pengkajian...</option>
                <optgroup label="1. Pengkajian Dasar">
                  <option value="identitas">
                    Identitas & Riwayat Pekerjaan
                  </option>
                  <option value="lingkungan">Lingkungan Tempat Tinggal</option>
                  <option value="riwayat-kesehatan">Riwayat Kesehatan</option>
                  <option value="pola-fungsional">
                    Pola Fungsional Gordon (11 Pola)
                  </option>
                  <option value="pemeriksaan-fisik">
                    Pemeriksaan Fisik & TTV
                  </option>
                </optgroup>
                <optgroup label="2. Instrumen Pengkajian Khusus">
                  <option value="spmsq">Fungsi Kognitif (SPMSQ)</option>
                  <option value="mmse">Fungsi Kognitif (MMSE)</option>
                  <option value="katz">Status Fungsional (Indeks Katz)</option>
                  <option value="apgar">Fungsi Keluarga (APGAR)</option>
                  <option value="gds">Skala Depresi (GDS)</option>
                  <option value="jatuh">
                    Skrining Risiko Jatuh (TUG & FR Test)
                  </option>
                  <option value="norton">
                    Risiko Dekubitus (Skala Norton)
                  </option>
                </optgroup>
                <optgroup label="3. Dokumentasi Asuhan">
                  <option value="analisa-data">Analisa Data</option>
                  <option value="diagnosa">Daftar Diagnosa Keperawatan</option>
                  <option value="intervensi">Intervensi Keperawatan</option>
                  <option value="implementasi">Implementasi & Evaluasi</option>
                  <option value="lampiran">Lampiran (Penkes TURP, dll)</option>
                </optgroup>
              </select>
            </div>

            <div className="md:col-span-6 relative">
              <input
                type="text"
                placeholder="Cari diagnosa SDKI, instrumen skrining, atau keluhan lansia..."
                className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition shadow-sm"
              >
                Cari Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (Alur Asuhan Keperawatan Gerontik) */}
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

        {/* Grid diubah menjadi 5 kolom karena ada 5 tahapan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
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
              icon: Search, // Menggunakan ikon Search untuk analisa
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
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition relative group"
              >
                {/* Ikon Polos & Angka Watermark */}
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

      {/* Clinical Focus Areas (Fokus Pelayanan Gerontik) */}
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
                Skrining keseimbangan tubuh dan mobilitas lansia untuk
                mendeteksi dini faktor risiko jatuh akibat penurunan fungsi
                muskuloskeletal.
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
                Deteksi dini penurunan fungsi kognitif, demensia, tingkat
                depresi, serta evaluasi dukungan dan keharmonisan fungsi
                keluarga.
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

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
            {/* Kolom 1: Brand & Deskripsi */}
            <div className="space-y-4 lg:col-span-2 pr-0 lg:pr-12">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <HeartHandshake className="w-6 h-6 text-blue-500" />
                <span>Askep Gerontik</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Modul panduan dan sistem informasi asuhan keperawatan lanjut
                usia. Dilengkapi dengan format pengkajian holistik, instrumen
                skrining (SPMSQ, MMSE, Katz, APGAR, dll), serta dokumentasi
                intervensi dan evaluasi.
              </p>
            </div>

            {/* Kolom 2: Tautan Cepat */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Navigasi
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#layanan"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Fokus Klinis
                  </a>
                </li>
                <li>
                  <a
                    href="#alur"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Alur Asuhan
                  </a>
                </li>
                <li>
                  <a
                    href="#pengkajian"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Instrumen & Pengkajian
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Hubungi Kami
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>Jl. Kesehatan No. 123, Jakarta Selatan, Indonesia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>+62 812 3456 7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>halo@askepgerontik.id</span>
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
              <a href="#" className="hover:text-blue-400 transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
