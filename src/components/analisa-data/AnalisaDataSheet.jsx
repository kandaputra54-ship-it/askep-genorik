import React from "react";

export default function AnalisaDataSheet({ mahasiswa, pasien, rows }) {
  const isMahasiswa = mahasiswa?.isMahasiswa;

  return (
    <div
      id="analisa-data-sheet"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10
                 print:border-none print:shadow-none print:rounded-none print:p-0"
    >
      {/* Kop Judul */}
      <div className="text-center border-b-2 border-slate-800 pb-3 mb-5">
        <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-slate-900">
          Lembar Analisa Data Asuhan Keperawatan Gerontik
        </h1>
        <p className="text-xs text-slate-500 mt-1 print:text-slate-700">
          Dokumentasi Proses Keperawatan Lansia
        </p>
      </div>

      {/* Identitas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-sm print:gap-6">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 print:bg-transparent print:border-slate-400 print:rounded-none">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 print:text-slate-700">
            Data Klien / Lansia
          </h3>
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="py-0.5 font-semibold text-slate-700 w-24 align-top">
                  Nama Klien
                </td>
                <td className="py-0.5 text-slate-900 align-top">
                  : {pasien.namaPasien || "-"}
                </td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-700 align-top">
                  Usia
                </td>
                <td className="py-0.5 text-slate-900 align-top">
                  : {pasien.umur || "-"}
                </td>
              </tr>
              <tr>
                <td className="py-0.5 font-semibold text-slate-700 align-top">
                  No. RM
                </td>
                <td className="py-0.5 text-slate-900 align-top">
                  : {pasien.noRegister || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {isMahasiswa && (
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 print:bg-transparent print:border-slate-400 print:rounded-none">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 print:text-slate-700">
              Mahasiswa / Praktikan
            </h3>
            <table className="w-full text-xs">
              <tbody>
                <tr>
                  <td className="py-0.5 font-semibold text-slate-700 w-24 align-top">
                    Nama Mhs
                  </td>
                  <td className="py-0.5 text-slate-900 align-top">
                    : {mahasiswa.namaMhs || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 font-semibold text-slate-700 align-top">
                    NIM
                  </td>
                  <td className="py-0.5 text-slate-900 align-top">
                    : {mahasiswa.nim || "-"}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 font-semibold text-slate-700 align-top">
                    Ruang / Tgl
                  </td>
                  <td className="py-0.5 text-slate-900 align-top">
                    : {mahasiswa.ruang || "-"} / {mahasiswa.tgl || "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tabel */}
      <table className="w-full border-collapse border border-slate-800 text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="border border-slate-800 px-2 py-2 text-center w-9 font-bold text-slate-900 print:bg-slate-200">
              No
            </th>
            <th className="border border-slate-800 px-3 py-2 text-left font-bold text-slate-900 w-[46%] print:bg-slate-200">
              DATA (Subjektif &amp; Objektif)
            </th>
            <th className="border border-slate-800 px-3 py-2 text-left font-bold text-slate-900 print:bg-slate-200">
              ETIOLOGI / PENYEBAB
            </th>
            <th className="border border-slate-800 px-3 py-2 text-left font-bold text-slate-900 print:bg-slate-200">
              MASALAH KEPERAWATAN
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id ?? index} className="align-top break-inside-avoid">
              <td className="border border-slate-800 px-2 py-2 text-center font-medium">
                {index + 1}
              </td>
              <td className="border border-slate-800 px-3 py-2">
                <div>
                  <span className="font-bold text-[10px] uppercase text-slate-700 block mb-0.5">
                    Data Subjektif (DS):
                  </span>
                  <p className="text-slate-900 whitespace-pre-line">
                    {row.dataSubjektif || "-"}
                  </p>
                </div>
                <div className="pt-1.5 mt-1.5 border-t border-slate-300">
                  <span className="font-bold text-[10px] uppercase text-slate-700 block mb-0.5">
                    Data Objektif (DO):
                  </span>
                  <p className="text-slate-900 whitespace-pre-line">
                    {row.dataObjektif || "-"}
                  </p>
                </div>
              </td>
              <td className="border border-slate-800 px-3 py-2 text-slate-900 whitespace-pre-line">
                {row.etiologi || "-"}
              </td>
              <td className="border border-slate-800 px-3 py-2 font-semibold text-slate-900 whitespace-pre-line">
                {row.masalah || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tanda Tangan */}
      {isMahasiswa && (
        <div className="mt-10 flex justify-end break-inside-avoid">
          <div className="text-center text-xs text-slate-800 w-52">
            <p>
              {mahasiswa.ruang || "Jakarta"}, {mahasiswa.tgl || ""}
            </p>
            <p className="mt-1">Mahasiswa Praktikan,</p>
            <div className="h-14" />
            <p className="font-bold underline">
              {mahasiswa.namaMhs || "( ................................ )"}
            </p>
            <p>NIM. {mahasiswa.nim || "-"}</p>
          </div>
        </div>
      )}
    </div>
  );
}