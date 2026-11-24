import React from "react";
import DiagnosaResult from "@/components/diagnosa/DiagnosaResult";

export const metadata = {
  title: "Hasil Daftar Diagnosa | Askep Gerontik",
};

export default function HasilDiagnosaPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <DiagnosaResult />
      </div>
    </main>
  );
}