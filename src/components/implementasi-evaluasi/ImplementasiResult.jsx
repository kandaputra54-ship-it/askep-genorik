"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Printer,
  Share2,
  Edit3,
  ArrowLeft,
  FileWarning,
  CheckSquare,
  Square,
} from "lucide-react";
import WhatsAppModal from "@/components/shared/WhatsAppModal";
import { SOP_TEMPLATES } from "./sopData";

const STORAGE_KEY = "askep_gerontik_implementasi";

export default function ImplementasiResult() {
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

  const formatDateTime = (dt) => {
    if (!dt) return "-";
    return dt.replace("T", " ");
  };

  const buildWhatsAppText = () => {
    if (!data) return "";

    const { mahasiswa, pasien, rows, selectedSop } = data;
    let text = `*IMPLEMENTASI & EVALUASI KEPERAWATAN GERONTIK*\n\n`;

    if (mahasiswa?.isMahasiswa) {
      text += `*Identitas Mahasiswa:*\n`;
      text += `• Nama: ${mahasiswa.namaMhs || "-"}\n`;
      text += `• NIM: ${mahasiswa.nim || "-"}\n`;
      text += `• Ruang: ${mahasiswa.ruang || "-"}\n`;
      text += `• Tanggal: ${mahasiswa.tgl || "-"}\n\n`;
    }

    text += `*Identitas Pasien:*\n`;
    text += `• Nama: ${pasien.namaPasien || "-"}\n`;
    text += `• Ruangan: ${pasien.ruangan || "-"}\n`;
    text += `• RM No.: ${pasien.rmNo || "-"}\n\n`;

    text += `*Catatan Implementasi & Evaluasi (SOAP):*\n`;
    rows.forEach((row, idx) => {
      text += `\n*${idx + 1}. Dx ${row.noDx || "-"} (${formatDateTime(
        row.tanggalJam
      )})*\n`;
      text += `*Implementasi:*\n${row.implementasi || "-"}\n`;
      text += `*Evaluasi (SOAP):*\n`;
      text += `• S: ${row.evaluasiS || "-"}\n`;
      text += `• O: ${row.evaluasiO || "-"}\n`;
      text += `• A: ${row.evaluasiA || "-"}\n`;
      text += `• P: ${row.evaluasiP || "-"}\n`;
    });

    if (selectedSop && SOP_TEMPLATES[selectedSop]) {
      text += `\n*Lampiran SOP Dilaksanakan:* ${SOP_TEMPLATES[selectedSop].title}\n`;
    }

    return text;
  };

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-lg mx-auto">
        <FileWarning className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">
          Belum Ada Data Implementasi & Evaluasi
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Silakan isi formulir implementasi dan evaluasi terlebih dahulu untuk
          melihat dan mencetak hasilnya.
        </p>
        <Link
          href="/implementasi-evaluasi"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          Isi Formulir Sekarang
        </Link>
      </div>
    );
  }

  const { mahasiswa, pasien, rows, selectedSop, checkedSopItems } = data;
  const activeSopTemplate = selectedSop ? SOP_TEMPLATES[selectedSop] : null;

  return (
    <div>
      {/* Action Bar */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/implementasi-evaluasi"
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
            Implementasi dan Evaluasi Keperawatan Gerontik
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Catatan Tindakan dan Perkembangan Klien (SOAP)
          </p>
        </div>

        {/* Grid Info Pasien & Mahasiswa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 print:bg-transparent">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Data Pasien / Klien
            </h3>
            <table className="w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-1 font-semibold text-slate-700 w-28">
                    Nama
                  </td>
                  <td className="py-1 text-slate-900">
                    : {pasien.namaPasien || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold text-slate-700">Ruangan</td>
                  <td className="py-1 text-slate-900">
                    : {pasien.ruangan || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold text-slate-700">RM No.</td>
                  <td className="py-1 text-slate-900">
                    : {pasien.rmNo || "-"}
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

        {/* Tabel Implementasi & Evaluasi */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-800 text-sm">
            <thead>
              <tr className="bg-slate-100 print:bg-slate-200">
                <th className="border border-slate-800 px-2.5 py-2.5 text-center w-14 font-bold text-slate-900">
                  No Dx
                </th>
                <th className="border border-slate-800 px-3 py-2.5 text-center w-36 font-bold text-slate-900">
                  Tanggal & Jam
                </th>
                <th className="border border-slate-800 px-4 py-2.5 text-left font-bold text-slate-900 w-5/12">
                  IMPLEMENTASI KEPERAWATAN
                </th>
                <th className="border border-slate-800 px-4 py-2.5 text-left font-bold text-slate-900">
                  EVALUASI (SOAP)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="border border-slate-800 px-2.5 py-3 text-center font-semibold">
                    {row.noDx || "-"}
                  </td>
                  <td className="border border-slate-800 px-3 py-3 text-center text-xs">
                    {formatDateTime(row.tanggalJam)}
                  </td>
                  <td className="border border-slate-800 px-4 py-3 text-slate-900 whitespace-pre-line">
                    {row.implementasi || "-"}
                  </td>
                  <td className="border border-slate-800 px-4 py-3 text-slate-900 space-y-1 text-xs">
                    <p>
                      <strong className="font-bold">S :</strong>{" "}
                      {row.evaluasiS || "-"}
                    </p>
                    <p>
                      <strong className="font-bold">O :</strong>{" "}
                      {row.evaluasiO || "-"}
                    </p>
                    <p>
                      <strong className="font-bold">A :</strong>{" "}
                      {row.evaluasiA || "-"}
                    </p>
                    <p>
                      <strong className="font-bold">P :</strong>{" "}
                      {row.evaluasiP || "-"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lampiran SOP Tindakan Jika Dipilih */}
        {activeSopTemplate && (
          <div className="mt-10 pt-6 border-t-2 border-slate-800 break-before-page">
            <h2 className="text-base font-bold uppercase text-center text-slate-900 mb-4">
              Lampiran Tindakan: {activeSopTemplate.title}
            </h2>
            <table className="w-full border-collapse border border-slate-800 text-xs">
              <thead>
                <tr className="bg-slate-100 print:bg-slate-200">
                  <th className="border border-slate-800 px-3 py-2 text-left font-bold">
                    ASPEK YANG DINILAI
                  </th>
                  <th className="border border-slate-800 px-3 py-2 text-center w-24 font-bold">
                    DILAKUKAN
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeSopTemplate.sections.map((sec) => (
                  <React.Fragment key={sec.phase}>
                    <tr className="bg-slate-50 font-bold">
                      <td
                        colSpan={2}
                        className="border border-slate-800 px-3 py-1.5"
                      >
                        {sec.phase}
                      </td>
                    </tr>
                    {sec.items.map((item) => {
                      const isChecked =
                        !!checkedSopItems?.[`${sec.phase}-${item}`];
                      return (
                        <tr key={item}>
                          <td className="border border-slate-800 px-3 py-1.5">
                            {item}
                          </td>
                          <td className="border border-slate-800 px-3 py-1.5 text-center">
                            {isChecked ? (
                              <span className="inline-flex items-center justify-center font-bold text-emerald-700">
                                <CheckSquare className="w-4 h-4" />
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center text-slate-400">
                                <Square className="w-4 h-4" />
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Area Tanda Tangan Cetak */}
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
        title="Kirim Implementasi & Evaluasi ke WhatsApp"
      />
    </div>
  );
}