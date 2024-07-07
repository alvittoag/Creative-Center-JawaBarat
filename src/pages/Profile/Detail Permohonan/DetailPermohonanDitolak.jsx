import React from "react";
import Navbar from "../../../components/globals/Navbar";
import { useLocation } from "react-router-dom";

export default function DetailPermohonanDitolak() {
  const { state } = useLocation();

  return (
    <div className="bg-white h-screen w-screen ">
      <Navbar />

      <div className="m-10 mb-[70px] flex flex-col items-center justify-center text-black bg-slate-50 border rounded-lg p-10">
        <div className="">
          <p className="font-semibold text-lg mb-10 text-center">
            Permohonan Anda Ditolak
          </p>
          <p className="mb-2">Alasan Penolakan : {state}</p>
        </div>
      </div>
    </div>
  );
}
