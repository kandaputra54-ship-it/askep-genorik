import React from "react";
import PengkajianKhususResult from "@/components/pengkajian-khusus/PengkajianKhususResult";

export const metadata = {
  title: "Hasil Pengkajian Khusus | Askep Gerontik",
};

export default function HasilPengkajianKhususPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <PengkajianKhususResult />
      </div>
    </main>
  );
}