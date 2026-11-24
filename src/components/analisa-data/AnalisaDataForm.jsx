"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, FileCheck2, Eye } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_gerontik_analisa_data";

export default function AnalisaDataForm() {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl: "",
  });

  const [pasien, setPasien] = useState({
    namaPasien: "",
    umur: "",
    noRegister: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      dataSubjektif: "",
      dataObjektif: "",
      etiologi: "",
      masalah: "",
    },
  ]);

 useEffect(() => {
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, zona waktu lokal

  let saved = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    saved = raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Gagal memuat data tersimpan:", err);
  }

  setMahasiswa((prev) => ({
    ...prev,
    ...(saved?.mahasiswa ?? {}),
    tgl: saved?.mahasiswa?.tgl || today, // pakai tanggal tersimpan kalau ada
  }));
  if (saved?.pasien) setPasien(saved.pasien);
  if (saved?.rows?.length > 0) setRows(saved.rows);
}, []);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        dataSubjektif: "",
        dataObjektif: "",
        etiologi: "",
        masalah: "",
      },
    ]);
  };

  const handleRemoveRow = (id) => {
    if (rows.length === 1) return;
    setRows(rows.filter((item) => item.id !== id));
  };

  const handleRowChange = (id, field, value) => {
    setRows(
      rows.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      pasien,
      rows,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/analisa-data/hasil");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
    >
      <div className="border-b border-slate-100 pb-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Formulir Analisa Data Keperawatan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelompokkan data subjektif & objektif untuk merumuskan masalah
            keperawatan gerontik.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/analisa-data/hasil")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3.5 py-2 rounded-lg transition"
        >
          <Eye className="w-4 h-4" />
          Lihat Hasil Tersimpan
        </button>
      </div>

      {/* Bagian Opsional Mahasiswa */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      {/* Identitas Pasien Singkat */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-800 mb-3">
          Identitas Klien / Lansia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Klien (Inisial / Lengkap)
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Ny. S"
              value={pasien.namaPasien}
              onChange={(e) =>
                setPasien({ ...pasien, namaPasien: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Usia (Tahun)
            </label>
            <input
              type="text"
              placeholder="Contoh: 72 Tahun"
              value={pasien.umur}
              onChange={(e) => setPasien({ ...pasien, umur: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              No. Register / RM
            </label>
            <input
              type="text"
              placeholder="Contoh: RM-0042"
              value={pasien.noRegister}
              onChange={(e) =>
                setPasien({ ...pasien, noRegister: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Tabel Dinamis Analisa Data */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Pengelompokan Data & Masalah
          </h3>
          <span className="text-xs text-slate-400">
            Total: {rows.length} Kelompok Data
          </span>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.id}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:border-blue-200 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold bg-blue-600 text-white rounded-md">
                Data #{index + 1}
              </span>
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRow(row.id)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus 
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Data Subjektif (DS)
                </label>
                <textarea
                  rows={3}
                  placeholder="Keluhan yang disampaikan klien/keluarga (Contoh: Klien mengatakan lutut terasa nyeri saat berjalan...)"
                  value={row.dataSubjektif}
                  onChange={(e) =>
                    handleRowChange(row.id, "dataSubjektif", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Data Objektif (DO)
                </label>
                <textarea
                  rows={3}
                  placeholder="Hasil observasi, TTV, pemeriksaan fisik, skor skrining (Contoh: TD 150/90 mmHg, Skala nyeri 5, TUG test 22 detik...)"
                  value={row.dataObjektif}
                  onChange={(e) =>
                    handleRowChange(row.id, "dataObjektif", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Etiologi / Faktor Penyebab (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Agen pencedera fisiologis / Penurunan kekuatan otot"
                  value={row.etiologi}
                  onChange={(e) =>
                    handleRowChange(row.id, "etiologi", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Masalah Keperawatan (Problem)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Nyeri Kronis / Risiko Jatuh"
                  value={row.masalah}
                  onChange={(e) =>
                    handleRowChange(row.id, "masalah", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleAddRow}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
        >
          <Plus className="w-4 h-4" />
          Tambah Kelompok Data
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
        >
          <FileCheck2 className="w-4 h-4" />
          Simpan & Lihat Hasil
        </button>
      </div>
    </form>
  );
}