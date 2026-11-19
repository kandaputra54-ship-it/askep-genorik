"use client";

import { useState, useMemo } from "react";

/* ============================================================
   KONFIGURASI STEP WIZARD
   ============================================================ */
const STEPS = [
  { id: 1, title: "Identitas & Ekonomi" },
  { id: 2, title: "Lingkungan" },
  { id: 3, title: "Riwayat Kesehatan" },
  { id: 4, title: "Pola Fungsional" },
  { id: 5, title: "Pemeriksaan Fisik" },
  { id: 6, title: "Pengkajian Khusus" },
  { id: 7, title: "Analisa & Diagnosa" },
  { id: 8, title: "Intervensi & Evaluasi" },
  { id: 9, title: "Ringkasan & Kirim" },
];

/* ============================================================
   STATE AWAL (STATIS)
   ============================================================ */
const initialData = {
  // 1. Identitas
  identitas: {
    nama: "",
    ttl: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    agama: "",
    suku: "",
  },
  pekerjaan: {
    pekerjaanSaatIni: "",
    pekerjaanSebelumnya: "",
    sumberPendapatan: "",
    kecukupanPendapatan: "",
  },
  // 2. Lingkungan
  lingkungan: {
    kebersihan: "",
    penerangan: "",
    sirkulasi: "",
    kamarMandi: "",
    pembuanganAirKotor: "",
    sumberAirMinum: "",
    pembuanganSampah: "",
    sumberPencemaran: "",
    privasi: "",
    risikoInjuri: "",
  },
  // 3. Riwayat Kesehatan
  riwayatSaatIni: {
    keluhanUtama: "",
    gejala: "",
    faktorPencetus: "",
    timbulnya: "", // mendadak / bertahap
    upayaMengatasi: "",
    pergiBerobat: "",
    konsumsiObat: "",
    lainLain: "",
  },
  riwayatMasaLalu: {
    penyakit: "",
    alergi: "",
    kecelakaan: "",
    pernahDirawat: "",
    riwayatObat: "",
  },
  // 4. Pola Fungsional
  polaFungsional: {
    persepsiKesehatan: "",
    nutrisi: "",
    eliminasiBak: "",
    eliminasiBab: "",
    aktivitas: "",
    istirahatTidur: "",
    kognitifPersepsi: "",
    konsepDiri: "",
    peranHubungan: "",
    seksualitas: "",
    kopingStress: "",
    nilaiKeyakinan: "",
  },
  // 5. Pemeriksaan Fisik
  fisik: {
    keadaanUmum: "",
    ttv: { td: "", nadi: "", rr: "", suhu: "" },
    bbTb: "",
    kepala: "",
    rambut: "",
    mata: "",
    telinga: "",
    mulut: "",
    dada: "",
    abdomen: "",
    kulit: "",
    ekstremitasAtas: "",
    ekstremitasBawah: "",
  },
  // 6. Pengkajian Khusus
  khusus: {
    spmsq: { benar: "", salah: "", hasil: "" },
    mmse: { skor: "", hasil: "" },
    katz: { nilai: "" },
    apgar: { skor: "", hasil: "" },
    depresi: { skor: "", hasil: "" },
    fall: { tug: "", fr: "", hasil: "" },
    norton: { skor: "", hasil: "" },
  },
  // 7. Analisa & Diagnosa
  analisaData: [{ data: "", masalah: "" }],
  diagnosa: [{ dx: "", tanggalMuncul: "", tanggalTeratasi: "" }],
  // 8. Intervensi, Implementasi, Evaluasi
  intervensi: [{ dx: "", tujuan: "", intervensi: "" }],
  implementasi: [{ dx: "", tanggalJam: "", implementasi: "", evaluasi: "" }],
};

/* ============================================================
   KOMPONEN BANTUAN
   ============================================================ */
function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">-- Pilih --</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function RadioGroup({ label, value, onChange, options }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              checked={value === o}
              onChange={() => onChange(o)}
            />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-200 pb-1 mb-4 mt-2">
      {children}
    </h3>
  );
}

/* ============================================================
   SETTER HELPER (deep update)
   ============================================================ */
