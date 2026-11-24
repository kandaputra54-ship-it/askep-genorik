export const APGAR_ITEMS = [
  {
    id: "A1",
    label: "A : Adaptasi",
    desc: "Saya puas bahwa saya dapat kembali pada keluarga (teman-teman) saya untuk membantu pada waktu sesuatu menyusahkan saya.",
  },
  {
    id: "P",
    label: "P : Partnership",
    desc: "Saya puas dengan cara keluarga (teman-teman) saya membicarakan sesuatu dengan saya dan mengungkapkan masalah saya.",
  },
  {
    id: "G",
    label: "G : Growth",
    desc: "Saya puas bahwa keluarga (teman-teman) saya menerima & mendukung keinginan saya untuk melakukan aktifitas atau arah baru.",
  },
  {
    id: "A2",
    label: "A : Afek",
    desc: "Saya puas dengan cara keluarga (teman-teman) saya mengekspresikan afek dan berespon terhadap emosi-emosi saya, seperti marah, sedih atau mencintai.",
  },
  {
    id: "R",
    label: "R : Resolve",
    desc: "Saya puas dengan cara teman-teman saya dan saya menyediakan waktu bersama-sama mengekspresikan afek dan berespon.",
  },
];

export const SPMSQ_QUESTIONS = [
  "1. Jam berapa sekarang?",
  "2. Tahun berapa sekarang?",
  "3. Kapan Bapak/Ibu lahir?",
  "4. Berapa umur Bapak/Ibu sekarang?",
  "5. Dimana alamat Bapak/Ibu sekarang?",
  "6. Berapa jumlah anggota keluarga yang tinggal bersama Bapak/Ibu?",
  "7. Siapa nama anggota keluarga yang tinggal bersama Bapak/Ibu?",
  "8. Tahun berapa Hari Kemerdekaan Indonesia?",
  "9. Siapa nama Presiden Republik Indonesia sekarang?",
  "10. Coba hitung terbalik dari angka 20 ke 1?",
];

export const MMSE_SECTIONS = [
  {
    category: "1. ORIENTASI",
    items: [
      { no: 1, text: "Tahun berapa sekarang?" },
      { no: 2, text: "Musim apa sekarang?" },
      { no: 3, text: "Tanggal berapa sekarang?" },
      { no: 4, text: "Hari apa sekarang?" },
      { no: 5, text: "Bulan apa sekarang?" },
      { no: 6, text: "Di negara mana anda tinggal?" },
      { no: 7, text: "Di Provinsi mana anda tinggal?" },
      { no: 8, text: "Di Kabupaten/Kota mana anda tinggal?" },
      { no: 9, text: "Di Kecamatan mana anda tinggal?" },
      { no: 10, text: "Di Desa/Kelurahan mana anda tinggal?" },
    ],
  },
  {
    category: "2. REGISTRASI (Minta klien menyebutkan 3 obyek)",
    items: [
      { no: 11, text: "Obyek 1" },
      { no: 12, text: "Obyek 2" },
      { no: 13, text: "Obyek 3" },
    ],
  },
  {
    category: "3. PERHATIAN & KALKULASI (Mengeja 5 kata dari belakang, misal 'BAPAK')",
    items: [
      { no: 14, text: "Huruf ke-5 (K)" },
      { no: 15, text: "Huruf ke-4 (A)" },
      { no: 16, text: "Huruf ke-3 (P)" },
      { no: 17, text: "Huruf ke-2 (A)" },
      { no: 18, text: "Huruf ke-1 (B)" },
    ],
  },
  {
    category: "4. MENGINGAT (Mengulang 3 obyek di atas)",
    items: [
      { no: 19, text: "Mengulang Obyek 1" },
      { no: 20, text: "Mengulang Obyek 2" },
      { no: 21, text: "Mengulang Obyek 3" },
    ],
  },
  {
    category: "5. BAHASA & PRAKSIS",
    items: [
      { no: 22, text: "Penamaan benda 1: Jam tangan" },
      { no: 23, text: "Penamaan benda 2: Pensil" },
      { no: 24, text: "Pengulangan kalimat: 'Tak ada jika, dan, atau tetapi'" },
      { no: 25, text: "Perintah 3 langkah: Ambil kertas!" },
      { no: 26, text: "Perintah 3 langkah: Lipat dua!" },
      { no: 27, text: "Perintah 3 langkah: Taruh di lantai!" },
      { no: 28, text: "Turuti perintah tertulis: Tutup mata" },
      { no: 29, text: "Tulis satu kalimat" },
      { no: 30, text: "Salin gambar" },
    ],
  },
];

