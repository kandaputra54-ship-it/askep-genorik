"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Printer, Share2, Edit3, ArrowLeft, FileWarning } from "lucide-react";
import WhatsAppModal from "@/components/shared/WhatsAppModal";
import AnalisaDataSheet from "@/components/analisa-data/AnalisaDataSheet";

const STORAGE_KEY = "askep_gerontik_analisa_data";

export default function AnalisaDataResult() {
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

    const { mahasiswa, pasien, rows } = data;
    let text = `*HASIL ANALISA DATA KEPERAWATAN GERONTIK*\n\n`;

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

    text += `*Rincian Analisa Data:*\n`;
    rows.forEach((row, idx) => {
      text += `\n*${idx + 1}. Masalah: ${row.masalah || "-"}*\n`;
      if (row.etiologi) text += `   Etiologi: ${row.etiologi}\n`;
      text += `   - DS: ${row.dataSubjektif || "-"}\n`;
      text += `   - DO: ${row.dataObjektif || "-"}\n`;
    });

    return text;
  };

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-lg mx-auto">
        <FileWarning className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">
          Belum Ada Data Analisa Data
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Silakan isi formulir analisa data terlebih dahulu untuk melihat dan
          mencetak hasilnya.
        </p>
        <Link
          href="/analisa-data"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          Isi Formulir Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Action Bar */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/analisa-data"
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

      <AnalisaDataSheet
        mahasiswa={data.mahasiswa}
        pasien={data.pasien}
        rows={data.rows}
      />

      <WhatsAppModal
        isOpen={isWaModalOpen}
        onClose={() => setIsWaModalOpen(false)}
        messageText={buildWhatsAppText()}
        title="Kirim Analisa Data ke WhatsApp"
      />
    </div>
  );
}