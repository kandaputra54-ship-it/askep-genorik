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

const STORAGE_KEY = "askep_gerontik_pengkajian_dasar";
const SKRINING_KEY = "askep_gerontik_pengkajian_khusus";

export default function PengkajianResult() {
  const [data, setData] = useState(null);
  const [skriningSummary, setSkriningSummary] = useState(null);
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

    const savedSkrining = localStorage.getItem(SKRINING_KEY);
    if (savedSkrining) {
      try {
        const parsed = JSON.parse(savedSkrining);
        if (parsed.summary) setSkriningSummary(parsed.summary);
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
    const { mahasiswa, identitas, riwayat, pemeriksaanFisik } = data;

    let text = `*HASIL PENGKAJIAN KEPERAWATAN GERONTIK*\n\n`;

    if (mahasiswa?.isMahasiswa) {
      text += `*Identitas Mahasiswa:*\n`;
      text += `• Nama: ${mahasiswa.namaMhs || "-"}\n`;
      text += `• NIM: ${mahasiswa.nim || "-"}\n`;
      text += `• Ruang: ${mahasiswa.ruang || "-"}\n`;
      text += `• Tanggal: ${mahasiswa.tgl || "-"}\n\n`;
    }

    text += `*1. Identitas Klien:*\n`;
    text += `• Nama: ${identitas.nama || "-"}\n`;
    text += `• TTL/Usia: ${identitas.ttl || "-"}\n`;
    text += `• Jenis Kelamin: ${identitas.jenisKelamin || "-"}\n`;
    text += `• Status / Agama: ${identitas.statusPerkawinan || "-"} / ${identitas.agama || "-"}\n\n`;

    text += `*2. Riwayat Kesehatan:*\n`;
    text += `• Keluhan Utama: ${riwayat.keluhanUtama || "-"}\n`;
    text += `• Gejala: ${riwayat.gejalaDirasakan || "-"}\n`;
    text += `• Penyakit Masa Lalu: ${riwayat.penyakitMasaLalu || "-"}\n\n`;

    text += `*3. Pemeriksaan Fisik:*\n`;
    text += `• Keadaan Umum: ${pemeriksaanFisik.keadaanUmum || "-"}\n`;
    text += `• TTV: ${pemeriksaanFisik.ttv || "-"}\n`;
    text += `• BB/TB: ${pemeriksaanFisik.bbTb || "-"}\n`;

    if (skriningSummary) {
      text += `\n*4. Rekap Pengkajian Khusus:*\n`;
      text += `• APGAR: ${skriningSummary.apgar.score}/10\n`;
      text += `• SPMSQ: Salah ${skriningSummary.spmsq.salah}/10\n`;
      text += `• MMSE: ${skriningSummary.mmse.score}/30\n`;
      text += `• Indeks Katz: Nilai ${skriningSummary.katz.grade}\n`;
      text += `• GDS: ${skriningSummary.gds.score}/15\n`;
      text += `• Skor Norton: ${skriningSummary.norton.score}/20\n`;
    }

    return text;
  };

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-lg mx-auto">
        <FileWarning className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">
          Belum Ada Data Pengkajian Dasar
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Silakan isi formulir pengkajian dasar gerontik terlebih dahulu untuk
          melihat dan mencetak dokumen lengkapnya.
        </p>
        <Link
          href="/pengkajian"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          Isi Formulir Sekarang
        </Link>
      </div>
    );
  }

  const { mahasiswa, identitas, riwayat, polaFungsional, pemeriksaanFisik } =
    data;

  return (
    <div>
      {/* Action Bar */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/pengkajian"
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 print:border-none print:shadow-none print:p-0 space-y-6 text-xs text-slate-900">
        <div className="text-center border-b-2 border-slate-800 pb-4">
          <h1 className="text-lg font-bold uppercase tracking-wide">
            Format Pengkajian Asuhan Keperawatan Gerontik
          </h1>
          <p className="text-slate-500 mt-1">
            Dokumentasi Pengkajian Komprehensif Lansia
          </p>
        </div>

        {/* Info Mahasiswa Jika Diisi */}
        {mahasiswa?.isMahasiswa && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 print:bg-transparent grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <span className="text-slate-500 block">Nama Mahasiswa:</span>
              <strong className="font-bold">{mahasiswa.namaMhs || "-"}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">NIM:</span>
              <strong className="font-bold">{mahasiswa.nim || "-"}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Ruang / Wisma:</span>
              <strong className="font-bold">{mahasiswa.ruang || "-"}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Tanggal:</span>
              <strong className="font-bold">{mahasiswa.tgl || "-"}</strong>
            </div>
          </div>
        )}

        {/* 1. IDENTITAS */}
        <div>
          <h2 className="font-bold uppercase bg-slate-100 print:bg-slate-200 px-3 py-1.5 border border-slate-800">
            I. Identitas Klien
          </h2>
          <table className="w-full border-collapse border border-slate-800">
            <tbody>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold w-44">
                  Nama
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.nama || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold w-40">
                  Status Perkawinan
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.statusPerkawinan || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Tempat / Tgl Lahir
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.ttl || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Agama
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.agama || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Jenis Kelamin
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.jenisKelamin || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Suku
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.suku || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2. RIWAYAT PEKERJAAN & LINGKUNGAN */}
        <div>
          <h2 className="font-bold uppercase bg-slate-100 print:bg-slate-200 px-3 py-1.5 border border-slate-800">
            II. Riwayat Pekerjaan, Status Ekonomi & Lingkungan
          </h2>
          <table className="w-full border-collapse border border-slate-800">
            <tbody>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold w-44">
                  Pekerjaan Saat Ini
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.pekerjaanSaatIni || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold w-40">
                  Sumber Pendapatan
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.sumberPendapatan || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Pekerjaan Sebelumnya
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.pekerjaanSebelumnya || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Kecukupan Pendapatan
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {identitas.kecukupanPendapatan || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-2 font-semibold align-top">
                  Lingkungan Tempat Tinggal
                </td>
                <td
                  colSpan={3}
                  className="border border-slate-800 px-3 py-2 whitespace-pre-line"
                >
                  {identitas.lingkungan || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. RIWAYAT KESEHATAN */}
        <div>
          <h2 className="font-bold uppercase bg-slate-100 print:bg-slate-200 px-3 py-1.5 border border-slate-800">
            III. Riwayat Kesehatan Saat Ini & Masa Lalu
          </h2>
          <table className="w-full border-collapse border border-slate-800">
            <tbody>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold w-52">
                  Keluhan Utama (1 Thn Terakhir)
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {riwayat.keluhanUtama || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Gejala & Faktor Pencetus
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  Gejala: {riwayat.gejalaDirasakan || "-"} | Pencetus:{" "}
                  {riwayat.faktorPencetus || "-"} ({riwayat.timbulKeluhan})
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Upaya Mengatasi
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {riwayat.upayaMengatasi || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Penyakit Masa Lalu
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {riwayat.penyakitMasaLalu || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Riwayat Alergi & Kecelakaan
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  Alergi: {riwayat.riwayatAlergi || "-"} | Kecelakaan:{" "}
                  {riwayat.riwayatKecelakaan || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  Riwayat Dirawat & Obat Rutin
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  Dirawat: {riwayat.riwayatDirawat || "-"} | Obat:{" "}
                  {riwayat.riwayatObat || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. 11 POLA FUNGSIONAL */}
        <div>
          <h2 className="font-bold uppercase bg-slate-100 print:bg-slate-200 px-3 py-1.5 border border-slate-800">
            IV. Pola Fungsional Kesehatan (11 Pola)
          </h2>
          <table className="w-full border-collapse border border-slate-800">
            <tbody>
              {[
                ["1. Persepsi & Manajemen Kesehatan", polaFungsional.persepsiKesehatan],
                ["2. Nutrisi Metabolik", polaFungsional.nutrisiMetabolik],
                ["3. Eliminasi (BAK & BAB)", polaFungsional.eliminasi],
                ["4. Aktivitas & Pola Latihan", polaFungsional.aktivitasLatihan],
                ["5. Pola Istirahat Tidur", polaFungsional.istirahatTidur],
                ["6. Pola Kognitif Persepsi", polaFungsional.kognitifPersepsi],
                ["7. Persepsi Diri - Konsep Diri", polaFungsional.persepsiKonsepDiri],
                ["8. Pola Peran - Hubungan", polaFungsional.peranHubungan],
                ["9. Seksualitas", polaFungsional.seksualitas],
                ["10. Koping - Toleransi Stress", polaFungsional.kopingToleransiStress],
                ["11. Nilai - Pola Keyakinan", polaFungsional.nilaiKeyakinan],
              ].map(([label, val]) => (
                <tr key={label}>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold w-56 align-top">
                    {label}
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5 whitespace-pre-line">
                    {val || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. PEMERIKSAAN FISIK */}
        <div>
          <h2 className="font-bold uppercase bg-slate-100 print:bg-slate-200 px-3 py-1.5 border border-slate-800">
            V. Pemeriksaan Fisik
          </h2>
          <table className="w-full border-collapse border border-slate-800">
            <tbody>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold w-44">
                  Keadaan Umum
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {pemeriksaanFisik.keadaanUmum || "-"}
                </td>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold w-36">
                  BB / TB
                </td>
                <td className="border border-slate-800 px-3 py-1.5">
                  {pemeriksaanFisik.bbTb || "-"}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                  TTV
                </td>
                <td colSpan={3} className="border border-slate-800 px-3 py-1.5">
                  {pemeriksaanFisik.ttv || "-"}
                </td>
              </tr>
              {[
                ["Kepala", pemeriksaanFisik.kepala, "Dada", pemeriksaanFisik.dada],
                ["Rambut", pemeriksaanFisik.rambut, "Abdomen", pemeriksaanFisik.abdomen],
                ["Mata", pemeriksaanFisik.mata, "Kulit", pemeriksaanFisik.kulit],
                ["Telinga", pemeriksaanFisik.telinga, "Ekstremitas Atas", pemeriksaanFisik.ekstremitasAtas],
                ["Mulut, Gigi & Bibir", pemeriksaanFisik.mulutGigiBibir, "Ekstremitas Bawah", pemeriksaanFisik.ekstremitasBawah],
              ].map(([k1, v1, k2, v2]) => (
                <tr key={k1}>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                    {k1}
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    {v1 || "-"}
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                    {k2}
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    {v2 || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 6. REKAP PENGKAJIAN KHUSUS (JIKA SUDAH DIISI DI /pengkajian-khusus) */}
        <div>
          <h2 className="font-bold uppercase bg-slate-100 print:bg-slate-200 px-3 py-1.5 border border-slate-800">
            VI. Pengkajian Khusus (Format Terlampir)
          </h2>
          {skriningSummary ? (
            <table className="w-full border-collapse border border-slate-800">
              <tbody>
                <tr>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold w-52">
                    Fungsi Kognitif (SPMSQ)
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    Salah {skriningSummary.spmsq.salah}/10 —{" "}
                    {skriningSummary.spmsq.label}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                    Status Fungsional (Katz Indeks)
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    Nilai {skriningSummary.katz.grade} —{" "}
                    {skriningSummary.katz.desc}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                    MMSE
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    Skor {skriningSummary.mmse.score}/30 —{" "}
                    {skriningSummary.mmse.label}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                    APGAR Keluarga
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    Skor {skriningSummary.apgar.score}/10 —{" "}
                    {skriningSummary.apgar.label}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                    Skala Depresi (GDS)
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    Skor {skriningSummary.gds.score}/15 —{" "}
                    {skriningSummary.gds.label}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                    Screening Fall
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    FR: {skriningSummary.fall.frLabel} | TUG:{" "}
                    {skriningSummary.fall.tugLabel}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-800 px-3 py-1.5 font-semibold">
                    Skor Norton
                  </td>
                  <td className="border border-slate-800 px-3 py-1.5">
                    Skor {skriningSummary.norton.score}/20 —{" "}
                    {skriningSummary.norton.label}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="border border-slate-800 px-3 py-2 text-slate-500">
              Data Pengkajian Khusus belum diisi. Silakan lengkapi di menu{" "}
              <Link
                href="/pengkajian-khusus"
                className="text-blue-600 underline print:hidden"
              >
                Pengkajian Khusus
              </Link>
              .
            </div>
          )}
        </div>

        {/* Tanda Tangan */}
        {mahasiswa?.isMahasiswa && (
          <div className="pt-8 flex justify-end">
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
        title="Kirim Pengkajian Dasar ke WhatsApp"
      />
    </div>
  );
}