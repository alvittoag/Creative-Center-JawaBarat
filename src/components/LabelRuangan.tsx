import React from "react";

export default function LabelRuangan({ data }) {
  return (
    <p className="text-gray-400 text-sm">
      {data.ruangan
        ? `Pemohon: ${data.pemohon} (${data.nama_acara}) | ${data.tanggal}  (${data.jam_mulai} - ${data.jam_selesai})`
        : "Jadwal masih kosong"}
    </p>
  );
}