function useDeepState() {
  const [data, setData] = useState(initialData);

  const set = (path, value) => {
    setData((prev) => {
      const copy = structuredClone(prev);
      const keys = path.split(".");
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  return [data, set, setData];
}

/* ============================================================
   STEP 1 — IDENTITAS & EKONOMI
   ============================================================ */
function Step1({ data, set }) {
  return (
    <div>
      <SectionTitle>1. Identitas</SectionTitle>
      <Field
        label="Nama"
        value={data.identitas.nama}
        onChange={(v) => set("identitas.nama", v)}
      />
      <Field
        label="Tempat / Tanggal Lahir"
        value={data.identitas.ttl}
        onChange={(v) => set("identitas.ttl", v)}
        placeholder="Contoh: Jakarta, 1 Januari 1950"
      />
      <Select
        label="Jenis Kelamin"
        value={data.identitas.jenisKelamin}
        onChange={(v) => set("identitas.jenisKelamin", v)}
        options={["Laki-laki", "Perempuan"]}
      />
      <Select
        label="Status Perkawinan"
        value={data.identitas.statusPerkawinan}
        onChange={(v) => set("identitas.statusPerkawinan", v)}
        options={["Belum Menikah", "Menikah", "Janda", "Duda"]}
      />
      <Field
        label="Agama"
        value={data.identitas.agama}
        onChange={(v) => set("identitas.agama", v)}
      />
      <Field
        label="Suku"
        value={data.identitas.suku}
        onChange={(v) => set("identitas.suku", v)}
      />

      <SectionTitle>2. Riwayat Pekerjaan & Status Ekonomi</SectionTitle>
      <Field
        label="Pekerjaan Saat Ini"
        value={data.pekerjaan.pekerjaanSaatIni}
        onChange={(v) => set("pekerjaan.pekerjaanSaatIni", v)}
      />
      <Field
        label="Pekerjaan Sebelumnya"
        value={data.pekerjaan.pekerjaanSebelumnya}
        onChange={(v) => set("pekerjaan.pekerjaanSebelumnya", v)}
      />
      <Field
        label="Sumber Pendapatan"
        value={data.pekerjaan.sumberPendapatan}
        onChange={(v) => set("pekerjaan.sumberPendapatan", v)}
      />
      <Field
        label="Kecukupan Pendapatan"
        value={data.pekerjaan.kecukupanPendapatan}
        onChange={(v) => set("pekerjaan.kecukupanPendapatan", v)}
      />
    </div>
  );
}

/* ============================================================
   STEP 2 — LINGKUNGAN
   ============================================================ */
function Step2({ data, set }) {
  const items = [
    ["kebersihan", "Kebersihan & Kerapihan Ruangan"],
    ["penerangan", "Penerangan"],
    ["sirkulasi", "Sirkulasi Udara"],
    ["kamarMandi", "Keadaan Kamar Mandi & WC"],
    ["pembuanganAirKotor", "Pembuangan Air Kotor"],
    ["sumberAirMinum", "Sumber Air Minum"],
    ["pembuanganSampah", "Pembuangan Sampah"],
    ["sumberPencemaran", "Sumber Pencemaran"],
    ["privasi", "Privasi"],
    ["risikoInjuri", "Risiko Injuri"],
  ];
  return (
    <div>
      <SectionTitle>3. Lingkungan Tempat Tinggal</SectionTitle>
      <p className="text-sm text-gray-500 mb-4">
        Isi kondisi lingkungan tempat tinggal lansia.
      </p>
      {items.map(([key, label]) => (
        <Field
          key={key}
          label={label}
          value={data.lingkungan[key]}
          onChange={(v) => set(`lingkungan.${key}`, v)}
        />
      ))}
    </div>
  );
}

/* ============================================================
   STEP 3 — RIWAYAT KESEHATAN
   ============================================================ */
function Step3({ data, set }) {
  return (
    <div>
      <SectionTitle>4a. Status Kesehatan Saat Ini</SectionTitle>
      <TextArea
        label="Keluhan Utama dalam 1 Tahun Terakhir"
        value={data.riwayatSaatIni.keluhanUtama}
        onChange={(v) => set("riwayatSaatIni.keluhanUtama", v)}
      />
      <TextArea
        label="Gejala yang Dirasakan"
        value={data.riwayatSaatIni.gejala}
        onChange={(v) => set("riwayatSaatIni.gejala", v)}
      />
      <Field
        label="Faktor Pencetus"
        value={data.riwayatSaatIni.faktorPencetus}
        onChange={(v) => set("riwayatSaatIni.faktorPencetus", v)}
      />
      <RadioGroup
        label="Timbulnya Keluhan"
        value={data.riwayatSaatIni.timbulnya}
        onChange={(v) => set("riwayatSaatIni.timbulnya", v)}
        options={["Mendadak", "Bertahap"]}
      />
      <TextArea
        label="Upaya Mengatasi"
        value={data.riwayatSaatIni.upayaMengatasi}
        onChange={(v) => set("riwayatSaatIni.upayaMengatasi", v)}
      />
      <Field
        label="Pergi ke RS/Klinik/Dokter/Bidan/Perawat?"
        value={data.riwayatSaatIni.pergiBerobat}
        onChange={(v) => set("riwayatSaatIni.pergiBerobat", v)}
      />
      <Field
        label="Mengkonsumsi Obat Sendiri / Tradisional?"
        value={data.riwayatSaatIni.konsumsiObat}
        onChange={(v) => set("riwayatSaatIni.konsumsiObat", v)}
      />
      <TextArea
        label="Lain-lain"
        value={data.riwayatSaatIni.lainLain}
        onChange={(v) => set("riwayatSaatIni.lainLain", v)}
      />

      <SectionTitle>4b. Riwayat Kesehatan Masa Lalu</SectionTitle>
      <TextArea
        label="Penyakit yang Pernah Diderita"
        value={data.riwayatMasaLalu.penyakit}
        onChange={(v) => set("riwayatMasaLalu.penyakit", v)}
      />
      <TextArea
        label="Riwayat Alergi (obat, makanan, binatang, debu, dll)"
        value={data.riwayatMasaLalu.alergi}
        onChange={(v) => set("riwayatMasaLalu.alergi", v)}
      />
      <TextArea
        label="Riwayat Kecelakaan"
        value={data.riwayatMasaLalu.kecelakaan}
        onChange={(v) => set("riwayatMasaLalu.kecelakaan", v)}
      />
      <TextArea
        label="Riwayat Pernah Dirawat di RS"
        value={data.riwayatMasaLalu.pernahDirawat}
        onChange={(v) => set("riwayatMasaLalu.pernahDirawat", v)}
      />
      <TextArea
        label="Riwayat Pemakaian Obat"
        value={data.riwayatMasaLalu.riwayatObat}
        onChange={(v) => set("riwayatMasaLalu.riwayatObat", v)}
      />
    </div>
  );
}

/* ============================================================
   STEP 4 — POLA FUNGSIONAL
   ============================================================ */
function Step4({ data, set }) {
  const pola = [
    ["persepsiKesehatan", "a. Persepsi Kesehatan & Pola Manajemen Kesehatan (merokok, miras, ketergantungan obat: jenis/frekuensi/jumlah/lama)"],
    ["nutrisi", "b. Nutrisi Metabolik (frekuensi makan, nafsu makan, jenis makanan, makanan tidak disukai, alergi, pantangan, keluhan)"],
    ["eliminasiBak", "c. Eliminasi BAK (frekuensi & waktu, kebiasaan malam, keluhan)"],
    ["eliminasiBab", "d. Eliminasi BAB (frekuensi & waktu, konsistensi, keluhan, pengalaman pencahar)"],
    ["aktivitas", "e. Aktivitas & Pola Latihan (rutinitas mandi, kebersihan, aktivitas sehari-hari, masalah aktivitas, kemandirian)"],
    ["istirahatTidur", "f. Pola Istirahat Tidur (lama tidur malam, tidur siang, keluhan)"],
    ["kognitifPersepsi", "g. Pola Kognitif Persepsi (penglihatan, pendengaran, kesulitan mengambil keputusan)"],
    ["konsepDiri", "h. Persepsi Diri & Konsep Diri (pandangan diri sebagai lansia, persepsi orang lain)"],
    ["peranHubungan", "i. Pola Peran-Hubungan (peran, kepuasan, pekerjaan/sosial/hubungan perkawinan)"],
    ["seksualitas", "j. Seksualitas (riwayat reproduksi, kepuasan seksual, masalah)"],
    ["kopingStress", "k. Koping & Pola Toleransi Stress (penyebab stress, penanganan masalah)"],
    ["nilaiKeyakinan", "l. Nilai & Pola Keyakinan (spiritualitas, keyakinan kesehatan & agama)"],
  ];
  return (
    <div>
      <SectionTitle>5. Pola Fungsional</SectionTitle>
      {pola.map(([key, label]) => (
        <TextArea
          key={key}
          label={label}
          value={data.polaFungsional[key]}
          onChange={(v) => set(`polaFungsional.${key}`, v)}
        />
      ))}
    </div>
  );
}

/* ============================================================
   STEP 5 — PEMERIKSAAN FISIK
   ============================================================ */
function Step5({ data, set }) {
  return (
    <div>
      <SectionTitle>6. Pemeriksaan Fisik</SectionTitle>
      <TextArea
        label="Keadaan Umum"
        value={data.fisik.keadaanUmum}
        onChange={(v) => set("fisik.keadaanUmum", v)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="TD (mmHg)"
          value={data.fisik.ttv.td}
          onChange={(v) => set("fisik.ttv.td", v)}
        />
        <Field
          label="Nadi (x/menit)"
          value={data.fisik.ttv.nadi}
          onChange={(v) => set("fisik.ttv.nadi", v)}
        />
        <Field
          label="RR (x/menit)"
          value={data.fisik.ttv.rr}
          onChange={(v) => set("fisik.ttv.rr", v)}
        />
        <Field
          label="Suhu (°C)"
          value={data.fisik.ttv.suhu}
          onChange={(v) => set("fisik.ttv.suhu", v)}
        />
      </div>
      <Field
        label="BB / TB"
        value={data.fisik.bbTb}
        onChange={(v) => set("fisik.bbTb", v)}
        placeholder="Contoh: 55 kg / 160 cm"
      />
      <Field
        label="Kepala"
        value={data.fisik.kepala}
        onChange={(v) => set("fisik.kepala", v)}
      />
      <Field
        label="Rambut"
        value={data.fisik.rambut}
        onChange={(v) => set("fisik.rambut", v)}
      />
      <Field
        label="Mata"
        value={data.fisik.mata}
        onChange={(v) => set("fisik.mata", v)}
      />
      <Field
        label="Telinga"
        value={data.fisik.telinga}
        onChange={(v) => set("fisik.telinga", v)}
      />
      <Field
        label="Mulut, Gigi dan Bibir"
        value={data.fisik.mulut}
        onChange={(v) => set("fisik.mulut", v)}
      />
      <Field
        label="Dada"
        value={data.fisik.dada}
        onChange={(v) => set("fisik.dada", v)}
      />
      <Field
        label="Abdomen"
        value={data.fisik.abdomen}
        onChange={(v) => set("fisik.abdomen", v)}
      />
      <Field
        label="Kulit"
        value={data.fisik.kulit}
        onChange={(v) => set("fisik.kulit", v)}
      />
      <Field
        label="Ekstremitas Atas"
        value={data.fisik.ekstremitasAtas}
        onChange={(v) => set("fisik.ekstremitasAtas", v)}
      />
      <Field
        label="Ekstremitas Bawah"
        value={data.fisik.ekstremitasBawah}
        onChange={(v) => set("fisik.ekstremitasBawah", v)}
      />
    </div>
  );
}

/* ============================================================
   STEP 6 — PENGKAJIAN KHUSUS
   ============================================================ */
function Step6({ data, set }) {
  return (
    <div>
      <SectionTitle>7. Pengkajian Khusus</SectionTitle>

      {/* SPMSQ */}
      <div className="border rounded-md p-3 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">a. Fungsi Kognitif (SPMSQ)</h4>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Jumlah Benar"
            value={data.khusus.spmsq.benar}
            onChange={(v) => set("khusus.spmsq.benar", v)}
          />
          <Field
            label="Jumlah Salah"
            value={data.khusus.spmsq.salah}
            onChange={(v) => set("khusus.spmsq.salah", v)}
          />
        </div>
        <TextArea
          label="Hasil / Interpretasi (0-2 utuh, 3-4 ringan, 5-7 sedang, 8-10 berat)"
          value={data.khusus.spmsq.hasil}
          onChange={(v) => set("khusus.spmsq.hasil", v)}
          rows={2}
        />
      </div>

      {/* MMSE */}
      <div className="border rounded-md p-3 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">b. MMSE</h4>
        <Field
          label="Skor Total MMSE (0-30)"
          value={data.khusus.mmse.skor}
          onChange={(v) => set("khusus.mmse.skor", v)}
        />
        <TextArea
          label="Hasil / Interpretasi (≤21 kerusakan kognitif)"
          value={data.khusus.mmse.hasil}
          onChange={(v) => set("khusus.mmse.hasil", v)}
          rows={2}
        />
      </div>

      {/* Katz */}
      <div className="border rounded-md p-3 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">c. Status Fungsional (Katz Indeks)</h4>
        <Select
          label="Nilai Katz"
          value={data.khusus.katz.nilai}
          onChange={(v) => set("khusus.katz.nilai", v)}
          options={["A", "B", "C", "D", "E", "F", "G"]}
        />
      </div>

      {/* APGAR */}
      <div className="border rounded-md p-3 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">d. APGAR Keluarga</h4>
        <Field
          label="Skor Total (0-10)"
          value={data.khusus.apgar.skor}
          onChange={(v) => set("khusus.apgar.skor", v)}
        />
        <TextArea
          label="Hasil (0-3 disfungsi sangat tinggi, 4-6 sedang, 7-10 baik)"
          value={data.khusus.apgar.hasil}
          onChange={(v) => set("khusus.apgar.hasil", v)}
          rows={2}
        />
      </div>

      {/* Depresi */}
      <div className="border rounded-md p-3 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">e. Skala Depresi (GDS)</h4>
        <Field
          label="Skor Total (0-15)"
          value={data.khusus.depresi.skor}
          onChange={(v) => set("khusus.depresi.skor", v)}
        />
        <TextArea
          label="Hasil (5-9 kemungkinan depresi, ≥10 depresi)"
          value={data.khusus.depresi.hasil}
          onChange={(v) => set("khusus.depresi.hasil", v)}
          rows={2}
        />
      </div>

      {/* Fall */}
      <div className="border rounded-md p-3 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">f. Screening Fall</h4>
        <Field
          label="FR Test (inch)"
          value={data.khusus.fall.fr}
          onChange={(v) => set("khusus.fall.fr", v)}
        />
        <Field
          label="TUG Test (detik)"
          value={data.khusus.fall.tug}
          onChange={(v) => set("khusus.fall.tug", v)}
        />
        <TextArea
          label="Hasil / Interpretasi Risiko Jatuh"
          value={data.khusus.fall.hasil}
          onChange={(v) => set("khusus.fall.hasil", v)}
          rows={2}
        />
      </div>

      {/* Norton */}
      <div className="border rounded-md p-3 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">g. Skala Norton (Dekubitus)</h4>
        <Field
          label="Skor Total (5-20)"
          value={data.khusus.norton.skor}
          onChange={(v) => set("khusus.norton.skor", v)}
        />
        <TextArea
          label="Hasil (15-20 kecil, 12-15 kecil, <12 besar)"
          value={data.khusus.norton.hasil}
          onChange={(v) => set("khusus.norton.hasil", v)}
          rows={2}
        />
      </div>
    </div>
  );
}

/* ============================================================
   STEP 7 — ANALISA DATA & DIAGNOSA
   ============================================================ */
function Step7({ data, set }) {
  const addAnalisa = () =>
    set("analisaData", [...data.analisaData, { data: "", masalah: "" }]);
  const removeAnalisa = (i) =>
    set(
      "analisaData",
      data.analisaData.filter((_, idx) => idx !== i)
    );
  const updateAnalisa = (i, key, val) => {
    const copy = [...data.analisaData];
    copy[i][key] = val;
    set("analisaData", copy);
  };

  const addDx = () =>
    set("diagnosa", [
      ...data.diagnosa,
      { dx: "", tanggalMuncul: "", tanggalTeratasi: "" },
    ]);
  const removeDx = (i) =>
    set(
      "diagnosa",
      data.diagnosa.filter((_, idx) => idx !== i)
    );
  const updateDx = (i, key, val) => {
    const copy = [...data.diagnosa];
    copy[i][key] = val;
    set("diagnosa", copy);
  };

  return (
    <div>
      <SectionTitle>IX. Analisa Data</SectionTitle>
      <p className="text-sm text-gray-500 mb-2">
        Tuliskan data subjektif/objektif dan masalah keperawatan.
      </p>
      {data.analisaData.map((row, i) => (
        <div key={i} className="border rounded-md p-3 mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Data #{i + 1}</span>
            <button
              type="button"
              onClick={() => removeAnalisa(i)}
              className="text-xs text-red-600 hover:underline"
            >
              Hapus
            </button>
          </div>
          <TextArea
            label="Data"
            value={row.data}
            onChange={(v) => updateAnalisa(i, "data", v)}
            rows={2}
          />
          <Field
            label="Masalah"
            value={row.masalah}
            onChange={(v) => updateAnalisa(i, "masalah", v)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addAnalisa}
        className="mb-6 text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        + Tambah Data
      </button>

      <SectionTitle>Daftar Diagnosa Keperawatan (Prioritas)</SectionTitle>
      {data.diagnosa.map((row, i) => (
        <div key={i} className="border rounded-md p-3 mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Dx #{i + 1}</span>
            <button
              type="button"
              onClick={() => removeDx(i)}
              className="text-xs text-red-600 hover:underline"
            >
              Hapus
            </button>
          </div>
          <TextArea
            label="Diagnosa Keperawatan"
            value={row.dx}
            onChange={(v) => updateDx(i, "dx", v)}
            rows={2}
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Tanggal Muncul"
              value={row.tanggalMuncul}
              onChange={(v) => updateDx(i, "tanggalMuncul", v)}
            />
            <Field
              label="Tanggal Teratasi"
              value={row.tanggalTeratasi}
              onChange={(v) => updateDx(i, "tanggalTeratasi", v)}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addDx}
        className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        + Tambah Diagnosa
      </button>
    </div>
  );
}

/* ============================================================
   STEP 8 — INTERVENSI & IMPLEMENTASI
   ============================================================ */
function Step8({ data, set }) {
  const addIntervensi = () =>
    set("intervensi", [
      ...data.intervensi,
      { dx: "", tujuan: "", intervensi: "" },
    ]);
  const removeIntervensi = (i) =>
    set(
      "intervensi",
      data.intervensi.filter((_, idx) => idx !== i)
    );
  const updateIntervensi = (i, key, val) => {
    const copy = [...data.intervensi];
    copy[i][key] = val;
    set("intervensi", copy);
  };

  const addImplementasi = () =>
    set("implementasi", [
      ...data.implementasi,
      { dx: "", tanggalJam: "", implementasi: "", evaluasi: "" },
    ]);
  const removeImplementasi = (i) =>
    set(
      "implementasi",
      data.implementasi.filter((_, idx) => idx !== i)
    );
  const updateImplementasi = (i, key, val) => {
    const copy = [...data.implementasi];
    copy[i][key] = val;
    set("implementasi", copy);
  };

  return (
    <div>
      <SectionTitle>Intervensi Keperawatan</SectionTitle>
      {data.intervensi.map((row, i) => (
        <div key={i} className="border rounded-md p-3 mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Intervensi #{i + 1}</span>
            <button
              type="button"
              onClick={() => removeIntervensi(i)}
              className="text-xs text-red-600 hover:underline"
            >
              Hapus
            </button>
          </div>
          <Field
            label="Diagnosa Keperawatan"
            value={row.dx}
            onChange={(v) => updateIntervensi(i, "dx", v)}
          />
          <TextArea
            label="Tujuan & Kriteria Hasil"
            value={row.tujuan}
            onChange={(v) => updateIntervensi(i, "tujuan", v)}
            rows={2}
          />
          <TextArea
            label="Intervensi Keperawatan"
            value={row.intervensi}
            onChange={(v) => updateIntervensi(i, "intervensi", v)}
            rows={3}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addIntervensi}
        className="mb-6 text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        + Tambah Intervensi
      </button>

      <SectionTitle>Implementasi & Evaluasi Keperawatan</SectionTitle>
      {data.implementasi.map((row, i) => (
        <div key={i} className="border rounded-md p-3 mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Implementasi #{i + 1}</span>
            <button
              type="button"
              onClick={() => removeImplementasi(i)}
              className="text-xs text-red-600 hover:underline"
            >
              Hapus
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="No. Dx"
              value={row.dx}
              onChange={(v) => updateImplementasi(i, "dx", v)}
            />
            <Field
              label="Tanggal & Jam"
              value={row.tanggalJam}
              onChange={(v) => updateImplementasi(i, "tanggalJam", v)}
            />
          </div>
          <TextArea
            label="Implementasi Keperawatan"
            value={row.implementasi}
            onChange={(v) => updateImplementasi(i, "implementasi", v)}
            rows={2}
          />
          <TextArea
            label="Evaluasi"
            value={row.evaluasi}
            onChange={(v) => updateImplementasi(i, "evaluasi", v)}
            rows={2}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addImplementasi}
        className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        + Tambah Implementasi
      </button>
    </div>
  );
}

/* ============================================================
   GENERATOR TEKS UNTUK DOWNLOAD / WHATSAPP
   ============================================================ */
function buildSummaryText(data) {
  const line = "================================";
  const sub = "--------------------------------";
  const lines = [];
  lines.push("FORMAT PENGKAJIAN ASUHAN KEPERAWATAN GERONTIK");
  lines.push(line);
  lines.push("A. PENGKAJIAN");
  lines.push("1. Identitas");
  lines.push(`   Nama               : ${data.identitas.nama || "-"}`);
  lines.push(`   Tempat/Tgl Lahir   : ${data.identitas.ttl || "-"}`);
  lines.push(`   Jenis Kelamin      : ${data.identitas.jenisKelamin || "-"}`);
  lines.push(`   Status Perkawinan  : ${data.identitas.statusPerkawinan || "-"}`);
  lines.push(`   Agama              : ${data.identitas.agama || "-"}`);
  lines.push(`   Suku               : ${data.identitas.suku || "-"}`);
  lines.push("");
  lines.push("2. Riwayat Pekerjaan & Status Ekonomi");
  lines.push(`   Pekerjaan saat ini : ${data.pekerjaan.pekerjaanSaatIni || "-"}`);
  lines.push(`   Pekerjaan sblmnya  : ${data.pekerjaan.pekerjaanSebelumnya || "-"}`);
  lines.push(`   Sumber pendapatan  : ${data.pekerjaan.sumberPendapatan || "-"}`);
  lines.push(`   Kecukupan pendapat : ${data.pekerjaan.kecukupanPendapatan || "-"}`);
  lines.push("");
  lines.push("3. Lingkungan Tempat Tinggal");
  Object.entries(data.lingkungan).forEach(([k, v]) => {
    lines.push(`   - ${k}: ${v || "-"}`);
  });
  lines.push("");
  lines.push("4. Riwayat Kesehatan");
  lines.push("   a. Status Kesehatan Saat Ini");
  Object.entries(data.riwayatSaatIni).forEach(([k, v]) => {
    lines.push(`      - ${k}: ${v || "-"}`);
  });
  lines.push("   b. Riwayat Kesehatan Masa Lalu");
  Object.entries(data.riwayatMasaLalu).forEach(([k, v]) => {
    lines.push(`      - ${k}: ${v || "-"}`);
  });
  lines.push("");
  lines.push("5. Pola Fungsional");
  Object.entries(data.polaFungsional).forEach(([k, v]) => {
    lines.push(`   - ${k}: ${v || "-"}`);
  });
  lines.push("");
  lines.push("6. Pemeriksaan Fisik");
  lines.push(`   Keadaan Umum: ${data.fisik.keadaanUmum || "-"}`);
  lines.push(`   TTV: TD ${data.fisik.ttv.td || "-"} mmHg, Nadi ${data.fisik.ttv.nadi || "-"} x/mnt, RR ${data.fisik.ttv.rr || "-"} x/mnt, Suhu ${data.fisik.ttv.suhu || "-"} °C`);
  lines.push(`   BB/TB: ${data.fisik.bbTb || "-"}`);
  lines.push(`   Kepala: ${data.fisik.kepala || "-"}`);
  lines.push(`   Rambut: ${data.fisik.rambut || "-"}`);
  lines.push(`   Mata: ${data.fisik.mata || "-"}`);
  lines.push(`   Telinga: ${data.fisik.telinga || "-"}`);
  lines.push(`   Mulut, Gigi, Bibir: ${data.fisik.mulut || "-"}`);
  lines.push(`   Dada: ${data.fisik.dada || "-"}`);
  lines.push(`   Abdomen: ${data.fisik.abdomen || "-"}`);
  lines.push(`   Kulit: ${data.fisik.kulit || "-"}`);
  lines.push(`   Ekstremitas Atas: ${data.fisik.ekstremitasAtas || "-"}`);
  lines.push(`   Ekstremitas Bawah: ${data.fisik.ekstremitasBawah || "-"}`);
  lines.push("");
  lines.push("7. Pengkajian Khusus");
  lines.push(`   a. SPMSQ: Benar ${data.khusus.spmsq.benar || "-"}, Salah ${data.khusus.spmsq.salah || "-"}. Hasil: ${data.khusus.spmsq.hasil || "-"}`);
  lines.push(`   b. MMSE: Skor ${data.khusus.mmse.skor || "-"}. Hasil: ${data.khusus.mmse.hasil || "-"}`);
  lines.push(`   c. Katz: Nilai ${data.khusus.katz.nilai || "-"}`);
  lines.push(`   d. APGAR: Skor ${data.khusus.apgar.skor || "-"}. Hasil: ${data.khusus.apgar.hasil || "-"}`);
  lines.push(`   e. Depresi: Skor ${data.khusus.depresi.skor || "-"}. Hasil: ${data.khusus.depresi.hasil || "-"}`);
  lines.push(`   f. Fall: FR ${data.khusus.fall.fr || "-"} inch, TUG ${data.khusus.fall.tug || "-"} detik. Hasil: ${data.khusus.fall.hasil || "-"}`);
  lines.push(`   g. Norton: Skor ${data.khusus.norton.skor || "-"}. Hasil: ${data.khusus.norton.hasil || "-"}`);
  lines.push("");
  lines.push("IX. ANALISA DATA");
  data.analisaData.forEach((row, i) => {
    lines.push(`   ${i + 1}. Data: ${row.data || "-"}`);
    lines.push(`      Masalah: ${row.masalah || "-"}`);
  });
  lines.push("");
  lines.push("DAFTAR DIAGNOSA KEPERAWATAN");
  data.diagnosa.forEach((row, i) => {
    lines.push(`   ${i + 1}. ${row.dx || "-"}`);
    lines.push(`      Muncul: ${row.tanggalMuncul || "-"} | Teratasi: ${row.tanggalTeratasi || "-"}`);
  });
  lines.push("");
  lines.push("INTERVENSI KEPERAWATAN");
  data.intervensi.forEach((row, i) => {
    lines.push(`   ${i + 1}. Dx: ${row.dx || "-"}`);
    lines.push(`      Tujuan: ${row.tujuan || "-"}`);
    lines.push(`      Intervensi: ${row.intervensi || "-"}`);
  });
  lines.push("");
  lines.push("IMPLEMENTASI & EVALUASI KEPERAWATAN");
  data.implementasi.forEach((row, i) => {
    lines.push(`   ${i + 1}. Dx: ${row.dx || "-"} | ${row.tanggalJam || "-"}`);
    lines.push(`      Implementasi: ${row.implementasi || "-"}`);
    lines.push(`      Evaluasi: ${row.evaluasi || "-"}`);
  });
  lines.push("");
  lines.push(line);
  lines.push("ASUHAN KEPERAWATAN GERONTIK AKPER BWH 2026");
  return lines.join("\n");
}

/* ============================================================
   STEP 9 — RINGKASAN & KIRIM
   ============================================================ */
function Step9({ data }) {
  const [waNumber, setWaNumber] = useState("");
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => buildSummaryText(data), [data]);

  const downloadTxt = () => {
    try {
      const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pengkajian-gerontik-${data.identitas.nama || "pasien"}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("File berhasil diunduh", {
        description: `pengkajian-gerontik-${data.identitas.nama || "pasien"}.txt`,
      });
    } catch {
      toast.error("Gagal mengunduh file");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Teks berhasil disalin ke clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin teks", {
        description: "Silakan salin manual dari ringkasan di atas.",
      });
    }
  };

  const sendWhatsApp = () => {
    const num = waNumber.replace(/[^0-9]/g, "");

    if (!num) {
      toast.warning("Nomor WhatsApp belum diisi", {
        description: "Contoh format: 6281234567890",
      });
      return;
    }

    if (num.length < 10) {
      toast.warning("Nomor WhatsApp terlalu pendek", {
        description: "Pastikan nomor menggunakan kode negara, mis. 62812xxxxxxx",
      });
      return;
    }

    const url = `https://wa.me/${num}?text=${encodeURIComponent(summary)}`;
    const win = window.open(url, "_blank");

    if (!win) {
      toast.error("Popup diblokir browser", {
        description: "Izinkan popup untuk membuka WhatsApp.",
      });
      return;
    }

    toast.success("Membuka WhatsApp", {
      description: `Tujuan: +${num}`,
    });
  };

  return (
    <div>
      <SectionTitle>Ringkasan Pengkajian</SectionTitle>
      <pre className="bg-gray-50 border border-gray-200 rounded-md p-4 text-xs whitespace-pre-wrap max-h-96 overflow-y-auto mb-4">
        {summary}
      </pre>

      <SectionTitle>Download / Kirim</SectionTitle>
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          type="button"
          onClick={downloadTxt}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          ⬇ Download .txt
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm"
        >
          {copied ? "✅ Tersalin!" : "📋 Salin Teks"}
        </button>
      </div>

      <div className="border rounded-md p-4 bg-gray-50 mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nomor WhatsApp Tujuan (format internasional tanpa +)
        </label>
        <input
          value={waNumber}
          onChange={(e) => setWaNumber(e.target.value)}
          placeholder="Contoh: 6281234567890"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={sendWhatsApp}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          📲 Kirim ke WhatsApp
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Catatan: Data tersimpan statis di halaman ini. Jika halaman di-refresh,
        data akan hilang. Pastikan download/salin sebelum meninggalkan halaman.
      </p>
    </div>
  );
}

/* ============================================================
   HALAMAN UTAMA WIZARD
   ============================================================ */
export default function PengkajianPage() {
  const [data, set] = useDeepState();
  const [step, setStep] = useState(1);

  const totalSteps = STEPS.length;
  const current = STEPS.find((s) => s.id === step);

  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={data} set={set} />;
      case 2:
        return <Step2 data={data} set={set} />;
      case 3:
        return <Step3 data={data} set={set} />;
      case 4:
        return <Step4 data={data} set={set} />;
      case 5:
        return <Step5 data={data} set={set} />;
      case 6:
        return <Step6 data={data} set={set} />;
      case 7:
        return <Step7 data={data} set={set} />;
      case 8:
        return <Step8 data={data} set={set} />;
      case 9:
        return <Step9 data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 text-white px-6 py-4">
          <h1 className="text-xl font-bold">
            Pengkajian Asuhan Keperawatan Gerontik
          </h1>
          <p className="text-sm text-blue-100">
            AKPER BWH 2026 — Form Wizard
          </p>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>
              Step {step} dari {totalSteps}
            </span>
            <span>{current?.title}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {STEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`text-[10px] px-2 py-1 rounded ${
                  step === s.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">{renderStep()}</div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={step === 1}
            className={`px-4 py-2 rounded-md text-sm ${
              step === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            ← Sebelumnya
          </button>
          <button
            type="button"
            onClick={next}
            disabled={step === totalSteps}
            className={`px-4 py-2 rounded-md text-sm ${
              step === totalSteps
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Selanjutnya →
          </button>
        </div>
      </div>

      <p className="max-w-4xl mx-auto mt-4 text-center text-xs text-gray-400">
        Data hanya tersimpan di state halaman (statis). Refresh = data hilang.
      </p>
    </div>
  );
}