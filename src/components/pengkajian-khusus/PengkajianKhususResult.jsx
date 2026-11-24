"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Printer,
  Share2,
  Edit3,
  ArrowLeft,
  FileWarning,
} from "lucide-react";
import WhatsAppModal from "@/components/shared/WhatsAppModal";

const STORAGE_KEY = "askep_gerontik_pengkajian_khusus";

export default function PengkajianKhususResult() {
  const [data, setData] = useState(null);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handlePrintPDF = () => {
    window.print();
  };

  const buildWhatsAppText = () => {
    if (!data) return "";

    const { mahasiswa, pasien, summary } = data;
    let text = `*HASIL PENGKAJIAN KHUSUS GERONTIK*\n\n`;

    if (mahasiswa?.isMahasiswa) {
      text += `*Identitas Mahasiswa:*\n`;
      text += `• Nama: ${mahasiswa.namaMhs || "-"}\n`;
      text += `• NIM: ${mahasiswa.nim || "-"}\n`;
      text += `• Ruang: ${mahasiswa.ruang || "-"}\n`;
      text += `• Tanggal: ${mahasiswa.tgl || "-"}\n\n`;
    }

    text += `*Identitas Klien:*\n`;
    text += `• Nama Klien: ${pasien.namaPasien || "-"}\n`;
    text += `• Usia: ${pasien.umur || "-"}\n`;
    text += `• No. RM: ${pasien.noRegister || "-"}\n\n`;

    text += `*Ringkasan Hasil Skrining Gerontik:*\n`;
    text += `1. *APGAR Keluarga:* Skor ${summary.apgar.score}/10 (${summary.apgar.label})\n`;
    text += `2. *SPMSQ:* Salah ${summary.spmsq.salah}/10 (${summary.spmsq.label})\n`;
    text += `3. *MMSE:* Skor ${summary.mmse.score}/30 (${summary.mmse.label})\n`;
    text += `4. *Indeks Katz:* Nilai ${summary.katz.grade} (${summary.katz.desc})\n`;
    text += `5. *Screening Fall:*\n   - FR Test: ${summary.fall.frLabel}\n   - TUG Test: ${summary.fall.tugLabel}\n`;
    text += `6. *Skala Depresi (GDS):* Skor ${summary.gds.score}/15 (${summary.gds.label})\n`;
    text += `7. *Skor Norton:* Skor ${summary.norton.score}/20 (${summary.norton.label})\n`;

    return text;
  };

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-lg mx-auto">
        <FileWarning className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">
          Belum Ada Data Pengkajian Khusus
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Silakan isi instrumen skrining gerontik terlebih dahulu untuk melihat
          hasil dan interpretasi skornya.
        </p>
        <Link
          href="/pengkajian-khusus"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          Isi Formulir Sekarang
        </Link>
      </div>
    );
  }

  const { mahasiswa, pasien, summary } = data;

  const resultRows = [
    {
      no: 1,
      instrumen: "APGAR Keluarga",
      skor: `${summary.apgar.score} / 10`,
      interpretasi: summary.apgar.label,
    },
    {
      no: 2,
      instrumen: "Fungsi Kognitif (SPMSQ)",
      skor: `Salah ${summary.spmsq.salah} / 10`,
      interpretasi: summary.spmsq.label,
    },
    {
      no: 3,
      instrumen: "Mini-Mental State Exam (MMSE)",
      skor: `${summary.mmse.score} / 30`,
      interpretasi: summary.mmse.label,
    },
    {
      no: 4,
      instrumen: "Status Fungsional (Indeks Katz)",
      skor: `Nilai ${summary.katz.grade}`,
      interpretasi: summary.katz.desc,
    },
    {
      no: 5,
      instrumen: "Screening Fall (FR & TUG Test)",
      skor: "FR & TUG",
      interpretasi: `FR Test: ${summary.fall.frLabel} | TUG Test: ${summary.fall.tugLabel}`,
    },
    {
      no: 6,
      instrumen: "Geriatric Depression Scale (GDS)",
      skor: `${summary.gds.score} / 15`,
      interpretasi: summary.gds.label,
    },
    {
      no: 7,
      instrumen: "Skor Norton (Risiko Dekubitus)",
      skor: `${summary.norton.score} / 20`,
      interpretasi: summary.norton.label,
    },
  ];

  return (
    <div>
      {/* Action Bar */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/pengkajian-khusus"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            <Edit3 className="w-4 h-4" />
            Edit Form
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Alur Askep
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsWaModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            Kirim ke WhatsApp
          </button>

          <button
            type="button"
            onClick={handlePrintPDF}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / Simpan PDF
          </button>
        </div>
      </div>

      {/* Lembar Dokumen Resmi */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 print:border-none print:shadow-none print:p-0">
        <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
          <h1 className="text-xl font-bold uppercase tracking-wide text-slate-900">
            Hasil Pengkajian Khusus Keperawatan Gerontik
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Rekapitulasi Skor & Interpretasi Instrumen Skrining Lansia
          </p>
        </div>

        {/* Info Klien & Mahasiswa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 print:bg-transparent">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Data Klien / Lansia
            </h3>
            <table className="w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-1 font-semibold text-slate-700 w-28">
                    Nama Klien
                  </td>
                  <td className="py-1 text-slate-900">
                    : {pasien.namaPasien || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold text-slate-700">Usia</td>
                  <td className="py-1 text-slate-900">
                    : {pasien.umur || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold text-slate-700">No. RM</td>
                  <td className="py-1 text-slate-900">
                    : {pasien.noRegister || "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {mahasiswa?.isMahasiswa && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 print:bg-transparent">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Mahasiswa / Praktikan
              </h3>
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="py-1 font-semibold text-slate-700 w-28">
                      Nama Mhs
                    </td>
                    <td className="py-1 text-slate-900">
                      : {mahasiswa.namaMhs || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold text-slate-700">NIM</td>
                    <td className="py-1 text-slate-900">
                      : {mahasiswa.nim || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold text-slate-700">
                      Ruang / Tgl
                    </td>
                    <td className="py-1 text-slate-900">
                      : {mahasiswa.ruang || "-"} / {mahasiswa.tgl || "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tabel Rekapitulasi Pengkajian Khusus */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-800 text-sm">
            <thead>
              <tr className="bg-slate-100 print:bg-slate-200">
                <th className="border border-slate-800 px-3 py-2.5 text-center w-12 font-bold text-slate-900">
                  No
                </th>
                <th className="border border-slate-800 px-4 py-2.5 text-left font-bold text-slate-900 w-1/3">
                  INSTRUMEN PENGKAJIAN KHUSUS
                </th>
                <th className="border border-slate-800 px-3 py-2.5 text-center w-32 font-bold text-slate-900">
                  HASIL / SKOR
                </th>
                <th className="border border-slate-800 px-4 py-2.5 text-left font-bold text-slate-900">
                  ANALISIS / INTERPRETASI
                </th>
              </tr>
            </thead>
            <tbody>
              {resultRows.map((r) => (
                <tr key={r.no} className="align-top">
                  <td className="border border-slate-800 px-3 py-3 text-center font-medium">
                    {r.no}
                  </td>
                  <td className="border border-slate-800 px-4 py-3 font-semibold text-slate-900">
                    {r.instrumen}
                  </td>
                  <td className="border border-slate-800 px-3 py-3 text-center font-bold text-blue-700 print:text-slate-900">
                    {r.skor}
                  </td>
                  <td className="border border-slate-800 px-4 py-3 text-slate-900 text-xs leading-relaxed">
                    {r.interpretasi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Area Tanda Tangan */}
        {mahasiswa?.isMahasiswa && (
          <div className="mt-12 flex justify-end">
            <div className="text-center text-xs text-slate-800 w-56">
              <p>
                {mahasiswa.ruang || "Jakarta"}, {mahasiswa.tgl || ""}
              </p>
              <p className="mt-1">Mahasiswa Praktikan,</p>
              <div className="h-16"></div>
              <p className="font-bold underline">
                {mahasiswa.namaMhs || "( ................................ )"}
              </p>
              <p>NIM. {mahasiswa.nim || "-"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Input Nomor WhatsApp */}
      <WhatsAppModal
        isOpen={isWaModalOpen}
        onClose={() => setIsWaModalOpen(false)}
        messageText={buildWhatsAppText()}
        title="Kirim Hasil Pengkajian Khusus ke WhatsApp"
      />
    </div>
  );
}