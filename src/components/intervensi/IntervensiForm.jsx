"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, FileCheck2, Eye } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_gerontik_intervensi";

export default function IntervensiForm() {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl:"",
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
      diagnosa: "",
      tujuanKriteria: "",
      intervensi: "",
    },
  ]);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");

    let parsed = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      parsed = raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error("Gagal memuat data intervensi:", err);
    }

    setMahasiswa((prev) => ({
      ...prev,
      ...(parsed?.mahasiswa ?? {}),
      tgl: parsed?.mahasiswa?.tgl || today,
    }));
    if (parsed?.pasien) setPasien(parsed.pasien);
    if (parsed?.rows?.length > 0) setRows(parsed.rows);
  }, []);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        noDx: String(rows.length + 1),
        diagnosa: "",
        tujuanKriteria: "",
        intervensi: "",
      },
    ]);
  };

  const handleRemoveRow = (id) => {
    if (rows.length === 1) return;
    setRows(rows.filter((item) => item.id !== id));
  };

  const handleRowChange = (id, field, value) => {
    setRows(
      rows.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
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
    router.push("/intervensi/hasil");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
    >
      <div className="border-b border-slate-100 pb-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Rencana Intervensi Keperawatan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Susun tujuan, kriteria hasil (SLKI), dan rencana tindakan
            keperawatan (SIKI) untuk lansia.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/intervensi/hasil")}
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

      {/* Daftar Intervensi Dinamis */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Rencana Tindakan Per Diagnosa
          </h3>
          <span className="text-xs text-slate-400">
            Total: {rows.length} Rencana Intervensi
          </span>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.id}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:border-blue-200 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold bg-blue-600 text-white rounded-md">
                  Intervensi #{index + 1}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium">
                    No. Dx:
                  </span>
                  <input
                    type="text"
                    value={row.noDx}
                    onChange={(e) =>
                      handleRowChange(row.id, "noDx", e.target.value)
                    }
                    className="w-14 px-2 py-1 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-center font-semibold"
                  />
                </div>
              </div>

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

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Diagnosa Keperawatan <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Tuliskan diagnosa keperawatan yang akan diintervensi..."
                  value={row.diagnosa}
                  onChange={(e) =>
                    handleRowChange(row.id, "diagnosa", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tujuan & Kriteria Hasil (SLKI){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder={`Contoh:\nSetelah dilakukan tindakan keperawatan selama 3x24 jam diharapkan tingkat nyeri menurun dengan kriteria hasil:\n1. Keluhan nyeri menurun (skala 2)\n2. Meringis menurun\n3. Kemampuan menuntaskan aktivitas meningkat`}
                    value={row.tujuanKriteria}
                    onChange={(e) =>
                      handleRowChange(row.id, "tujuanKriteria", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Intervensi Keperawatan (SIKI){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder={`Contoh:\nManajemen Nyeri (I.08238)\nObservasi:\n- Identifikasi lokasi, karakteristik, durasi, frekuensi, intensitas nyeri\nTerapeutik:\n- Berikan teknik nonfarmakologis (kompres hangat / relaksasi napas dalam)\nEdukasi:\n- Jelaskan strategi meredakan nyeri`}
                    value={row.intervensi}
                    onChange={(e) =>
                      handleRowChange(row.id, "intervensi", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
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
          Tambah Rencana Intervensi
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