export const KATZ_ITEMS = [
  {
    id: "mandi",
    title: "1. Mandi",
    mandiri:
      "Bantuan hanya pada satu bagian mandi (seperti punggung atau ekstremitas yang tidak mampu) atau mandi sendiri sepenuhnya.",
    tergantung:
      "Bantuan mandi lebih dari satu bagian tubuh, bantuan masuk dan keluar dari bak mandi, serta tidak mandi sendiri.",
  },
  {
    id: "berpakaian",
    title: "2. Berpakaian",
    mandiri:
      "Mengambil baju dari lemari, memakai pakaian, melepaskan pakaian, mengancingi/mengikat pakaian.",
    tergantung: "Tidak dapat memakai baju sendiri atau hanya sebagian.",
  },
  {
    id: "kamarKecil",
    title: "3. Ke Kamar Kecil (Toileting)",
    mandiri:
      "Masuk dan keluar dari kamar kecil kemudian membersihkan genetalia sendiri.",
    tergantung:
      "Menerima bantuan untuk masuk ke kamar kecil dan menggunakan pispot.",
  },
  {
    id: "berpindah",
    title: "4. Berpindah (Transferring)",
    mandiri:
      "Berpindah ke dan dari tempat tidur untuk duduk, bangkit dari kursi sendiri.",
    tergantung:
      "Bantuan dalam naik atau turun dari tempat tidur atau kursi, tidak melakukan satu atau lebih perpindahan.",
  },
  {
    id: "kontinen",
    title: "5. Kontinen",
    mandiri: "BAK dan BAB seluruhnya dikontrol sendiri.",
    tergantung:
      "Inkontinensia parsial atau total; penggunaan kateter, pispot, enema dan pembalut (pampers).",
  },
  {
    id: "makan",
    title: "6. Makan",
    mandiri: "Mengambil makanan dari piring dan menyuapinya sendiri.",
    tergantung:
      "Bantuan dalam hal mengambil makanan dari piring dan menyuapinya, tidak makan sama sekali, dan makan parenteral (NGT).",
  },
];

export const GDS_QUESTIONS = [
  { no: 1, text: "Apakah Anda sebenarnya puas dengan kehidupan Anda?", scoreOn: "TIDAK" },
  { no: 2, text: "Apakah Anda telah meninggalkan banyak kegiatan dan minat/kesenangan Anda?", scoreOn: "YA" },
  { no: 3, text: "Apakah Anda merasa kehidupan Anda kosong?", scoreOn: "YA" },
  { no: 4, text: "Apakah Anda sering merasa bosan?", scoreOn: "YA" },
  { no: 5, text: "Apakah Anda mempunyai semangat yang baik setiap saat?", scoreOn: "TIDAK" },
  { no: 6, text: "Apakah Anda merasa takut sesuatu yang buruk akan terjadi pada Anda?", scoreOn: "YA" },
  { no: 7, text: "Apakah Anda merasa bahagia untuk sebagian besar hidup Anda?", scoreOn: "TIDAK" },
  { no: 8, text: "Apakah Anda merasa sering tidak berdaya?", scoreOn: "YA" },
  { no: 9, text: "Apakah Anda lebih sering di rumah daripada pergi keluar dan mengerjakan sesuatu hal yang baru?", scoreOn: "YA" },
  { no: 10, text: "Apakah Anda merasa mempunyai banyak masalah dengan daya ingat Anda dibandingkan kebanyakan orang?", scoreOn: "YA" },
  { no: 11, text: "Apakah Anda pikir bahwa kehidupan Anda sekarang menyenangkan?", scoreOn: "TIDAK" },
  { no: 12, text: "Apakah Anda merasa tidak berharga seperti perasaan Anda saat ini?", scoreOn: "YA" },
  { no: 13, text: "Apakah Anda merasa penuh semangat?", scoreOn: "TIDAK" },
  { no: 14, text: "Apakah Anda merasa bahwa keadaan Anda tidak ada harapan?", scoreOn: "YA" },
  { no: 15, text: "Apakah Anda pikir bahwa orang lain lebih baik keadaannya daripada Anda?", scoreOn: "YA" },
];

