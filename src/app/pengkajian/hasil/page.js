import React from "react";
import PengkajianResult from "@/components/pengkajian/PengkajianResult";

export const metadata = {
  title: "Hasil Pengkajian Dasar | Askep Gerontik",
};

export default function HasilPengkajianPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <PengkajianResult />
      </div>
    </main>
  );
}