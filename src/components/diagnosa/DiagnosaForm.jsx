"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, FileCheck2, Eye } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_gerontik_diagnosa";

export default function DiagnosaForm() {
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
    ruang: "",
    noRegister: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      noDx: "1",
      tanggalMuncul: new Date().toISOString().split("T")[0],
      diagnosa: "",
      tanggalTeratasi: "",
      tandaTangan: "",
    },
  ]);

  useEffect(() => {
  const today = new Date().toLocaleDateString("en-CA");

  let saved = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    saved = raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Gagal memuat data diagnosa:", err);
  }

  setMahasiswa((prev) => ({
    ...prev,
    ...(saved?.mahasiswa ?? {}),
    tgl: saved?.mahasiswa?.tgl || today,
  }));
  if (saved?.pasien) setPasien(saved.pasien);
  if (saved?.rows?.length > 0) setRows(saved.rows);
}, []);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        noDx: String(rows.length + 1),
        tanggalMuncul: new Date().toISOString().split("T")[0],
        diagnosa: "",
        tanggalTeratasi: "",
        tandaTangan: "",
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
    router.push("/diagnosa/hasil");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
    >
      <div className="border-b border-slate-100 pb-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Daftar Diagnosa Keperawatan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tetapkan dan urutkan diagnosa keperawatan gerontik berdasarkan
            prioritas masalah.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/diagnosa/hasil")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3.5 py-2 rounded-lg transition cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          Lihat Hasil Tersimpan
        </button>
      </div>

      {/* Identitas Mahasiswa Opsional */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      {/* Identitas Klien */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-800 mb-3">
          Identitas Klien / Lansia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Pasien / Klien <span className="text-red-500">*</span>
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
              Ruang / Wisma
            </label>
            <input
              type="text"
              placeholder="Contoh: Wisma Melati"
              value={pasien.ruang}
              onChange={(e) => setPasien({ ...pasien, ruang: e.target.value })}
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

      {/* Daftar Diagnosa Dinamis */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Rincian Diagnosa (Berdasarkan Prioritas)
          </h3>
          <span className="text-xs text-slate-400">
            Total: {rows.length} Diagnosa
          </span>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.id}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:border-blue-200 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold bg-blue-600 text-white rounded-md">
                Prioritas #{index + 1}
              </span>
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRow(row.id)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus 
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  No. Dx
                </label>
                <input
                  type="text"
                  value={row.noDx}
                  onChange={(e) =>
                    handleRowChange(row.id, "noDx", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Muncul
                </label>
                <input
                  type="date"
                  value={row.tanggalMuncul}
                  onChange={(e) =>
                    handleRowChange(row.id, "tanggalMuncul", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Teratasi
                </label>
                <input
                  type="date"
                  value={row.tanggalTeratasi}
                  onChange={(e) =>
                    handleRowChange(row.id, "tanggalTeratasi", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama / Paraf Perawat
                </label>
                <input
                  type="text"
                  placeholder="Nama terang"
                  value={row.tandaTangan}
                  onChange={(e) =>
                    handleRowChange(row.id, "tandaTangan", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-12">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Diagnosa Keperawatan (SDKI / PES){" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Contoh: Nyeri kronis berhubungan dengan kondisi muskuloskeletal kronis ditandai dengan mengeluh nyeri pada lutut..."
                  value={row.diagnosa}
                  onChange={(e) =>
                    handleRowChange(row.id, "diagnosa", e.target.value)
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
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tambah Diagnosa
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
        >
          <FileCheck2 className="w-4 h-4" />
          Simpan & Lihat Hasil
        </button>
      </div>
    </form>
  );
}