export const NORTON_CATEGORIES = [
  {
    id: "kondisiFisik",
    label: "Kondisi Fisik Umum",
    options: [
      { score: 4, text: "Baik" },
      { score: 3, text: "Lumayan" },
      { score: 2, text: "Buruk" },
      { score: 1, text: "Sangat buruk" },
    ],
  },
  {
    id: "kesadaran",
    label: "Kesadaran",
    options: [
      { score: 4, text: "Komposmentis" },
      { score: 3, text: "Apatis" },
      { score: 2, text: "Konfus / soporus" },
      { score: 1, text: "Stupor / koma" },
    ],
  },
  {
    id: "aktifitas",
    label: "Aktifitas",
    options: [
      { score: 4, text: "Ambulan" },
      { score: 3, text: "Ambulan dengan bantuan" },
      { score: 2, text: "Hanya bisa duduk" },
      { score: 1, text: "Tiduran" },
    ],
  },
  {
    id: "mobilitas",
    label: "Mobilitas",
    options: [
      { score: 4, text: "Bergerak bebas" },
      { score: 3, text: "Sedikit terbatas" },
      { score: 2, text: "Sangat terbatas" },
      { score: 1, text: "Tak bisa bergerak" },
    ],
  },
  {
    id: "inkontinensia",
    label: "Inkontinensia",
    options: [
      { score: 4, text: "Tidak" },
      { score: 3, text: "Kadang-kadang" },
      { score: 2, text: "Sering inkontinensia urin" },
      { score: 1, text: "Inkontinensia alvi & urin" },
    ],
  },
];

