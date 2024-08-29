import React from "react";

export default function LabelRuangan({ data }) {
  return (
    <p className="text-black font-semibold text-sm">
      {data.ruangan
        ? `${data.jam_mulai} - ${data.jam_selesai} | ${data.nama_acara} (${data.pemohon})`
        : "Jadwal masih kosong"}
    </p>
  );
}
