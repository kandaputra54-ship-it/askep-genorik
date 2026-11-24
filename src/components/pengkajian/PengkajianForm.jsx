"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileCheck2,
  Eye,
  ChevronRight,
  ChevronLeft,
  User,
  HeartPulse,
  Activity,
  Stethoscope,
} from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_gerontik_pengkajian_dasar";

const STEPS = [
  { id: 1, title: "1. Identitas & Lingkungan", icon: User },
  { id: 2, title: "2. Riwayat Kesehatan", icon: HeartPulse },
  { id: 3, title: "3. 11 Pola Fungsional", icon: Activity },
  { id: 4, title: "4. Pemeriksaan Fisik", icon: Stethoscope },
];

export default function PengkajianForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl: "",
  });

  // Step 1: Identitas, Ekonomi & Lingkungan
  const [identitas, setIdentitas] = useState({
    nama: "",
    ttl: "",
    jenisKelamin: "Laki-laki",
    statusPerkawinan: "",
    agama: "",
    suku: "",
    pekerjaanSaatIni: "",
    pekerjaanSebelumnya: "",
    sumberPendapatan: "",
    kecukupanPendapatan: "",
    lingkungan: "",
  });

  // Step 2: Riwayat Kesehatan
  const [riwayat, setRiwayat] = useState({
    keluhanUtama: "",
    gejalaDirasakan: "",
    faktorPencetus: "",
    timbulKeluhan: "Bertahap",
    upayaMengatasi: "",
    penyakitMasaLalu: "",
    riwayatAlergi: "",
    riwayatKecelakaan: "",
    riwayatDirawat: "",
    riwayatObat: "",
  });

  // Step 3: 11 Pola Fungsional
  const [polaFungsional, setPolaFungsional] = useState({
    persepsiKesehatan: "",
    nutrisiMetabolik: "",
    eliminasi: "",
    aktivitasLatihan: "",
    istirahatTidur: "",
    kognitifPersepsi: "",
    persepsiKonsepDiri: "",
    peranHubungan: "",
    seksualitas: "",
    kopingToleransiStress: "",
    nilaiKeyakinan: "",
  });

  // Step 4: Pemeriksaan Fisik
  const [pemeriksaanFisik, setPemeriksaanFisik] = useState({
    keadaanUmum: "",
    ttv: "",
    bbTb: "",
    kepala: "",
    rambut: "",
    mata: "",
    telinga: "",
    mulutGigiBibir: "",
    dada: "",
    abdomen: "",
    kulit: "",
    ekstremitasAtas: "",
    ekstremitasBawah: "",
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
    if (p?.identitas) setIdentitas(p.identitas);
    if (p?.riwayat) setRiwayat(p.riwayat);
    if (p?.polaFungsional) setPolaFungsional(p.polaFungsional);
    if (p?.pemeriksaanFisik) setPemeriksaanFisik(p.pemeriksaanFisik);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      identitas,
      riwayat,
      polaFungsional,
      pemeriksaanFisik,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/pengkajian/hasil");
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
    >
      {/* Header */}
      <div className="border-b border-slate-100 pb-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Format Pengkajian Asuhan Keperawatan Gerontik
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Isi pengkajian dasar lansia secara bertahap mulai dari identitas,
            riwayat, 11 pola fungsional, hingga pemeriksaan fisik.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/pengkajian/hasil")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3.5 py-2 rounded-lg transition cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          Lihat Hasil Tersimpan
        </button>
      </div>

      {/* Identitas Mahasiswa Opsional */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      {/* Stepper Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-8 pb-6 border-b border-slate-200">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentStep(s.id)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              />
              <span className="text-xs font-bold leading-tight">{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* STEP 1: IDENTITAS, EKONOMI & LINGKUNGAN */}
      {currentStep === 1 && (
        <div className="space-y-8">
          {/* Sub A: Identitas */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              A. Identitas Klien / Lansia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap / Inisial <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ny. S"
                  value={identitas.nama}
                  onChange={(e) =>
                    setIdentitas({ ...identitas, nama: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tempat / Tanggal Lahir (Usia)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta, 12 Mei 1952 (74 Thn)"
                  value={identitas.ttl}
                  onChange={(e) =>
                    setIdentitas({ ...identitas, ttl: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  value={identitas.jenisKelamin}
                  onChange={(e) =>
                    setIdentitas({ ...identitas, jenisKelamin: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Perkawinan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Menikah / Janda / Duda"
                  value={identitas.statusPerkawinan}
                  onChange={(e) =>
                    setIdentitas({
                      ...identitas,
                      statusPerkawinan: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Agama
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Islam"
                  value={identitas.agama}
                  onChange={(e) =>
                    setIdentitas({ ...identitas, agama: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Suku / Bangsa
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jawa / Betawi"
                  value={identitas.suku}
                  onChange={(e) =>
                    setIdentitas({ ...identitas, suku: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sub B: Riwayat Pekerjaan & Status Ekonomi */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              B. Riwayat Pekerjaan dan Status Ekonomi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pekerjaan Saat Ini
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pensiunan / Tidak bekerja"
                  value={identitas.pekerjaanSaatIni}
                  onChange={(e) =>
                    setIdentitas({
                      ...identitas,
                      pekerjaanSaatIni: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pekerjaan Sebelumnya
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pedagang / PNS / Wiraswasta"
                  value={identitas.pekerjaanSebelumnya}
                  onChange={(e) =>
                    setIdentitas({
                      ...identitas,
                      pekerjaanSebelumnya: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sumber Pendapatan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dana pensiun / Pemberian anak / Bantuan sosial"
                  value={identitas.sumberPendapatan}
                  onChange={(e) =>
                    setIdentitas({
                      ...identitas,
                      sumberPendapatan: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kecukupan Pendapatan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Cukup untuk kebutuhan sehari-hari"
                  value={identitas.kecukupanPendapatan}
                  onChange={(e) =>
                    setIdentitas({
                      ...identitas,
                      kecukupanPendapatan: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sub C: Lingkungan Tempat Tinggal */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 pb-2 border-b border-slate-100">
              C. Lingkungan Tempat Tinggal
            </h3>
            <p className="text-xs text-slate-500 mb-2">
              Kaji: Kebersihan & kerapihan ruangan, penerangan, sirkulasi udara,
              keadaan kamar mandi & WC, pembuangan air kotor, sumber air minum,
              pembuangan sampah, sumber pencemaran, privasi, dan risiko injuri.
            </p>
            <textarea
              rows={4}
              placeholder="Deskripsikan kondisi lingkungan tempat tinggal / wisma lansia..."
              value={identitas.lingkungan}
              onChange={(e) =>
                setIdentitas({ ...identitas, lingkungan: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* STEP 2: RIWAYAT KESEHATAN */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              A. Status Kesehatan Saat Ini
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keluhan Utama dalam 1 Tahun Terakhir
                </label>
                <textarea
                  rows={2}
                  placeholder="Tuliskan keluhan utama klien..."
                  value={riwayat.keluhanUtama}
                  onChange={(e) =>
                    setRiwayat({ ...riwayat, keluhanUtama: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gejala yang Dirasakan
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Nyeri sendi lutut, pusing saat bangun tidur..."
                  value={riwayat.gejalaDirasakan}
                  onChange={(e) =>
                    setRiwayat({ ...riwayat, gejalaDirasakan: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Faktor Pencetus
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Aktivitas berlebihan, perubahan cuaca, kelelahan..."
                  value={riwayat.faktorPencetus}
                  onChange={(e) =>
                    setRiwayat({ ...riwayat, faktorPencetus: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Timbulnya Keluhan
                </label>
                <div className="flex gap-3 pt-1">
                  {["Mendadak", "Bertahap"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setRiwayat({ ...riwayat, timbulKeluhan: opt })
                      }
                      className={`px-4 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                        riwayat.timbulKeluhan === opt
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upaya Mengatasi Keluhan
                </label>
                <textarea
                  rows={2}
                  placeholder="Pergi ke RS/Klinik/Dokter/Puskesmas, konsumsi obat sendiri, obat tradisional, dll..."
                  value={riwayat.upayaMengatasi}
                  onChange={(e) =>
                    setRiwayat({ ...riwayat, upayaMengatasi: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              B. Riwayat Kesehatan Masa Lalu
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Penyakit yang Pernah Diderita
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Hipertensi sejak 5 tahun lalu, DM tipe 2"
                  value={riwayat.penyakitMasaLalu}
                  onChange={(e) =>
                    setRiwayat({ ...riwayat, penyakitMasaLalu: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Riwayat Alergi (Obat, Makanan, Binatang, Debu, dll)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Tidak ada alergi"
                  value={riwayat.riwayatAlergi}
                  onChange={(e) =>
                    setRiwayat({ ...riwayat, riwayatAlergi: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Riwayat Kecelakaan / Jatuh
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pernah terpeleset di kamar mandi 6 bulan lalu"
                  value={riwayat.riwayatKecelakaan}
                  onChange={(e) =>
                    setRiwayat({
                      ...riwayat,
                      riwayatKecelakaan: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Riwayat Pernah Dirawat di RS
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pernah dirawat tahun 2024 karena hipertensi"
                  value={riwayat.riwayatDirawat}
                  onChange={(e) =>
                    setRiwayat({ ...riwayat, riwayatDirawat: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Riwayat Pemakaian Obat Rutin
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Amlodipine 5 mg 1x1 pagi hari"
                  value={riwayat.riwayatObat}
                  onChange={(e) =>
                    setRiwayat({ ...riwayat, riwayatObat: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: 11 POLA FUNGSIONAL */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Pengkajian 11 Pola Fungsional Kesehatan
          </h3>

          {[
            {
              key: "persepsiKesehatan",
              label: "1. Persepsi Kesehatan dan Pola Manajemen Kesehatan",
              hint: "Kebiasaan yang mempengaruhi kesehatan (merokok, minuman keras, ketergantungan obat: jenis/frekuensi/jumlah/lama pakai).",
            },
            {
              key: "nutrisiMetabolik",
              label: "2. Nutrisi Metabolik",
              hint: "Frekuensi makan, nafsu makan, jenis makanan, makanan yang tidak disukai, alergi makanan, pantangan, keluhan makan.",
            },
            {
              key: "eliminasi",
              label: "3. Eliminasi (BAK & BAB)",
              hint: "BAK: Frekuensi, waktu, kebiasaan malam hari, keluhan. BAB: Frekuensi, waktu, konsistensi, keluhan, penggunaan pencahar.",
            },
            {
              key: "aktivitasLatihan",
              label: "4. Aktivitas dan Pola Latihan",
              hint: "Rutinitas mandi, kebersihan sehari-hari, aktivitas harian, masalah aktivitas, kemampuan kemandirian.",
            },
            {
              key: "istirahatTidur",
              label: "5. Pola Istirahat Tidur",
              hint: "Lama tidur malam, tidur siang, keluhan yang berhubungan dengan tidur (insomnia, sering terbangun).",
            },
            {
              key: "kognitifPersepsi",
              label: "6. Pola Kognitif Persepsi",
              hint: "Penglihatan (normal/kabur/kacamata), pendengaran (normal/terganggu ka/ki, alat bantu dengar), kesulitan membuat keputusan.",
            },
            {
              key: "persepsiKonsepDiri",
              label: "7. Persepsi Diri - Pola Konsep Diri",
              hint: "Bagaimana klien memandang dirinya sebagai lansia, dan persepsi klien tentang pandangan orang lain terhadap dirinya.",
            },
            {
              key: "peranHubungan",
              label: "8. Pola Peran - Hubungan",
              hint: "Peran ikatan keluarga, kepuasan hubungan sosial, pekerjaan, atau hubungan perkawinan.",
            },
            {
              key: "seksualitas",
              label: "9. Seksualitas",
              hint: "Riwayat reproduksi, jumlah anak, menopause/andropause, masalah seksualitas.",
            },
            {
              key: "kopingToleransiStress",
              label: "10. Koping - Pola Toleransi Stress",
              hint: "Hal yang menyebabkan stress pada lansia dan cara penanganan terhadap masalah tersebut.",
            },
            {
              key: "nilaiKeyakinan",
              label: "11. Nilai - Pola Keyakinan",
              hint: "Spiritualitas, kegiatan ibadah, sesuatu yang bernilai dalam hidup, keyakinan akan kesehatan dan agama.",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/40"
            >
              <label className="block text-xs font-bold text-slate-900">
                {item.label}
              </label>
              <p className="text-[11px] text-slate-500 mt-0.5 mb-2">
                {item.hint}
              </p>
              <textarea
                rows={2}
                placeholder="Tuliskan hasil pengkajian..."
                value={polaFungsional[item.key]}
                onChange={(e) =>
                  setPolaFungsional({
                    ...polaFungsional,
                    [item.key]: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* STEP 4: PEMERIKSAAN FISIK */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Pemeriksaan Fisik (Head-to-Toe & Tanda-Tanda Vital)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Keadaan Umum & Kesadaran
              </label>
              <input
                type="text"
                placeholder="Contoh: Baik, Komposmentis (GCS 15)"
                value={pemeriksaanFisik.keadaanUmum}
                onChange={(e) =>
                  setPemeriksaanFisik({
                    ...pemeriksaanFisik,
                    keadaanUmum: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanda-Tanda Vital (TD, N, S, RR)
              </label>
              <input
                type="text"
                placeholder="Contoh: TD 140/90 mmHg, N 82x/m, S 36.6°C, RR 20x/m"
                value={pemeriksaanFisik.ttv}
                onChange={(e) =>
                  setPemeriksaanFisik({
                    ...pemeriksaanFisik,
                    ttv: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                BB / TB (IMT)
              </label>
              <input
                type="text"
                placeholder="Contoh: BB 56 kg / TB 158 cm"
                value={pemeriksaanFisik.bbTb}
                onChange={(e) =>
                  setPemeriksaanFisik({
                    ...pemeriksaanFisik,
                    bbTb: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                key: "kepala",
                label: "Kepala",
                placeholder: "Bentuk simetris, tidak ada benjolan/nyeri tekan",
              },
              {
                key: "rambut",
                label: "Rambut",
                placeholder: "Beruban merata, bersih, distribusi merata",
              },
              {
                key: "mata",
                label: "Mata",
                placeholder:
                  "Konjungtiva ananemis, sklera anikterik, arkus senilis (+)",
              },
              {
                key: "telinga",
                label: "Telinga",
                placeholder:
                  "Simetris, serumen minimal, fungsi pendengaran baik",
              },
              {
                key: "mulutGigiBibir",
                label: "Mulut, Gigi, dan Bibir",
                placeholder: "Mukosa lembab, gigi sebagian tanggal/ompong",
              },
              {
                key: "dada",
                label: "Dada (Paru & Jantung)",
                placeholder: "Simetris, vesikuler (+/+), BJ I-II reguler",
              },
              {
                key: "abdomen",
                label: "Abdomen",
                placeholder:
                  "Supel, bising usus 10x/menit, tidak ada nyeri tekan",
              },
              {
                key: "kulit",
                label: "Kulit",
                placeholder: "Turgor menurun, keriput, kering, tidak ada lesi",
              },
              {
                key: "ekstremitasAtas",
                label: "Ekstremitas Atas",
                placeholder: "Akral hangat, CRT < 2 dtk, kekuatan otot 5/5",
              },
              {
                key: "ekstremitasBawah",
                label: "Ekstremitas Bawah",
                placeholder:
                  "Tidak ada edema, nyeri sendi lutut (+), kekuatan otot 4/4",
              },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={pemeriksaanFisik[field.key]}
                  onChange={(e) =>
                    setPemeriksaanFisik({
                      ...pemeriksaanFisik,
                      [field.key]: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wizard Navigation Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              Simpan & Lihat Hasil Pengkajian
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
