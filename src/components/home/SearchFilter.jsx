"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

// Mapping opsi dropdown ke ID section tujuan
const sectionMapping = {
  // 1. Pengkajian Dasar -> diarahkan ke #struktur
  identitas: { target: "struktur", label: "Identitas & Riwayat Pekerjaan" },
  lingkungan: { target: "struktur", label: "Lingkungan Tempat Tinggal" },
  "riwayat-kesehatan": { target: "struktur", label: "Riwayat Kesehatan" },
  "pola-fungsional": { target: "struktur", label: "Pola Fungsional Gordon (11 Pola)" },
  "pemeriksaan-fisik": { target: "struktur", label: "Pemeriksaan Fisik & TTV" },

  // 2. Instrumen Pengkajian Khusus -> diarahkan ke #instrumen
  spmsq: { target: "instrumen", label: "Fungsi Kognitif (SPMSQ)" },
  mmse: { target: "instrumen", label: "Fungsi Kognitif (MMSE)" },
  katz: { target: "instrumen", label: "Status Fungsional (Indeks Katz)" },
  apgar: { target: "instrumen", label: "Fungsi Keluarga (APGAR)" },
  gds: { target: "instrumen", label: "Skala Depresi (GDS-15)" },
  jatuh: { target: "instrumen", label: "Skrining Risiko Jatuh (TUG & FR Test)" },
  norton: { target: "instrumen", label: "Risiko Dekubitus (Skala Norton)" },

  // 3. Dokumentasi Asuhan & Lampiran -> diarahkan ke #alur atau #tindakan
  "analisa-data": { target: "alur", label: "Tahap Analisa Data" },
  diagnosa: { target: "alur", label: "Daftar Diagnosa Keperawatan" },
  intervensi: { target: "alur", label: "Intervensi Keperawatan" },
  implementasi: { target: "alur", label: "Implementasi & Evaluasi" },
  lampiran: { target: "tindakan", label: "Panduan SOP & Penkes Gerontik" },
};

export default function SearchFilter() {
  const [selectedPart, setSelectedPart] = useState("");
  const [keyword, setKeyword] = useState("");

  const scrollToSection = (sectionId, infoMessage) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      toast.success(infoMessage);
    } else {
      toast.info("Bagian tujuan belum tersedia di halaman ini.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Prioritas 1: Jika dropdown dipilih
    if (selectedPart && sectionMapping[selectedPart]) {
      const { target, label } = sectionMapping[selectedPart];
      scrollToSection(target, `Menampilkan bagian: ${label}`);
      return;
    }

    // Prioritas 2: Deteksi kata kunci pencarian manual
    const query = keyword.trim().toLowerCase();
    if (!query) {
      toast.warning("Pilih bagian form atau ketik kata kunci terlebih dahulu.");
      return;
    }

    if (
      query.includes("spmsq") ||
      query.includes("mmse") ||
      query.includes("katz") ||
      query.includes("apgar") ||
      query.includes("gds") ||
      query.includes("depresi") ||
      query.includes("jatuh") ||
      query.includes("tug") ||
      query.includes("norton") ||
      query.includes("dekubitus") ||
      query.includes("instrumen")
    ) {
      scrollToSection("instrumen", `Menampilkan instrumen terkait "${keyword}"`);
    } else if (
      query.includes("turp") ||
      query.includes("rom") ||
      query.includes("senam") ||
      query.includes("otak") ||
      query.includes("penkes") ||
      query.includes("sop")
    ) {
      scrollToSection("tindakan", `Menampilkan SOP/Penkes terkait "${keyword}"`);
    } else if (
      query.includes("gordon") ||
      query.includes("identitas") ||
      query.includes("lingkungan") ||
      query.includes("fisik") ||
      query.includes("riwayat")
    ) {
      scrollToSection("struktur", `Menampilkan format pengkajian "${keyword}"`);
    } else if (
      query.includes("diagnosa") ||
      query.includes("sdki") ||
      query.includes("intervensi") ||
      query.includes("analisa") ||
      query.includes("evaluasi") ||
      query.includes("soap")
    ) {
      scrollToSection("alur", `Menampilkan alur dokumentasi "${keyword}"`);
    } else {
      // Fallback jika kata kunci umum
      scrollToSection("layanan", `Menampilkan fokus klinis terkait "${keyword}"`);
    }
  };

  // Langsung scroll otomatis begitu dropdown diubah (opsional, biar makin sat-set)
  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedPart(val);
    if (val && sectionMapping[val]) {
      const { target, label } = sectionMapping[val];
      scrollToSection(target, `Menuju bagian: ${label}`);
    }
  };

  return (
    <section
      id="pengkajian"
      className="max-w-5xl mx-auto px-6 -mt-12 relative z-20"
    >
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Dropdown Filter */}
          <div className="md:col-span-4">
            <select
              aria-label="Pilih Bagian Pengkajian"
              value={selectedPart}
              onChange={handleSelectChange}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="">Pilih Bagian Form Pengkajian...</option>
              <optgroup label="1. Pengkajian Dasar">
                <option value="identitas">Identitas & Riwayat Pekerjaan</option>
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
                <option value="norton">Risiko Dekubitus (Skala Norton)</option>
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

          {/* Input Pencarian Kata Kunci */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari MMSE, Katz, Post TURP, ROM, diagnosa SDKI..."
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Tombol Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl transition shadow-sm cursor-pointer"
            >
              Cari Data
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}