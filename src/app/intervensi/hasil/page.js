import React from "react";
import IntervensiResult from "@/components/intervensi/IntervensiResult";

export const metadata = {
  title: "Hasil Intervensi Keperawatan | Askep Gerontik",
};

export default function HasilIntervensiPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <IntervensiResult />
      </div>
    </main>
  );
}