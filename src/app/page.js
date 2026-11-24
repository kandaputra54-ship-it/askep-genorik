import React from "react";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import SearchFilter from "@/components/home/SearchFilter";
import StatistikModul from "@/components/home/StatistikModul";
import AlurAskep from "@/components/home/AlurAskep";
import StrukturPengkajian from "@/components/home/StrukturPengkajian";
import FokusKlinis from "@/components/home/FokusKlinis";
import InstrumenSkrining from "@/components/home/InstrumenSkrining";
import SopTindakan from "@/components/home/SopTindakan";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />
      <main>
        <Hero />
        <SearchFilter />
        <StatistikModul />
        <AlurAskep />
        <StrukturPengkajian />
        <FokusKlinis />
        <InstrumenSkrining />
        <SopTindakan />
      </main>
      <Footer />
    </div>
  );
}