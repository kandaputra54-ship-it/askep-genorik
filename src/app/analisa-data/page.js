import React from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";
import AnalisaDataForm from "@/components/analisa-data/AnalisaDataForm";

export const metadata = {
  title: "Form Analisa Data | Askep Gerontik",
};

export default function AnalisaDataPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Alur Askep
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <ClipboardList className="w-5 h-5 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-900">
                  Analisa Data Keperawatan
                </h1>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Susun data subjektif, objektif, etiologi, dan masalah
                keperawatan pasien gerontik.
              </p>
            </div>

            <span className="hidden sm:inline-flex shrink-0 text-xs font-medium px-2.5 py-1 text-slate-500 border border-slate-200 rounded-md bg-white">
              Tahap 2 dari 6
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-6" />

        <AnalisaDataForm />
      </div>
    </main>
  );
}