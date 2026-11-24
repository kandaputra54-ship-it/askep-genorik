"use client";
import React, { useState } from "react";
import {
  User,
  Home,
  HeartPulse,
  ListChecks,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

const tabs = [
  {
    id: "identitas",
    label: "Identitas & Ekonomi",
    icon: User,
    title: "Identitas Lansia, Riwayat Pekerjaan & Status Ekonomi",
    desc: "Pencatatan data demografi dasar serta latar belakang sosial-ekonomi lansia untuk menilai kemandirian finansial.",
    items: [
      "Nama lengkap, Tempat/Tanggal Lahir, Jenis Kelamin, Status Perkawinan, Agama, dan Suku",
      "Pekerjaan saat ini & riwayat pekerjaan sebelumnya",
      "Sumber pendapatan utama dan tingkat kecukupan pendapatan",
    ],
  },
  {
    id: "lingkungan",
    label: "Lingkungan Hunian",
    icon: Home,
    title: "Audit Keamanan Lingkungan Tempat Tinggal",
    desc: "Evaluasi 10 indikator kondisi fisik rumah untuk mencegah risiko kecelakaan dan penyakit berbasis lingkungan.",
    items: [
      "Kebersihan, kerapihan ruangan, pencahayaan, dan sirkulasi udara",
      "Keadaan kamar mandi & WC, pembuangan air kotor, serta sumber air minum",
      "Sistem pembuangan sampah, sumber pencemaran, privasi, dan identifikasi risiko injuri",
    ],
  },
  {
    id: "riwayat",
    label: "Riwayat Kesehatan",
    icon: HeartPulse,
    title: "Status Kesehatan Saat Ini & Masa Lalu",
    desc: "Penelusuran keluhan kronis maupun akut dalam 1 tahun terakhir beserta riwayat pengobatan yang dijalani.",
    items: [
      "Keluhan utama 1 tahun terakhir, gejala yang dirasakan, faktor pencetus, & sifat timbulnya (mendadak/bertahap)",
      "Upaya mengatasi keluhan (berobat ke RS/Klinik/Dokter/Perawat, swamedikasi, atau obat tradisional)",
      "Riwayat penyakit terdahulu, alergi (obat/makanan/debu), riwayat kecelakaan, rawat inap, & pemakaian obat",
    ],
  },
  {
    id: "gordon",
    label: "11 Pola Gordon",
    icon: ListChecks,
    title: "Pengkajian 11 Pola Fungsional Kesehatan Gordon",
    desc: "Penilaian menyeluruh terhadap respons biopsikososial dan spiritual lanjut usia dalam kehidupan sehari-hari.",
    items: [
      "1. Persepsi & Manajemen Kesehatan  •  2. Nutrisi & Metabolik  •  3. Eliminasi (BAK & BAB)",
      "4. Aktivitas & Pola Latihan  •  5. Pola Istirahat & Tidur  •  6. Kognitif & Persepsi Sensori",
      "7. Persepsi & Konsep Diri  •  8. Peran & Hubungan  •  9. Seksualitas & Reproduksi",
      "10. Koping & Toleransi Stres  •  11. Nilai & Keyakinan Spiritual",
    ],
  },
  {
    id: "fisik",
    label: "Pemeriksaan Fisik",
    icon: Stethoscope,
    title: "Pemeriksaan Fisik Head-to-Toe & Tanda Vital",
    desc: "Observasi objektif kondisi anatomis dan fisiologis lansia untuk mendeteksi perubahan degeneratif.",
    items: [
      "Keadaan umum, Tanda-Tanda Vital (TD, Nadi, RR, Suhu), serta pengukuran Berat Badan & Tinggi Badan",
      "Pemeriksaan area Kepala, Rambut, Mata, Telinga, Mulut, Gigi, dan Bibir",
      "Pemeriksaan Dada, Abdomen, Integritas Kulit, serta Ekstremitas Atas & Bawah",
    ],
  },
];

export default function StrukturPengkajian() {
  const [activeTab, setActiveTab] = useState("identitas");
  const current = tabs.find((t) => t.id === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[#238B8E] font-semibold text-xs uppercase tracking-wider">
          Format Pengkajian Dasar
        </span>
        <h2 className="text-3xl font-bold text-slate-900 mt-1">
          Struktur Pengkajian Gerontik Holistik
        </h2>
        <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
          Mencakup aspek bio-psiko-sosio-spiritual hingga evaluasi keamanan
          lingkungan tempat tinggal lansia.
        </p>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold inline-flex items-center gap-2 transition ${
                isActive
                  ? "bg-[#1E3E62] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {current && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-10">
          <h3 className="text-xl font-bold text-slate-900">{current.title}</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {current.desc}
          </p>
          <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
            {current.items.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-[#238B8E] mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}