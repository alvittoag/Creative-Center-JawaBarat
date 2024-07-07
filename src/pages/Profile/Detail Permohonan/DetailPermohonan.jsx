import React from "react";
import Navbar from "../../../components/globals/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import convertStringify from "../../../lib/convertStringify";

export default function DetailPermohonan() {
  const { state } = useLocation();

  const { pemohon, acara } = state;

  const dataPemohon = convertStringify(pemohon);
  const dataAcara = convertStringify(acara);
  return (
    <div className="bg-white h-screen w-screen ">
      <Navbar />

      <div className="m-10 mb-[70px] flex flex-col items-center justify-center text-black bg-slate-50 border rounded-lg p-10">
        <div className="">
          <p className="font-semibold text-lg mb-10">
            Permohonan Anda Diterima
          </p>
          <p className="mb-2">Nama Pemohon : {dataPemohon.namaPemohon}</p>
          <p className="mb-2">Nama Acara : {dataAcara.namaAcara}</p>
          <p className="mb-2">Tanggal Acara : {dataAcara.tanggalMulaiAcara}</p>
          <p className="mb-2">Lokasi : {dataAcara.lokasiGedung}</p>
        </div>
        <p className="text-sm mt-10">
          Jika peminjaman ruangan telah selesai dilakukan, silahkan klik tombol
          di bawah ini
        </p>
        <NavLink to="/uploadLaporan" state={state}>
          <div className="btn mt-4 w-30 bg-green-400 text-black">Selesai</div>
        </NavLink>
      </div>
    </div>
  );
}