// Fungsi Helper Auto-Scoring & Interpretasi
export function calculateSkriningSummary(state) {
  // 1. APGAR
  const apgarTotal = Object.values(state.apgar || {}).reduce(
    (sum, val) => sum + Number(val || 0),
    0
  );
  let apgarLabel = "Fungsi keluarga baik (7–10)";
  if (apgarTotal <= 3) apgarLabel = "Disfungsi keluarga sangat tinggi (0–3)";
  else if (apgarTotal <= 6) apgarLabel = "Disfungsi keluarga sedang (4–6)";

  // 2. SPMSQ (Hitung jumlah SALAH)
  const spmsqSalah = Object.values(state.spmsq || {}).filter(
    (item) => item?.status === "salah"
  ).length;
  let spmsqLabel = "Fungsi intelektual utuh (Salah 0–2)";
  if (spmsqSalah >= 8) spmsqLabel = "Kerusakan intelektual BERAT (Salah 8–10)";
  else if (spmsqSalah >= 5)
    spmsqLabel = "Kerusakan intelektual Sedang (Salah 5–7)";
  else if (spmsqSalah >= 3)
    spmsqLabel = "Kerusakan intelektual Ringan (Salah 3–4)";

  // 3. MMSE (Hitung jumlah BENAR)
  const mmseTotal = Object.values(state.mmse || {}).filter(
    (val) => val === 1
  ).length;
  const mmseLabel =
    mmseTotal < 21
      ? "Kerusakan kognitif (Nilai < 21)"
      : "Fungsi kognitif normal / tidak ada kerusakan (Nilai ≥ 21)";

  // 4. Indeks Katz
  const katzValues = state.katz || {};
  const dependentCount = Object.values(katzValues).filter(
    (v) => v === "tergantung"
  ).length;
  let katzGrade = "A";
  let katzDesc =
    "Kemandirian dalam hal makan, kontinen, berpindah, ke kamar kecil, mandi dan berpakaian.";

  if (dependentCount === 0) {
    katzGrade = "A";
  } else if (dependentCount === 1) {
    katzGrade = "B";
    katzDesc = "Kemandirian dalam semua hal kecuali satu dari fungsi tersebut.";
  } else if (dependentCount === 6) {
    katzGrade = "G";
    katzDesc = "Ketergantungan pada keenam fungsi tersebut.";
  } else if (
    katzValues.mandi === "tergantung" &&
    dependentCount === 2
  ) {
    katzGrade = "C";
    katzDesc = "Kemandirian dalam semua hal, kecuali mandi dan satu fungsi tambahan.";
  } else if (
    katzValues.mandi === "tergantung" &&
    katzValues.berpakaian === "tergantung" &&
    dependentCount === 3
  ) {
    katzGrade = "D";
    katzDesc =
      "Kemandirian dalam semua hal, kecuali mandi, berpakaian, dan satu fungsi tambahan.";
  } else if (
    katzValues.mandi === "tergantung" &&
    katzValues.berpakaian === "tergantung" &&
    katzValues.kamarKecil === "tergantung" &&
    dependentCount === 4
  ) {
    katzGrade = "E";
    katzDesc =
      "Kemandirian dalam semua hal, kecuali mandi, berpakaian, ke kamar kecil, dan satu fungsi tambahan.";
  } else if (
    katzValues.mandi === "tergantung" &&
    katzValues.berpakaian === "tergantung" &&
    katzValues.kamarKecil === "tergantung" &&
    katzValues.berpindah === "tergantung" &&
    dependentCount === 5
  ) {
    katzGrade = "F";
    katzDesc =
      "Kemandirian dalam semua hal, kecuali mandi, berpakaian, ke kamar kecil, berpindah dan satu fungsi tambahan.";
  } else {
    katzGrade = "Lainnya";
    katzDesc = `Tergantung pada ${dependentCount} dari 6 fungsi aktivitas.`;
  }

  // 5. Screening Fall (FR & TUG)
  const frInchi = parseFloat(state.fall?.frInchi);
  let frLabel = "Belum diukur";
  if (!isNaN(frInchi)) {
    frLabel =
      frInchi < 6
        ? `${frInchi} inchi — Risiko roboh / jatuh (< 6 inchi)`
        : `${frInchi} inchi — Normal (≥ 6 inchi)`;
  }

  const tugDetik = parseFloat(state.fall?.tugDetik);
  let tugLabel = "Belum diukur";
  if (!isNaN(tugDetik)) {
    if (tugDetik <= 10) tugLabel = `${tugDetik} detik — Low risk of falling (≤ 10 dtk)`;
    else if (tugDetik <= 19)
      tugLabel = `${tugDetik} detik — Low to moderate risk for falling (11–19 dtk)`;
    else if (tugDetik <= 29)
      tugLabel = `${tugDetik} detik — Moderate to high risk for falling (20–29 dtk)`;
    else
      tugLabel = `${tugDetik} detik — Impaired mobility & high risk of falling (≥ 30 dtk)`;
  }

  // 6. GDS-15
  let gdsTotal = 0;
  GDS_QUESTIONS.forEach((q) => {
    if (state.gds?.[q.no] === q.scoreOn) {
      gdsTotal += 1;
    }
  });
  let gdsLabel = "Normal / Tidak depresi (Skor 0–4)";
  if (gdsTotal >= 10) gdsLabel = "Depresi (Skor ≥ 10)";
  else if (gdsTotal >= 5) gdsLabel = "Kemungkinan Depresi (Skor 5–9)";

  // 7. Skor Norton
  const nortonTotal = Object.values(state.norton || {}).reduce(
    (sum, val) => sum + Number(val || 0),
    0
  );
  let nortonLabel = "Belum diisi lengkap";
  if (nortonTotal > 0) {
    if (nortonTotal < 12)
      nortonLabel = "Kemungkinan besar terjadi dekubitus (< 12)";
    else if (nortonTotal <= 15)
      nortonLabel = "Kemungkinan kecil terjadi dekubitus (12–15)";
    else nortonLabel = "Kecil sekali / tak terjadi dekubitus (15–20)";
  }

  return {
    apgar: { score: apgarTotal, label: apgarLabel },
    spmsq: { salah: spmsqSalah, label: spmsqLabel },
    mmse: { score: mmseTotal, label: mmseLabel },
    katz: { grade: katzGrade, desc: katzDesc },
    fall: { frLabel, tugLabel },
    gds: { score: gdsTotal, label: gdsLabel },
    norton: { score: nortonTotal, label: nortonLabel },
  };
}