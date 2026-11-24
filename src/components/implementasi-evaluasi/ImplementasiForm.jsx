"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, FileCheck2, Eye, ClipboardCheck } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";
import { SOP_TEMPLATES } from "./sopData";

const STORAGE_KEY = "askep_gerontik_implementasi";

export default function ImplementasiForm() {
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
    ruangan: "",
    rmNo: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      noDx: "1",
      tanggalJam: "",
      implementasi: "",
      evaluasiS: "",
      evaluasiO: "",
      evaluasiA: "",
      evaluasiP: "",
    },
  ]);

  // Lampiran SOP Tindakan Opsional
  const [selectedSop, setSelectedSop] = useState("");
  const [checkedSopItems, setCheckedSopItems] = useState({});

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");

    let parsed = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      parsed = raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error("Gagal memuat data implementasi:", err);
    }

    setMahasiswa((prev) => ({
      ...prev,
      ...(parsed?.mahasiswa ?? {}),
      tgl: parsed?.mahasiswa?.tgl || today,
    }));
    if (parsed?.pasien) setPasien(parsed.pasien);
    if (parsed?.rows?.length > 0) setRows(parsed.rows);
    if (parsed?.selectedSop) setSelectedSop(parsed.selectedSop);
    if (parsed?.checkedSopItems) setCheckedSopItems(parsed.checkedSopItems);
  }, []);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        noDx: "1",
        tanggalJam: "",
        implementasi: "",
        evaluasiS: "",
        evaluasiO: "",
        evaluasiA: "",
        evaluasiP: "",
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

  const handleSopSelect = (sopKey) => {
    setSelectedSop(sopKey);
    if (!sopKey) {
      setCheckedSopItems({});
      return;
    }
    // Otomatis centang semua item SOP saat dipilih agar praktis (user bisa uncheck jika ada yang terlewat)
    const template = SOP_TEMPLATES[sopKey];
    const initialChecks = {};
    template.sections.forEach((sec) => {
      sec.items.forEach((item) => {
        initialChecks[`${sec.phase}-${item}`] = true;
      });
    });
    setCheckedSopItems(initialChecks);
  };

  const toggleSopItem = (key) => {
    setCheckedSopItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      pasien,
      rows,
      selectedSop,
      checkedSopItems,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/implementasi-evaluasi/hasil");
  };

  const activeSopTemplate = selectedSop ? SOP_TEMPLATES[selectedSop] : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
    >
      <div className="border-b border-slate-100 pb-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Implementasi & Evaluasi Keperawatan (SOAP)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Catatan pelaksanaan tindakan keperawatan, evaluasi SOAP, dan
            lampiran SOP tindakan gerontik.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/implementasi-evaluasi/hasil")}
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
              Ruangan / Wisma
            </label>
            <input
              type="text"
              placeholder="Contoh: Wisma Melati"
              value={pasien.ruangan}
              onChange={(e) =>
                setPasien({ ...pasien, ruangan: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              RM No. / Register
            </label>
            <input
              type="text"
              placeholder="Contoh: RM-0042"
              value={pasien.rmNo}
              onChange={(e) => setPasien({ ...pasien, rmNo: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Catatan Implementasi & Evaluasi SOAP */}
      <div className="space-y-5 mb-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Catatan Tindakan & Evaluasi (SOAP)
          </h3>
          <span className="text-xs text-slate-400">
            Total: {rows.length} Catatan
          </span>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.id}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:border-blue-200 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold bg-blue-600 text-white rounded-md">
                Catatan #{index + 1}
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

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  No. Diagnosa (Dx)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 1"
                  value={row.noDx}
                  onChange={(e) =>
                    handleRowChange(row.id, "noDx", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-9">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal & Jam Pelaksanaan
                </label>
                <input
                  type="datetime-local"
                  value={row.tanggalJam}
                  onChange={(e) =>
                    handleRowChange(row.id, "tanggalJam", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Kolom Kiri: Implementasi */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Implementasi Keperawatan{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder={`Tuliskan tindakan yang telah dilakukan beserta respon klien...\nContoh:\n1. Mengkaji skala nyeri klien -> Respon: Klien mengatakan nyeri skala 5\n2. Mengajarkan teknik relaksasi napas dalam & latihan ROM aktif -> Respon: Klien kooperatif dan mampu mengikuti gerakan`}
                  value={row.implementasi}
                  onChange={(e) =>
                    handleRowChange(row.id, "implementasi", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Kolom Kanan: Evaluasi SOAP */}
              <div className="space-y-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="block text-xs font-bold text-slate-800">
                  Evaluasi Keperawatan (SOAP)
                </span>

                <div>
                  <label className="block text-[11px] font-bold text-blue-700">
                    S (Subjektif)
                  </label>
                  <input
                    type="text"
                    placeholder="Keluhan / ungkapan klien setelah tindakan..."
                    value={row.evaluasiS}
                    onChange={(e) =>
                      handleRowChange(row.id, "evaluasiS", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-blue-700">
                    O (Objektif)
                  </label>
                  <input
                    type="text"
                    placeholder="Hasil observasi / TTV / skor setelah tindakan..."
                    value={row.evaluasiO}
                    onChange={(e) =>
                      handleRowChange(row.id, "evaluasiO", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-blue-700">
                    A (Analisis / Masalah)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Masalah nyeri teratasi sebagian"
                    value={row.evaluasiA}
                    onChange={(e) =>
                      handleRowChange(row.id, "evaluasiA", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-blue-700">
                    P (Planning / Rencana Lanjut)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Lanjutkan intervensi manajemen nyeri & latihan ROM"
                    value={row.evaluasiP}
                    onChange={(e) =>
                      handleRowChange(row.id, "evaluasiP", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddRow}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tambah Catatan Implementasi
        </button>
      </div>

      {/* Lampiran Checklist SOP Tindakan Gerontik (Opsional) */}
      <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Lampiran SOP Tindakan Keperawatan Gerontik (Opsional)
              </h3>
              <p className="text-xs text-slate-500">
                Pilih lampiran checklist SOP jika melakukan tindakan ROM, Senam
                Otak Lansia, atau Penkes Post TURP
              </p>
            </div>
          </div>

          <select
            value={selectedSop}
            onChange={(e) => handleSopSelect(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Tidak Melampirkan SOP --</option>
            <option value="rom">SOP Latihan ROM</option>
            <option value="senamOtak">SOP Senam Otak Lansia</option>
            <option value="penkesTurp">SOP Penkes Post TURP</option>
          </select>
        </div>

        {activeSopTemplate && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
            <h4 className="text-sm font-bold text-blue-700">
              {activeSopTemplate.title}
            </h4>
            {activeSopTemplate.sections.map((sec) => (
              <div
                key={sec.phase}
                className="bg-white p-4 rounded-xl border border-slate-200"
              >
                <p className="text-xs font-bold text-slate-800 mb-2.5">
                  {sec.phase}
                </p>
                <div className="space-y-2">
                  {sec.items.map((item) => {
                    const checkKey = `${sec.phase}-${item}`;
                    return (
                      <label
                        key={checkKey}
                        className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedSopItems[checkKey]}
                          onChange={() => toggleSopItem(checkKey)}
                          className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Submit */}
      <div className="pt-6 border-t border-slate-100 flex justify-end">
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
