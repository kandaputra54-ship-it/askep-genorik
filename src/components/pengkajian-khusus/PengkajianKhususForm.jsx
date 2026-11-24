"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileCheck2, Eye, Calculator } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";
import {
  APGAR_ITEMS,
  SPMSQ_QUESTIONS,
  MMSE_SECTIONS,
  KATZ_ITEMS,
  GDS_QUESTIONS,
  NORTON_CATEGORIES,
  calculateSkriningSummary,
} from "./skriningData";

const STORAGE_KEY = "askep_gerontik_pengkajian_khusus";

const TABS = [
  { id: "apgar", label: "1. APGAR Keluarga" },
  { id: "spmsq", label: "2. SPMSQ" },
  { id: "mmse", label: "3. MMSE" },
  { id: "katz", label: "4. Indeks Katz" },
  { id: "fall", label: "5. Screening Fall" },
  { id: "gds", label: "6. Skala Depresi (GDS)" },
  { id: "norton", label: "7. Skor Norton" },
];

export default function PengkajianKhususForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("apgar");

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

  const [apgar, setApgar] = useState({ A1: 2, P: 2, G: 2, A2: 2, R: 2 });
  const [spmsq, setSpmsq] = useState({});
  const [mmse, setMmse] = useState({});
  const [katz, setKatz] = useState({
    mandi: "mandiri",
    berpakaian: "mandiri",
    kamarKecil: "mandiri",
    berpindah: "mandiri",
    kontinen: "mandiri",
    makan: "mandiri",
  });
  const [fall, setFall] = useState({ frInchi: "", tugDetik: "" });
  const [gds, setGds] = useState({});
  const [norton, setNorton] = useState({
    kondisiFisik: 4,
    kesadaran: 4,
    aktifitas: 4,
    mobilitas: 4,
    inkontinensia: 4,
  });

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");

    let p = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      p = raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error(err);
    }

    setMahasiswa((prev) => ({
      ...prev,
      ...(p?.mahasiswa ?? {}),
      tgl: p?.mahasiswa?.tgl || today,
    }));
    if (p?.pasien) setPasien(p.pasien);
    if (p?.apgar) setApgar(p.apgar);
    if (p?.spmsq) setSpmsq(p.spmsq);
    if (p?.mmse) setMmse(p.mmse);
    if (p?.katz) setKatz(p.katz);
    if (p?.fall) setFall(p.fall);
    if (p?.gds) setGds(p.gds);
    if (p?.norton) setNorton(p.norton);
  }, []);

  const summary = calculateSkriningSummary({
    apgar,
    spmsq,
    mmse,
    katz,
    fall,
    gds,
    norton,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      pasien,
      apgar,
      spmsq,
      mmse,
      katz,
      fall,
      gds,
      norton,
      summary,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/pengkajian-khusus/hasil");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
    >
      {/* Header */}
      <div className="border-b border-slate-100 pb-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Pengkajian Khusus Gerontik
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Instrumen skrining kognitif, kemandirian, risiko jatuh, depresi, dan
            risiko dekubitus dengan kalkulasi otomatis.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/pengkajian-khusus/hasil")}
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
              Nama Klien <span className="text-red-500">*</span>
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
              Usia
            </label>
            <input
              type="text"
              placeholder="Contoh: 74 Tahun"
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

      {/* Navigasi Tab 7 Instrumen */}
      <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: APGAR KELUARGA */}
      {activeTab === "apgar" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                APGAR Keluarga
              </h3>
              <p className="text-xs text-slate-600">
                Selalu = 2 | Kadang-kadang = 1 | Tidak Pernah = 0
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-700 block">
                Skor Total: {summary.apgar.score} / 10
              </span>
              <span className="text-xs text-slate-700">
                {summary.apgar.label}
              </span>
            </div>
          </div>

          {APGAR_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {[
                  { val: 2, text: "Selalu (2)" },
                  { val: 1, text: "Kadang (1)" },
                  { val: 0, text: "Tidak (0)" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setApgar({ ...apgar, [item.id]: opt.val })}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition cursor-pointer ${
                      apgar[item.id] === opt.val
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SPMSQ */}
      {activeTab === "spmsq" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Pengkajian Fungsi Kognitif (SPMSQ)
              </h3>
              <p className="text-xs text-slate-600">
                Penilaian dihitung berdasarkan jumlah jawaban SALAH
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-700 block">
                Skor Salah: {summary.spmsq.salah} / 10
              </span>
              <span className="text-xs text-slate-700">
                {summary.spmsq.label}
              </span>
            </div>
          </div>

          {SPMSQ_QUESTIONS.map((q, idx) => {
            const current = spmsq[idx] || { jawaban: "", status: "benar" };
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900">{q}</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSpmsq({
                          ...spmsq,
                          [idx]: { ...current, status: "benar" },
                        })
                      }
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                        current.status === "benar"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      Benar
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSpmsq({
                          ...spmsq,
                          [idx]: { ...current, status: "salah" },
                        })
                      }
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                        current.status === "salah"
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      Salah
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Catat jawaban klien..."
                  value={current.jawaban}
                  onChange={(e) =>
                    setSpmsq({
                      ...spmsq,
                      [idx]: { ...current, jawaban: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: MMSE */}
      {activeTab === "mmse" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Mini-Mental State Examination (MMSE)
              </h3>
              <p className="text-xs text-slate-600">
                Benar = 1 | Salah = 0 (Total maksimal 30)
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-700 block">
                Skor Total: {summary.mmse.score} / 30
              </span>
              <span className="text-xs text-slate-700">
                {summary.mmse.label}
              </span>
            </div>
          </div>

          {MMSE_SECTIONS.map((sec) => (
            <div
              key={sec.category}
              className="p-4 rounded-xl border border-slate-200 space-y-2.5"
            >
              <h4 className="text-xs font-bold text-blue-700">
                {sec.category}
              </h4>
              <div className="divide-y divide-slate-100">
                {sec.items.map((item) => {
                  const val = mmse[item.no] ?? 0;
                  return (
                    <div
                      key={item.no}
                      className="py-2 flex items-center justify-between gap-4"
                    >
                      <span className="text-xs text-slate-800">
                        {item.no}. {item.text}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setMmse({ ...mmse, [item.no]: 1 })}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border cursor-pointer ${
                            val === 1
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >
                          Benar (1)
                        </button>
                        <button
                          type="button"
                          onClick={() => setMmse({ ...mmse, [item.no]: 0 })}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border cursor-pointer ${
                            val === 0
                              ? "bg-slate-600 text-white border-slate-600"
                              : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >
                          Salah (0)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: INDEKS KATZ */}
      {activeTab === "katz" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Pengkajian Status Fungsional (Indeks Kemandirian Katz)
              </h3>
              <p className="text-xs text-slate-600">
                Klasifikasi otomatis Nilai A s/d G
              </p>
            </div>
            <div className="text-right max-w-md">
              <span className="text-xs font-bold text-blue-700 block">
                Hasil Klasifikasi: Nilai {summary.katz.grade}
              </span>
              <span className="text-[11px] text-slate-700">
                {summary.katz.desc}
              </span>
            </div>
          </div>

          {KATZ_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 space-y-3"
            >
              <p className="text-xs font-bold text-slate-900">{item.title}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setKatz({ ...katz, [item.id]: "mandiri" })}
                  className={`p-3 text-left rounded-xl border text-xs transition cursor-pointer ${
                    katz[item.id] === "mandiri"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  <span className="font-bold block mb-1">✓ Mandiri</span>
                  {item.mandiri}
                </button>

                <button
                  type="button"
                  onClick={() => setKatz({ ...katz, [item.id]: "tergantung" })}
                  className={`p-3 text-left rounded-xl border text-xs transition cursor-pointer ${
                    katz[item.id] === "tergantung"
                      ? "bg-amber-50 border-amber-500 text-amber-950"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  <span className="font-bold block mb-1">! Tergantung</span>
                  {item.tergantung}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: SCREENING FALL */}
      {activeTab === "fall" && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              1. Functional Reach (FR) Test
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Minta pasien berdiri di sisi tembok dengan tangan direntangkan ke
              depan (tanda I), lalu condong ke depan tanpa melangkah selama 1–2
              menit (tanda II). Ukur selisih jarak dalam inchi. (Usia &gt; 70
              tahun: &lt; 6 inchi = Risiko roboh).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jarak Jangkauan (Inchi)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Contoh: 7.5"
                  value={fall.frInchi}
                  onChange={(e) =>
                    setFall({ ...fall, frInchi: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center">
                <p className="text-xs font-semibold text-blue-700">
                  Interpretasi: {summary.fall.frLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              2. The Timed Up and Go (TUG) Test
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pasien duduk di kursi, berdiri, berjalan 10 langkah (3 meter),
              kembali duduk di kursi. Ukur waktu tempuh dalam detik.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Waktu Tempuh (Detik)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Contoh: 14"
                  value={fall.tugDetik}
                  onChange={(e) =>
                    setFall({ ...fall, tugDetik: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center">
                <p className="text-xs font-semibold text-blue-700">
                  Interpretasi: {summary.fall.tugLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GERIATRIC DEPRESSION SCALE (GDS) */}
      {activeTab === "gds" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Geriatric Depression Scale (GDS-15)
              </h3>
              <p className="text-xs text-slate-600">
                Skor 5–9: Kemungkinan Depresi | Skor ≥ 10: Depresi
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-700 block">
                Skor Depresi: {summary.gds.score} / 15
              </span>
              <span className="text-xs text-slate-700">
                {summary.gds.label}
              </span>
            </div>
          </div>

          {GDS_QUESTIONS.map((q) => {
            const ans = gds[q.no] || "";
            return (
              <div
                key={q.no}
                className="p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3"
              >
                <span className="text-xs text-slate-800">
                  {q.no}. {q.text}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {["YA", "TIDAK"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setGds({ ...gds, [q.no]: opt })}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                        ans === opt
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 7: SKOR NORTON */}
      {activeTab === "norton" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Skor Norton (Penilaian Potensi Dekubitus)
              </h3>
              <p className="text-xs text-slate-600">
                15–20: Kecil sekali | 12–15: Kemungkinan kecil | &lt; 12:
                Kemungkinan besar dekubitus
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-700 block">
                Skor Total: {summary.norton.score} / 20
              </span>
              <span className="text-xs text-slate-700">
                {summary.norton.label}
              </span>
            </div>
          </div>

          {NORTON_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-xl border border-slate-200 space-y-2.5"
            >
              <p className="text-xs font-bold text-slate-900">{cat.label}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {cat.options.map((opt) => (
                  <button
                    key={opt.score}
                    type="button"
                    onClick={() =>
                      setNorton({ ...norton, [cat.id]: opt.score })
                    }
                    className={`p-2.5 text-xs font-medium rounded-lg border text-left cursor-pointer ${
                      norton[cat.id] === opt.score
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold mr-1">({opt.score})</span>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ringkasan Live Skor Sebelum Simpan */}
      <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
        <Calculator className="w-5 h-5 text-blue-600 shrink-0" />
        <p className="text-xs text-slate-600">
          Semua skor dari ke-7 instrumen skrining di atas otomatis dihitung dan
          akan ditampilkan lengkap pada halaman hasil cetak PDF & WhatsApp.
        </p>
      </div>

      {/* Submit */}
      <div className="mt-6 pt-6 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
        >
          <FileCheck2 className="w-4 h-4" />
          Simpan & Lihat Hasil Skrining
        </button>
      </div>
    </form>
  );
}
