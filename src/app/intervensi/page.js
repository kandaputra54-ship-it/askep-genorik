import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import IntervensiForm from "@/components/intervensi/IntervensiForm";

export const metadata = {
  title: "Form Intervensi Keperawatan | Askep Gerontik",
};

export default function IntervensiPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Alur Askep
          </Link>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            Intervensi Keperawatan
          </span>
        </div>

        <IntervensiForm />
      </div>
    </main>
  );
}